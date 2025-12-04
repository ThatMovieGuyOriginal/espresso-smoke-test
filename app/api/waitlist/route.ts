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
    // capture IP (from proxies) for analytics/compliance
    const forwardedFor = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || ''
    const signupIp = forwardedFor.split(',')[0].trim() || null
    const signupIpAt = new Date().toISOString()
    const payload: any = {
      email: email.toLowerCase(),
      created_at: new Date().toISOString(),
      status: "pending",
      confirmation_token: confirmationToken,
      signup_ip: signupIp,
      signup_ip_at: signupIpAt,
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

    // Attempt to send confirmation email using SMTP if env vars are present.
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = process.env.SMTP_PORT
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASSWORD
    const emailFrom = process.env.EMAIL_FROM || `noreply@${process.env.NEXT_PUBLIC_DOMAIN?.replace('https://','') || 'example.com'}`

    if (smtpHost && smtpPort && smtpUser && smtpPass) {
      try {
        const nodemailer = await import('nodemailer')
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(smtpPort),
          secure: Number(smtpPort) === 465, // true for 465, false for other ports
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        })

        const mailHtml = `Hello,<br/><br/>Please confirm your subscription by clicking the link below:<br/><a href="${confirmationUrl}">${confirmationUrl}</a><br/><br/>If you didn't request this, ignore this email.`

        await transporter.sendMail({
          from: emailFrom,
          to: email,
          subject: 'Please confirm your subscription',
          html: mailHtml,
        })
      } catch (mailErr) {
        console.error('SMTP send error:', mailErr)
        // Fallthrough: return confirmationUrl in response for manual testing
        return Response.json({ success: true, message: 'Pending confirmation', confirmationUrl }, { status: 201 })
      }
      return Response.json({ success: true, message: 'Pending confirmation. Confirmation email sent.' }, { status: 201 })
    }

    // If SMTP not configured, return confirmation URL for manual testing
    return Response.json({ success: true, message: 'Pending confirmation', confirmationUrl }, { status: 201 })
  } catch (error) {
    console.error("Waitlist error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
