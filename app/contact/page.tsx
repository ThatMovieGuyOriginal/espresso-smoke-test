import Link from 'next/link'

export default function Contact() {
  return (
    <section className="container-custom py-16 md:py-24">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-text-primary mb-6">
          Get in Touch
        </h1>
        <p className="text-lg text-text-secondary mb-12 leading-relaxed">
          Have questions about your custom Preventative Maintenance and Cleaning Schedule or need support? 
          We're here to help.
        </p>

        <div className="bg-dark-surface border border-dark-border rounded-lg p-12 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Email</h2>
            <a
              href="mailto:support@espressoschedules.com"
              className="text-2xl text-accent-orange hover:text-accent-orange-hover font-bold transition-colors"
            >
              support@espressoschedules.com
            </a>
            <p className="text-text-secondary mt-2">
              We typically respond within 24 hours during business days.
            </p>
          </div>

          <div className="border-t border-dark-border pt-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Response Times</h2>
            <ul className="text-text-secondary space-y-2 text-left max-w-md mx-auto">
              <li>✓ Schedule delivery issues: 24 hours</li>
              <li>✓ Technical support: 24-48 hours</li>
              <li>✓ General inquiries: 48 hours</li>
            </ul>
          </div>

          <div className="border-t border-dark-border pt-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">What We Help With</h2>
            <ul className="text-text-secondary space-y-2 text-left max-w-md mx-auto">
              <li>✓ Schedule delivery or .ics calendar import issues</li>
              <li>✓ Questions about your Preventative Maintenance calendar</li>
              <li>✓ Technical support and troubleshooting</li>
              <li>✓ Refund requests or order issues</li>
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="inline-block text-accent-orange hover:text-accent-orange-hover transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  )
}
