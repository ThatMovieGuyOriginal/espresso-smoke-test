'use client'

import Image from "next/image"

export default function Traps() {
  return (
    <section className="container-custom py-20 md:py-32 border-t border-[#E5E7EB] bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <Image
            src="/images/evidence/villain-calcified-heating-element.jpg"
            alt="Calcified heating element showing damage from untreated hard water"
            width={800}
            height={600}
            quality={85}
            className="w-full h-auto rounded-[6px] border border-[#E5E7EB] shadow-sm"
            loading="lazy"
          />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-12 text-center">
          The Three Traps Every Home Barista Falls Into:
        </h2>

        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="text-[#B91C1C] font-bold text-2xl">1.</div>
            </div>
            <div>
              <h3 className="font-bold text-[#B91C1C] text-xl mb-2">The Scale Trap</h3>
              <p className="text-[#4B5563] leading-relaxed">
                Hard tap water (high TDS) calcifies heating elements and clogs precision flow restrictors (gicleurs). 
                Descaling helps, but damage is cumulative.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="text-[#B91C1C] font-bold text-2xl">2.</div>
            </div>
            <div>
              <h3 className="font-bold text-[#B91C1C] text-xl mb-2">The Corrosion Trap</h3>
              <p className="text-[#4B5563] leading-relaxed">
                Pure water (0 TDS) and RO water leach copper and stainless steel from the boiler. 
                Your machine slowly dissolves from the inside out.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="text-[#B91C1C] font-bold text-2xl">3.</div>
            </div>
            <div>
              <h3 className="font-bold text-[#B91C1C] text-xl mb-2">The Flavor Gap</h3>
              <p className="text-[#4B5563] leading-relaxed">
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
