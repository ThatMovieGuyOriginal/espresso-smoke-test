import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full border-t border-dark-border bg-dark-surface text-text-secondary">
      <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">© {new Date().getFullYear()} Espresso Schedules</p>
        <nav className="text-sm flex gap-6">
          <Link href="/privacy" className="hover:text-accent-orange transition-colors">
            Privacy
          </Link>
          <Link href="/tos" className="hover:text-accent-orange transition-colors">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-accent-orange transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}
