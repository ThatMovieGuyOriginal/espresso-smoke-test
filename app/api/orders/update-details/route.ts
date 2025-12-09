import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const { email, water_hardness_ppm, daily_shots, serial_number, water_source } = await request.json()

    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Update the order with real machine details and water source
    const updateData: any = {
      updated_at: new Date().toISOString(),
    }

    // Only include fields that were provided
    if (water_hardness_ppm !== undefined) updateData.water_hardness_ppm = water_hardness_ppm
    if (daily_shots !== undefined) updateData.daily_shots = daily_shots
    if (serial_number !== undefined) updateData.serial_number = serial_number
    if (water_source !== undefined) updateData.water_source = water_source

    const { error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('email', email)

    if (error) {
      console.error('Error updating order details:', error)
      return Response.json(
        { error: 'Failed to update order details' },
        { status: 500 }
      )
    }

    return Response.json({
      success: true,
      message: 'Machine details updated successfully',
    })
  } catch (error) {
    console.error('Update details error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
