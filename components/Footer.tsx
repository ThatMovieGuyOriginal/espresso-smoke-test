import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white text-gray-600">
      <div className="container-custom py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">© {new Date().getFullYear()} La Marzocco Water Audit. All rights reserved.</p>
        <nav className="text-sm flex gap-6">
          <Link href="/privacy" className="hover:text-black transition-colors">
            Privacy
          </Link>
          <Link href="/tos" className="hover:text-black transition-colors">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-black transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}
