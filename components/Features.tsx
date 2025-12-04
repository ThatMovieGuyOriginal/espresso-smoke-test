export default function Features() {
  const features = [
    {
      title: "Smart Calendar (.ics)",
      description: "Auto-syncs to Google/Apple Calendar. Notifications for Backflush, Gaskets, and Testing.",
      icon: "✅",
    },
    {
      title: "Parts Concierge",
      description: "Direct links to the exact Part Numbers (O-rings, screens) you need. No searching.",
      icon: "✅",
    },
    {
      title: "Resale Certificate",
      description: "A printable log. Proven to increase resale value by up to 15%.",
      icon: "✅",
    },
    {
      title: "Anti-Scale Calc",
      description: "We analyze your water TDS for a definitive Descale vs. No-Descale recommendation.",
      icon: "✅",
    },
  ]

  return (
    <section className="container-custom py-20 md:py-32 border-t border-dark-border">
      <h2 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-4 text-center">
        The 'Set It and Forget It' Protection Protocol.
      </h2>
      <p className="text-lg text-text-secondary text-center mb-12 max-w-2xl mx-auto">
        We generate a <code className="bg-dark-surface px-2 py-1 rounded">JSON-backed</code> Maintenance Protocol 
        tailored to your serial number.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-dark-surface border border-dark-border rounded-lg p-6 hover:border-accent-orange transition-colors duration-200"
          >
            <h3 className="text-xl font-bold text-text-primary mb-3">
              {feature.icon} {feature.title}
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
