"use client"

import { Button } from "@/components/Button"
import { track } from "@vercel/analytics/react"

export default function Hero() {
  const handleCTAClick = () => {
    track("hero_cta_clicked", {
      location: "hero_section",
      action: "generate_schedule",
    })
  }

  return (
    <section className="container-custom py-16 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-text-primary mb-6 leading-tight">
            Don't Let Scale{" "}
            <span className="text-red-500">Kill</span>{" "}
            Your Linea Mini.
          </h1>
          <p className="text-lg text-text-secondary mb-8 leading-relaxed">
            The generic manual is wrong because it doesn't know <strong>your</strong> water hardness. 
            Get a precision maintenance schedule customized to your local water chemistry, daily shot count, 
            and machine usage.
          </p>
          <div className="flex flex-col gap-4">
            <Button
              onClick={handleCTAClick}
              href="/waitlist"
              variant="primary"
              size="lg"
            >
              GENERATE MY SCHEDULE - $29
            </Button>
            <p className="text-xs text-text-secondary flex items-center gap-2">
              🔒 100% Money-Back Guarantee
            </p>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex justify-center">
          <div className="w-full h-96 md:h-full bg-dark-surface rounded-lg flex items-center justify-center border border-dark-border">
            <p className="text-text-secondary text-center">
              [Hero Image: La Marzocco Linea Mini placeholder]
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
