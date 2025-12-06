export default function TermsOfService() {
  return (
    <section className="container-custom py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-text-primary mb-12">
          Terms of Service
        </h1>

        <div className="space-y-8 text-text-secondary leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">1. Overview</h2>
            <p>
              Espresso Schedules provides custom Preventative Maintenance and Cleaning Schedules for La Marzocco Linea Mini espresso machines. 
              By purchasing our service, you agree to these Terms of Service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">2. Disclaimer</h2>
            <p className="mb-4">
              <strong>Our Preventative Maintenance and Cleaning Schedules are recommendations only.</strong> They are not guarantees of machine performance, 
              longevity, or functionality. The schedules are based on:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Water quality (TDS/PPM) data you provide</li>
              <li>Daily shot count estimates</li>
              <li>Official La Marzocco factory specifications and procedures</li>
            </ul>
            <p className="mt-4">
              We are <strong>not responsible</strong> for machine failures, damage, or operational issues that may occur 
              despite following our recommendations. Espresso machine maintenance is performed at your own risk.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">3. Accuracy</h2>
            <p>
              While we strive for accuracy based on La Marzocco factory specifications, maintenance schedules can vary based on factors outside our control, including 
              but not limited to: water quality fluctuations, machine age, usage intensity, and manufacturing variations. 
              Always consult your machine's Installation/Operation Manual and La Marzocco's official guidelines as the primary source of truth.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">4. Limitation of Liability</h2>
            <p>
              Espresso Schedules shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
              including but not limited to loss of profits, data, or use arising from your use of our service or reliance on our schedules.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">5. Refunds</h2>
            <p>
              Purchases are non-refundable after payment is processed. If you experience a technical issue with schedule delivery, 
              please contact us for support.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">6. Intellectual Property</h2>
            <p>
              The Preventative Maintenance and Cleaning Schedules and all associated materials are proprietary and for your personal use only. 
              Redistribution, resale, or unauthorized sharing is prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of our service constitutes acceptance of updated terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">8. Contact</h2>
            <p>
              For questions regarding these terms, please contact us at{' '}
              <a href="mailto:support@espressoschedules.com" className="text-accent-orange hover:text-accent-orange-hover">
                support@espressoschedules.com
              </a>
              .
            </p>
          </div>

          <div className="bg-dark-surface border-l-4 border-accent-orange rounded-lg p-6 mt-12">
            <p className="text-sm">
              <strong>Last Updated:</strong> December 4, 2025
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
