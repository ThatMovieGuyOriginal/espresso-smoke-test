import { createClient } from '@supabase/supabase-js'
import { headers } from 'next/headers'

export async function POST(request: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const body = await request.json()
    const { email, water_hardness_ppm, daily_shots, serial_number, stripe_session_id, status = 'pending_payment' } = body

    // Validation
    if (!email || water_hardness_ppm === undefined || daily_shots === undefined || !serial_number) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate field ranges
    if (typeof water_hardness_ppm !== 'number' || water_hardness_ppm < 1 || water_hardness_ppm > 999) {
      return Response.json(
        { error: 'Water hardness must be between 1-999 PPM' },
        { status: 400 }
      )
    }

    if (typeof daily_shots !== 'number' || daily_shots < 1 || daily_shots > 99) {
      return Response.json(
        { error: 'Daily shots must be between 1-99' },
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
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          email: email.toLowerCase(),
          water_hardness_ppm: typeof water_hardness_ppm === 'string' ? parseInt(water_hardness_ppm) : water_hardness_ppm,
          daily_shots: typeof daily_shots === 'string' ? parseInt(daily_shots) : daily_shots,
          serial_number: serial_number.trim(),
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
