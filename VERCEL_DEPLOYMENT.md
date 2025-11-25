# Vercel Deployment Guide for Mr.M Portfolio

## 🚀 Quick Start Deployment

### Option 1: Deploy with Vercel CLI (Fastest)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to your project
cd my-business-site

# Deploy
vercel
```

Follow the prompts to:
- Confirm project settings
- Link to your Git repository
- Configure environment variables

### Option 2: Deploy via GitHub Integration (Recommended)

#### Step 1: Push to GitHub
```bash
# Initialize git if not done
git init

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/my-business-site.git

# Push code
git add .
git commit -m "Initial commit: Mr.M portfolio"
git push -u origin main
```

#### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub account
3. Click "New Project"
4. Select your `my-business-site` repository
5. Vercel auto-detects Next.js configuration
6. Click "Deploy"

#### Step 3: Configure Environment Variables
In Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SITE_URL: https://your-domain.com
NEXT_PUBLIC_SITE_NAME: Mr.M - Full-Stack Developer
NEXT_PUBLIC_ENVIRONMENT: production
```

---

## 🔧 Vercel Configuration Details

### Build Command
```
npm run build
```
- Compiles TypeScript with strict mode
- Generates SSG static pages to `out/` directory
- Optimizes with Turbopack

### Output Directory
```
out/
```
- Contains pre-rendered static HTML files
- No server-side rendering needed
- Instant page delivery via CDN

### Node.js Version
```
20.x
```
- LTS version for stability
- Full ES2020 support
- All required APIs available

### Build Time
- **Expected:** 30-45 seconds
- **Includes:** TypeScript compilation, static generation, optimization

### Deployment Region
```
iad1 (Northern Virginia, USA)
```
- Fastest for North American users
- Can add more regions in Vercel dashboard

---

## 📊 Performance Metrics

After deployment, verify performance:

### Vercel Analytics
1. Go to Vercel Dashboard
2. Select your project
3. Navigate to "Analytics"
4. Check:
   - **Web Vitals**: LCP, FID, CLS metrics
   - **Response Times**: Page delivery speed
   - **Error Tracking**: Any build or runtime issues

### Expected Results
- **Time to Interactive**: < 1 second
- **Largest Contentful Paint**: < 1.5 seconds
- **Cumulative Layout Shift**: < 0.05
- **First Contentful Paint**: < 0.8 seconds

---

## 🔒 Security Configuration

### Headers Applied (via vercel.json)

1. **Strict-Transport-Security (HSTS)**
   - Forces HTTPS for all connections
   - Duration: 2 years
   - Includes subdomains

2. **X-Content-Type-Options: nosniff**
   - Prevents MIME type sniffing attacks

3. **X-Frame-Options: DENY**
   - Prevents clickjacking attacks
   - Site cannot be embedded in iframes

4. **X-XSS-Protection**
   - Enables browser XSS filtering

5. **Referrer-Policy**
   - Limits referrer information
   - `strict-origin-when-cross-origin` for balance between privacy and functionality

6. **Permissions-Policy**
   - Disables camera, microphone, geolocation

### Cache Control

**Static Assets (images, fonts, CSS, JS):**
- Cache lifetime: 1 year
- Immutable flag: Browser never re-checks
- CDN caches globally

---

## 📝 Domain Configuration

### Add Custom Domain

1. **In Vercel Dashboard:**
   - Settings → Domains
   - Add your domain (e.g., `mrm.dev`)

2. **Update DNS Records:**
   
   For CNAME:
   ```
   Name: www
   Type: CNAME
   Value: cname.vercel.app
   ```

   For root domain (@):
   ```
   Use Vercel's A records or CNAME
   (Vercel provides specific values)
   ```

3. **SSL Certificate:**
   - Automatically provisioned via Let's Encrypt
   - Renews automatically
   - No manual action needed

### DNS Provider Examples

- **Namecheap**: DNS Settings → Add CNAME records
- **GoDaddy**: DNS Management → CNAME records
- **Cloudflare**: DNS tab → Add records
- **Route 53** (AWS): Hosted zones → Create records

---

## 🔄 Continuous Deployment

### Automatic Deployments

**Git Integration:**
- Every push to `main` branch triggers automatic deployment
- Environment: Production
- Status: Visible in Vercel dashboard

**Preview Deployments:**
- Every pull request gets a unique URL
- Preview changes before merging
- Share with team for feedback

### Disable Auto-Deploy (If Needed)

Vercel Dashboard → Settings → Git → Uncheck "Deploy on push"

---

## 📦 Build Size Analysis

### Expected Build Output

```
Total Size: ~2-3 MB
- Next.js Framework: ~1 MB
- Static Pages: ~0.5 MB
- Assets (optimized): ~1-1.5 MB
```

### Optimization Tips

If build is larger than expected:

1. **Remove unused dependencies:**
   ```bash
   npm prune
   npm audit --production
   ```

2. **Check bundle size:**
   ```bash
   npm run build -- --analyze
   ```

3. **Verify no large files committed:**
   ```bash
   git log --all --full-history -- <path>
   ```

---

## 🐛 Troubleshooting

### Build Fails

1. **Check build logs:**
   - Vercel Dashboard → Deployments → Click failed build
   - View detailed error messages

2. **Common issues:**
   - TypeScript errors: Fix type errors locally, push again
   - Missing dependencies: Run `npm install`, commit `package-lock.json`
   - Environment variables: Ensure all required vars are set in dashboard

### Site Shows Blank/Wrong Content

1. **Clear Vercel cache:**
   - Dashboard → Settings → Git
   - Click "Redeploy" on latest deployment

2. **Verify SSG output:**
   ```bash
   npm run build
   ls -la out/  # Check for HTML files
   ```

### Performance Issues

1. **Check Web Vitals in Vercel Analytics**
2. **Run Lighthouse audit:**
   - Chrome DevTools → Lighthouse → Generate report
3. **Contact Vercel support if infrastructure issue**

---

## 🔗 Environment Variables Reference

### Required Variables

```env
# Production URL (for canonical tags, metadata)
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Site name (for branding)
NEXT_PUBLIC_SITE_NAME=Mr.M - Full-Stack Developer

# Environment indicator
NEXT_PUBLIC_ENVIRONMENT=production
```

### Optional Variables

```env
# Analytics (if you add Google Analytics later)
NEXT_PUBLIC_GA_ID=G_XXXXXXXXXX

# Custom tracking (if needed)
NEXT_PUBLIC_TRACK_EVENTS=true
```

### Setting Variables

**Via Vercel Dashboard:**
1. Project → Settings → Environment Variables
2. Add key/value pairs
3. Select environments (Production, Preview, Development)
4. Save and redeploy

**Via Vercel CLI:**
```bash
vercel env add NEXT_PUBLIC_SITE_URL
# Enter value at prompt
```

---

## ✅ Pre-Deployment Checklist

Before deploying to production:

- [ ] Code committed to Git
- [ ] `npm run build` succeeds locally
- [ ] TypeScript compilation: 0 errors
- [ ] ESLint warnings reviewed (cosmetic only)
- [ ] All metadata in `layout.tsx` configured
- [ ] Project data in `page.tsx` customized
- [ ] Contact email updated
- [ ] Social links in footer updated
- [ ] Custom domain ready (or use `*.vercel.app`)
- [ ] Environment variables set in Vercel dashboard
- [ ] HSTS header enabled (secure HTTPS)

---

## 🎯 Post-Deployment Tasks

### Monitoring

1. **Set up email alerts:**
   - Vercel Dashboard → Settings → Alerts
   - Configure failed deployment notifications

2. **Monitor performance:**
   - Enable Vercel Analytics
   - Check metrics weekly

3. **Setup uptime monitoring:**
   - Use external service (e.g., Uptime Robot)
   - Alerts if site goes down

### SEO

1. **Add to Google Search Console:**
   - Verify domain ownership
   - Submit sitemap
   - Monitor indexing

2. **Submit to Bing Webmaster:**
   - Similar verification process

3. **Test with Lighthouse:**
   - Target: 90+ score
   - Performance, Accessibility, Best Practices, SEO

### Analytics (Optional)

- Add Google Analytics for visitor tracking
- Use Vercel Analytics for Core Web Vitals

---

## 📞 Support & Resources

### Vercel Documentation
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Custom Domains](https://vercel.com/docs/concepts/projects/custom-domains)

### Get Help
- [Vercel Support](https://vercel.com/support)
- [Community Discord](https://discord.gg/vercel)
- [GitHub Issues](https://github.com/vercel/next.js/issues)

---

## 🎉 Deployment Completed!

Your Mr.M portfolio is now live on Vercel!

**Your Live URL:** `https://your-project.vercel.app`

Or with custom domain: `https://your-domain.com`

Share with recruiters and clients. Welcome to the web!

---

**Last Updated:** November 25, 2025  
**Version:** 1.0.0  
**Status:** Production Ready
