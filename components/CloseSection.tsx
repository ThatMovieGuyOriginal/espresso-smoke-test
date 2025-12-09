"use client"

import { Button } from "@/components/Button"
import { track } from "@vercel/analytics"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function CloseSectionContent() {
  const searchParams = useSearchParams()
  const machineType = searchParams.get('machine') || 'linea_mini'

  const handleCTAClick = () => {
    track("close_cta_clicked", {
      location: "bottom_section",
      machine_type: machineType,
    })
  }

  return (
    <section className="container-custom py-20 md:py-32 border-t border-[#E5E7EB] text-center bg-white">
      <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6">
        Water Chemistry Is Measurable. Not Debatable.
      </h2>
      <p className="text-xl text-[#4B5563] mb-8 max-w-2xl mx-auto leading-relaxed">
        Your water is either chemically stable (LSI ≈ 0) or actively degrading your equipment.
      </p>
      
      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[4px] p-8 max-w-3xl mx-auto mb-12">
        <p className="text-xl md:text-2xl italic text-[#111111] mb-4 leading-relaxed">
          "Water chemistry is not a guess. It is a calculation. LSI is the only metric that accounts for the interaction 
          between pH, alkalinity, hardness, and temperature to predict boiler longevity."
        </p>
        <p className="text-[#4B5563]">
          — Standard Engineering Protocol
        </p>
      </div>

      <div className="mb-8">
        <p className="text-lg text-[#4B5563] mb-6 max-w-2xl mx-auto">
          <strong className="text-black">The Package:</strong>
        </p>
        <div className="text-left max-w-md mx-auto mb-8 space-y-2">
          <p className="text-[#0F766E] font-semibold">✓ LSI Certified Analysis</p>
          <p className="text-[#4B5563]">✓ The Recipe Card (Distilled Base)</p>
          <p className="text-[#4B5563]">✓ Resale Certificate</p>
        </div>
      </div>

      <Button
        onClick={handleCTAClick}
        href={`/order?machine=${machineType}`}
        variant="primary"
        size="lg"
        className="bg-[#000000] text-white hover:bg-[#333333] text-lg px-8 py-4 rounded-[4px]"
      >
        REQUEST WATER AUDIT - $97
      </Button>
      <p className="text-sm text-[#4B5563] mt-4">
        Secure Payment via Stripe. 100% Satisfaction Guarantee.
      </p>
    </section>
  )
}

export default function CloseSection() {
  return (
    <Suspense fallback={<div className="container-custom py-20 md:py-32 border-t border-gray-200 text-center bg-white"></div>}>
      <CloseSectionContent />
    </Suspense>
  )
}
