export const metadata = {
  title: 'Privacy Policy - La Marzocco Water Audit',
  description: 'Privacy policy for La Marzocco Water Audit. We collect minimal data to deliver your certified water analysis.',
}

import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <section className="container-custom py-20 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">Privacy Policy</h1>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          We protect your water chemistry data and email address. We collect only what's needed to deliver your certified LSI analysis and custom recipe.
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-black mb-3">What We Collect</h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Email address (for order confirmation and results delivery)</li>
              <li>Water hardness/TDS data (for LSI calculation)</li>
              <li>Daily shot count (for usage recommendations)</li>
              <li>Machine type and serial number (for factory-aligned recipes)</li>
              <li>Water source information (tap, bottled, or mixed)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-black mb-3">How We Use Your Data</h2>
            <p className="mb-3">
              Your data is used exclusively to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Calculate your Langelier Saturation Index (LSI)</li>
              <li>Generate your custom water recipe</li>
              <li>Deliver your water audit report and resale certificate</li>
              <li>Provide support if you have questions about your results</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-black mb-3">Data Security & Retention</h2>
            <p className="mb-3">
              Your data is encrypted and stored in Supabase with Role-Based Access Control. We do not share, sell, or distribute your information to third parties.
            </p>
            <p>
              We retain your order data for 7 years for warranty and resale certificate purposes. You can request deletion at any time.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-black mb-3">Your Rights</h2>
            <p>
              You have the right to request access, correction, or deletion of your data at any time. Contact us at support@wateraudit.lamarzocco.com and we'll respond within 7 business days.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-black mb-3">Contact</h2>
            <p>
              For privacy questions or data requests, email:{' '}
              <a href="mailto:support@wateraudit.lamarzocco.com" className="font-bold text-black hover:underline">
                support@wateraudit.lamarzocco.com
              </a>
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
            <p className="text-sm text-gray-600">
              <strong>Last Updated:</strong> December 8, 2025
            </p>
          </div>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="inline-block text-black font-bold hover:underline transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  )
}
