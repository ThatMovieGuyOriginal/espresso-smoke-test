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
    <section className="container-custom py-20 md:py-32 border-t border-dark-border text-center bg-white">
      <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
        Water Chemistry Is Measurable. Not Debatable.
      </h2>
      <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
        Your water is either chemically stable (LSI ≈ 0) or actively degrading your equipment. 
        Quantify your risk. Implement the solution.
      </p>
      <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
        Complete water audit with custom recipe: $97.
      </p>
      <Button
        onClick={handleCTAClick}
        href={`/order?machine=${machineType}`}
        variant="primary"
        size="lg"
        className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-4"
      >
        REQUEST WATER AUDIT - $97
      </Button>
      <p className="text-sm text-gray-600 mt-6">
        24-Hour Turnaround. Money-Back Guarantee.
      </p>
    </section>
  )
}

export default function CloseSection() {
  return (
    <Suspense fallback={<div className="container-custom py-20 md:py-32 border-t border-dark-border text-center bg-white"></div>}>
      <CloseSectionContent />
    </Suspense>
  )
}
