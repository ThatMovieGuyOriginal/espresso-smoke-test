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
                We calculate your <strong>Langelier Saturation Index (LSI)</strong> using the exact same temperature-dependent methodology 
                found in the official La Marzocco & Slayer Water Chemistry Guidelines.
              </p>
            </div>
          </div>

          {/* Source Documents */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <p className="text-sm text-gray-700 mb-4 font-semibold uppercase tracking-wide">
              Verified Against Official Manufacturer Standards:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-black font-bold">✓</span>
                <span>La Marzocco Water Chemistry Guidelines — Official LSI calculation methodology (at 93°C operating temp).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black font-bold">✓</span>
                <span>Machine Installation Manuals — Factory specifications for Linea Mini, Micra, GS3, and Slayer Single Group.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black font-bold">✓</span>
                <span>Mineral Water Compatibility Standards — Warranty-protected chloride and total hardness limits.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Authority Quote */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 md:p-10">
          <p className="text-xl md:text-2xl italic text-black mb-4 leading-relaxed">
            "Water chemistry is not a guess. It is a calculation. LSI is the only metric that accounts for the interaction 
            between pH, alkalinity, hardness, and temperature to predict boiler longevity."
          </p>
          <p className="text-gray-700">
            — Standard Engineering Protocol
          </p>
        </div>
      </div>
    </section>
  )
}
