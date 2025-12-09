export default function Authority() {
  return (
    <section className="container-custom py-20 md:py-32 border-t border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Technical Credibility Badge */}
        <div className="bg-gray-50 border-l-4 border-black rounded-lg p-8 md:p-12 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="text-4xl">🧪</div>
            <div>
              <h3 className="text-2xl font-bold text-black mb-3">
                Certified Water Chemistry Analysis
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                We calculate your <strong>Langelier Saturation Index (LSI)</strong> using the exact same methodology 
                that La Marzocco uses in their Water Chemistry Guidelines. Our analysis is cross-referenced against 
                factory specifications to ensure your custom recipe protects your machine.
              </p>
            </div>
          </div>

          {/* Source Documents */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <p className="text-sm text-gray-700 mb-4 font-semibold uppercase tracking-wide">
              Verified Against Official La Marzocco Documentation:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-black font-bold">✓</span>
                <span>La Marzocco Water Chemistry Guidelines — Official LSI calculation methodology</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black font-bold">✓</span>
                <span>Machine Installation Manuals (Linea Mini, Micra, GS3, Slayer) — Factory specifications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black font-bold">✓</span>
                <span>Mineral Water Compatibility Standards — Warranty-protected water parameters</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Authority Quote */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 md:p-10">
          <p className="text-xl md:text-2xl italic text-black mb-4 leading-relaxed">
            "Water chemistry is not a guess. It's not a trial. It's a calculation. 
            Know your LSI. Protect your machine. Extend your warranty."
          </p>
          <p className="text-gray-700">
            — La Marzocco Technical Standards
          </p>
        </div>
      </div>
    </section>
  )
}
