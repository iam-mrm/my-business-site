# Mr.M Portfolio - Complete Design Specification & Recreation Prompt

## 🎯 Executive Overview

**Project Name:** Mr.M Full-Stack Developer Portfolio

**Type:** Production-grade SSG (Static Site Generation) personal portfolio website

**Target Audience:** Tech recruiters, potential clients, design/development partners

**Philosophy:** "I don't build websites. I architect digital experiences that respect the user's time and intelligence." - Minimalist luxury Awwwards-inspired design with obsessive attention to detail.

---

## 📐 Design Theme & Aesthetic

### Color Palette (Dark Mode - Premium Approach)

**Base Colors:**
- **Primary Background:** `#0f172a` (Slate-950) - Deep midnight blue-black
- **Secondary Background:** `#1e293b` (Slate-900) - Slightly lighter slate
- **Tertiary Background:** `#334155` (Slate-700) - Medium slate for borders
- **Text Primary:** `#f1f5f9` (Slate-50) - Off-white for readability
- **Text Secondary:** `#cbd5e1` (Slate-300) - Medium gray for secondary text
- **Text Tertiary:** `#94a3b8` (Slate-400) - Light gray for muted text

**Accent Colors (Premium Gradient System):**
- **Primary Accent:** Indigo (`#4f46e5` to `#4338ca`) - Core interaction color
- **Secondary Accent:** Cyan (`#06b6d4` to `#0891b2`) - Highlight and contrast
- **Tertiary Accents:** 
  - Purple (`#a855f7`) - Alternative gradient
  - Rose (`#f43f5e`) - Warm accent option

**Gradient Overlays (Hover States):**
- Indigo gradient: `from-indigo-500/20 to-indigo-600/10`
- Cyan gradient: `from-cyan-500/20 to-cyan-600/10`
- Purple gradient: `from-purple-500/20 to-purple-600/10`
- Rose gradient: `from-rose-500/20 to-rose-600/10`

### Design Principles

1. **Minimalist Luxury:** Less is more. Every element serves a purpose.
2. **Precision Over Decoration:** Clean lines, intentional spacing, pixel-perfect alignment
3. **Performance First:** Animations are smooth (60fps), lazy-loaded, and respects user preferences
4. **Dark Mode Premium:** The dark theme elevates the brand - it's not just dark, it's sophisticated
5. **Typography as Hero:** Fonts are the primary design element, not decorative graphics
6. **Interactive Subtlety:** Hover effects are understated but satisfying
7. **Accessibility Core:** Not an afterthought - WCAG AA compliant

---

## 🔤 Typography System

### Font Stack

**Primary Font (Body Text):**
- Font: **Inter** (via Next.js font optimization)
- Weights Used: 400 (regular), 500 (medium), 600 (semibold)
- Size Range: 14px (small text) to 16px (body)
- Line Height: 1.6 for body, 1.5 for UI text
- Optimization: `display: 'swap'`, `preload: true`
- Fallback: `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

**Serif Font (Headings & Headlines):**
- Font: **Prata** (Google Fonts, loaded asynchronously)
- Weights Used: 400 (regular)
- Size Range: 32px to 96px depending on context
- Optimal Use: Hero headline, section headings, featured titles
- Display Strategy: `font-display: swap` for critical text
- Fallback: `Georgia, serif`

### Typography Scale

| Element | Size | Weight | Letter Spacing | Line Height | Font |
|---------|------|--------|-----------------|-------------|------|
| Hero Headline | 6xl-8xl (48-96px) | Light (300) | Tight (-0.02em) | 1.1 | Prata |
| Section Heading | 5xl-6xl (48-64px) | Light (300) | Tight | 1.2 | Prata |
| Subheading | 2xl (24px) | Light (300) | Tight | 1.3 | Prata |
| Body Text | 16px | Regular (400) | Normal | 1.6 | Inter |
| Small Text | 14px | Regular (400) | Normal | 1.5 | Inter |
| Micro Text | 12px | Medium (500) | Wide (0.3em) | 1.4 | Inter |
| Button Text | 16px | Medium (500) | Wide (0.05em) | 1.5 | Inter |

### Text Effects

**Hero Text Gradient:**
- Element: Main headline "I craft" and "digital precision"
- Gradient: `from-indigo-300 via-cyan-300 to-indigo-400`
- Technique: `bg-clip-text text-transparent bg-linear-to-r`
- Effect: Shimmering blue-to-cyan gradient across text

**Quote/Blockquote Styling:**
- Style: `text-xl font-light italic text-indigo-300`
- Border: Left border `border-l-2 border-indigo-500/30` with `pl-6` padding
- Effect: Elegant, emphasized testimonial feel

---

## 🎬 Animation & Interaction System

### Scroll Reveal Animation

**Trigger Mechanism:**
- IntersectionObserver API with `threshold: 0.05`
- Elements get `.reveal-on-scroll` class initially
- When 5% of element enters viewport, add `.revealed` class
- Animation fires once, then observer is disconnected (performance)

**Animation Details:**
```css
@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateY(60px);  /* Slides up from 60px below */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal-on-scroll.revealed {
  animation: slideUpFade 0.8s ease-out forwards;
}
```

**Stagger Effect:**
- Child elements animate with 0.1s increments
- `:nth-child(1)` → 0.1s delay
- `:nth-child(2)` → 0.2s delay
- `:nth-child(3)` → 0.3s delay
- `:nth-child(4)` → 0.4s delay

### Mouse Parallax (Hero Section)

**Implementation:**
- Track mouse position with `mousemove` event listener
- Use `requestAnimationFrame` for 60fps performance
- Calculate offset from screen center
- Apply 0.01 intensity multiplier (very subtle)

**Affected Elements:**
1. Hero headline - Moves with mouse at 1x intensity
2. Indigo orb (top-left) - Moves at 3x intensity for depth
3. Cyan orb (bottom-right) - Moves at -2x intensity (opposite direction)

**Code Logic:**
```javascript
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;
const distX = (clientX - centerX) * 0.01;  // 1% of distance
const distY = (clientY - centerY) * 0.01;
setHeroShift({ x: distX, y: distY });
```

### Fade-In Animations (Hero Elements)

**Element Fade-In Sequence:**
- Badge: 0.1s delay
- Headline: 0.2s delay
- Subtitle: 0.3s delay
- CTA Buttons: 0.4s delay
- Scroll Indicator: 0.5s delay

**Animation:**
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.8s ease-out forwards;
}
```

### Hover Effects

**Button Hover State:**
- Effect: Background slides in from left to right
- Speed: 300ms transition
- Visual: Subtle, polished feel
- Uses: `group-hover:` + `transition-transform` with `-translate-x-full` to `translate-x-0`

**Project Card Hover:**
1. Border color shifts: `border-slate-800` → `border-indigo-500/40`
2. Gradient overlay appears: Opacity 0 → 100% (400ms)
3. Image scales: 1 → 1.1x (700ms - slower for cinematic feel)
4. Box shadow appears: `hover:shadow-2xl hover:shadow-indigo-900/20`
5. Background may darken slightly

**Text Link Hover:**
- Underline animates in from left: `w-0 group-hover:w-full`
- Color transitions: `text-slate-300` → `text-indigo-300`
- Speed: 300ms ease-out

### Bounce Animation

**Used For:** Scroll indicator arrow
- Moves up/down 8px continuously
- Cycle: 2 seconds
- Easing: Linear (default bounce behavior)

---

## 📱 Layout & Structure

### Navigation Bar (Fixed, Top)

**Container:**
- `fixed top-0 w-full z-50`
- Background: `bg-slate-950/50 backdrop-blur-xl border-b border-slate-800/50`
- Styling: Glass-morphism effect with semi-transparency and blur

**Logo:**
- Text: "MR.M" with `tracking-[0.2em]` (wide letter spacing)
- Hover effect: Underline animation, color shift to indigo
- Font: `font-bold` (600 weight)

**Navigation Links:**
- Hidden on mobile (`hidden md:flex`)
- Spacing: `space-x-12` (large gaps)
- Items: Work, About, Process, Contact (all anchor links)
- Underline animation on hover

**Mobile Menu:**
- Shows hamburger icon on screens below md breakpoint
- Simplified display: ☰ character

### Hero Section

**Container:**
- `min-h-screen` - Full viewport height
- Gradient background: `bg-linear-to-b from-slate-950 via-slate-900 to-slate-950`
- Flexbox centered: `flex items-center justify-center`
- Overflow hidden for smooth animations

**Background Orbs (Animated):**
- 3 positioned orbs with blur effects
- Top-left: Indigo orb `bg-indigo-600/15 blur-3xl`
- Bottom-right: Cyan orb `bg-cyan-500/10 blur-3xl`
- Center-left: Purple orb `bg-purple-600/5 blur-3xl` (static)
- Interactive: Move based on mouse position

**Content Area:**
- `max-w-5xl mx-auto`
- Centered text alignment
- Padding: `py-20 px-6`

**Hero Elements (In Order):**

1. **Badge**
   - Text: "CREATIVE DEVELOPER"
   - Styling: `text-xs uppercase tracking-[0.3em]`
   - Background: `bg-indigo-950/40`
   - Border: `border border-indigo-500/20`
   - Spacing: `px-4 py-2 rounded-full`

2. **Headline**
   - Text: "I craft [linebreak] digital precision"
   - Size: `text-6xl md:text-7xl lg:text-8xl`
   - Font: Prata serif, light weight, tight tracking
   - "digital precision" part: Indigo-to-cyan gradient
   - Mouse reactive parallax effect

3. **Subheading**
   - Text: "Building high-performance web experiences..."
   - Size: `text-base md:text-lg`
   - Color: `text-slate-300`
   - Max width: `max-w-2xl`
   - Leading: `leading-relaxed`

4. **CTA Buttons**
   - Two buttons in row (stack on mobile)
   - Gap: `gap-6`
   
   Button 1 (Explore Work):
   - Style: Bordered with background slide animation
   - Border: `border border-indigo-500/60`
   - Text color: `text-indigo-300` (white on hover)
   - Background: Slides in from left on hover
   
   Button 2 (Start Project):
   - Style: Underline-based, minimal
   - Border-bottom: `border-b-2 border-slate-700`
   - Hover: Border becomes indigo, text becomes indigo

5. **Scroll Indicator**
   - Position: Absolute bottom-4, centered horizontally
   - Text: "Scroll to explore" in small size
   - Icon: Downward arrow SVG (5x5 size)
   - Animation: Arrow bounces continuously
   - Color: `text-slate-500/600` (muted)

### Stats Section

**Layout:**
- `grid grid-cols-1 md:grid-cols-3 gap-8`
- Full width with padding: `py-20 px-6`
- Background: `bg-slate-950` with bottom border

**Stats Cards:**
- 3 cards: "50+ Projects", "200% Performance Gain", "99.9% Satisfaction"
- Styling: Bordered cards `border border-slate-800`
- Hover: `hover:border-indigo-500/30`
- Content:
  - Number: `text-4xl md:text-5xl font-light text-indigo-400`
  - Label: `text-sm uppercase tracking-widest text-slate-400`
- Animation: Scroll reveal with stagger

### Work Section (Projects)

**Layout:**
- Full-width sections with 2x2 grid on large screens
- First 2 projects in first row, next 2 in second row
- Grid: `grid grid-cols-1 lg:grid-cols-2 gap-8`

**Section Header:**
- Heading: "Featured Work" with "Work" in indigo
- Description: Brief paragraph explaining selection
- Scroll reveal animation

**Project Cards:**

**Top-level Structure:**
- Rounded border: `rounded-xl border border-slate-800`
- Hover: `hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-900/20`
- Overflow hidden for smooth image scaling
- Group hover applied for coordinated animations

**Image Container:**
- Aspect ratio: `aspect-video` (16:9)
- Background: `bg-linear-to-br from-slate-800 to-slate-900` (placeholder gradient)
- Image: Placeholder from placehold.co service
- Hover: `group-hover:scale-110` with 700ms transition
- Z-index: Image at z-0, overlay at z-10

**Gradient Overlay (On Hover):**
- Positioned absolutely over image
- Opacity: 0 by default, 100% on hover (400ms transition)
- Gradient colors vary per project (indigo, cyan, purple, rose)
- Blending: Smooth color shift

**Text Content Area:**
- Position: Relative z-20 (above image)
- Background: `bg-linear-to-t from-slate-950 to-transparent` (dark fade from bottom)
- Padding: `p-8`

**Text Elements (In Order):**

1. **Featured Badge** (conditional):
   - Text: "Featured"
   - Styling: `text-xs uppercase tracking-widest text-indigo-300`
   - Background: `bg-indigo-950/40`
   - Border: `border border-indigo-500/30`
   - Display: Only on featured projects
   - Margin: `mb-4`

2. **Project Title:**
   - Font: Prata serif, light weight
   - Size: `text-2xl`
   - Margin: `mb-3`
   - Example: "StaticForge Framework"

3. **Project Description:**
   - Text: `text-slate-400 mb-6 leading-relaxed text-sm`
   - Example: "High-performance static site generator with <0.8s load times..."

4. **Tech Stack:**
   - Display: Inline badges
   - Style: `text-xs uppercase tracking-widest text-indigo-400 border border-indigo-500/30`
   - Hover: `group-hover:border-indigo-400/60`
   - Spacing: `gap-2`
   - Example: "Next.js", "Tailwind", "TypeScript"

5. **Footer (Divider Line):**
   - Border-top: `border-t border-slate-800/50`
   - Padding-top: `pt-6`
   - Content:
     - Year: `text-slate-500 text-sm` (left aligned)
     - "View" link: `text-indigo-400 → indigo-300 on hover` with arrow (→)

**Project Data:**
```javascript
[
  {
    title: "StaticForge Framework",
    desc: "High-performance static site generator with <0.8s load times and zero JavaScript bloat.",
    tech: "Next.js, Tailwind, TypeScript",
    year: "2025",
    gradient: "from-indigo-500/20 to-indigo-600/10",
    featured: false
  },
  {
    title: "Pixel-Perfect Dashboard",
    desc: "Real-time analytics interface with WebSocket integration and D3.js visualizations.",
    tech: "React, D3.js, WebSockets, PostgreSQL",
    year: "2024",
    gradient: "from-cyan-500/20 to-cyan-600/10",
    featured: false
  },
  {
    title: "Dark Mode Design System",
    desc: "80+ component variants built for premium SaaS brands with full accessibility.",
    tech: "Tailwind, TypeScript, Storybook",
    year: "2024",
    gradient: "from-purple-500/20 to-purple-600/10",
    featured: true
  },
  {
    title: "AI Content Studio",
    desc: "Collaborative platform for AI-assisted content generation with real-time updates.",
    tech: "React, GPT-4 API, Supabase, Stripe",
    year: "2024",
    gradient: "from-rose-500/20 to-rose-600/10",
    featured: true
  }
]
```

### About Section

**Layout:**
- 2-column grid: `grid grid-cols-1 lg:grid-cols-2 gap-16 items-center`
- Stacks on mobile, side-by-side on large screens
- Background: `bg-linear-to-b from-slate-950 to-slate-900`
- Padding: `py-32 px-6`

**Left Column (Image):**
- Square image: `aspect-square`
- Border: `border border-slate-800`
- Rounded: `rounded-xl`
- Hover: `group-hover:scale-105` (subtle zoom)
- Placeholder image from placehold.co

**Right Column (Text):**

1. **Heading:**
   - Font: Prata serif, light, large (5xl-6xl)
   - Text: "About Mr.M" with "Mr.M" in indigo
   - Margin: `mb-8`

2. **Quote/Blockquote:**
   - Text: "I don't build websites. I architect digital experiences that respect the user's time and intelligence."
   - Styling: `text-xl font-light italic text-indigo-300`
   - Border: Left border `border-l-2 border-indigo-500/30` with `pl-6`
   - Margin: `mb-8`

3. **Body Paragraphs (x2):**
   - Paragraph 1: About expertise and skills
   - Paragraph 2: About philosophy and approach
   - Style: `text-slate-300 mb-6 leading-relaxed` (first), `text-slate-400 mb-10 leading-relaxed` (second)

4. **Info Grid:**
   - 3 rows of info
   - Structure: 
     ```
     [Label: text-indigo-400 font-medium] [Value: text-slate-400]
     ```
   - Items:
     - Tech Stack: "Next.js, React, TypeScript, Tailwind CSS, Node.js"
     - Specialty: "Design Systems, Performance Optimization, UX Engineering"
     - Mission: "Elevate digital products through thoughtful craftsmanship"
   - Spacing: `space-y-4`
   - Each item: `flex items-start gap-4`

### Process Section

**Layout:**
- 3-column grid: `grid grid-cols-1 md:grid-cols-3 gap-8`
- Background: `bg-slate-950`
- Padding: `py-32 px-6`

**Section Header:**
- Heading: "My Process" with "Process" in indigo
- Description: Brief intro
- Scroll reveal animation

**Process Cards (3 steps):**

**Card Structure:**
- Border: `border border-slate-800`
- Rounded: `rounded-lg`
- Hover: `hover:border-indigo-500/40 hover:bg-slate-900/50`
- Padding: `p-8`

**Card Content:**

1. **Number:**
   - Size: `text-6xl font-light`
   - Color: `text-slate-700 group-hover:text-indigo-400` (animated)
   - Margin: `mb-6`
   - Example: "01", "02", "03"

2. **Title:**
   - Font: Prata serif, light, 2xl
   - Margin: `mb-4`
   - Examples:
     - "Discovery & Strategy"
     - "Design & Architecture"
     - "Development & Polish"

3. **Description:**
   - Text: `text-slate-400 leading-relaxed`
   - Example: "Deep dive into your vision, constraints, and users..."

**Process Data:**
```javascript
[
  {
    num: "01",
    title: "Discovery & Strategy",
    desc: "Deep dive into your vision, constraints, and users. I ask tough questions to build a strong foundation."
  },
  {
    num: "02",
    title: "Design & Architecture",
    desc: "Precision engineering meets beautiful design. Every decision serves the product and its users."
  },
  {
    num: "03",
    title: "Development & Polish",
    desc: "Building with obsessive attention to detail. Code, design, and interactions align perfectly."
  }
]
```

### CTA Section

**Layout:**
- Centered text
- Background: `bg-linear-to-b from-slate-950 to-slate-900`
- Padding: `py-24 px-6`

**Content:**
1. **Heading:**
   - Font: Prata serif
   - Size: `text-5xl md:text-6xl`
   - Text: "Ready to Create Something Great?" with "Create" in indigo
   - Margin: `mb-8`

2. **Description:**
   - Text: `text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed`
   - Content: "I'm always open to discussing new projects..."
   - Margin: `mb-12`

3. **Buttons:**
   - Two buttons: "Get In Touch" (primary), "View GitHub" (secondary)
   - Same styling as hero section buttons

### Footer

**Layout:**
- Grid: `grid grid-cols-1 md:grid-cols-4 gap-12`
- Background: `bg-slate-950 border-t border-slate-800/50`
- Padding: `py-16 px-6`

**Columns:**

1. **Brand:**
   - Logo: "MR.M" (bold, large)
   - Tagline: "Creative developer crafting high-performance digital experiences."

2. **Navigation:**
   - Links: Work, About, Process
   - Style: `space-y-2 text-sm text-slate-400 hover:text-indigo-300`

3. **Social:**
   - Links: Twitter, GitHub, LinkedIn

4. **Contact:**
   - Email: `hello@mrm.dev`

**Bottom Section:**
- Border-top: `border-t border-slate-800`
- Copyright text: "© 2025 Mr.M. Crafted with precision and passion."
- Style: `text-center text-sm text-slate-500`

---

## ⚙️ Technical Stack

### Framework & Build

- **Runtime:** Next.js 16.0.3
- **React:** 19.2.0 (with hooks: useEffect, useRef, useState)
- **Language:** TypeScript 5.0 (strict mode, ES2020 target)
- **Build Tool:** Turbopack (SWC compiler)
- **Build Mode:** SSG (Static Site Generation) with `output: 'export'`

### Styling & CSS

- **CSS Framework:** Tailwind CSS v4
- **CSS Processor:** PostCSS (via Tailwind)
- **Dark Mode:** Enabled globally
- **Custom Animations:** CSS keyframes in `globals.css`
- **Import Syntax:** `@import "tailwindcss"` (Tailwind v4 syntax)

### Performance Optimizations

1. **Font Loading:**
   - Inter: `display: 'swap'`, `preload: true`
   - Prata: Google Fonts with `font-display: swap`
   - DNS prefetch and preconnect links in head

2. **Event Handling:**
   - Mouse move: `requestAnimationFrame` throttling
   - Scroll: 100ms debounce timeout
   - Listeners: `{ passive: true }` for performance

3. **Animation Performance:**
   - Will-change hints on animated elements
   - GPU acceleration: `transform: translate3d(0, 0, 0)`
   - IntersectionObserver for scroll reveals (not polling)
   - Staggered animations to prevent jank

4. **Image Handling:**
   - Lazy loading: `loading: lazy`
   - Async decoding: `decoding: async`
   - Format optimization: AVIF, WebP support
   - Placeholder service: placehold.co

5. **Build Configuration:**
   - Gzip compression enabled
   - Source maps disabled in production
   - Tree-shaking enabled
   - Code splitting automatic

### Accessibility Features

1. **Motion Preferences:**
   - `@media (prefers-reduced-motion: reduce)` - Animations disabled (0.01ms duration)

2. **Contrast Preferences:**
   - `@media (prefers-contrast: more)` - Enhanced contrast (1.1x filter)

3. **Focus Styles:**
   - `focus-visible` outlines: 2px indigo with 2px offset
   - Works for keyboard navigation

4. **Semantic HTML:**
   - Proper heading hierarchy (h1, h2, etc.)
   - Anchor links with proper href attributes
   - Alt text on images (placeholders included)

5. **Color Contrast:**
   - WCAG AA compliant (all text meets 4.5:1+ ratio)

### SEO Configuration

**Metadata:**
- Title: "Mr.M | Full-Stack Developer & UI Engineer"
- Description: Long-form, keyword-rich
- Keywords: Next.js, React, TypeScript, Web Developer, UI Engineer, Design Systems
- Open Graph: Website type, locale, URL, title, description, image
- Twitter Card: Summary_large_image format
- Robots: Index, follow enabled
- Canonical URL: Self-referencing

**Sitemap & Robots:**
- Robots.txt configured (index: true, follow: true)
- Canonical URL set
- Markup for Google Bot preferences

---

## 📦 Installation & Setup Instructions

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn package manager

### Step 1: Initialize Next.js Project
```bash
npx create-next-app@latest mr-m-portfolio --typescript --tailwind
cd mr-m-portfolio
```

### Step 2: Install Dependencies
```bash
npm install framer-motion lucide-react
npm install -D tailwindcss@4 postcss autoprefixer
```

### Step 3: Configure Files

**next.config.ts:**
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  compress: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: true, // Required for SSG
  },
  turbopack: {},
};

export default nextConfig;
```

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "dom", "dom.iterable"],
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "useDefineForClassFields": true,
    "sourceMap": false,
    "declarationMap": false,
    "moduleResolution": "node"
  }
}
```

### Step 4: Replace App Files

Replace the content of `app/layout.tsx`, `app/page.tsx`, `app/globals.css` with the provided code.

### Step 5: Build & Deploy

```bash
npm run build      # Generates static output
npm run dev        # Development server (localhost:3000)
```

---

## 🎨 Customization Guide

### Changing the Name
- Replace "Mr.M" with your name throughout all files
- Update email in CTA: `hello@mrm.dev` → your email
- Update social links in footer

### Changing the Color Palette
- Indigo → Replace all `indigo-*` classes with your accent color (e.g., `purple-*`, `blue-*`, `amber-*`)
- Slate → Replace all `slate-*` classes with your background color scheme
- Update Tailwind color values in all gradient declarations

### Adding/Removing Projects
- Edit the `projects` array in `app/page.tsx`
- Add/remove entries with title, description, tech, year, gradient
- Set `featured: true` for highlighted projects
- Grid will automatically reflow based on number of items

### Changing the About Section
- Update the blockquote text
- Edit body paragraphs
- Modify the 3 info rows (Tech Stack, Specialty, Mission)
- Replace profile image URL

### Modifying the Process Steps
- Edit the `process` array in `app/page.tsx`
- Change number (01, 02, 03), title, and description
- Grid supports 2, 3, or 4 columns (adjust `md:grid-cols-*`)

---

## 🚀 Deployment Options

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy with one click
4. Environment variables: .env.production

### Netlify
1. Connect Git repository
2. Build command: `npm run build`
3. Publish directory: `out/`
4. Deploy

### GitHub Pages
1. Add `.github/workflows/deploy.yml` for CI/CD
2. Push to repository
3. Automatic deployment to GitHub Pages

---

## 📋 Design Checklist

When recreating this design, ensure:

- [ ] Dark theme with Slate-950 base (#0f172a)
- [ ] Indigo + Cyan accent colors implemented
- [ ] Prata serif font for headings
- [ ] Inter sans-serif for body text
- [ ] Mouse parallax in hero (0.01 intensity)
- [ ] Scroll reveal with 0.05 threshold IntersectionObserver
- [ ] Fade-in sequence for hero elements (0.1s-0.5s stagger)
- [ ] 2x2 project grid with gradient overlays
- [ ] Hover effects (scale, border color, shadow)
- [ ] 3-step process section with numbered cards
- [ ] About section with image + text columns
- [ ] Fixed navigation with smooth scrolling
- [ ] CTA buttons with background slide animation
- [ ] Footer with 4 columns
- [ ] Responsive design (mobile-first approach)
- [ ] WCAG AA accessibility compliance
- [ ] Reduced motion media query support
- [ ] High contrast mode support
- [ ] SEO metadata complete
- [ ] Performance optimizations (lazy images, async fonts)
- [ ] SSG build configured

---

## 📄 File Structure

```
mr-m-portfolio/
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx            # Main portfolio page (complete)
│   └── globals.css         # Global styles + animations
├── public/
│   ├── favicon.ico
│   └── apple-touch-icon.png
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── postcss.config.mjs       # PostCSS configuration
├── eslint.config.mjs        # ESLint configuration
├── package.json            # Dependencies
└── README.md               # Project documentation
```

---

## 🔗 Key Links & References

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Web.dev Performance Guide](https://web.dev/performance/)
- [WCAG Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Last Updated:** November 25, 2025  
**Version:** 1.0.0  
**Status:** Production Ready  
**License:** MIT

---

This comprehensive prompt captures every detail of the Mr.M portfolio design. Any experienced developer or AI assistant can use this specification to recreate the entire site with pixel-perfect accuracy and all functionality intact.
