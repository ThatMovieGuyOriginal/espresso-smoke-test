import { createClient } from '@supabase/supabase-js'
import { headers } from 'next/headers'

export async function POST(request: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const body = await request.json()
    const { 
      email, 
      water_hardness_ppm, 
      daily_shots, 
      serial_number, 
      stripe_session_id, 
      status = 'pending_payment',
      product_type = 'lm_water_97',
      machine_type
    } = body

    // Validation - email is required, everything else has defaults
    if (!email) {
      return Response.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Get customer IP
    const headersList = await headers()
    const forwardedFor = headersList.get('x-forwarded-for')
    const customerIp = forwardedFor ? forwardedFor.split(',')[0] : headersList.get('x-real-ip') || 'unknown'

    // If marking as paid, check capacity
    if (status === 'paid') {
      const { count, error: countError } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'paid')

      if (countError) {
        console.error('Error checking order count:', countError)
        return Response.json(
          { error: 'Failed to check order capacity' },
          { status: 500 }
        )
      }

      if (count! >= 15) {
        return Response.json(
          { error: 'Order capacity reached. Please join the waitlist.' },
          { status: 429 }
        )
      }

      // Check if this email already has a paid order
      const { data: existingPaid } = await supabase
        .from('orders')
        .select('*')
        .eq('email', email.toLowerCase())
        .eq('status', 'paid')
        .limit(1)
        .single()

      if (existingPaid) {
        return Response.json(
          { error: 'You have already completed an order. Contact support for additional orders.' },
          { status: 409 }
        )
      }
    }

    // Insert order into Supabase
    // CRITICAL: This runs BEFORE Stripe redirect (for pending_payment) or AFTER confirmation (for paid)
    // All fields have defaults to enable frictionless payment (email-only form)
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          email: email.toLowerCase(),
          product_type: product_type || 'lm_water_97',
          machine_type: machine_type || null,
          water_hardness_ppm: water_hardness_ppm || 150, // Default value
          daily_shots: daily_shots || 4, // Default value
          serial_number: serial_number || 'TBD', // Default value
          ...(stripe_session_id && { stripe_session_id }),
          status, // Use the provided status (pending_payment or paid)
          customer_ip: customerIp,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return Response.json(
        { error: 'Database error', details: error.message },
        { status: 500 }
      )
    }

    return Response.json(
      { success: true, order: data[0] },
      { status: 201 }
    )
  } catch (error) {
    console.error('Order creation error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
