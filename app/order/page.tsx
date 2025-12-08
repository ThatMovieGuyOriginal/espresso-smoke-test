'use client'

import { track } from '@vercel/analytics'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function OrderPage() {
  const [formData, setFormData] = useState({
    email: '',
    waterHardness: '',
    dailyShots: '',
    serialNumber: '',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Email validation
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email required'
    }

    // Water hardness validation (1-999 ppm)
    const hardness = parseInt(formData.waterHardness)
    if (!formData.waterHardness || isNaN(hardness) || hardness < 1 || hardness > 999) {
      newErrors.waterHardness = 'Enter water hardness between 1-999 ppm'
    }

    // Daily shots validation (1-99)
    const shots = parseInt(formData.dailyShots)
    if (!formData.dailyShots || isNaN(shots) || shots < 1 || shots > 99) {
      newErrors.dailyShots = 'Enter daily shots between 1-99'
    }

    // Serial number validation (non-empty)
    if (!formData.serialNumber.trim()) {
      newErrors.serialNumber = 'Serial number required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    track('order_form_submitted', {
      water_hardness: formData.waterHardness,
      daily_shots: formData.dailyShots,
    })

    // CRITICAL: Always redirect to Stripe, even if database save fails
    // Philosophy: Payment > Data Collection
    // We can email customers for missing details, but can't recover lost sales
    
    try {
      // Attempt to save order details to Supabase
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          water_hardness_ppm: parseInt(formData.waterHardness),
          daily_shots: parseInt(formData.dailyShots),
          serial_number: formData.serialNumber,
          status: 'pending_payment',
        }),
      })
      // Database save succeeded - great! Continue to Stripe.
    } catch (error) {
      // Database save failed - log it but DON'T STOP the checkout
      console.error('Failed to save order details (will still process payment):', error)
      track('order_save_failed', { 
        email: formData.email,
        error: error instanceof Error ? error.message : 'unknown'
      })
      // Continue to Stripe regardless
    }

    // ALWAYS redirect to Stripe - this is the critical part
    const stripeUrl = new URL('https://buy.stripe.com/cNi9AS1Lj1gG4z18xs7AI01')
    stripeUrl.searchParams.set('prefilled_email', formData.email)
    stripeUrl.searchParams.set('client_reference_id', formData.email)
    
    window.location.href = stripeUrl.toString()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <section className="container-custom min-h-screen flex flex-col items-center justify-center py-16">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-text-primary mb-6">
            Get Your Custom Cleaning Schedule
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Tell us about your machine and we'll generate a precision Preventative Maintenance and Cleaning calendar 
            based on your exact water quality (TDS/PPM) and usage pattern.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-dark-surface border border-dark-border rounded-lg p-8 space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-text-primary mb-2">
              Email Address <span className="text-accent-orange">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full bg-dark-bg border border-dark-border text-text-primary placeholder-text-secondary rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-orange"
              disabled={loading}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Water Hardness */}
          <div>
            <label htmlFor="waterHardness" className="block text-sm font-bold text-text-primary mb-2">
              Water Hardness (PPM/TDS) <span className="text-accent-orange">*</span>
            </label>
            <input
              type="number"
              id="waterHardness"
              name="waterHardness"
              value={formData.waterHardness}
              onChange={handleChange}
              placeholder="e.g., 150"
              min="1"
              max="999"
              className="w-full bg-dark-bg border border-dark-border text-text-primary placeholder-text-secondary rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-orange"
              disabled={loading}
              required
            />
            {errors.waterHardness && (
              <p className="text-red-500 text-sm mt-1">{errors.waterHardness}</p>
            )}
            <p className="text-xs text-text-secondary mt-1">
              Check your water report or use a TDS meter
            </p>
          </div>

          {/* Daily Shots */}
          <div>
            <label htmlFor="dailyShots" className="block text-sm font-bold text-text-primary mb-2">
              Daily Shots (Average) <span className="text-accent-orange">*</span>
            </label>
            <input
              type="number"
              id="dailyShots"
              name="dailyShots"
              value={formData.dailyShots}
              onChange={handleChange}
              placeholder="e.g., 4"
              min="1"
              max="99"
              className="w-full bg-dark-bg border border-dark-border text-text-primary placeholder-text-secondary rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-orange"
              disabled={loading}
              required
            />
            {errors.dailyShots && (
              <p className="text-red-500 text-sm mt-1">{errors.dailyShots}</p>
            )}
            <p className="text-xs text-text-secondary mt-1">
              How many shots do you pull per day on average?
            </p>
          </div>

          {/* Serial Number */}
          <div>
            <label htmlFor="serialNumber" className="block text-sm font-bold text-text-primary mb-2">
              Machine Serial Number <span className="text-accent-orange">*</span>
            </label>
            <input
              type="text"
              id="serialNumber"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              placeholder="e.g., LM-12345"
              className="w-full bg-dark-bg border border-dark-border text-text-primary placeholder-text-secondary rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-orange"
              disabled={loading}
              required
            />
            {errors.serialNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.serialNumber}</p>
            )}
            <p className="text-xs text-text-secondary mt-1">
              Found on the machine's serial plate
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent-orange text-black font-bold py-4 px-8 rounded-md uppercase tracking-wider transition-all duration-200 hover:bg-accent-orange-hover hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'REDIRECTING...' : 'PROCEED TO PAYMENT - $19'}
          </button>

          <p className="text-xs text-text-secondary text-center mt-4">
            🔒 Secure payment via Stripe. You'll enter payment details on the next page.
          </p>
        </form>
      </div>
    </section>
  )
}
