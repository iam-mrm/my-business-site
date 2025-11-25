# Deployment Guide

This guide covers production deployment strategies for the Mr.M portfolio, an optimized SSG (Static Site Generation) Next.js application.

## 📋 Pre-Deployment Checklist

- [ ] Run `npm run type-check` - verify TypeScript strict mode
- [ ] Run `npm run audit` - check for security vulnerabilities
- [ ] Run `npm run build` - verify production build succeeds
- [ ] Test locally with `npm run dev`
- [ ] Update `.env.production` with production environment variables
- [ ] Verify all metadata in `app/layout.tsx` is correct
- [ ] Check portfolio content is accurate in `app/page.tsx`

## 🚀 Recommended Deployment Platforms

### 1. Vercel (Recommended for Next.js)

**Why Vercel?**
- Built by Next.js creators
- Automatic static site hosting
- Global CDN with edge caching
- Automatic security headers
- Image optimization on-the-fly
- Zero configuration for most projects

**Steps:**

1. **Connect Repository**
   ```bash
   npm install -g vercel
   vercel link
   ```

2. **Configure Environment Variables**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add all variables from `.env.production`

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Verify Security Headers**
   ```bash
   curl -I https://your-domain.com
   # Check for security headers
   ```

**Vercel Configuration:** `vercel.json` is pre-configured in the project.

---

### 2. Netlify

**Why Netlify?**
- Excellent static hosting
- Built-in form handling
- Edge functions for dynamic features
- Automatic HTTPS
- Built-in CDN

**Steps:**

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Select repository

2. **Configure Build**
   - Build command: `npm run build`
   - Publish directory: `out` (or `.next` if using `output: standalone`)
   - Environment variables: Add from `.env.production`

3. **Netlify Configuration**
   - `netlify.toml` is already configured in the project

4. **Deploy**
   - Push to main branch, Netlify auto-deploys

**Verify Deployment:**
```bash
netlify status
```

---

### 3. GitHub Pages (Free)

**Why GitHub Pages?**
- Free hosting
- Direct Git integration
- No additional account needed

**Setup:**

1. **Enable GitHub Pages**
   - Go to Repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main`, folder: `./out`

2. **Add Deploy Workflow**
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
       - uses: actions/checkout@v3
       
       - uses: actions/setup-node@v3
         with:
           node-version: '20'
       
       - run: npm ci
       - run: npm run build
       
       - uses: peaceiris/actions-gh-pages@v3
         with:
           github_token: ${{ secrets.GITHUB_TOKEN }}
           publish_dir: ./out
   ```

3. **Push Changes**
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add GitHub Pages deployment"
   git push origin main
   ```

---

### 4. Docker Deployment

**For self-hosted or container-based hosting (AWS ECS, GCP Cloud Run, etc.)**

Create `Dockerfile`:
```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source
COPY . .

# Build static export
RUN npm run build

# Serve with simple HTTP server
RUN npm install -g http-server

EXPOSE 3000

CMD ["http-server", "out", "-p", "3000"]
```

**Build & Run:**
```bash
docker build -t mr-m-portfolio .
docker run -p 3000:3000 mr-m-portfolio
```

---

### 5. CloudFlare Pages

**Why CloudFlare Pages?**
- Free tier available
- Global edge network
- Built-in security
- Easy git integration

**Steps:**

1. **Connect Repository**
   - Go to CloudFlare Pages
   - Create new project
   - Connect Git repository

2. **Configure Build**
   - Build command: `npm run build`
   - Build output directory: `out`
   - Environment variables: Add from `.env.production`

3. **Deploy**
   - CloudFlare auto-deploys on push to main

---

## 🔐 Security Configuration by Platform

### Vercel Security Headers

Headers are automatically configured via `vercel.json`. To customize:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=(), payment=()"
        }
      ]
    }
  ]
}
```

### Netlify Security Headers

Configured in `netlify.toml` with all security headers and CSP.

### Custom Domains

**Add Custom Domain:**
1. Purchase domain (GoDaddy, Namecheap, Google Domains, etc.)
2. Update DNS records to point to hosting platform
3. Enable HTTPS (automatic on all platforms)
4. Update `NEXT_PUBLIC_SITE_URL` in environment variables

---

## ⚡ Performance Optimization Post-Deployment

### Enable HTTP/2 & HTTP/3
- **Vercel**: Automatic
- **Netlify**: Automatic
- **CloudFlare**: Enable in Performance settings

### Enable Brotli Compression
- **Vercel**: Automatic
- **Netlify**: Automatic
- **CloudFlare**: Enable in Speed → Optimization

### Cache Control Headers

Static assets (JS, CSS) are cached with 1-year max-age:
```
Cache-Control: public, max-age=31536000, immutable
```

HTML files use short cache:
```
Cache-Control: public, max-age=3600
```

### Database/API Optimization (Future)

If adding backend services:
- Use edge functions for low-latency responses
- Cache API responses aggressively
- Use CDN for static API responses

---

## 🔍 Monitoring & Analytics

### Set Up Monitoring

1. **Google Analytics** (optional)
   - Add Google Analytics ID to `NEXT_PUBLIC_GA_ID`
   - Update `app/page.tsx` to initialize GA

2. **PageSpeed Insights**
   - Test production URL: https://pagespeed.web.dev
   - Target: 90+ score on all metrics

3. **Uptime Monitoring**
   - Use Uptime Robot or similar
   - Monitor: https://your-domain.com

4. **Error Tracking** (optional)
   - Sentry integration for error monitoring
   - Set up in `app/layout.tsx`

---

## 📊 Performance Targets

After deployment, verify:

| Metric | Target |
|--------|--------|
| **LCP** | < 2.5s |
| **FID** | < 100ms |
| **CLS** | < 0.1 |
| **TTFB** | < 600ms |
| **Bundle Size** | < 200KB (gzipped) |

---

## 🐛 Troubleshooting

### Build Fails with "output: export"
- Ensure no dynamic routes or API routes
- Check for any getServerSideProps or getStaticProps (not needed)

### Images not loading
- Verify image paths are relative or absolute URLs
- Check `next.config.ts` remotePatterns for external images
- Use `<Image>` component from `next/image`

### CSS not loading
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check CSS imports in `app/layout.tsx`

### Slow performance
- Check bundle size: `npm run build` shows file sizes
- Verify images are optimized (AVIF/WebP)
- Test on WebPageTest.org for detailed analysis

---

## ✅ Post-Deployment Checklist

After deploying to production:

- [ ] Domain resolves correctly
- [ ] HTTPS working (no warnings)
- [ ] Security headers present: `curl -I https://your-domain.com`
- [ ] Performance acceptable (test on PageSpeed Insights)
- [ ] Analytics tracking working (if enabled)
- [ ] All pages rendering correctly
- [ ] Responsive design working on mobile/tablet
- [ ] No console errors in DevTools
- [ ] SEO metadata correct (check page source)
- [ ] Open Graph preview working on social platforms

---

## 📚 Additional Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [CloudFlare Pages Documentation](https://developers.cloudflare.com/pages)
- [GitHub Pages Documentation](https://pages.github.com)

---

**Last Updated**: December 2024
**Status**: Ready for Production Deployment
