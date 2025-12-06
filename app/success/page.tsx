'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const [saving, setSaving] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const sessionId = searchParams.get('session_id')
        
        // Get user email from Stripe session
        // For now, we'll need the email from the Stripe redirect
        // The order was already created in pending_payment status before redirect
        // We just need to confirm it's paid
        
        // Since sessionStorage was used before, try to get email from there
        const pendingOrderData = sessionStorage.getItem('pendingOrder')
        if (!pendingOrderData) {
          // This is okay - order was saved to Supabase before redirect
          // Just show success
          setSaving(false)
          return
        }

        const orderData = JSON.parse(pendingOrderData)
        
        // Update existing order from pending_payment to paid
        const response = await fetch('/api/orders/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: orderData.email,
            stripe_session_id: sessionId,
          }),
        })

        if (!response.ok) {
          console.warn('Could not confirm payment via endpoint, but order may still exist')
        }

        // Clear sessionStorage after confirmation attempt
        sessionStorage.removeItem('pendingOrder')
        setSaving(false)
      } catch (err) {
        console.error('Error confirming payment:', err)
        // Don't treat this as a fatal error - order exists in pending_payment status
        // User can contact support to verify
        setSaving(false)
      }
    }

    confirmPayment()
  }, [searchParams])

  if (saving) {
    return (
      <section className="container-custom min-h-screen flex flex-col items-center justify-center py-16">
        <div className="max-w-2xl text-center">
          <div className="animate-pulse mb-8">
            <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-6">
            Processing Your Order...
          </h1>
          <p className="text-lg text-text-secondary">
            Please wait while we confirm your payment and prepare your custom Preventative Maintenance and Cleaning Schedule.
          </p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="container-custom min-h-screen flex flex-col items-center justify-center py-16">
        <div className="max-w-2xl text-center">
          <div className="text-6xl mb-8">⚠️</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-red-500 mb-6">
            Order Processing Error
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            {error}
          </p>
          <Link
            href="/"
            className="inline-block bg-accent-orange text-black font-bold py-4 px-8 rounded-md uppercase tracking-wider hover:bg-accent-orange-hover transition-colors"
          >
            Return Home
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="container-custom min-h-screen flex flex-col items-center justify-center py-16">
      <div className="max-w-2xl text-center">
        <div className="text-6xl mb-8">✅</div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-accent-green mb-6">
          Payment Successful!
        </h1>
        <p className="text-lg text-text-secondary mb-8 leading-relaxed">
          Thank you for your order. We've received your machine profile and payment confirmation.
        </p>

        <div className="bg-dark-surface border border-dark-border rounded-lg p-8 mb-8 text-left">
          <h2 className="text-2xl font-bold text-text-primary mb-4">What Happens Next?</h2>
          <ul className="space-y-4 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-accent-orange text-xl">1.</span>
              <span>Your custom Preventative Maintenance and Cleaning Schedule is being generated now. To ensure precision based on your exact water chemistry and usage profile, <strong>check your inbox within 4 hours</strong>.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent-orange text-xl">2.</span>
              <span>You'll receive your personalized .ics calendar file cross-referenced against La Marzocco factory specifications.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent-orange text-xl">3.</span>
              <span>Simply import the .ics file to Google Calendar, Apple Calendar, or Outlook for automatic reminders.</span>
            </li>
          </ul>
        </div>

        <div className="bg-dark-surface border-l-4 border-accent-orange rounded-lg p-6 mb-8">
          <p className="text-text-primary">
            <strong>Need help?</strong> Reply to your confirmation email and we'll assist you.
          </p>
        </div>

        <Link
          href="/"
          className="inline-block bg-dark-surface text-text-primary border border-dark-border font-bold py-4 px-8 rounded-md uppercase tracking-wider hover:border-accent-orange transition-colors"
        >
          Return Home
        </Link>
      </div>
    </section>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <section className="container-custom min-h-screen flex flex-col items-center justify-center py-16">
        <div className="max-w-2xl text-center">
          <div className="animate-pulse mb-8">
            <div className="w-16 h-16 bg-accent-orange rounded-full mx-auto mb-4"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-6">
            Loading...
          </h1>
        </div>
      </section>
    }>
      <SuccessContent />
    </Suspense>
  )
}
