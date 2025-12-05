import { createClient } from '@supabase/supabase-js'

// Set your order limit here - when we hit this number, show the waitlist page
const ORDER_LIMIT = 15

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Count paid orders
    const { count, error } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'paid')

    if (error) {
      console.error('Error checking order count:', error)
      return Response.json({ orderCount: 0, isClosed: false }, { status: 200 })
    }

    const orderCount = count || 0
    const isClosed = orderCount >= ORDER_LIMIT

    return Response.json({
      orderCount,
      isClosed,
      limit: ORDER_LIMIT,
    })
  } catch (error) {
    console.error('Order status check error:', error)
    return Response.json({ orderCount: 0, isClosed: false }, { status: 200 })
  }
}
