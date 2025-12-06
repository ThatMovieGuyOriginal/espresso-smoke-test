"use client"

import { WaitlistForm } from "@/components/WaitlistForm"

export default function WaitlistPage() {
  return (
    <section className="container-custom min-h-screen flex flex-col items-center justify-center py-16">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-accent-orange mb-6">
          High Demand - Batch Processing
        </h1>
        <p className="text-lg text-text-secondary mb-12 leading-relaxed">
          Due to an influx of requests from the <em>Home-Barista</em> community, we are currently 
          processing Preventative Maintenance and Cleaning Schedules in weekly batches to ensure accuracy. We have paused new instant 
          downloads for <strong>48 hours</strong>.
        </p>
        <div className="bg-dark-surface border border-dark-border rounded-lg p-8">
          <p className="text-text-secondary mb-8">
            Join the waitlist and we'll notify you as soon as your slot opens.
          </p>
          <WaitlistForm />
        </div>
      </div>
    </section>
  )
}
