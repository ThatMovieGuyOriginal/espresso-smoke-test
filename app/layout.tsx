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
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  title: "Espresso Water Audit | Certified LSI Analysis for La Marzocco & Slayer",
  description:
    "Laboratory-grade Langelier Saturation Index (LSI) calculation with custom mineralization recipe for La Marzocco (Mini, Micra, GS3) and Slayer machines. Prevent scale and corrosion. 24-hour turnaround.",
  keywords: ["water chemistry", "espresso water", "LSI", "la marzocco", "slayer", "water audit", "linea mini", "linea micra", "gs3", "boiler corrosion", "scale prevention"],
  authors: [{ name: "Espresso Schedules Water Lab" }],
  openGraph: {
    title: "Espresso Water Audit | LSI Calculation & Custom Recipe",
    description:
      "Certified water chemistry analysis with custom mineralization recipe. Protect your La Marzocco or Slayer investment.",
    url: "https://espressoschedules.com",
    siteName: "Espresso Schedules Water Lab",
    images: [
      {
        url: "https://espressoschedules.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Espresso Water Audit",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Espresso Water Audit | LSI Analysis & Custom Recipe",
    description: "Prevent scale and corrosion with certified water chemistry analysis.",
    images: ["https://espressoschedules.com/og-image.jpg"],
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
      <body className="bg-white text-[#111111] font-sans antialiased">
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
