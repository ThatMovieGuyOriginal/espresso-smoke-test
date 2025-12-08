import { createClient } from '@supabase/supabase-js'

// Waitlist is disabled - all orders are accepted
// This endpoint is kept for backwards compatibility but always returns isClosed: false

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Count paid orders (for reference only)
    const { count, error } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'paid')

    const orderCount = count || 0

    return Response.json({
      orderCount,
      isClosed: false, // Waitlist disabled - always accept orders
    })
  } catch (error) {
    console.error('Order status check error:', error)
    return Response.json({ orderCount: 0, isClosed: false }, { status: 200 })
  }
}
