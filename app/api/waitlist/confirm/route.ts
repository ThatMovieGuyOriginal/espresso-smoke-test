import { createClient } from '@supabase/supabase-js'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return new Response('Missing token', { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Supabase env vars missing for confirm')
      return new Response('Server misconfiguration', { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Find pending record with this token
    const { data: rows, error: selectError } = await supabase
      .from('waitlist')
      .select('id, email, status')
      .eq('confirmation_token', token)
      .limit(1)

    if (selectError) {
      console.error('Supabase select error:', selectError)
      return new Response('Database error', { status: 500 })
    }

    if (!rows || rows.length === 0) {
      return new Response('Invalid or expired token', { status: 404 })
    }

    const row = rows[0]

    // Update to active and set confirmed_at
    const { error: updateError } = await supabase
      .from('waitlist')
      .update({ status: 'active', confirmed_at: new Date().toISOString() })
      .eq('id', row.id)

    if (updateError) {
      console.error('Supabase update error:', updateError)
      return new Response('Database error', { status: 500 })
    }

    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Confirmed</title></head><body style="background:#111;color:#f3f4f6;font-family:Inter,Arial,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;"><div style="max-width:640px;padding:24px;border-radius:8px;background:#1a1a1a;border:1px solid #333;"><h1 style="color:#FF9900">Subscription Confirmed</h1><p style="color:#9ca3af">Thanks — your email has been confirmed and added to the waitlist.</p></div></body></html>`

    return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html' } })
  } catch (err) {
    console.error('Confirm handler error:', err)
    return new Response('Internal server error', { status: 500 })
  }
}
