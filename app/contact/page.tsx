import Link from 'next/link'

export default function Contact() {
  return (
    <section className="container-custom py-16 md:py-24 bg-white min-h-screen">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-[#111111] mb-6">
          Get in Touch
        </h1>
        <p className="text-lg text-[#4B5563] mb-12 leading-relaxed">
          Have questions about your water audit results, custom recipe, or need support? 
          We are here to help.
        </p>

        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[4px] p-12 space-y-8 text-left">
          <div>
            <h2 className="text-2xl font-bold text-[#111111] mb-4">Email Support</h2>
            <a
              href="mailto:support@espressoschedules.com"
              className="text-2xl text-[#111111] font-bold hover:underline transition-colors"
            >
              support@espressoschedules.com
            </a>
            <p className="text-[#4B5563] mt-2">
              We typically respond within 24 hours during business days.
            </p>
          </div>

          <div className="border-t border-[#E5E7EB] pt-8">
            <h2 className="text-2xl font-bold text-[#111111] mb-4">Response Times</h2>
            <ul className="text-[#4B5563] space-y-2 max-w-md">
              <li><span className="text-[#0F766E] font-semibold">✓</span> Audit Delivery: {'<'} 12 Hours (Priority)</li>
              <li><span className="text-[#0F766E] font-semibold">✓</span> Recipe Questions: 24 Hours</li>
              <li><span className="text-[#0F766E] font-semibold">✓</span> Refund Requests: 48 Hours</li>
            </ul>
          </div>

          <div className="border-t border-[#E5E7EB] pt-8">
            <h2 className="text-2xl font-bold text-[#111111] mb-4">What We Help With</h2>
            <ul className="text-[#4B5563] space-y-2 max-w-md">
              <li><span className="text-[#0F766E] font-semibold">✓</span> Interpreting your LSI calculation.</li>
              <li><span className="text-[#0F766E] font-semibold">✓</span> Sourcing the correct minerals (Potassium Bicarbonate / Epsom).</li>
              <li><span className="text-[#0F766E] font-semibold">✓</span> Machine-specific warranty concerns (Linea Mini, GS3, Slayer).</li>
            </ul>
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
