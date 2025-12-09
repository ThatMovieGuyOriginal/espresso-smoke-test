"use client"

import { Button } from "@/components/Button";
import { track } from "@vercel/analytics";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function HeroContent() {
  const searchParams = useSearchParams()
  const machineType = searchParams.get('machine') || 'linea_mini'

  const handleCTAClick = () => {
    track("hero_cta_clicked", {
      location: "hero_section",
      machine_type: machineType,
    })
  }

  return (
    <section className="container-custom py-16 md:py-32 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        {/* [IMAGE PLACEMENT 1: Hero shot of Linea Mini/Machine on counter] */}
        
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-[#111111] mb-6 leading-tight">
          Is Your Water Voiding Your Warranty?
        </h1>

        {/* Sub-headline */}
        <h2 className="text-xl md:text-2xl text-[#4B5563] mb-12 leading-relaxed">
          Certified Langelier Saturation Index (LSI) calculation and custom mineralization recipe calibrated for La Marzocco (Mini, Micra, GS3) & Slayer specifications.
        </h2>

        {/* The Offer */}
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[4px] p-8 mb-8 text-left">
          <p className="text-sm font-semibold text-[#4B5563] uppercase tracking-wider mb-4">The Offer</p>
          
          <div className="space-y-3 text-[#4B5563]">
            <p><strong className="text-[#111111]">For:</strong> La Marzocco & Slayer Owners.</p>
            <p><strong className="text-[#111111]">Deliverable:</strong> 24-Hour Certified LSI Audit.</p>
            <p><strong className="text-[#111111]">Goal:</strong> Prevent Boiler Corrosion & Scale.</p>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="mb-4">
          <Button
            onClick={handleCTAClick}
            href={`/order?machine=${machineType}`}
            variant="primary"
            size="lg"
            className="bg-[#000000] text-white hover:bg-[#333333] text-lg px-8 py-4 rounded-[4px]"
          >
            REQUEST WATER AUDIT - $97
          </Button>
          <p className="text-sm text-[#4B5563] mt-3">
            24-Hour Turnaround. Money-Back Guarantee.
          </p>
        </div>
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
