import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const body = await request.json()
    const { email, stripe_session_id } = body

    if (!email) {
      return Response.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Find the order in pending_payment status and update it to paid
    const { data: existingOrder, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('status', 'pending_payment')
      .limit(1)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching pending order:', fetchError)
      return Response.json(
        { error: 'Failed to find pending order' },
        { status: 500 }
      )
    }

    if (!existingOrder) {
      // Order doesn't exist in pending_payment - it may have already been confirmed
      // or was never created. This is not necessarily an error.
      return Response.json(
        { success: true, message: 'Order already confirmed or not found' },
        { status: 200 }
      )
    }

    // Update order status to paid and add stripe_session_id if provided
    const { data: updatedOrder, error: updateError } = await supabase
      .from('orders')
      .update({
        status: 'paid',
        ...(stripe_session_id && { stripe_session_id }),
      })
      .eq('id', existingOrder.id)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating order status:', updateError)
      return Response.json(
        { error: 'Failed to confirm payment' },
        { status: 500 }
      )
    }

    return Response.json(
      { success: true, order: updatedOrder },
      { status: 200 }
    )
  } catch (error) {
    console.error('Order confirmation error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
