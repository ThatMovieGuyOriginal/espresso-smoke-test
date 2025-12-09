'use client'

export default function Agitation() {
  return (
    <section className="container-custom py-20 md:py-32 border-t border-dark-border bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
          Water Chemistry Determines Machine Longevity.
        </h2>
        <p className="text-lg text-gray-700 mb-12">
          Untested water accelerates either scale accumulation or component corrosion. Both pathways lead to premature failure.
        </p>

        <div className="space-y-6 mb-12">
          <div className="bg-white border-2 border-red-300 rounded-lg p-6">
            <h3 className="font-bold text-red-600 mb-2 text-lg">
              Scale Formation (LSI {'>'} 0)
            </h3>
            <p className="text-gray-700">
              Water with total dissolved solids above 150 ppm deposits calcium carbonate on heating elements, 
              GS3 saturated groups, and Slayer needle valves. Descaling protocols provide temporary relief but cannot 
              prevent cumulative mineral deposition. Eventual boiler replacement is inevitable.
            </p>
          </div>

          <div className="bg-white border-2 border-orange-300 rounded-lg p-6">
            <h3 className="font-bold text-orange-600 mb-2 text-lg">
              Galvanic Corrosion (LSI {'<'} 0)
            </h3>
            <p className="text-gray-700">
              Demineralized water (RO, Distilled) with insufficient buffering capacity leaches 
              copper and stainless steel from La Marzocco boiler internals. This electrochemical process is irreversible and 
              asymptomatic until catastrophic failure occurs.
            </p>
          </div>

          <div className="bg-white border-2 border-green-300 rounded-lg p-6">
            <h3 className="font-bold text-green-600 mb-2 text-lg">
              Chemical Equilibrium (LSI ≈ 0)
            </h3>
            <p className="text-gray-700">
              A Langelier Saturation Index between -0.3 and +0.3 indicates chemically stable water. 
              Mineral precipitation is minimized. Corrosion rate remains within manufacturer tolerance. 
              Warranty status is preserved.
            </p>
          </div>
        </div>

        <div className="bg-black text-white rounded-lg p-8 mb-12">
          <p className="text-2xl font-bold mb-3">
            The Challenge:
          </p>
          <p className="text-lg">
            Without laboratory analysis, your water chemistry remains a variable. Commercial "espresso water" packets 
            provide generalized formulations that do not account for your specific Linea Mini or GS3 operating temperature.
          </p>
          <p className="text-lg mt-4">
            Our audit calculates your precise LSI value and prescribes a custom mineral recipe calibrated for your 
            La Marzocco or Slayer specifications.
          </p>
        </div>

        <p className="text-center text-gray-700 text-lg">
          Precision water chemistry. $97 for complete analysis and implementation protocol.
        </p>
      </div>
    </section>
  )
}
