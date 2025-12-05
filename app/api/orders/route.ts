import { createClient } from '@supabase/supabase-js'
import { headers } from 'next/headers'

export async function POST(request: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const body = await request.json()
    const { email, water_hardness_ppm, daily_shots, serial_number, stripe_session_id } = body

    // Validation
    if (!email || !water_hardness_ppm || !daily_shots || !serial_number) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get customer IP
    const headersList = await headers()
    const forwardedFor = headersList.get('x-forwarded-for')
    const customerIp = forwardedFor ? forwardedFor.split(',')[0] : headersList.get('x-real-ip') || 'unknown'

    // Insert order into Supabase
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          email: email.toLowerCase(),
          water_hardness_ppm: parseInt(water_hardness_ppm),
          daily_shots: parseInt(daily_shots),
          serial_number: serial_number.trim(),
          stripe_session_id,
          status: 'paid', // Mark as paid since they came from Stripe success page
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
