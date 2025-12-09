'use client'

export default function Agitation() {
  return (
    <section className="container-custom py-20 md:py-32 border-t border-[#E5E7EB] bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6">
          Water Chemistry Determines Machine Longevity.
        </h2>
        <p className="text-lg text-[#4B5563] mb-12">
          Untested water accelerates either scale accumulation or component corrosion. Both pathways lead to premature failure.
        </p>

        <div className="space-y-6 mb-12">
          <div className="bg-white border border-[#B91C1C] rounded-[4px] p-6">
            <h3 className="font-bold text-[#B91C1C] mb-2 text-lg">
              Scale Formation (LSI {'>'} 0)
            </h3>
            <p className="text-[#4B5563]">
              Water with total dissolved solids above 150 ppm deposits calcium carbonate on heating elements, 
              GS3 saturated groups, and Slayer needle valves. Descaling protocols provide temporary relief but cannot 
              prevent cumulative mineral deposition. Eventual boiler replacement is inevitable.
            </p>
          </div>

          <div className="bg-white border border-[#B91C1C] rounded-[4px] p-6">
            <h3 className="font-bold text-[#B91C1C] mb-2 text-lg">
              Galvanic Corrosion (LSI {'<'} 0)
            </h3>
            <p className="text-[#4B5563]">
              Demineralized water (RO, Distilled) with insufficient buffering capacity leaches 
              copper and stainless steel from boiler internals. This electrochemical process is irreversible and 
              asymptomatic until catastrophic failure occurs.
            </p>
          </div>

          <div className="bg-white border border-[#0F766E] rounded-[4px] p-6">
            <h3 className="font-bold text-[#0F766E] mb-2 text-lg">
              Chemical Equilibrium (LSI ≈ 0)
            </h3>
            <p className="text-[#4B5563]">
              A Langelier Saturation Index between -0.3 and +0.3 indicates chemically stable water. 
              Mineral precipitation is minimized. Warranty status is preserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
