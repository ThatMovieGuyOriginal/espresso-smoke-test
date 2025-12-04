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
    const payload: any = {
      email: email.toLowerCase(),
      created_at: new Date().toISOString(),
      status: "active",
    }

    if (typeof consent === 'boolean') {
      payload.consent = consent
    }

    const { data, error } = await supabase.from("waitlist").insert([payload]).select()

    if (error) {
      // Handle duplicate email (Postgres unique violation)
      if ((error as any)?.code === "23505") {
        return Response.json({ error: "Email already on waitlist" }, { status: 409 })
      }
      console.error("Supabase insert error:", error)
      return Response.json({ error: "Database error" }, { status: 500 })
    }

    return Response.json({ success: true, message: "Added to waitlist" }, { status: 201 })
  } catch (error) {
    console.error("Waitlist error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
