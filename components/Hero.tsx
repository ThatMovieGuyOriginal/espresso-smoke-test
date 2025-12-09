"use client"

import { Button } from "@/components/Button";
import { track } from "@vercel/analytics";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function HeroContent() {
  const searchParams = useSearchParams()
  const machineType = searchParams.get('machine') || 'linea_mini'
  
  // Machine-specific copy
  const getMachineConfig = () => {
    const configs: Record<string, any> = {
      linea_mini: {
        name: 'Linea Mini',
        warranty: 'voiding your Linea Mini warranty',
        problem: 'Heating element corrosion',
        fear: 'A boiler replacement costs $2,000+',
      },
      linea_micra: {
        name: 'Linea Micra',
        warranty: 'voiding your Linea Micra warranty',
        problem: 'Boiler scaling and corrosion',
        fear: 'You stretched your budget to buy this. Don\'t ruin it.',
      },
      gs3: {
        name: 'GS3',
        warranty: 'voiding your GS3 warranty',
        problem: 'Saturated group head calcification',
        fear: 'A seized needle valve is a $3,000+ repair nightmare.',
      },
      slayer: {
        name: 'Slayer',
        warranty: 'voiding your Slayer warranty',
        problem: 'Needle valve precision loss',
        fear: 'The precision that makes Slayer special is destroyed by scale.',
      },
    }
    return configs[machineType] || configs.linea_mini
  }

  const config = getMachineConfig()

  const handleCTAClick = () => {
    track("hero_cta_clicked", {
      location: "hero_section",
      machine_type: machineType,
    })
  }

  return (
    <section className="container-custom py-16 md:py-32 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        {/* Clinical Headline - The Fear Hook */}
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
          Is Your Water {config.warranty}?
        </h1>

        {/* Sub-headline - The Solution */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-8 leading-relaxed">
          Stop Guessing with Test Strips. We Calculate Your Exact Langelier Saturation Index (LSI) 
          and Prescribe a Custom Water Recipe Safe for {config.name}.
        </h2>

        {/* The Pain Points - Why They Need This */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mb-12">
          <h3 className="text-lg font-bold text-black mb-6">The Three Traps Every {config.name} Owner Falls Into:</h3>
          <div className="space-y-4 text-left">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="text-red-600 font-bold text-xl">1.</div>
              </div>
              <div>
                <p className="font-semibold text-black">The Scale Trap</p>
                <p className="text-gray-700">Hard tap water (high TDS) calcifies heating elements and group heads. {config.problem}.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="text-red-600 font-bold text-xl">2.</div>
              </div>
              <div>
                <p className="font-semibold text-black">The Corrosion Trap</p>
                <p className="text-gray-700">Pure water (0 TDS) and RO water leach copper and stainless steel. Your boiler slowly dissolves.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="text-red-600 font-bold text-xl">3.</div>
              </div>
              <div>
                <p className="font-semibold text-black">The Flavor Gap</p>
                <p className="text-gray-700">Incorrect mineralization (Magnesium, Potassium, Bicarbonate) flattens your extraction and mutes flavor.</p>
              </div>
            </div>
          </div>
        </div>

        {/* The Offer - What They Get */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-12">
          <h3 className="text-lg font-bold text-black mb-4">What You Get (24-Hour Turnaround):</h3>
          <ul className="space-y-3 text-left max-w-2xl mx-auto">
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-gray-700"><strong>LSI Certified Analysis:</strong> We run your water parameters through the La Marzocco Water Calculator.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-gray-700"><strong>The Recipe Card:</strong> Exact grams of Potassium Bicarbonate + Epsom Salt per gallon for your specific water.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-gray-700"><strong>Resale Certificate:</strong> A dated digital log proving your {config.name} ran on spec-compliant water.</span>
            </li>
          </ul>
        </div>

        {/* The CTA */}
        <div className="mb-8">
          <Button
            onClick={handleCTAClick}
            href={`/order?machine=${machineType}`}
            variant="primary"
            size="lg"
            className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-4"
          >
            REQUEST WATER AUDIT - $97
          </Button>
          <p className="text-sm text-gray-600 mt-3">
            24-Hour Turnaround. Certified by Industrial Mechanic.
          </p>
        </div>

        {/* Reassurance */}
        <p className="text-sm text-gray-700">
          🔒 <strong>Money-Back Guarantee:</strong> If the recipe doesn't solve your water concerns, get your $97 back. No questions asked.
        </p>
      </div>
    </section>
  )
}

export default function Hero() {
  return (
    <Suspense fallback={<div className="container-custom py-16 md:py-32 bg-white"></div>}>
      <HeroContent />
    </Suspense>
  )
}