"use client"

import { useState } from 'react'

export default function UnsubscribePage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/waitlist/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()
      if (res.ok) {
        setMessage(data.message || 'You have been unsubscribed.')
        setEmail('')
      } else {
        setMessage(data.error || 'Unable to unsubscribe.')
      }
    } catch (err) {
      setMessage('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="container-custom py-20 bg-white">
      <div className="max-w-md mx-auto bg-[#F9FAFB] border border-[#E5E7EB] rounded-[4px] p-8">
        <h1 className="text-2xl font-extrabold text-[#111111] mb-4">Unsubscribe</h1>
        <p className="text-[#4B5563] mb-4">Enter your email to unsubscribe from the waitlist.</p>
        <form onSubmit={handleUnsubscribe} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white border border-[#E5E7EB] text-[#111111] rounded-[4px] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#111111]"
            placeholder="you@example.com"
            required
          />
          <button className="btn-waitlist" disabled={loading} type="submit">
            {loading ? 'Unsubscribing...' : 'Unsubscribe'}
          </button>
        </form>
        {message && <p className="text-[#4B5563] mt-4">{message}</p>}
      </div>
    </section>
  )
}
