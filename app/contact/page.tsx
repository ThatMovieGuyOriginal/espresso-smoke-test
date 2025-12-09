import Link from 'next/link'

export default function Contact() {
  return (
    <section className="container-custom py-16 md:py-24 bg-white min-h-screen">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-700 mb-12 leading-relaxed">
          Have questions about your water audit results, custom recipe, or need support? 
          We are here to help.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-black mb-4">Email Support</h2>
            <a
              href="mailto:support@espressoschedules.com"
              className="text-2xl text-black font-bold hover:underline transition-colors"
            >
              support@espressoschedules.com
            </a>
            <p className="text-gray-700 mt-2">
              We typically respond within 24 hours during business days.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-black mb-4">Response Times</h2>
            <ul className="text-gray-700 space-y-2 text-left max-w-md mx-auto">
              <li>✓ Audit Delivery: {'<'} 12 Hours (Priority)</li>
              <li>✓ Recipe Questions: 24 Hours</li>
              <li>✓ Refund Requests: 48 Hours</li>
            </ul>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-black mb-4">What We Help With</h2>
            <ul className="text-gray-700 space-y-2 text-left max-w-md mx-auto">
              <li>✓ Interpreting your LSI calculation.</li>
              <li>✓ Sourcing the correct minerals (Potassium Bicarbonate / Epsom).</li>
              <li>✓ Machine-specific warranty concerns (Linea Mini, GS3, Slayer).</li>
            </ul>
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
