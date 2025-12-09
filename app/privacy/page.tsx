export const metadata = {
  title: 'Privacy Policy - Precision Water Audit',
  description: 'Privacy policy for Precision Water Audit. We collect minimal data to deliver your certified water analysis.',
}

import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <section className="container-custom py-20 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-[#111111] mb-4">Privacy Policy</h1>
        <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
          We protect your water chemistry data and email address. We collect only what's needed to deliver your certified LSI analysis and custom recipe.
        </p>

        <div className="space-y-8 text-[#4B5563] leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-[#111111] mb-3">What We Collect</h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Email address (for results delivery)</li>
              <li>Water hardness/TDS data (for LSI calculation)</li>
              <li>Machine type and serial number (for resale verification)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#111111] mb-3">How We Use Your Data</h2>
            <p className="mb-3">
              Your data is used exclusively to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Calculate your Langelier Saturation Index (LSI)</li>
              <li>Generate your custom water recipe</li>
              <li>Issue your Dated Resale Certificate</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#111111] mb-3">Data Security</h2>
            <p className="mb-3">
              Your data is secured with AES-256 encryption. Payment processing is handled exclusively by Stripe; we never store your credit card details. 
              We do not share, sell, or distribute your information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#111111] mb-3">Data Retention</h2>
            <p>
              We retain your audit data for 7 years to ensure your Resale Certificate remains verifiable for future buyers. 
              You can request deletion at any time.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#111111] mb-3">Contact</h2>
            <p>
              For privacy questions, email:{' '}
              <a href="mailto:support@espressoschedules.com" className="font-bold text-[#111111] hover:underline">
                support@espressoschedules.com
              </a>
            </p>
          </div>

          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[4px] p-6 mt-8">
            <p className="text-sm text-[#4B5563]">
              <strong>Last Updated:</strong> December 8, 2025
            </p>
          </div>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="inline-block text-[#111111] font-bold hover:underline transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  )
}
