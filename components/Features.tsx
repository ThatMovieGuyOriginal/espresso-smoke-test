export default function Features() {
  const features = [
    {
      title: "LSI Calculation (Langelier Saturation Index)",
      description: "We calculate your exact water chemistry to predict scale and corrosion risk. No guessing.",
      icon: "📊",
    },
    {
      title: "Custom Mineralization Recipe",
      description: "Exact grams of Potassium Bicarbonate + Epsom Salt per gallon. Specific to your water and machine.",
      icon: "⚗️",
    },
    {
      title: "La Marzocco Factory-Aligned",
      description: "Verified against La Marzocco's official Water Chemistry Guidelines. Your warranty stays protected.",
      icon: "✅",
    },
    {
      title: "Resale Certificate",
      description: "A dated digital log proving your machine ran on compliant water chemistry. Increases resale value.",
      icon: "📜",
    },
  ]

  return (
    <section className="container-custom py-20 md:py-32 border-t border-dark-border bg-gray-50">
      <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 text-center">
        Certified Water Audit. Science-Based Recipe.
      </h2>
      <p className="text-lg text-gray-700 text-center mb-12 max-w-2xl mx-auto">
        We don't give you generic advice. We calculate your specific LSI number and prescribe the exact mineral recipe your machine needs.
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
