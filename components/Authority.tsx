export default function Authority() {
  return (
    <section className="container-custom py-20 md:py-32 border-t border-dark-border">
      <div className="max-w-4xl mx-auto">
        {/* Technical Credibility Badge */}
        <div className="bg-dark-surface border-l-4 border-accent-orange rounded-lg p-8 md:p-12 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="text-4xl">📋</div>
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-3">
                Based on La Marzocco Factory Specifications
              </h3>
              <p className="text-lg text-text-secondary leading-relaxed">
                Every maintenance interval is calculated using <strong>strict adherence to La Marzocco 
                Preventative Maintenance (PM) Specifications</strong> — the same protocols technicians use 
                for commercial Linea Classic machines, now applied with precision to your Linea Mini.
              </p>
            </div>
          </div>

          {/* Source Documents */}
          <div className="border-t border-dark-border pt-6 mt-6">
            <p className="text-sm text-text-secondary mb-4 font-semibold uppercase tracking-wide">
              Cross-Referenced Against Official La Marzocco Documentation:
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-accent-orange">✓</span>
                <span>Linea Mini User Manual (V1.2) — Baseline maintenance requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-orange">✓</span>
                <span>La Marzocco Spare Parts Catalog (Linea Mini) — 100% part number accuracy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-orange">✓</span>
                <span>Preventative Maintenance Checklists (Commercial Linea) — Factory technician protocols</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Authority Quote */}
        <div className="bg-dark-surface border border-dark-border rounded-lg p-8 md:p-10">
          <p className="text-xl md:text-2xl italic text-text-primary mb-4 leading-relaxed">
            "The #1 cause of machine failure isn't manufacturing defects — it's neglected maintenance 
            due to confusion. A schedule is cheaper than a repair."
          </p>
          <p className="text-text-secondary">
            — Standard Industry Reliability Metric
          </p>
        </div>
      </div>
    </section>
  )
}
