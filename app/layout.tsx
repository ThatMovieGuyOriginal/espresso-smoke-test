import { Analytics } from "@vercel/analytics/react"
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
  title: "Espresso Maintenance Schedule | Protect Your Linea Mini",
  description:
    "Get a custom maintenance schedule for your La Marzocco Linea Mini based on your water chemistry and usage. Prevent costly repairs.",
  keywords: ["espresso machine", "maintenance", "linea mini", "la marzocco"],
  authors: [{ name: "Espresso Schedules" }],
  openGraph: {
    title: "Espresso Maintenance Schedule | Protect Your Linea Mini",
    description:
      "Custom maintenance schedule for your La Marzocco machine",
    url: "https://espressoschedules.com",
    siteName: "Espresso Schedules",
    images: [
      {
        url: "https://espressoschedules.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "La Marzocco Linea Mini",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Espresso Maintenance Schedule | Protect Your Linea Mini",
    description: "Custom maintenance schedule for your La Marzocco machine",
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
      <body className="bg-dark-bg text-text-primary font-sans">
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  )
}
