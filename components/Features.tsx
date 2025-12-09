'use client'

import Image from "next/image"

export default function Features() {
  const features = [
    {
      title: "LSI Calculation",
      description: "Quantitative analysis of pH, alkalinity, calcium hardness, TDS, and temperature to predict scaling and corrosion potential with 0.01 precision.",
      icon: "■",
    },
    {
      title: "Custom Mineralization Recipe",
      description: "Precise dosing protocol (grams per gallon) for Potassium Bicarbonate and Magnesium Sulfate, calibrated to your source water and boiler metallurgy.",
      icon: "◆",
    },
    {
      title: "Manufacturer Compliant",
      description: "Cross-referenced against official La Marzocco & Slayer Water Chemistry Guidelines to ensure Warranty Compliance.",
      icon: "✓",
    },
    {
      title: "Resale Documentation",
      description: "Timestamped water chemistry report demonstrating proper maintenance protocol. Establishes provenance for future resale.",
      icon: "■",
    },
  ]

  return (
    <section className="container-custom py-20 md:py-32 border-t border-[#E5E7EB] bg-[#F9FAFB]">
      <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-4 text-center">
        Laboratory-Grade Water Analysis.
      </h2>
      <p className="text-lg text-[#4B5563] text-center mb-12 max-w-2xl mx-auto">
        Quantitative LSI calculation with machine-specific mineralization protocol. No generic recommendations.
      </p>

      <div className="mb-12">
        <Image
          src="/images/evidence/evidence-lsi-report-recipe-card.jpg"
          alt="LSI report with custom mineralization recipe card"
          width={1000}
          height={600}
          quality={85}
          className="w-full h-auto rounded-[6px] border border-[#E5E7EB] shadow-sm"
          loading="lazy"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white border border-[#E5E7EB] rounded-[4px] p-6 hover:border-[#111111] transition-colors duration-200"
          >
            <h3 className="text-xl font-bold text-[#111111] mb-3">
              {feature.icon} {feature.title}
            </h3>
            <p className="text-[#4B5563] leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
