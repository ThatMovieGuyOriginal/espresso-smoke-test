export default function Features() {
  const features = [
    {
      title: "LSI Calculation (Langelier Saturation Index)",
      description: "Quantitative analysis of pH, alkalinity, calcium hardness, TDS, and temperature to predict scaling and corrosion potential.",
      icon: "📊",
    },
    {
      title: "Custom Mineralization Recipe",
      description: "Precise dosing protocol (grams per gallon) for potassium bicarbonate and magnesium sulfate, calibrated to your source water.",
      icon: "⚗️",
    },
    {
      title: "La Marzocco Factory-Aligned",
      description: "Cross-referenced against official La Marzocco Water Chemistry Guidelines to ensure warranty compliance.",
      icon: "✅",
    },
    {
      title: "Resale Documentation",
      description: "Timestamped water chemistry report demonstrating proper maintenance protocol. Enhances resale value verification.",
      icon: "📜",
    },
  ]

  return (
    <section className="container-custom py-20 md:py-32 border-t border-dark-border bg-gray-50">
      <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 text-center">
        Laboratory-Grade Water Analysis.
      </h2>
      <p className="text-lg text-gray-700 text-center mb-12 max-w-2xl mx-auto">
        Quantitative LSI calculation with machine-specific mineralization protocol. No generic recommendations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-colors duration-200"
          >
            <h3 className="text-xl font-bold text-black mb-3">
              {feature.icon} {feature.title}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
