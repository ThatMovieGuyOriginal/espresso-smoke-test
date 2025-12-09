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
        Your Water Is Either Protecting or Destroying Your Machine.
      </h2>
      <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
        There is no middle ground. Scale or corrosion. You need to know which one you're in—and exactly how to fix it.
      </p>
      <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
        For $97, we'll tell you exactly what your machine needs to stay safe.
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
