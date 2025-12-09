import Footer from '@/components/Footer'
import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next"
import { Inter, Roboto } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const roboto = Roboto({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  title: "La Marzocco Water Audit | Certified LSI Analysis & Custom Recipe",
  description:
    "Get your Langelier Saturation Index (LSI) calculated and receive a custom water mineralization recipe for your La Marzocco machine. Prevent scale and corrosion. 24-hour turnaround.",
  keywords: ["water chemistry", "espresso water", "LSI", "la marzocco", "water audit", "linea mini", "linea micra", "gs3", "slayer"],
  authors: [{ name: "La Marzocco Water Audit" }],
  openGraph: {
    title: "La Marzocco Water Audit | LSI Calculation & Custom Recipe",
    description:
      "Certified water chemistry analysis with custom mineralization recipe for your machine. Protect your investment.",
    url: "https://wateraudit.lamarzocco.com",
    siteName: "La Marzocco Water Audit",
    images: [
      {
        url: "https://wateraudit.lamarzocco.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "La Marzocco Water Audit",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Marzocco Water Audit | LSI Analysis & Custom Recipe",
    description: "Prevent scale and corrosion with certified water chemistry analysis.",
    images: ["https://wateraudit.lamarzocco.com/og-image.jpg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-dark-bg text-text-primary font-sans">
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
