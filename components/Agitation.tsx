'use client'

import Image from 'next/image'

export default function Agitation() {
  return (
    <section className="container-custom py-20 md:py-32 border-t border-dark-border">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-6">
          Your Manual is Guessing.
        </h2>
        <p className="text-lg text-text-secondary mb-12">
          La Marzocco builds incredible machines, but their manual assumes 'standard' usage. 
          It doesn't account for:
        </p>

        <div className="space-y-6 mb-12">
          <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
            <h3 className="font-bold text-text-primary mb-2">
              1. Your Water Hardness
            </h3>
            <p className="text-text-secondary">
              50ppm vs 150ppm dramatically changes your descaling needs.
            </p>
          </div>

          <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
            <h3 className="font-bold text-text-primary mb-2">
              2. Your Workflow
            </h3>
            <p className="text-text-secondary">
              Pulling 2 shots a day vs. 10 shots a day shifts your gasket replacement window by months.
            </p>
          </div>

          <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
            <h3 className="font-bold text-text-primary mb-2">
              3. The "Silent" Failures
            </h3>
            <p className="text-text-secondary">
              Vacuum breakers fail slowly. By the time you hear the hiss, moisture is damaging your logic board.
            </p>
          </div>
        </div>

        {/* Visual: Broken Heater Coil */}
        <div className="mb-12 flex justify-center">
          <Image
            src="/broken-heater-coil.png"
            alt="Corroded and broken heater coil showing scale buildup damage"
            width={400}
            height={300}
            className="rounded-lg shadow-xl border border-dark-border"
          />
        </div>

        <div className="bg-dark-surface border-l-4 border-accent-orange rounded-lg p-8">
          <p className="text-xl text-text-primary">
            Result: A <span className="text-red-500 font-bold">$1,200 service bill</span> and 6 weeks without coffee.
          </p>
        </div>
      </div>
    </section>
  )
}
