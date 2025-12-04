"use client"

import { Button } from "@/components/Button"
import { validateEmail } from "@/lib/email-validation"
import { track } from "@vercel/analytics/react"
import { useState } from "react"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setStatus("error")
      setMessage("Please enter a valid email address.")
      return
    }

    setLoading(true)
    track("waitlist_submitted", { email, location: "waitlist_page" })

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage("You are on the list. We will contact you shortly.")
        setEmail("")
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
