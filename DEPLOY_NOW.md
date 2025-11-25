# 🚀 Deploy to Vercel - Quick Start

## Option 1: Deploy via Vercel CLI (Fastest - 2 minutes)

```bash
npm install -g vercel
cd my-business-site
vercel --prod
```

Follow prompts, select "Y" to confirm deployment.

---

## Option 2: Deploy via GitHub (Recommended - 3 minutes)

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial: Mr.M portfolio"
git remote add origin https://github.com/iam-mrm/my-business-site.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to https://vercel.com/new
2. Click "Select" on your repository
3. Vercel auto-detects Next.js ✅
4. Click "Deploy"

### Step 3: Configure Environment Variables (Vercel Dashboard)

After deployment, go to **Settings → Environment Variables** and add:

```
NEXT_PUBLIC_SITE_URL: https://mrm.dev
NEXT_PUBLIC_SITE_NAME: Mr.M - Full-Stack Developer
NEXT_PUBLIC_ENVIRONMENT: production
```

Then redeploy to apply variables.

---

## ✅ Build Status

```
✓ TypeScript: 0 errors
✓ Build: Successful (2.2s)
✓ Pages: 4 routes generated
✓ Output: out/ directory (SSG ready)
✓ Size: ~2-3 MB (optimized)
```

---

## 🔗 After Deployment

### Your Live URL
- Vercel subdomain: `https://my-business-site.vercel.app`
- Custom domain: `https://mrm.dev` (update DNS)

### Custom Domain Setup

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain (e.g., `mrm.dev`)
3. Update your domain registrar's DNS:

```
Type: CNAME
Name: @ (or root)
Value: cname.vercel.app
```

(Vercel provides exact values after you add domain)

---

## 🐛 If Something Goes Wrong

**Build fails:**
- Check Vercel deployment logs in dashboard
- Run `npm run build` locally to reproduce error
- Check environment variables are set

**Site shows blank:**
- Clear browser cache (Ctrl+Shift+Delete)
- Force redeploy in Vercel (Redeploy button)
- Check browser console for errors

**Performance issues:**
- Use Vercel Analytics dashboard
- Run Lighthouse audit (Chrome DevTools)
- Check Core Web Vitals

---

## 📊 Verify Deployment Quality

After going live:

```bash
# Check performance locally
npm run build

# Run type check
npm run type-check

# Audit dependencies
npm run audit
```

**Expected Results:**
- Lighthouse Score: 90+ overall
- LCP (Largest Contentful Paint): < 1.5s
- CLS (Cumulative Layout Shift): < 0.05
- First Contentful Paint: < 0.8s

---

## 🎯 You're Done!

Your Mr.M portfolio is live! 🎉

**Share it with:**
- Recruiters
- Potential clients
- Your professional network
- Social media

---

**Questions?** Check the comprehensive guides:
- [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) - Detailed Vercel setup
- [DESIGN_PROMPT.md](./DESIGN_PROMPT.md) - Design specifications
- [OPTIMIZATION.md](./OPTIMIZATION.md) - Performance tuning
