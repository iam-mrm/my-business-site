# Mr.M - Web Developer Portfolio

A production-grade, SSG (Static Site Generation) portfolio built with Next.js 16, TypeScript 5, React 19, and Tailwind CSS. Optimized for performance, security, accessibility, and SEO.

## ✨ Features

### Performance
- **Static Site Generation (SSG)**: Pre-rendered HTML for instant load times
- **Optimized Images**: AVIF & WebP formats with automatic optimization
- **Font Optimization**: `font-display: swap` for zero font render-blocking
- **RequestAnimationFrame Throttling**: Smooth 60fps animations
- **Tree-shaking & Code Splitting**: Minimal bundle size
- **Gzip Compression**: Automatic compression on deployment
- **Lazy Loading**: Images and assets load on-demand

### Security
- **8 Security Headers**: HSTS, CSP, X-Frame-Options, X-XSS-Protection, etc.
- **No Source Maps in Production**: Hide source code from browser
- **Strict TypeScript Mode**: Type-safe development
- **Content Security Policy**: Ready for implementation
- **CORS Configuration**: Secure cross-origin requests

### Accessibility
- **Motion Preferences**: Respects `prefers-reduced-motion`
- **Contrast Enhancement**: Respects `prefers-contrast: more`
- **Keyboard Navigation**: Full keyboard support
- **Focus Visible Styles**: Clear focus indicators
- **ARIA Labels**: Semantic HTML structure

### SEO
- **Comprehensive Metadata**: Title, description, keywords, author
- **Open Graph Tags**: Enhanced social sharing (Facebook, LinkedIn)
- **Twitter Card**: Optimized Twitter sharing
- **Canonical URLs**: Prevent duplicate content issues
- **Robots Configuration**: Proper indexing directives
- **Structured Data Ready**: Schema.org support

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

### Type Checking
```bash
npm run type-check
```

### Security Audit
```bash
npm run audit
```

### Build for Production
```bash
npm run build
```

### Static Export (SSG)
```bash
npm run build  # Automatically exports to /out directory
```

## 📦 Project Structure

```
my-business-site/
├── app/
│   ├── layout.tsx          # Root layout with metadata & fonts
│   ├── page.tsx            # Portfolio page (hero → CTA)
│   └── globals.css         # Global styles & animations
├── lib/
│   ├── security-config.ts  # CSP & security headers
│   └── performance-metrics.ts # Web Vitals monitoring
├── public/                 # Static assets
├── next.config.ts          # Build configuration
├── tsconfig.json           # TypeScript strict mode
├── package.json            # Dependencies & scripts
└── postcss.config.mjs      # PostCSS with Tailwind
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` for development:
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Mr.M - Web Developer
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

Production (`.env.production`):
```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_ENVIRONMENT=production
```

### Security Headers

Edit `next.config.ts` to customize security headers:
- **HSTS**: 1 year max-age with includeSubDomains
- **CSP**: Restrictive default-src with specific allowlists
- **Permissions-Policy**: Disable camera, microphone, geolocation, payment
- **X-Frame-Options**: DENY (prevent clickjacking)

### Performance Tuning

- **Image Optimization**: Edit `next.config.ts` `images.formats`
- **Font Loading**: Edit `app/layout.tsx` `Inter` component `display` option
- **Animation Throttling**: Edit `app/page.tsx` scroll/mousemove handlers
- **Cache Control**: Modify `Cache-Control` headers in `next.config.ts`

## 📊 Performance Metrics

Target metrics for production:

| Metric | Target | Threshold |
|--------|--------|-----------|
| **LCP** (Largest Contentful Paint) | < 2.5s | < 4s |
| **FID** (First Input Delay) | < 100ms | < 300ms |
| **CLS** (Cumulative Layout Shift) | < 0.1 | < 0.25 |
| **TTFB** (Time to First Byte) | < 600ms | < 1800ms |
| **FCP** (First Contentful Paint) | < 1.8s | < 3s |

Check performance with:
- [Google PageSpeed Insights](https://pagespeed.web.dev)
- [WebPageTest](https://www.webpagetest.org)
- [GTmetrix](https://gtmetrix.com)

## 🔒 Security Checklist

Before deployment:

- [ ] Run `npm run audit` and fix vulnerabilities
- [ ] Update `.env.production` with real site URL
- [ ] Enable HSTS preload: Add site to [HSTS Preload List](https://hstspreload.org)
- [ ] Check security headers: [Security Headers](https://securityheaders.com)
- [ ] Enable SSL/TLS on hosting platform
- [ ] Set up CSP monitoring in Production
- [ ] Configure rate limiting for API routes (if added)
- [ ] Enable DDoS protection on CDN (Cloudflare, Akamai, etc.)

## ♿ Accessibility Checklist

- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Verify keyboard navigation (Tab, Enter, Escape)
- [ ] Test prefers-reduced-motion: `defaults write com.apple.universalaccess reduceMotionEnabled 1`
- [ ] Run [WAVE](https://wave.webaim.org/) accessibility scanner
- [ ] Test color contrast with [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [ ] Verify focus visible styles in all browsers

## 📱 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS Safari 13+, Chrome Android 88+

## 🚢 Deployment

### Vercel (Recommended)
```bash
vercel --prod
```
Automatic security headers, image optimization, and edge caching.

### Netlify
```bash
npm run build
# Deploy /out directory
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

### GitHub Pages (SSG)
```bash
npm run build  # Creates /out
# Deploy /out as static site
```

## 📝 Development Scripts

```bash
npm run dev           # Start dev server (http://localhost:3000)
npm run build         # Build and export to /out
npm run start         # Start production server
npm run lint          # Run ESLint
npm run type-check    # TypeScript strict check
npm run audit         # Security vulnerability audit
npm run security      # Auto-fix vulnerabilities & update deps
```

## 📚 Technology Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16.0.3 |
| **Language** | TypeScript 5.0 (strict mode) |
| **Runtime** | React 19.2.0 |
| **Styling** | Tailwind CSS 4 + PostCSS |
| **Build** | SWC compiler with minification |
| **Fonts** | Inter (next/font) + Prata (Google Fonts) |
| **Icons** | Lucide React |
| **Animations** | CSS keyframes + IntersectionObserver |

## 🔗 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Web.dev Performance](https://web.dev/performance/)
- [OWASP Security Guidelines](https://owasp.org/)
- [WCAG Accessibility Standards](https://www.w3.org/WAI/WCAG21/quickref/)

## 📄 License

Created by Mr.M - All rights reserved.

---

**Last Updated**: December 2024
**Next.js Version**: 16.0.3
**Status**: ✅ Production Ready
