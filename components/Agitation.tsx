'use client'

export default function Agitation() {
  return (
    <section className="container-custom py-20 md:py-32 border-t border-dark-border bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
          Most Espresso Owners Are Running Wrong Water Chemistry.
        </h2>
        <p className="text-lg text-gray-700 mb-12">
          They're either scaling up the boiler or corroding it from the inside out. And they have no idea which one.
        </p>

        <div className="space-y-6 mb-12">
          <div className="bg-white border-2 border-red-300 rounded-lg p-6">
            <h3 className="font-bold text-red-600 mb-2 text-lg">
              The Scale Disaster (Hard Water)
            </h3>
            <p className="text-gray-700">
              Tap water over 200 TDS deposits mineral buildup on heating elements, group gaskets, and diffusers. 
              It hardens into rock. Descaling chemicals can delay it but can't stop the eventual $2,000+ boiler replacement.
            </p>
          </div>

          <div className="bg-white border-2 border-orange-300 rounded-lg p-6">
            <h3 className="font-bold text-orange-600 mb-2 text-lg">
              The Corrosion Disaster (Pure Water)
            </h3>
            <p className="text-gray-700">
              RO water and distilled water (0 TDS) are chemically unstable. They leach copper and stainless steel from your boiler, 
              group head, and gaskets. The damage is silent and irreversible.
            </p>
          </div>

          <div className="bg-white border-2 border-green-300 rounded-lg p-6">
            <h3 className="font-bold text-green-600 mb-2 text-lg">
              The Solution (Balanced Water - LSI 0)
            </h3>
            <p className="text-gray-700">
              A Langelier Saturation Index of 0 (or near 0) means your water is chemically stable. It won't scale. It won't corrode. 
              Your machine stays safe and your warranty stays intact.
            </p>
          </div>
        </div>

        <div className="bg-black text-white rounded-lg p-8 mb-12">
          <p className="text-2xl font-bold mb-3">
            Here's The Problem:
          </p>
          <p className="text-lg">
            Most people don't know their water chemistry. They guessing. They buy random "espresso water" products that might not match 
            <em> their </em> specific water. Or they use tap water and hope.
          </p>
          <p className="text-lg mt-4">
            We calculate YOUR exact water parameters and prescribe the exact recipe to hit LSI 0 for YOUR {' '}
            <span className="font-bold">specific machine</span>.
          </p>
        </div>

        <p className="text-center text-gray-700 text-lg">
          That's the $97 audit. That's the certainty you need.
        </p>
      </div>
    </section>
  )
}
