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
              Espresso Schedules Water Lab (The Service) provides certified water chemistry analysis (LSI calculation) and custom mineralization recipes 
              for high-end espresso machines (La Marzocco, Slayer, etc.). By purchasing, you agree to these Terms of Service.
            </p>
            <p className="mt-3">
              <strong>We are an independent consultancy and are not affiliated with La Marzocco, Slayer, or their parent companies.</strong>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-black mb-4">2. Accuracy & Methodology</h2>
            <p className="mb-4">
              Our analysis is based strictly on the Official Manufacturer Water Specifications (e.g., La Marzocco Water Calculator V3, Slayer Water Guide). 
              We guarantee that our prescribed recipes fall within the published "Safe Zone" for LSI (-0.3 to +0.3) and Total Dissolved Solids.
            </p>
            <p>
              <strong>Limitation:</strong> We cannot account for user error in mixing, uncalibrated scales, or changes in your source water supply.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-black mb-4">3. Limitation of Liability</h2>
            <p>
              While our recipes are calculated to meet manufacturer specifications for warranty compliance, Espresso Schedules Water Lab is not responsible 
              for hardware failure, existing scale buildup, or warranty claims denied by the manufacturer for reasons unrelated to water chemistry 
              (e.g., misuse, electrical surges).
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-black mb-4">4. Data Accuracy</h2>
            <p>
              Our analysis is only as accurate as the data you provide. If your local water source changes (e.g., seasonal municipal flush), 
              your recipe requires recalibration. We recommend re-testing annually.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-black mb-4">5. Refund Policy</h2>
            <p>
              We offer a 30-day money-back guarantee. If our analysis cannot provide a safe, specification-compliant recipe for your water source 
              (e.g., your tap water is too toxic to fix), we will issue a full refund.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-black mb-4">6. Intellectual Property</h2>
            <p>
              Your custom water recipe and LSI report are for personal use only. Redistribution or commercial resale of our proprietary calculation method is prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-black mb-4">7. Contact</h2>
            <p>
              For questions about these terms, email:{' '}
              <a href="mailto:support@espressoschedules.com" className="font-bold text-black hover:underline">
                support@espressoschedules.com
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
