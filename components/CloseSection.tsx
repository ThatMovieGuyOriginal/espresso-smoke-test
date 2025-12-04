"use client"

import { Button } from "@/components/Button"
import { track } from "@vercel/analytics/react"

export default function CloseSection() {
  const handleCTAClick = () => {
    track("close_cta_clicked", {
      location: "bottom_section",
      action: "generate_schedule",
    })
  }

  return (
    <section className="container-custom py-20 md:py-32 border-t border-dark-border text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-6">
        Protect Your Investment for Less Than 1lb of Beans.
      </h2>
      <p className="text-lg text-text-secondary mb-12 max-w-2xl mx-auto">
        Your machine cost <strong>$5,900</strong>. Don't let a $5 gasket ruin it.
      </p>
      <Button
        onClick={handleCTAClick}
        href="/waitlist"
        variant="primary"
        size="lg"
      >
        GENERATE MY SCHEDULE NOW - $29
      </Button>
    </section>
  )
}
