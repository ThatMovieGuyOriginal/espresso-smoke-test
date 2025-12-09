'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const [saving, setSaving] = useState(true)
  const [showDataForm, setShowDataForm] = useState(false)
  const [waterSourceChoice, setWaterSourceChoice] = useState<string>('') // Track water source selection
  const [formData, setFormData] = useState({
    waterHardness: '',
    dailyShots: '',
    serialNumber: '',
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [submittingData, setSubmittingData] = useState(false)
  const [dataSubmitSuccess, setDataSubmitSuccess] = useState(false)

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const sessionId = searchParams.get('session_id')
        
        // The order was already created in pending_payment status before redirect
        // Just show success and offer to collect machine details
        setSaving(false)
      } catch (err) {
        console.error('Error:', err)
        setSaving(false)
      }
    }

    confirmPayment()
  }, [searchParams])

  const validateMachineData = () => {
    const newErrors: Record<string, string> = {}

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

    // Serial number validation
    if (!formData.serialNumber.trim()) {
      newErrors.serialNumber = 'Serial number required'
    }

    setFormErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmitMachineData = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateMachineData()) {
      return
    }

    setSubmittingData(true)

    try {
      // Get email from URL or sessionStorage as fallback
      const email = searchParams.get('email') || sessionStorage.getItem('userEmail') || 'unknown'

      const response = await fetch('/api/orders/update-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          water_hardness_ppm: parseInt(formData.waterHardness),
          daily_shots: parseInt(formData.dailyShots),
          serial_number: formData.serialNumber,
          water_source: waterSourceChoice,
        }),
      })

      if (response.ok) {
        setDataSubmitSuccess(true)
        setShowDataForm(false)
      } else {
        setFormErrors({ submit: 'Failed to update machine details. We\'ll email you to collect this info.' })
      }
    } catch (err) {
      console.error('Error submitting machine data:', err)
      setFormErrors({ submit: 'Error updating details. We\'ll follow up via email.' })
    } finally {
      setSubmittingData(false)
    }
  }

  if (saving) {
    return (
      <section className="container-custom min-h-screen flex flex-col items-center justify-center py-16 bg-white">
        <div className="max-w-2xl text-center">
          <div className="animate-pulse mb-8">
            <div className="w-16 h-16 bg-[#E5E7EB] rounded-full mx-auto mb-4"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#111111] mb-6">
            Processing Your Order...
          </h1>
          <p className="text-lg text-[#4B5563]">
            Please wait while we confirm your payment.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="container-custom min-h-screen flex flex-col items-center justify-center py-16 bg-white">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <div className="text-6xl mb-8">✅</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#111111] mb-6">
            Payment Successful
          </h1>
          <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
            Your payment has been received. We are preparing your Certified LSI Report and custom mineralization recipe.
          </p>
        </div>

        {!showDataForm && !dataSubmitSuccess && (
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[4px] p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#111111] mb-6">Complete Your Profile (Optional)</h2>
            <p className="text-[#4B5563] mb-6">
              Provide your actual machine details to tighten the prescription. Otherwise we'll proceed with placeholders and follow up by email.
            </p>
            <p className="text-[#4B5563] text-sm mb-6 italic">
              Don't have this info handy? We'll send the report with defaults. You can update anytime.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDataForm(true)}
                className="flex-1 bg-[#000000] text-white font-bold py-3 px-6 rounded-[4px] uppercase tracking-wider hover:bg-[#333333] transition-colors"
              >
                Complete Profile Now
              </button>
              <button
                onClick={() => setShowDataForm(false)}
                className="flex-1 bg-white text-[#111111] border border-[#E5E7EB] font-bold py-3 px-6 rounded-[4px] uppercase tracking-wider hover:border-[#111111] transition-colors"
              >
                Do It Later
              </button>
            </div>
          </div>
        )}

        {showDataForm && !dataSubmitSuccess && (
          <form onSubmit={handleSubmitMachineData} className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[4px] p-8 mb-8 space-y-6">
            <h2 className="text-2xl font-bold text-[#111111] mb-6">Machine Details</h2>

            {/* Water Hardness */}
            <div>
              <label htmlFor="waterHardness" className="block text-sm font-bold text-[#111111] mb-2">
                Water Hardness (PPM/TDS) <span className="text-[#B91C1C]">*</span>
              </label>
              <input
                type="number"
                id="waterHardness"
                value={formData.waterHardness}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, waterHardness: e.target.value }))
                  if (formErrors.waterHardness) setFormErrors(prev => ({ ...prev, waterHardness: '' }))
                }}
                placeholder="e.g., 150"
                min="1"
                max="999"
                className="w-full bg-white border border-[#E5E7EB] text-[#111111] placeholder-[#9CA3AF] rounded-[4px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#111111]"
                disabled={submittingData}
                required
              />
              {formErrors.waterHardness && <p className="text-[#B91C1C] text-sm mt-1">{formErrors.waterHardness}</p>}
              <p className="text-xs text-[#4B5563] mt-1">Check your water report or use a TDS meter.</p>
            </div>

            {/* Daily Shots */}
            <div>
              <label htmlFor="dailyShots" className="block text-sm font-bold text-[#111111] mb-2">
                Daily Shots (Average) <span className="text-[#B91C1C]">*</span>
              </label>
              <input
                type="number"
                id="dailyShots"
                value={formData.dailyShots}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, dailyShots: e.target.value }))
                  if (formErrors.dailyShots) setFormErrors(prev => ({ ...prev, dailyShots: '' }))
                }}
                placeholder="e.g., 4"
                min="1"
                max="99"
                className="w-full bg-white border border-[#E5E7EB] text-[#111111] placeholder-[#9CA3AF] rounded-[4px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#111111]"
                disabled={submittingData}
                required
              />
              {formErrors.dailyShots && <p className="text-[#B91C1C] text-sm mt-1">{formErrors.dailyShots}</p>}
              <p className="text-xs text-[#4B5563] mt-1">How many shots do you pull per day on average?</p>
            </div>

            {/* Serial Number */}
            <div>
              <label htmlFor="serialNumber" className="block text-sm font-bold text-[#111111] mb-2">
                Machine Serial Number <span className="text-[#B91C1C]">*</span>
              </label>
              <input
                type="text"
                id="serialNumber"
                value={formData.serialNumber}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, serialNumber: e.target.value }))
                  if (formErrors.serialNumber) setFormErrors(prev => ({ ...prev, serialNumber: '' }))
                }}
                placeholder="e.g., LM-12345"
                className="w-full bg-white border border-[#E5E7EB] text-[#111111] placeholder-[#9CA3AF] rounded-[4px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#111111]"
                disabled={submittingData}
                required
              />
              {formErrors.serialNumber && <p className="text-[#B91C1C] text-sm mt-1">{formErrors.serialNumber}</p>}
              <p className="text-xs text-[#4B5563] mt-1">Found on the machine's serial plate.</p>
            </div>

            {formErrors.submit && <p className="text-[#B91C1C] text-sm">{formErrors.submit}</p>}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submittingData}
                className="flex-1 bg-[#000000] text-white font-bold py-3 px-6 rounded-[4px] uppercase tracking-wider hover:bg-[#333333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submittingData ? 'Saving...' : 'Save Details'}
              </button>
              <button
                type="button"
                onClick={() => setShowDataForm(false)}
                disabled={submittingData}
                className="flex-1 bg-white text-[#111111] border border-[#E5E7EB] font-bold py-3 px-6 rounded-[4px] uppercase tracking-wider hover:border-[#111111] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Skip for Now
              </button>
            </div>
          </form>
        )}

        {dataSubmitSuccess && (
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[4px] p-8 mb-8 text-center">
            <div className="text-4xl mb-4">✨</div>
            <h2 className="text-2xl font-bold text-[#0F766E] mb-4">Profile Complete</h2>
            <p className="text-[#4B5563] mb-6">
              Thanks for providing your machine details. Your Certified LSI Report and recipe will reflect your exact specifications.
            </p>
          </div>
        )}

        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[4px] p-8 mb-8 text-left">
          <h2 className="text-2xl font-bold text-[#111111] mb-4">What Happens Next?</h2>
          <ul className="space-y-4 text-[#4B5563]">
            <li className="flex items-start gap-3">
              <span className="text-[#0F766E] text-xl font-semibold">1.</span>
              <span>Your Certified LSI Report and recipe are being generated. <strong className="text-[#111111]">Check your inbox within 24 hours.</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#0F766E] text-xl font-semibold">2.</span>
              <span>You’ll receive dosing instructions (grams per gallon) and your timestamped documentation.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#0F766E] text-xl font-semibold">3.</span>
              <span>Need adjustments? Reply to the delivery email and we’ll tune the recipe for your water.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-[4px] p-6 mb-8">
          <p className="text-[#111111]">
            <strong>Need help?</strong> Reply to your confirmation email and we'll assist you right away.
          </p>
        </div>

        <Link
          href="/"
          className="inline-block bg-[#000000] text-white font-bold py-4 px-8 rounded-[4px] uppercase tracking-wider hover:bg-[#333333] transition-colors"
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
      <section className="container-custom min-h-screen flex flex-col items-center justify-center py-16 bg-white">
        <div className="max-w-2xl text-center">
          <div className="animate-pulse mb-8">
            <div className="w-16 h-16 bg-[#E5E7EB] rounded-full mx-auto mb-4"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#111111] mb-6">
            Loading...
          </h1>
        </div>
      </section>
    }>
      <SuccessContent />
    </Suspense>
  )
}
