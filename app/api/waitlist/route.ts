import { validateEmail } from "@/lib/email-validation"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: Request) {
  try {
    const { email, consent } = await request.json()

    // Validation
    if (!email || !validateEmail(email)) {
      return Response.json({ error: "Invalid email address" }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      // Avoid throwing during build-time; return 500 at runtime with clear message
      console.error("Supabase env vars missing: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
      return Response.json({ error: "Server misconfiguration" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Insert into Supabase (include consent boolean)
    // Create pending record for double opt-in. We generate a confirmation token and
    // set status to 'pending'. In production you should send an email containing
    // the confirmation URL. For initial testing this endpoint returns the URL
    // so you can click it manually.
    const confirmationToken = crypto.randomUUID()
    const payload: any = {
      email: email.toLowerCase(),
      created_at: new Date().toISOString(),
      status: "pending",
      confirmation_token: confirmationToken,
    }

    if (typeof consent === 'boolean') payload.consent = consent

    const { data, error } = await supabase.from("waitlist").insert([payload]).select()

    if (error) {
      // Handle duplicate email (Postgres unique violation)
      if ((error as any)?.code === "23505") {
        return Response.json({ error: "Email already on waitlist" }, { status: 409 })
      }
      console.error("Supabase insert error:", error)
      return Response.json({ error: "Database error" }, { status: 500 })
    }

    // Construct a confirmation URL for manual testing. Prefer using a mailing
    // provider to send this link to the user's email in production.
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '')
    const confirmationUrl = baseUrl ? `${baseUrl}/api/waitlist/confirm?token=${confirmationToken}` : `/api/waitlist/confirm?token=${confirmationToken}`

    return Response.json({ success: true, message: "Pending confirmation", confirmationUrl }, { status: 201 })
  } catch (error) {
    console.error("Waitlist error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
