'use client'

import { track } from '@vercel/analytics'
import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

function OrderContent() {
  const searchParams = useSearchParams()
  const machineType = searchParams.get('machine') || 'linea_mini' // Default machine type
  const productType = searchParams.get('product') || 'lm_water_97' // Default product type
  
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const validateEmail = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Valid email required')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateEmail()) {
      return
    }

    setLoading(true)
    track('order_form_submitted_email_only', {
      email: email,
      machine_type: machineType,
      product_type: productType,
    })

    // CRITICAL: Always redirect to Stripe, even if database save fails
    // Philosophy: Payment > Data Collection
    // Using dummy data for non-email fields - will be updated post-purchase
    
    try {
      // Attempt to save order with dummy data to Supabase
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          product_type: productType,
          machine_type: machineType,
          water_hardness_ppm: 150, // Dummy default
          daily_shots: 4, // Dummy default
          serial_number: 'TBD', // Placeholder - to be collected post-purchase
          status: 'pending_payment',
        }),
      })
      // Database save succeeded - great! Continue to Stripe.
    } catch (error) {
      // Database save failed - log it but DON'T STOP the checkout
      console.error('Failed to save order (will still process payment):', error)
      track('order_save_failed', { 
        email: email,
        error: error instanceof Error ? error.message : 'unknown'
      })
      // Continue to Stripe regardless
    }

    // ALWAYS redirect to Stripe - this is the critical part
    const stripeUrl = new URL('https://buy.stripe.com/cNi9AS1Lj1gG4z18xs7AI01')
    stripeUrl.searchParams.set('prefilled_email', email)
    stripeUrl.searchParams.set('client_reference_id', email)
    
    window.location.href = stripeUrl.toString()
  }

  return (
    <section className="container-custom min-h-screen flex flex-col items-center justify-center py-16 bg-white">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#111111] mb-6">
            Get Your Certified Water Audit
          </h1>
          <p className="text-lg text-[#4B5563] leading-relaxed">
            Certified LSI calculation and custom mineralization recipe for La Marzocco (Mini, Micra, GS3) and Slayer.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[4px] p-8 space-y-6">
          {/* Email Only */}
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-[#111111] mb-2">
              Email Address <span className="text-[#B91C1C]">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (error) setError('')
              }}
              placeholder="your@email.com"
              className="w-full bg-white border border-[#E5E7EB] text-[#111111] placeholder-[#9CA3AF] rounded-[4px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#111111] text-lg"
              disabled={loading}
              autoFocus
              required
            />
            {error && (
              <p className="text-[#B91C1C] text-sm mt-1">{error}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#000000] text-white font-bold py-4 px-8 rounded-[4px] uppercase tracking-wider transition-colors duration-150 hover:bg-[#333333] disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? 'REDIRECTING...' : 'PROCEED TO PAYMENT - $97'}
          </button>

          <p className="text-xs text-[#4B5563] text-center mt-4">
            🔒 Secure payment via Stripe. You'll enter payment details on the next page.
          </p>
        </form>
      </div>
    </section>
  )
}

export default function OrderPage() {
  return (
    <Suspense fallback={
      <section className="container-custom min-h-screen flex flex-col items-center justify-center py-16 bg-white">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <div className="animate-pulse mb-8">
              <div className="w-16 h-16 bg-[#E5E7EB] rounded-full mx-auto mb-4"></div>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#111111] mb-6">
              Loading...
            </h1>
          </div>
        </div>
      </section>
    }>
      <OrderContent />
    </Suspense>
  )
}
