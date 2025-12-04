# PROJECT MUSE: Espresso Maintenance Validation ("Smoke Test")
**Version:** 2.0.0 (Enhanced with Granular Specifications)
**Objective:** Validate willingness-to-pay for a custom maintenance schedule SaaS using a "Fake Door" MVP.
**Niche:** High-End Espresso Machines (La Marzocco Linea Mini).
**Deployment:** GitHub → Vercel (Free Tier) with Custom Domain.

---
## Progress Summary (Updated)
- Phase 1 (Local Setup): Completed ✅
- Phase 2 (GitHub & Vercel): Completed ✅ (repository pushed, Vercel linked, initial deploy created)
- Phase 3 (Supabase Provisioning): Pending — requires Supabase project creation and environment variables to be added in Vercel
- Next action: Provision Supabase, run `supabase/create_waitlist_table.sql`, then add environment variables to Vercel (see Section 6.3)


## 1. TECH STACK & DEPLOYMENT

### 1.1 Core Framework & Build Requirements
* **Framework:** Next.js 14.0+ (App Router, not Pages Router)
* **Node Version:** Node.js 18.17+ or 20+ (Vercel requirement)
* **Package Manager:** npm 9+ or yarn 4+ (pnpm optional)
* **Styling:** Tailwind CSS 3.3+
* **TypeScript:** 5.1+ (optional but recommended for error detection)
* **Deployment Platform:** Vercel (Free Tier - Hobby Plan)
* **Version Control:** GitHub (public or private repo)

### 1.2 Repository Setup (GitHub)
* **Repository Name:** `espresso-smoke-test` (descriptive, lowercase, hyphens)
* **Repository Type:** Public (for Vercel free tier simplicity)
* **Production Branch:** `main` (Vercel auto-deploys on push to `main`)
* **Preview Branches:** All non-`main` branches auto-get preview URLs
* **Initial Files to Gitignore:**
  ```
  node_modules/
  .next/
  .env.local
  .env.*.local
  .DS_Store
  *.pem
  .vercel/
  .turbo/
  ```

### 1.3 Vercel GitHub Integration
* **Connection:** Link GitHub account → Vercel Dashboard → Import Project
* **Auto-Detection:** Vercel auto-detects Next.js framework
* **Build Command:** `npm run build` (auto-configured, maps to `next build`)
* **Output Directory:** `.next` (auto-configured)
* **Environment Variables:** Configure in Vercel Dashboard (Settings → Environment Variables)
  * **Production variables** (tag: `Production`) - used for main branch
  * **Preview variables** (tag: `Preview`) - used for all preview deployments
  * **Development variables** - pull locally via `vercel env pull` → `.env.local`

### 1.4 Domain Configuration
* **Custom Domain Required:** Do NOT use `.vercel.app` subdomain (damages brand trust)
* **Domain Provider:** Namecheap, GoDaddy, or similar (not required to match registrar)
* **DNS Setup - Option A (Nameservers - Simplest):**
  1. In Vercel: Project Settings → Domains → Add Domain → `espressoschedules.com`
  2. Copy Vercel nameservers (e.g., `ns1.vercel-dns-017.com`)
  3. In domain registrar: Point nameservers to Vercel's nameservers
  4. Wait 24-48 hours for propagation
* **DNS Setup - Option B (A/CNAME Records - If keeping current registrar):**
  1. Apex domain (`espressoschedules.com`): Create **A record** → `76.76.19.0`
  2. WWW subdomain (`www.espressoschedules.com`): Create **CNAME record** → auto-generated Vercel DNS
  3. Propagate immediately after record creation
* **SSL/HTTPS:** Automatic with Vercel (free, auto-renews)
* **Redirect http → https:** Auto-configured by Vercel

### 1.5 Vercel Free Tier Quotas & Limits
| Feature | Limit |
|---------|-------|
| Deployments | Unlimited |
| Custom Domains | 50 per project |
| Bandwidth | 100 GB/month (scales with usage) |
| Serverless Function Invocations | 1M/month |
| Edge Function Requests | 1M/month |
| Build Runtime | 45 minutes per build |
| Concurrent Builds | 1 (upgrade to Pro for more) |
| Preview Deployments | Unlimited (kept for 7 days) |
| Analytics Events | Up to 1M tracked events/month |

### 1.6 Analytics Configuration
* **Vercel Web Analytics (First-Party):**
  * Location: Project → Analytics tab
  * Enable: Click "Enable Web Analytics"
  * Package: `@vercel/analytics` (npm install)
  * Implementation: Add `<Analytics />` component to `app/layout.tsx`
  * Free Tier Limit: 1M tracked events/month
  * Data Retention: 90 days on free tier
* **Custom Event Tracking (Button Clicks):**
  * Use `track()` function from `@vercel/analytics/react`
  * Track in client component with `'use client'` directive
  * Event names: snake_case (e.g., `schedule_generation_clicked`)
  * Include metadata: `{ location: 'hero_section', timestamp: new Date().toISOString() }`

---

## 2. PROJECT STRUCTURE & CONFIGURATION FILES

### 2.1 Directory Structure (Atomic)
```
espresso-smoke-test/
├── app/
│   ├── layout.tsx                    # Root layout (wraps all pages)
│   ├── page.tsx                      # Landing page (/)
│   ├── waitlist/
│   │   └── page.tsx                  # Waitlist page (/waitlist)
│   ├── api/
│   │   ├── waitlist/
│   │   │   └── route.ts              # POST endpoint for email signup
│   │   └── track/
│   │       └── route.ts              # POST endpoint for analytics (optional)
│   ├── globals.css                   # Tailwind imports & global styles
│   └── metadata.ts                   # Shared metadata config
├── components/
│   ├── Hero.tsx                      # Hero section (Section A)
│   ├── Agitation.tsx                 # Pain section (Section B)
│   ├── Features.tsx                  # Features grid (Section C)
│   ├── Authority.tsx                 # Blockquote (Section D)
│   ├── CloseSection.tsx              # Pricing/CTA section (Section E)
│   ├── Button.tsx                    # Reusable button component
│   ├── WaitlistForm.tsx              # Email signup form
│   └── Analytics.tsx                 # Vercel Analytics wrapper
├── lib/
│   ├── supabase.ts                   # Supabase client initialization
│   ├── email-validation.ts           # Email validation utility
│   └── constants.ts                  # Design tokens & copy constants
├── public/
│   ├── favicon.ico                   # Browser tab icon (32x32 min)
│   ├── linea-mini-hero.png           # High-res La Marzocco image
│   └── og-image.jpg                  # Open Graph meta image (1200x630)
├── .env.example                      # Environment variable template (no values)
├── .gitignore                        # Git exclusions
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── postcss.config.mjs                # PostCSS configuration (for Tailwind)
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies & scripts
├── package-lock.json                 # Dependency lock file
├── README.md                         # Project documentation
└── vercel.json                       # Vercel build configuration (optional)
```

### 2.2 package.json Structure (Atomic)
```json
{
  "name": "espresso-smoke-test",
  "version": "1.0.0",
  "description": "Validate willingness-to-pay for custom maintenance SaaS",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "engines": {
    "node": "^18.17 || ^20"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@vercel/analytics": "^1.4.0",
    "@supabase/supabase-js": "^2.43.0"
  },
  "devDependencies": {
    "typescript": "^5.1.0",
    "@types/react": "^18.2.0",
    "@types/node": "^20.0.0",
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```
**Installation Command:** `npm install`

### 2.3 next.config.ts (Atomic)
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: false, // Enable image optimization
  },
  // Vercel auto-detects and configures:
  // - Build command: next build
  // - Output directory: .next
  // - Framework: nextjs
}

export default nextConfig
```

### 2.4 tailwind.config.ts (Atomic - Dark Luxury Theme)
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#111111',        // Soft black background
        'dark-surface': '#1A1A1A',   // Dark grey surfaces
        'dark-border': '#333333',    // Subtle borders
        'accent-orange': '#FF9900',  // Safety orange (CTAs)
        'accent-orange-hover': '#E68A00',
        'accent-green': '#2ECC71',   // Signal green (waitlist)
        'text-primary': '#F3F4F6',   // Off-white headings
        'text-secondary': '#9CA3AF', // Grey-400 body text
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Roboto', 'sans-serif'],
      },
      letterSpacing: {
        'tight-heading': '-0.02em',
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Enable dark mode support
}

export default config
```

### 2.5 postcss.config.mjs (Atomic)
```javascript
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

export default config
```

### 2.6 app/globals.css (Atomic - Font Imports & Global Styles)
```css
@import "tailwindcss";

/* Import fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&family=Roboto:wght@400;700;800&display=swap');

/* Custom utilities */
@layer utilities {
  .container-custom {
    @apply max-w-6xl mx-auto px-4 sm:px-6 lg:px-8;
  }
  
  .text-heading {
    @apply font-heading font-extrabold tracking-tight-heading;
  }
  
  .text-body {
    @apply font-sans font-normal leading-relaxed;
  }
  
  .btn-cta {
    @apply bg-accent-orange text-black font-bold py-4 px-8 rounded-md uppercase tracking-wider transition-transform duration-200 hover:scale-105 active:scale-95;
  }
  
  .btn-waitlist {
    @apply bg-accent-green text-white font-bold py-3 px-6 rounded-md transition-opacity duration-200 hover:opacity-90 active:opacity-80;
  }
}

/* Base styles */
body {
  @apply bg-dark-bg text-text-primary;
}

input, textarea {
  @apply bg-dark-surface border border-dark-border text-text-primary placeholder-text-secondary rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-orange;
}
```

### 2.7 .env.example (Atomic - No Actual Values)
```
# Supabase Configuration (Add in Vercel Dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Analytics (Optional - Vercel Analytics is automatic)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your-analytics-id

# Custom Domain
NEXT_PUBLIC_DOMAIN=espressoschedules.com
```

### 2.8 tsconfig.json (Atomic - With Path Aliases)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### 2.9 .gitignore (Atomic - Complete)
```
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Debug
.pnpm-debug.log*

# Local env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# IDE
.vscode
.idea
*.swp
*.swo
*~

# OS
Thumbs.db
```

---

## 3. DESIGN SYSTEM ("Dark Luxury")
* **Aesthetic:** Industrial, High-End, Precision. Think "Porsche Configurator" or "Apple Pro."
* **Background:** `#111111` (Soft Black) - *Avoid pure #000000 to reduce eye strain.*
* **Surface/Cards:** `#1A1A1A` (Dark Grey) with subtle border `#333333`.
* **Primary Accent (The "Urgency" Button):** `#FF9900` (Safety Orange).
    * *Hover:* `#E68A00`
    * *Text on Button:* `#000000` (Black) - **Bold**.
* **Success/Action (Waitlist Button):** `#2ECC71` (Signal Green).
* **Typography:**
    * **Headings:** `Inter` or `Roboto` (Weight: 800/ExtraBold). Tight tracking (-0.02em).
    * **Body:** `Inter` or `Open Sans` (Weight: 400/Regular). Readable line-height (1.6).
    * **Text Color:** `#F3F4F6` (Off-white) for headings, `#9CA3AF` (Grey-400) for body.

## 3. DESIGN SYSTEM ("Dark Luxury")
* **Aesthetic:** Industrial, High-End, Precision. Think "Porsche Configurator" or "Apple Pro."
* **Background:** `#111111` (Soft Black) - *Avoid pure #000000 to reduce eye strain.*
* **Surface/Cards:** `#1A1A1A` (Dark Grey) with subtle border `#333333`.
* **Primary Accent (The "Urgency" Button):** `#FF9900` (Safety Orange).
    * *Hover:* `#E68A00`
    * *Text on Button:* `#000000` (Black) - **Bold**.
* **Success/Action (Waitlist Button):** `#2ECC71` (Signal Green).
* **Typography:**
    * **Headings:** `Inter` or `Roboto` (Weight: 800/ExtraBold). Tight tracking (-0.02em).
    * **Body:** `Inter` or `Open Sans` (Weight: 400/Regular). Readable line-height (1.6).
    * **Text Color:** `#F3F4F6` (Off-white) for headings, `#9CA3AF` (Grey-400) for body.

---

## 4. COMPONENT SPECIFICATIONS & IMPLEMENTATIONS

### 4.1 app/layout.tsx (Root Layout - ATOMIC)
```typescript
import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const roboto = Roboto({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'Espresso Maintenance Schedule | Protect Your Linea Mini',
  description: 'Get a custom maintenance schedule for your La Marzocco Linea Mini based on your water chemistry and usage. Prevent costly repairs.',
  keywords: ['espresso machine', 'maintenance', 'linea mini', 'la marzocco'],
  authors: [{ name: 'Espresso Schedules' }],
  openGraph: {
    title: 'Espresso Maintenance Schedule | Protect Your Linea Mini',
    description: 'Custom maintenance schedule for your La Marzocco machine',
    url: 'https://espressoschedules.com',
    siteName: 'Espresso Schedules',
    images: [
      {
        url: 'https://espressoschedules.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'La Marzocco Linea Mini',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Espresso Maintenance Schedule | Protect Your Linea Mini',
    description: 'Custom maintenance schedule for your La Marzocco machine',
    images: ['https://espressoschedules.com/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-dark-bg text-text-primary font-sans">
        <main>
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  )
}
```

### 4.2 app/page.tsx (Landing Page - ATOMIC STRUCTURE)
```typescript
import Hero from '@/components/Hero'
import Agitation from '@/components/Agitation'
import Features from '@/components/Features'
import Authority from '@/components/Authority'
import CloseSection from '@/components/CloseSection'

export default function Home() {
  return (
    <>
      <Hero />
      <Agitation />
      <Features />
      <Authority />
      <CloseSection />
    </>
  )
}
```

### 4.3 components/Hero.tsx (ATOMIC COMPONENT)
```typescript
'use client'

import Image from 'next/image'
import { Button } from '@/components/Button'
import { track } from '@vercel/analytics/react'

export default function Hero() {
  const handleCTAClick = () => {
    track('hero_cta_clicked', {
      location: 'hero_section',
      action: 'generate_schedule',
    })
  }

  return (
    <section className="container-custom py-16 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-text-primary mb-6 leading-tight">
            Don't Let Scale{' '}
            <span className="text-red-500">Kill</span>{' '}
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
          <Image
            src="/linea-mini-hero.png"
            alt="La Marzocco Linea Mini"
            width={500}
            height={500}
            priority
            className="rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}
```

### 4.4 components/Agitation.tsx (ATOMIC COMPONENT)
```typescript
export default function Agitation() {
  return (
    <section className="container-custom py-20 md:py-32 border-t border-dark-border">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-6">
          Your Manual is Guessing.
        </h2>
        <p className="text-lg text-text-secondary mb-12">
          La Marzocco builds incredible machines, but their manual assumes 'standard' usage. 
          It doesn't account for:
        </p>

        <div className="space-y-6 mb-12">
          <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
            <h3 className="font-bold text-text-primary mb-2">
              1. Your Water Hardness
            </h3>
            <p className="text-text-secondary">
              50ppm vs 150ppm dramatically changes your descaling needs.
            </p>
          </div>

          <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
            <h3 className="font-bold text-text-primary mb-2">
              2. Your Workflow
            </h3>
            <p className="text-text-secondary">
              Pulling 2 shots a day vs. 10 shots a day shifts your gasket replacement window by months.
            </p>
          </div>

          <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
            <h3 className="font-bold text-text-primary mb-2">
              3. The "Silent" Failures
            </h3>
            <p className="text-text-secondary">
              Vacuum breakers fail slowly. By the time you hear the hiss, moisture is damaging your logic board.
            </p>
          </div>
        </div>

        <div className="bg-dark-surface border-l-4 border-accent-orange rounded-lg p-8">
          <p className="text-xl text-text-primary">
            Result: A <span className="text-red-500 font-bold">$1,200 service bill</span> and 6 weeks without coffee.
          </p>
        </div>
      </div>
    </section>
  )
}
```

### 4.5 components/Features.tsx (ATOMIC COMPONENT)
```typescript
export default function Features() {
  const features = [
    {
      title: 'Smart Calendar (.ics)',
      description: 'Auto-syncs to Google/Apple Calendar. Notifications for Backflush, Gaskets, and Testing.',
      icon: '✅',
    },
    {
      title: 'Parts Concierge',
      description: 'Direct links to the exact Part Numbers (O-rings, screens) you need. No searching.',
      icon: '✅',
    },
    {
      title: 'Resale Certificate',
      description: 'A printable log. Proven to increase resale value by up to 15%.',
      icon: '✅',
    },
    {
      title: 'Anti-Scale Calc',
      description: 'We analyze your water TDS for a definitive Descale vs. No-Descale recommendation.',
      icon: '✅',
    },
  ]

  return (
    <section className="container-custom py-20 md:py-32 border-t border-dark-border">
      <h2 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-4 text-center">
        The 'Set It and Forget It' Protection Protocol.
      </h2>
      <p className="text-lg text-text-secondary text-center mb-12 max-w-2xl mx-auto">
        We generate a <code className="bg-dark-surface px-2 py-1 rounded">JSON-backed</code> Maintenance Protocol 
        tailored to your serial number.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-dark-surface border border-dark-border rounded-lg p-6 hover:border-accent-orange transition-colors duration-200"
          >
            <h3 className="text-xl font-bold text-text-primary mb-3">
              {feature.icon} {feature.title}
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

### 4.6 components/Authority.tsx (ATOMIC COMPONENT)
```typescript
export default function Authority() {
  return (
    <section className="container-custom py-20 md:py-32 border-t border-dark-border">
      <div className="max-w-3xl mx-auto bg-dark-surface border-l-4 border-accent-orange rounded-lg p-8 md:p-12">
        <p className="text-2xl md:text-3xl italic text-text-primary mb-6 leading-relaxed">
          "The #1 cause of machine failure isn't manufacturing defects—it's neglected maintenance 
          due to confusion. A schedule is cheaper than a repair."
        </p>
        <p className="text-text-secondary">
          — Standard Industry Reliability Metric
        </p>
      </div>
    </section>
  )
}
```

### 4.7 components/CloseSection.tsx (ATOMIC COMPONENT)
```typescript
'use client'

import { Button } from '@/components/Button'
import { track } from '@vercel/analytics/react'

export default function CloseSection() {
  const handleCTAClick = () => {
    track('close_cta_clicked', {
      location: 'bottom_section',
      action: 'generate_schedule',
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
```

### 4.8 components/Button.tsx (ATOMIC REUSABLE COMPONENT)
```typescript
'use client'

import Link from 'next/link'

interface ButtonProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
}

export function Button({
  href,
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
}: ButtonProps) {
  const baseClasses = 'font-bold rounded-md uppercase tracking-wider transition-all duration-200 inline-block text-center'

  const variantClasses = {
    primary: 'bg-accent-orange text-black hover:bg-accent-orange-hover hover:scale-105 active:scale-95',
    secondary: 'bg-dark-surface text-text-primary border border-dark-border hover:border-accent-orange',
  }

  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  )
}
```

### 4.9 components/WaitlistForm.tsx (ATOMIC FORM COMPONENT)
```typescript
'use client'

import { useState } from 'react'
import { validateEmail } from '@/lib/email-validation'
import { Button } from '@/components/Button'
import { track } from '@vercel/analytics/react'

export function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateEmail(email)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    setLoading(true)
    track('waitlist_submitted', { email, location: 'waitlist_page' })

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('You are on the list. We will contact you shortly.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="bg-dark-surface border border-dark-border text-text-primary placeholder-text-secondary rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-orange"
          disabled={loading}
          required
        />
        <Button variant="secondary" size="lg" disabled={loading || status === 'success'}>
          {loading ? 'JOINING...' : 'JOIN THE WAITLIST'}
        </Button>
      </div>

      {status === 'success' && (
        <p className="text-accent-green text-center mt-4 font-semibold">
          {message}
        </p>
      )}

      {status === 'error' && (
        <p className="text-red-500 text-center mt-4 text-sm">
          {message}
        </p>
      )}
    </form>
  )
}
```

### 4.10 app/waitlist/page.tsx (Waitlist Page - ATOMIC)
```typescript
'use client'

import { WaitlistForm } from '@/components/WaitlistForm'

export default function WaitlistPage() {
  return (
    <section className="container-custom min-h-screen flex flex-col items-center justify-center py-16">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-accent-orange mb-6">
          High Demand - Batch Processing
        </h1>
        <p className="text-lg text-text-secondary mb-12 leading-relaxed">
          Due to an influx of requests from the <em>Home-Barista</em> community, we are currently 
          processing schedules in weekly batches to ensure accuracy. We have paused new instant 
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
```

### 4.11 app/api/waitlist/route.ts (Email Signup API - ATOMIC)
```typescript
import { createClient } from '@supabase/supabase-js'
import { validateEmail } from '@/lib/email-validation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Validation
    if (!email || !validateEmail(email)) {
      return Response.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          email: email.toLowerCase(),
          created_at: new Date().toISOString(),
          status: 'active',
        },
      ])
      .select()

    if (error) {
      // Handle duplicate email
      if (error.code === '23505') {
        return Response.json(
          { error: 'Email already on waitlist' },
          { status: 409 }
        )
      }
      throw error
    }

    return Response.json(
      { success: true, message: 'Added to waitlist' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Waitlist error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### 4.12 lib/email-validation.ts (ATOMIC UTILITY)
```typescript
export function validateEmail(email: string): boolean {
  // RFC 5322 simplified regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.toLowerCase())
}

export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim()
}
```

### 4.13 lib/supabase.ts (ATOMIC CLIENT INITIALIZATION)
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

---

## 5. PAGE SPECIFICATIONS

### Layout Structure
**Global Container:** Max-width `72rem` (6xl), centered.

### SECTION A: THE HERO (Split Layout)
* **Psychology:** Value Proposition + Visual Confirmation.
* **Layout:** Desktop: 50/50 Split. Mobile: Text top, Image bottom.
* **Left Column (Text):**
    * **H1 (Heading):** `text-4xl md:text-6xl font-extrabold text-white`
        * Copy: "Don’t Let Scale <span class="text-red-500">Kill</span> Your Linea Mini."
    * **Subhead:** `text-lg text-gray-400 mt-4`
        * Copy: "The generic manual is wrong because it doesn't know **your** water hardness. Get a precision maintenance schedule customized to your local water chemistry, daily shot count, and machine usage."
    * **CTA Button:** `bg-[#FF9900] text-black font-bold py-4 px-8 rounded-md uppercase tracking-wider mt-8 w-full md:w-auto hover:scale-105 transition-transform`
        * Copy: "GENERATE MY SCHEDULE - $29"
    * **Trust Badge (Under Button):** `text-xs text-gray-500 mt-2 flex items-center gap-1`
        * Copy: "🔒 100% Money-Back Guarantee"
* **Right Column (Visual):**
    * **Image:** High-res photo of La Marzocco Linea Mini on a dark countertop. Steam rising (optional).
    * **Style:** No background (transparent PNG) or seamlessly blended into the `#111111` background.

### SECTION B: THE AGITATION (Centered)
* **Psychology:** Loss Aversion. Make the user feel the pain of a potential mistake.
* **Background:** `#111111` (Seamless).
* **Content:**
    * **H2:** "Your Manual is Guessing."
    * **Body Text:** "La Marzocco builds incredible machines, but their manual assumes 'standard' usage. It doesn't account for:"
    * **Bullet Points (Styled as Cards):**
        * 1. **Your Water Hardness:** "50ppm vs 150ppm dramatically changes your descaling needs."
        * 2. **Your Workflow:** "Pulling 2 shots a day vs. 10 shots a day shifts your gasket replacement window by months."
        * 3. **The "Silent" Failures:** "Vacuum breakers fail slowly. By the time you hear the hiss, moisture is damaging your logic board."
    * **The Anchor (Big Red Text):**
        * "Result: A <span class="text-red-500 font-bold">$1,200 service bill</span> and 6 weeks without coffee."

### SECTION C: THE SOLUTION (Feature Grid)
* **Psychology:** Specificity = Authority.
* **H2:** "The 'Set It and Forget It' Protection Protocol."
* **Subhead:** "We generate a `JSON-backed` Maintenance Protocol tailored to your serial number."
* **Grid (2x2):**
    * **Card 1:** "✅ **Smart Calendar (.ics):** Auto-syncs to Google/Apple Calendar. Notifications for Backflush, Gaskets, and Testing."
    * **Card 2:** "✅ **Parts Concierge:** Direct links to the *exact* Part Numbers (O-rings, screens) you need. No searching."
    * **Card 3:** "✅ **Resale Certificate:** A printable log. Proven to increase resale value by up to 15%."
    * **Card 4:** "✅ **Anti-Scale Calc:** We analyze your water TDS for a definitive Descale vs. No-Descale recommendation."

### SECTION D: THE AUTHORITY (Blockquote)
* **Psychology:** Social Proof / Industry Standard.
* **Style:** Border-left `4px solid #FF9900`. Italic text.
* **Copy:** "The #1 cause of machine failure isn't manufacturing defects—it's neglected maintenance due to confusion. A schedule is cheaper than a repair." — *Standard Industry Reliability Metric*

### SECTION E: THE CLOSE (Sticky Footer or Bottom Section)
* **Psychology:** Price Anchoring ($5,900 vs $29).
* **H2:** "Protect Your Investment for Less Than 1lb of Beans."
* **Copy:** "Your machine cost **$5,900**. Don't let a $5 gasket ruin it."
* **Final CTA Button:** Same as Hero Button.
    * Copy: "GENERATE MY SCHEDULE NOW - $29"

---

## 4. PAGE 2: THE TRAP DOOR (`/waitlist.tsx`)
* **Trigger:** User lands here immediately after clicking ANY "Generate" button.
* **Psychology:** Scarcity (The "Velvet Rope").
* **Layout:** Centered, Single Column.
* **H1:** "High Demand - Batch Processing" (Color: `#FF9900`)
* **Body:** "Due to an influx of requests from the *Home-Barista* community, we are currently processing schedules in weekly batches to ensure accuracy. We have paused new instant downloads for **48 hours**."
* **Input Field:** Email Address (Styled: Dark grey background, white text).
* **Action Button:** Green (`#2ECC71`).
    * Copy: "JOIN THE WAITLIST"
* **Logic:** On submit -> Save email to database (Supabase/Firebase) or simple log -> Show "You are on the list. We will contact you shortly."

## 5. PAGE SPECIFICATIONS

### 5.1 Landing Page (`/page.tsx`) - ATOMIC SPECIFICATIONS
* **Route:** `/` (root)
* **File Location:** `app/page.tsx`
* **Metadata:** Auto-inherited from `app/layout.tsx`
* **Sections:** Hero → Agitation → Features → Authority → Close
* **Layout:** Mobile-first responsive (320px+), scales to 1920px+
* **Max Width Container:** `72rem` (1152px) centered with padding
* **Performance Target:** < 3 seconds to interactive (Lighthouse 90+)

**Section A - Hero:**
* Layout: 50/50 desktop, stacked mobile
* H1 Font Size: 36px (text-4xl) mobile, 48px (text-6xl) desktop
* H1 Line Height: 1.2
* Subheading: 18px, line-height 1.6, color `#9CA3AF`
* CTA Button: Full width mobile, auto desktop, hover scale 1.05
* Image: No background, 500x500px (auto-scaled responsive)
* Image Loading: `priority={true}` (render-blocking for hero)

**Section B - Agitation:**
* Content alignment: Left-aligned, max-width 48rem
* Card styling: Dark surface with subtle border, 24px padding
* Card hover: Border color transitions to accent orange
* Pain points: 3 cards in vertical stack

**Section C - Features:**
* Grid: 2x2 on desktop, 1x4 on mobile (stack vertically)
* Card hover: Border transitions to orange, subtle scale
* Gap between cards: 1.5rem
* Icon: Emoji `✅` (Unicode, no image)

**Section D - Authority:**
* Blockquote styling: Border-left 4px, accent orange
* Quote font: 24px italic, line-height 1.7
* Attribution: Gray text below quote

**Section E - Close:**
* Alignment: Center
* Spacing: Same CTA as Hero
* Subtext: "1lb of Beans" comparison
* Button: Identical to Hero (same onclick tracking)

### 5.2 Waitlist Page (`/waitlist/page.tsx`) - ATOMIC SPECIFICATIONS
* **Route:** `/waitlist`
* **File Location:** `app/waitlist/page.tsx`
* **Trigger Logic:** Clicked from any CTA button (client redirect via Next.js Link)
* **Purpose:** Fake door - collect email and show "batch processing" message
* **Layout:** Full-height centered, vertical stack
* **Background:** Same dark luxury theme

**Form Specifications:**
* Input field: Dark surface, white text, orange focus ring
* Input placeholder: Gray text
* Input validation: Client-side (email regex) + server-side (Supabase duplicate check)
* Form submission: `POST /api/waitlist` (async fetch)
* Loading state: Button text → "JOINING...", disabled
* Success state: Message: "You are on the list. We will contact you shortly." (green text)
* Error state: Message displayed in red, form remains interactive
* Email storage: Lowercase, trimmed, deduplicated (Supabase constraint)

**Messaging:**
* H1: "High Demand - Batch Processing" (orange color)
* H1 Font Size: 48px (text-5xl) mobile, 56px (text-6xl) desktop
* Body text: Explain 48-hour pause, mention "Home-Barista community"
* Card container: Dark surface with border

### 5.3 API Endpoint: POST /api/waitlist - ATOMIC SPECIFICATIONS
* **File Location:** `app/api/waitlist/route.ts`
* **Method:** POST
* **Content-Type:** `application/json`
* **Request Body:** `{ email: string }`
* **Request Validation:**
  - Email format validation (regex)
  - Email not empty
  - Email lowercase + trimmed
* **Response Success (201):** `{ success: true, message: "Added to waitlist" }`
* **Response Duplicate (409):** `{ error: "Email already on waitlist" }`
* **Response Invalid (400):** `{ error: "Invalid email address" }`
* **Response Error (500):** `{ error: "Internal server error" }`
* **Database Table:** `waitlist` (Supabase)
  - Columns: `id` (UUID), `email` (TEXT, UNIQUE), `created_at` (TIMESTAMP), `status` (TEXT)
  - Constraints: Email UNIQUE constraint for deduplication
* **Logging:** Log errors server-side (console.error for debugging)

---

## 6. DATABASE SETUP (SUPABASE) - ATOMIC SPECIFICATIONS

### 6.1 Create Supabase Project
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with email or GitHub
4. Create new project:
   - **Project Name:** `espresso-smoke-test`
   - **Database Password:** Generate strong password (save to `.env.local`)
   - **Region:** Closest to target users (US-East-1 recommended for North America)
5. Wait 2-3 minutes for project provisioning

### 6.2 Create Waitlist Table
```sql
-- Run in Supabase SQL Editor
CREATE TABLE waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'contacted', 'converted')),
  source TEXT DEFAULT 'landing_page'
);

-- Create index for faster lookups
CREATE INDEX waitlist_email_idx ON waitlist(email);
CREATE INDEX waitlist_status_idx ON waitlist(status);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert
CREATE POLICY "Allow public insert" ON waitlist
  FOR INSERT
  WITH CHECK (true);

-- Policy: Only authenticated users can read (admin)
CREATE POLICY "Allow authenticated read" ON waitlist
  FOR SELECT
  USING (auth.role() = 'authenticated');
```

### 6.3 Environment Variables (Vercel + Local)
**In Vercel Dashboard (Settings → Environment Variables):**
1. Add `NEXT_PUBLIC_SUPABASE_URL` (Public - for all environments)
   - Value: Copy from Supabase Project Settings → API → Project URL
2. Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Public - for all environments)
   - Value: Copy from Supabase Project Settings → API → anon key
3. Add `SUPABASE_SERVICE_ROLE_KEY` (Private - Production only)
   - Value: Copy from Supabase Project Settings → API → service_role key
   - Tag: Production only

**Locally (.env.local):**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxyyyzzz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

### Consent (GDPR/CAN-SPAM)
We store an explicit `consent` boolean on the `waitlist` table. The client form requires users to opt-in before joining the waitlist. If you re-run the SQL migration, ensure the `consent` column exists (the provided SQL now adds it).
```

---

## 7. DEPLOYMENT WORKFLOW - ATOMIC STEPS

### 7.1 Pre-Deployment Checklist (One-Time Setup)
- [ ] **GitHub Repository Created:** Push initial Next.js project to `main` branch
  - Command: `git init` → `git add .` → `git commit -m "Initial commit"` → `git push -u origin main`
- [ ] **Vercel Account Created:** Sign up at https://vercel.com
- [ ] **GitHub Connected to Vercel:** Vercel Dashboard → Settings → Connect Git
- [ ] **Project Imported:** Vercel Dashboard → New Project → Select `espresso-smoke-test` → Import
- [ ] **Build Settings Verified:**
  - Framework: Next.js (auto-detected)
  - Build Command: `npm run build` (auto-filled)
  - Output: `.next` (auto-filled)
  - Install Command: `npm install` (auto-filled)
- [ ] **Environment Variables Set (Vercel):**
  - `NEXT_PUBLIC_SUPABASE_URL` (Public)
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Public)
  - `SUPABASE_SERVICE_ROLE_KEY` (Production tag only)
- [ ] **Custom Domain Configured:**
  - Domain added in Vercel Project Settings → Domains
  - DNS records updated (A record + CNAME or nameservers)
  - SSL certificate provisioned (auto)
- [ ] **Supabase Project Created** with `waitlist` table
- [ ] **Analytics Enabled:** Vercel Dashboard → Project → Analytics → Enable
- [ ] **Google Ads Account Created** (separate, not required for MVP launch)

### 7.2 Deployment to Vercel (On Push to main)
1. **Local Development:**
   - Run: `npm run dev`
   - Test locally at `http://localhost:3000`
   - Verify landing page, CTA buttons, waitlist form

2. **Git Commit & Push:**
   - `git add .`
   - `git commit -m "Deploy: [feature/fix description]"`
   - `git push origin main`

3. **Vercel Auto-Deploys:**
   - Webhook triggered automatically
   - Build logs visible in Vercel Dashboard
   - Deployment URL: `https://espresso-smoke-test.vercel.app` (preview)
   - Production URL: `https://espressoschedules.com` (custom domain)
   - Wait 2-5 minutes for build completion
   - SSL/HTTPS auto-provisioned

4. **Verify Production:**
   - Open `https://espressoschedules.com`
   - Click CTA button → redirects to `/waitlist`
   - Test form submission → email saved to Supabase
   - Check Vercel Analytics dashboard for page view

5. **Monitor for Errors:**
   - Vercel Dashboard → Deployments → Latest → Logs
   - Look for build errors, failed functions
   - Check `.next/` bundle size < 2 MB

### 7.3 Pull Request Workflow (For Feature Development)
1. **Create Feature Branch:** `git checkout -b feat/new-feature`
2. **Make Changes:** Edit components, commit locally
3. **Push to Branch:** `git push origin feat/new-feature`
4. **Vercel Auto-Creates Preview URL:** `https://espresso-smoke-test-feat-new-feature.vercel.app`
5. **Test Preview URL:** Verify feature works on preview
6. **Merge to Main:** Create pull request → Merge on GitHub
7. **Vercel Re-Deploys:** Production deployment triggered
8. **Delete Branch:** `git branch -D feat/new-feature`

---

## 8. GOOGLE ADS STRATEGY - ATOMIC SPECIFICATIONS

## 8. GOOGLE ADS STRATEGY - ATOMIC SPECIFICATIONS

### 8.1 Campaign Structure (Atomic)
* **Account Name:** Espresso Schedules - Maintenance Validation
* **Campaign Name:** Linea Mini Maintenance (Test 1)
* **Campaign Type:** Search (not Display, not Shopping)
* **Network:** Google Search Only (no Search Partners, no Display Network)
* **Status:** Enabled (paused until 48 hours after launch)

### 8.2 Targeting (Atomic)
* **Geographic Targeting:**
  - Countries: USA, Canada, UK, Australia
  - Exclusions: None
  - Languages: English
* **Device Targeting:**
  - Desktop: 100%
  - Mobile: 100%
  - Tablet: 100%
  - Bid adjustments: None (equal bidding)
* **Audience Segments:**
  - Excluded: In-market for competitors (e.g., coffee shops, commercial espresso dealers)
  - Excluded: In-market for "free espresso maintenance" or "DIY repair"

### 8.3 Budget & Bidding (Atomic)
* **Daily Budget:** $25.00 (pauses campaign when reached)
* **Bidding Strategy:** Maximize Clicks (most volume for MVP validation)
* **Max CPC (Cost Per Click) Limit:** $1.50 (prevents runaway costs)
* **Monthly Budget:** ~$750/month (30 days × $25)
* **Conversion Tracking:** Not required for MVP (focus on CTR)

### 8.4 Keywords (Atomic - All Exact Match [brackets])
**Primary Keywords:**
- `[la marzocco maintenance schedule]`
- `[linea mini service intervals]`
- `[espresso machine preventive maintenance]`
- `[linea mini descaling guide]`

**Secondary Keywords (Lower priority):**
- `[linea mini maintenance]`
- `[espresso machine maintenance schedule]`
- `[la marzocco linea mini care]`

**Match Type Rationale:** Exact match only reduces irrelevant clicks, improves CTR, saves budget.

### 8.5 Negative Keywords (Atomic - Campaign Level)
**CRITICAL - Add these to prevent wasted clicks:**
- `free` (users wanting free content)
- `pdf` (users wanting free PDF)
- `download` (implies free resource)
- `manual` (already have manual)
- `diy` (do-it-yourself, won't pay)
- `repair` (not maintenance, looking for emergency fixes)
- `parts` (shopping for parts, not schedule)
- `used` (used machine sellers, not users)
- `forum` (Reddit/forum users seeking free advice)
- `youtube` (video tutorial seekers)

**Negative Keyword Match Type:** Broad match (catches variations)

### 8.6 Ad Copy (Atomic - Google Ads Format)
**Ad Group Name:** Linea Mini Schedule

**Headlines (Required: 3, Display up to 3):**
1. Linea Mini Maintenance Guide? → "Precision Schedule for Your Water"
2. Custom Schedule for Your Water → "Prevent Scale & Boiler Damage"
3. Protect Your $5,900 Investment → "JSON Maintenance Protocol"

**Descriptions (Required: 2, Display up to 2):**
1. Don't guess. Get a precision maintenance calendar based on your water hardness. Prevent costly repairs.
2. Protect your $5,900 investment. Download the custom JSON & PDF protocol now. 100% Money-Back Guarantee.

**Final URL:** `https://espressoschedules.com` (landing page, not /waitlist)
**Display URL:** `espressoschedules.com/linea-mini`

**Ad Copy Psychology:**
- Headline 1: Specificity (Linea Mini) = relevance
- Headline 2: Pain point (Scale & Boiler) = urgency
- Headline 3: Value anchor ($5,900) = loss aversion
- Description 1: Social proof (precision) + benefit
- Description 2: Action (Download) + specificity (JSON & PDF) + guarantee (trust)

### 8.7 Conversion Tracking (For Later, Not MVP)
* Conversion Action: "Schedule Generated" (waitlist form submit)
* Tracking Code: Vercel Analytics event `waitlist_submitted`
* Conversion Value: $29 (assumed sale value)
* Attribution Model: Last-click (standard for MVP)

### 8.8 Campaign Launch Timing (Atomic)
* **MVP Launch:** Deploy to `espressoschedules.com` (Day 0)
* **Soft Testing:** Pause Google Ads for first 48 hours (gather organic feedback)
* **Analytics Baseline:** Monitor Vercel Analytics (Day 1-2)
* **Campaign Start:** Enable Google Ads on Day 3 (48+ hours after launch)
* **First Metrics Check:** Day 7 (after $175 spend = ~175 clicks)
* **Campaign Duration:** 30 days minimum (cold start phase)

---

## 9. VALIDATION METRICS & SUCCESS CRITERIA - ATOMIC

### 9.1 Primary Metrics (The Scorecard)
| Metric | Calculation | Failure | Pivot | Success | Jackpot |
|--------|------------|---------|-------|---------|---------|
| **CTR (Click-Through Rate)** | Waitlist form submits / Landing page views | < 1% | 1-2% | 2-5% | > 8% |
| **Conversion Velocity** | Waitlist signups per day | < 1/day | 1-2/day | 2-5/day | > 5/day |
| **Cost Per Signup (From Ads)** | Total ad spend / waitlist signups | > $50 | $25-50 | $10-25 | < $10 |
| **Landing Page Load Time** | First Contentful Paint (FCP) | > 3s | 2-3s | 1-2s | < 1s |

### 9.2 Success Thresholds (Decision Points)
**Hard Success Criteria (Proceed to Build MVP 2.0):**
- ✅ **> 5 waitlist signups in 48 hours** = Market interest validated
- ✅ **CTR > 2%** = Copy resonates with audience
- ✅ **Zero technical errors** = Platform stable

**Soft Success Criteria (Iterate & Relaunch):**
- ⚠️ **1-5 signups in 48 hours** = Tweak copy/design, relaunch ads
- ⚠️ **CTR 1-2%** = Test different ad copy, headlines
- ⚠️ **Loading time > 2s** = Optimize images/fonts, re-deploy

**Failure Criteria (Pivot or Abandon):**
- ❌ **0 signups in 5 days** = Market doesn't exist OR targeting wrong audience
- ❌ **CTR < 0.5%** = Ad copy fundamentally misaligned
- ❌ **Platform errors (bugs, crashes)** = Fix before restarting

### 9.3 Analytics Instrumentation (Atomic)
**Vercel Analytics Automatic Tracking:**
- Page views: `/` and `/waitlist`
- Page load time (Web Vitals): LCP, CLS, FID
- Referrer source (Google Ads = `google` source)

**Custom Event Tracking (Code Implementation):**
- `hero_cta_clicked` → Hero button click (location data)
- `close_cta_clicked` → Bottom button click (location data)
- `waitlist_submitted` → Form submit success (email validation passed)
- `waitlist_error` → Form submit failure (error reason)

**Dashboard Setup:**
1. Vercel Dashboard → Analytics → View real-time page traffic
2. Google Ads Dashboard → Campaigns → View CTR, impressions, clicks
3. Supabase Dashboard → Table: waitlist → View row count

### 9.4 Monitoring & Debugging (Atomic)
**Daily Checks (48-72 hours into campaign):**
- [ ] Vercel Analytics: Any 404 errors? (means broken links)
- [ ] Vercel Deployments: Latest build status = success?
- [ ] Supabase: Waitlist table has rows? (confirms form works)
- [ ] Google Ads: Any "Limited by budget" warnings?
- [ ] Custom domain: SSL certificate valid?

**Weekly Checks:**
- [ ] CTR trending up, down, or stable?
- [ ] Cost per click increasing (ad fatigue)?
- [ ] Email validation errors (bad regex)?
- [ ] Supabase storage limits (free tier: 500 MB)?

**Red Flags to Address Immediately:**
- Landing page returning 500 error (check Vercel logs)
- Form not submitting (check `/api/waitlist` response in browser DevTools)
- Emails not saved to database (check Supabase RLS policies)
- Google Ads click through to 404 page (check final URL)

---

## 10. PERFORMANCE & SEO OPTIMIZATION - ATOMIC

### 10.1 Lighthouse Targets
**Production Performance on espressoschedules.com:**
| Metric | Target | Tool |
|--------|--------|------|
| Performance | > 90 | Vercel Analytics / Lighthouse |
| Accessibility | > 90 | Google PageSpeed Insights |
| Best Practices | > 90 | Lighthouse DevTools |
| SEO | > 90 | Google PageSpeed Insights |

**Optimization Techniques:**
- Hero image: Use `priority={true}` in `<Image>`
- Fonts: Load via `next/font/google` with `display: 'swap'`
- CSS: Tailwind JIT purges unused styles (< 15 KB gzipped)
- Lazy loading: All non-hero images load on demand

### 10.2 Image Optimization (Atomic)
**Hero Image (/linea-mini-hero.png):**
- Format: PNG or WebP
- Resolution: 1000x1000px (original), auto-scales responsive
- File size: < 200 KB (compress via TinyPNG)
- Next.js `<Image>` component with:
  - `priority={true}` (render-blocking)
  - `placeholder="blur"` (optional blur while loading)
  - Automatic AVIF/WebP conversion

**Open Graph Image (/og-image.jpg):**
- Dimensions: 1200x630px (standard OG size)
- File size: < 100 KB
- Format: JPEG (highest compression)
- Used for social sharing, email preview

### 10.3 SEO Meta Tags (Atomic - Already in app/layout.tsx)
**Title Tag:** "Espresso Maintenance Schedule | Protect Your Linea Mini" (60 chars)
**Meta Description:** "Get a custom maintenance schedule for your La Marzocco Linea Mini based on your water chemistry and usage. Prevent costly repairs." (160 chars)
**Keywords:** espresso machine, maintenance, linea mini, la marzocco

**Open Graph Tags (For Social Sharing):**
- `og:title`, `og:description`, `og:image`, `og:url`
- Used by Facebook, LinkedIn, Twitter preview generation

**Twitter Card Tags:**
- `twitter:card: summary_large_image`
- `twitter:image`, `twitter:title`, `twitter:description`

### 10.4 Mobile Optimization (Atomic)
- Viewport meta tag: Auto-added by Next.js
- Responsive breakpoints: `sm` (640px), `md` (768px), `lg` (1024px)
- Touch target size: Buttons ≥ 44x44px
- Form inputs: Full width on mobile, max-width 400px on desktop
- Typography scaling: 36px h1 mobile → 48px desktop (proportional)

---

## 11. PRIVACY & COMPLIANCE - ATOMIC

### 11.1 Privacy Policy (Required Before Launch)
**Location:** `/privacy` or footer link
**Minimum Content:**
- What data we collect: Email address only
- How we use it: Waitlist notifications, product updates
- How long we keep it: Until user unsubscribes
- User rights: Can unsubscribe anytime (link in emails)
- Data storage: Supabase (encrypted, EU-compliant)
- No third-party sharing: We don't sell or share emails

**Template URL:** https://www.privacypolicygenerator.info (free generator)

### 11.2 Email Consent (GDPR/CASL Compliance)
**Waitlist Form Requirement:**
- [ ] Checkbox: "I agree to receive email updates about Espresso Schedules" (required to submit)
- [ ] Link to Privacy Policy in checkbox label
- [ ] Confirmation email sent after signup (double opt-in recommended for GDPR)
- [ ] Unsubscribe link in every email (required by CAN-SPAM Act)

### 11.3 Data Retention & Deletion
- Default retention: Indefinite (subscribed status active)
- Auto-delete unsubscribed emails: After 30 days (optional, not critical for MVP)
- User deletion request: Manual deletion from Supabase table (handle later)

---

## 12. QUICK START CHECKLIST - ATOMIC (ONE-TIME SETUP)

### Phase 1: Local Setup (Day 0, ~30 mins)
- [ ] Clone or create Next.js 14 project: `npx create-next-app@latest espresso-smoke-test --typescript --tailwind`
- [ ] Install analytics: `npm install @vercel/analytics`
- [ ] Install Supabase: `npm install @supabase/supabase-js`
- [ ] Create `.env.local` (leave empty for now)
- [ ] Run locally: `npm run dev` → test at `http://localhost:3000`

### Phase 2: GitHub & Vercel Setup (Day 0, ~20 mins)
- [ ] Create GitHub repo: `espresso-smoke-test`
- [ ] Push local code: `git push origin main`
- [ ] Sign up for Vercel: https://vercel.com
- [ ] Connect GitHub account to Vercel
- [ ] Import project: Select `espresso-smoke-test` repo
- [ ] Verify build succeeds (2-3 minutes)
- [ ] Deployment URL: `https://espresso-smoke-test.vercel.app` (auto-assigned)

### Phase 3: Supabase Setup (Day 0, ~15 mins)
- [ ] Create Supabase project: https://supabase.com
- [ ] Create `waitlist` table (SQL provided above)
- [ ] Copy environment variables: URL, anon key, service role key
- [ ] Add to `.env.local` (local development)
- [ ] Add to Vercel Environment Variables (production)

### Phase 4: Domain Setup (Day 0-1, ~30 mins, includes propagation)
- [ ] Purchase custom domain (Namecheap, GoDaddy, etc.)
- [ ] In Vercel: Add custom domain to project
- [ ] Update DNS records (A record or nameservers) - wait 24 hours for propagation
- [ ] Verify SSL certificate provisioned (automatic, green checkmark in Vercel)

### Phase 5: Content & Design Implementation (Day 1-2, ~4-6 hours)
- [ ] Implement Hero section component
- [ ] Implement Agitation section component
- [ ] Implement Features section component
- [ ] Implement Authority section component
- [ ] Implement Close section component
- [ ] Create Waitlist page + form component
- [ ] Create API endpoint for waitlist submissions
- [ ] Add Vercel Analytics tracking code
- [ ] Test all buttons, forms, links locally

### Phase 6: Pre-Launch Testing (Day 2, ~1 hour)
- [ ] Test landing page: All sections render correctly
- [ ] Test CTA buttons: Click → redirects to `/waitlist`
- [ ] Test waitlist form: Submit email → saves to Supabase
- [ ] Test responsive design: Mobile (375px), tablet (768px), desktop (1440px)
- [ ] Test performance: Lighthouse score > 90 all metrics
- [ ] Test SEO: Meta tags appear in page source (View Source)
- [ ] Test custom domain: HTTPS loads correctly
- [ ] Browser DevTools: No console errors

### Phase 7: Production Deployment (Day 2-3, ~30 mins)
- [ ] Final git commit: `git commit -m "Production launch"`
- [ ] Push to main: `git push origin main`
- [ ] Vercel auto-deploys (2-5 minutes)
- [ ] Verify production domain: `https://espressoschedules.com` loads
- [ ] Vercel Analytics: Enable and verify page view tracking
- [ ] Supabase: Verify table row count (should be 0 or test entries)

### Phase 8: Google Ads Setup (Day 3-4, ~45 mins, Optional for MVP but recommended)
- [ ] Create Google Ads account: https://ads.google.com
- [ ] Create Search campaign: Linea Mini Maintenance
- [ ] Add keywords (exact match): See Section 8.4
- [ ] Add negative keywords: See Section 8.5
- [ ] Set daily budget: $25/day
- [ ] Write ad copy: See Section 8.6
- [ ] Set final URL: `https://espressoschedules.com`
- [ ] **PAUSE campaign** until Day 5 (48 hours after launch)
- [ ] Review campaign in 7 days for metrics

### Phase 9: Monitor & Iterate (Day 3-30)
- [ ] Daily: Check Vercel Analytics for traffic
- [ ] Daily: Check Supabase waitlist table for new emails
- [ ] Day 7: Evaluate CTR, cost per signup, feedback
- [ ] Day 7+: Iterate on copy/design if CTR < 2%
- [ ] Day 30: Final decision on market validation
- [ ] Day 30+: If validated (> 5 signups), start building API schedule generator

---

## 13. DEBUGGING & TROUBLESHOOTING - ATOMIC

### Common Issues & Fixes
**Issue:** Landing page shows 404 error
- Fix: Check Vercel Deployments tab for build errors
- Cmd: `npm run build` locally to test
- Check: `next.config.ts` for syntax errors

**Issue:** Waitlist form not submitting
- Fix: Open browser DevTools (F12) → Network tab → Check `/api/waitlist` response
- Check: Environment variables set in Vercel?
- Check: Supabase table has RLS policies allow INSERT?

**Issue:** Emails not saving to Supabase
- Fix: Verify `SUPABASE_SERVICE_ROLE_KEY` is set in Vercel (production env)
- Check: Supabase table constraints (UNIQUE email constraint working?)
- Check: Error response from API endpoint (409 = duplicate, 400 = invalid email)

**Issue:** Analytics not tracking events
- Fix: Verify `<Analytics />` component in `app/layout.tsx`
- Check: `import { Analytics } from '@vercel/analytics/react'` present?
- Check: Custom events use correct function: `track('event_name', { metadata })`

**Issue:** Custom domain not resolving
- Fix: Wait 24 hours for DNS propagation
- Check: A record points to `76.76.19.0`? (apex) or CNAME set? (subdomain)
- Check: No other domain conflicts in Vercel or registrar

---

## 14. FINAL SIGN-OFF CHECKLIST (Before Launch)

- [ ] **Code Quality:** No console.error or console.warn in production build
- [ ] **Performance:** Lighthouse all scores > 90
- [ ] **Mobile:** Tested on real phone (not just browser emulation)
- [ ] **SEO:** Meta tags visible in page source
- [ ] **Analytics:** Vercel Analytics enabled and reporting
- [ ] **Database:** Supabase table created with correct schema
- [ ] **Environment Vars:** All secrets in Vercel (never in source code)
- [ ] **Custom Domain:** SSL certificate green/valid
- [ ] **Waitlist Form:** Successfully saves email to Supabase
- [ ] **Errors:** No 404s, 500s, or failed API calls
- [ ] **Privacy:** Privacy policy page exists (even if simple)
- [ ] **Tracking:** Google Ads keywords/negative keywords finalized (not launched yet)
- [ ] **Documentation:** This instructions.md file reviewed and followed 100%

**GO/NO-GO Decision:** All items checked ✅ = LAUNCH