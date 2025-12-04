import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full border-t border-dark-border bg-dark-surface text-text-secondary">
      <div className="container-custom py-6 flex items-center justify-between">
        <p className="text-sm">© {new Date().getFullYear()} Espresso Schedules</p>
        <nav className="text-sm">
          <Link href="/privacy" className="hover:underline">
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  )
}
