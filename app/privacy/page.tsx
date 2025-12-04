export const metadata = {
  title: 'Privacy Policy - Espresso Schedules',
  description: 'Privacy policy for Espresso Schedules. We only collect email addresses for the waitlist and product updates.',
}

export default function PrivacyPage() {
  return (
    <section className="container-custom py-20">
      <div className="max-w-3xl mx-auto bg-dark-surface border border-dark-border rounded-lg p-8">
        <h1 className="text-3xl font-extrabold text-text-primary mb-4">Privacy Policy</h1>
        <p className="text-text-secondary mb-4">
          We collect only the data necessary to operate the waitlist: email addresses. We use emails to
          notify users about waitlist status and product updates. We do not sell or share email addresses
          with third parties. Data is stored in Supabase and retained until unsubscribed or deleted.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-6 mb-2">Your Rights</h2>
        <p className="text-text-secondary mb-4">
          You can request deletion of your email by contacting us at contact@espressoschedules.com or by
          replying to any email with the word "unsubscribe".
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-6 mb-2">Double Opt-In & Unsubscribe</h2>
        <p className="text-text-secondary mb-4">
          We use a double opt-in process: after you submit your email we will send a confirmation link
          that you must click to confirm your subscription. This prevents accidental signups.
        </p>
        <p className="text-text-secondary mb-4">
          To unsubscribe, click the unsubscribe link in any email or visit our unsubscribe endpoint and provide
          your email address. We will mark your contact as unsubscribed and stop sending notifications.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-6 mb-2">Contact</h2>
        <p className="text-text-secondary">
          For privacy requests, email: <a href="mailto:contact@espressoschedules.com" className="underline">contact@espressoschedules.com</a>
        </p>
      </div>
    </section>
  )
}
