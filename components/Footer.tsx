import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-[#111111] text-[#D1D5DB] border-t border-[#111111]">
      <div className="container-custom py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm">
          <p className="font-semibold text-white mb-1">Espresso Schedules | Water Lab</p>
          <p className="text-xs text-[#6B7280]">
            Espresso Schedules Water Lab is an independent consultancy and is not affiliated with La Marzocco, Slayer, or their parent companies.
          </p>
        </div>
        <nav className="text-sm flex gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/tos" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}
