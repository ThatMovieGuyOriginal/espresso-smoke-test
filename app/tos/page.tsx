export default function TermsOfService() {
  return (
    <section className="container-custom py-16 md:py-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-12">
          Terms of Service
        </h1>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-black mb-4">1. Service Description</h2>
            <p>
              La Marzocco Water Audit provides certified water chemistry analysis (LSI calculation) and custom mineralization recipes for La Marzocco espresso machines. 
              By purchasing, you agree to these Terms of Service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-black mb-4">2. Disclaimer of Warranties</h2>
            <p className="mb-4">
              <strong>Our water analysis and recipes are scientific recommendations based on your provided data.</strong> We do not guarantee:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Elimination of all scale or corrosion (LSI 0 is a target, not a guarantee)</li>
              <li>Improvement in espresso extraction or flavor</li>
              <li>Extended machine lifespan or warranty coverage</li>
            </ul>
            <p className="mt-4">
              Machine maintenance is performed at your own risk. We are not responsible for machine damage, failure, or operational issues.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-black mb-4">3. Data Accuracy</h2>
            <p>
              Our analysis is accurate to the data you provide. If your water chemistry changes, your recipe may no longer be valid. 
              We recommend retesting annually or if you change water sources.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-black mb-4">4. Limitation of Liability</h2>
            <p>
              La Marzocco Water Audit shall not be liable for any damages (direct, indirect, or consequential) arising from use of our analysis, recipes, or recommendations.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-black mb-4">5. Refund Policy</h2>
            <p>
              We offer a 30-day money-back guarantee if your water audit doesn't meet your expectations. 
              Contact us at support@wateraudit.lamarzocco.com with your order number.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-black mb-4">6. Intellectual Property</h2>
            <p>
              Your custom water recipe and LSI report are for personal use only. Redistribution, resale, or commercial use is prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-black mb-4">7. Warranty Disclaimer</h2>
            <p>
              We provide no warranty that using our recipes will preserve your machine's warranty with La Marzocco. 
              Consult your machine's manual and La Marzocco's water chemistry guidelines before implementing any recipe.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-black mb-4">8. Contact</h2>
            <p>
              For questions about these terms, email:{' '}
              <a href="mailto:support@wateraudit.lamarzocco.com" className="font-bold text-black hover:underline">
                support@wateraudit.lamarzocco.com
              </a>
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-12">
            <p className="text-sm text-gray-600">
              <strong>Last Updated:</strong> December 8, 2025
            </p>
          </div>
        </div>

        <div className="mt-12">
          <a
            href="/"
            className="inline-block text-black font-bold hover:underline transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </section>
  )
}
