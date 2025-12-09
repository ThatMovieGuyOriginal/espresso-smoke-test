import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white text-gray-600">
      <div className="container-custom py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm">
          <p className="font-semibold text-black mb-1">Espresso Schedules | Water Lab</p>
          <p className="text-xs text-gray-500">
            Espresso Schedules Water Lab is an independent consultancy and is not affiliated with La Marzocco, Slayer, or their parent companies.
          </p>
        </div>
        <nav className="text-sm flex gap-6">
          <Link href="/privacy" className="hover:text-black transition-colors">
            Privacy Policy
          </Link>
          <Link href="/tos" className="hover:text-black transition-colors">
            Terms of Service
          </Link>
        </nav>
      </div>
      <div className="container-custom pb-6 text-center">
        <p className="text-xs text-gray-500 mb-2">
          <strong>Contact:</strong> support@espressoschedules.com
        </p>
        <p className="text-xs text-gray-500">
          Response time: {'<'} 12 Hours (Priority Audit Delivery)
        </p>
      </div>
    </footer>
  )
}
