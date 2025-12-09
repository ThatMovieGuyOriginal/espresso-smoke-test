'use client'

export default function Traps() {
  return (
    <section className="container-custom py-20 md:py-32 border-t border-gray-200 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* [IMAGE PLACEMENT 2: The "Villain" Shot - calcified/corroded heating element] */}
        
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-12 text-center">
          The Three Traps Every Home Barista Falls Into:
        </h2>

        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="text-red-600 font-bold text-2xl">1.</div>
            </div>
            <div>
              <h3 className="font-bold text-black text-xl mb-2">The Scale Trap</h3>
              <p className="text-gray-700 leading-relaxed">
                Hard tap water (high TDS) calcifies heating elements and clogs precision flow restrictors (gicleurs). 
                Descaling helps, but damage is cumulative.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="text-red-600 font-bold text-2xl">2.</div>
            </div>
            <div>
              <h3 className="font-bold text-black text-xl mb-2">The Corrosion Trap</h3>
              <p className="text-gray-700 leading-relaxed">
                Pure water (0 TDS) and RO water leach copper and stainless steel from the boiler. 
                Your machine slowly dissolves from the inside out.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="text-red-600 font-bold text-2xl">3.</div>
            </div>
            <div>
              <h3 className="font-bold text-black text-xl mb-2">The Flavor Gap</h3>
              <p className="text-gray-700 leading-relaxed">
                Incorrect mineralization (Magnesium, Potassium) flattens extraction. 
                If your water isn't optimized, your $6,000 machine is performing like a $500 appliance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
