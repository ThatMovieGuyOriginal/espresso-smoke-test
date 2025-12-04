import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) return Response.json({ error: 'Missing email' }, { status: 400 })

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Supabase env vars missing for unsubscribe')
      return Response.json({ error: 'Server misconfiguration' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { data, error } = await supabase
      .from('waitlist')
      .update({ status: 'unsubscribed', unsubscribed_at: new Date().toISOString() })
      .eq('email', email.toLowerCase())

    if (error) {
      console.error('Supabase unsubscribe error:', error)
      return Response.json({ error: 'Database error' }, { status: 500 })
    }

    return Response.json({ success: true, message: 'Unsubscribed' }, { status: 200 })
  } catch (err) {
    console.error('Unsubscribe handler error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
