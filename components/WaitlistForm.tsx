"use client"

import { Button } from "@/components/Button"
import { validateEmail } from "@/lib/email-validation"
import { track } from "@vercel/analytics/react"
import { useState } from "react"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [consent, setConsent] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setStatus("error")
      setMessage("Please enter a valid email address.")
      return
    }

    if (!consent) {
      setStatus("error")
      setMessage("Please confirm you agree to receive emails (required).")
      return
    }

    setLoading(true)
    track("waitlist_submitted", { email, location: "waitlist_page" })

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent }),
      })

      const data = await response.json()

      if (response.ok) {
          // Double opt-in: show pending message and prompt user to check email
          setStatus('pending')
          setMessage(data.message || 'Check your email to confirm your subscription.')
          // For testing, developer can use data.confirmationUrl
      } else {
        setStatus("error")
        setMessage(data.error || "Something went wrong. Try again.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="bg-dark-surface border border-dark-border text-text-primary placeholder-text-secondary rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-orange"
          disabled={loading}
          required
        />
        <label className="flex items-center gap-3 text-sm text-text-secondary">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            disabled={loading}
            className="w-4 h-4"
          />
          <span>
            I agree to receive emails about the product and updates. See our{' '}
            <a href="/privacy" className="underline">
              privacy policy
            </a>
            .
          </span>
        </label>
        <Button
          variant="secondary"
          size="lg"
          disabled={loading || status === "success"}
        >
          {loading ? "JOINING..." : "JOIN THE WAITLIST"}
        </Button>
      </div>

      {status === "success" && (
        <p className="text-accent-green text-center mt-4 font-semibold">
          {message}
        </p>
      )}

      {status === "error" && (
        <p className="text-red-500 text-center mt-4 text-sm">
          {message}
        </p>
      )}
    </form>
  )
}
