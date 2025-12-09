# Image Specification & Placement Guide

## Directory Structure
All images should be placed in the `public/` directory:
```
public/
  images/
    hero/
      [image-files]
    evidence/
      [image-files]
```

## Image Requirements & Naming

### 1. HERO SECTION - Hero Shot (Landing Page Top)
**Location in Code:** `components/Hero.tsx` - Line 28 comment: `[IMAGE PLACEMENT 1: Hero shot of Linea Mini/Machine on counter]`

**File Name:** `hero-linea-mini-counter.jpg`
**Location:** `public/images/hero/hero-linea-mini-counter.jpg`
**Dimensions:** 1200px × 600px (16:9 aspect ratio for web)
**Format:** JPG (high quality, optimized for web)

**Description:** 
- Professional product photography of a Linea Mini espresso machine on a luxury countertop
- Clean, well-lit environment (kitchen/cafe setting)
- Machine should be the focal point
- Style: Minimalist luxury, warm professional lighting
- Background: Clean, neutral (white, light gray, or wood)
- Shows the machine in context of use/ownership
- **Note:** This image is referenced but not yet implemented in the component - add Image tag

**Alt Text:** "La Marzocco Linea Mini espresso machine on a professional kitchen counter"

---

### 2. VILLAIN SHOT - Calcified/Corroded Element (Traps Section)
**Location in Code:** `components/Traps.tsx` - Line 6 comment: `[IMAGE PLACEMENT 2: The "Villain" Shot - calcified/corroded heating element]`

**File Name:** `villain-calcified-heating-element.jpg`
**Location:** `public/images/evidence/villain-calcified-heating-element.jpg`
**Dimensions:** 800px × 600px (4:3 aspect ratio)
**Format:** JPG (high quality)

**Description:**
- Close-up macro photography of a calcified/corroded heating element or boiler component
- Shows real damage from hard water/poor water chemistry
- Should be visually striking but not graphic
- Professional microscopy or macro photography style
- Color should show calcium deposits (white/tan) or copper corrosion (green/blue patina)
- Purpose: Visual evidence of the problem being solved
- **Note:** This image is referenced but not yet implemented in the component - add Image tag

**Alt Text:** "Calcified heating element showing damage from untreated hard water"

---

### 3. EVIDENCE SHOT - LSI Report & Recipe Card (Features Section)
**Location in Code:** `components/Features.tsx` - Line 7 comment: `[IMAGE PLACEMENT 3: The "Evidence" Shot - Blurred LSI Report with recipe card]`

**File Name:** `evidence-lsi-report-recipe-card.jpg`
**Location:** `public/images/evidence/evidence-lsi-report-recipe-card.jpg`
**Dimensions:** 900px × 700px
**Format:** JPG (high quality)

**Description:**
- Staged product shot showing:
  - A printed LSI report (partial, with strategic blur on sensitive data)
  - A recipe card prominently displayed
  - Professional flat-lay composition
  - Style: Premium, laboratory-grade aesthetic
- Color palette: Whites, blacks, professional blues/teal accents
- The report should look official and certified
- Recipe card should be readable but report text can be blurred for privacy
- **Note:** This image is referenced but not yet implemented in the component - add Image tag

**Alt Text:** "Certified LSI water analysis report with custom mineralization recipe card"

---

## Implementation Notes

1. **Image Tags:** Use Next.js Image component for optimization:
   ```jsx
   import Image from 'next/image'
   
   <Image
     src="/images/hero/hero-linea-mini-counter.jpg"
     alt="[appropriate alt text]"
     width={1200}
     height={600}
     priority={true} // for above-the-fold hero
     quality={85}
   />
   ```

2. **Responsive Images:** Consider adding srcSet variants for mobile:
   - Mobile: 600px × 300px
   - Desktop: 1200px × 600px

3. **Optimization:** All images should be:
   - Compressed (85% quality for JPG)
   - Optimized for web (not larger than 200KB each)
   - Named in lowercase with hyphens (kebab-case)
   - Have descriptive alt text for accessibility

4. **Lazy Loading:** Use `loading="lazy"` for images below the fold

5. **Current Status:**
   - [ ] Hero shot placed and implemented
   - [ ] Villain shot placed and implemented
   - [ ] Evidence shot placed and implemented

## Brand Aesthetic Notes

All images should reflect:
- **Luxury brand positioning:** Premium quality, professional lighting
- **Technical sophistication:** Laboratory/scientific feel
- **Confidence:** Clear, focused compositions
- **Exclusivity:** High-end espresso machine ownership audience
- **No imagery of people:** Keep focus on machines, water chemistry, components
