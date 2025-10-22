# Deployment Guide - Monstrac CarRent

This guide covers various deployment options for the Monstrac CarRent application.

## 📋 Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Build completes without errors
- [ ] All tests passing
- [ ] Performance optimizations applied
- [ ] Security headers configured
- [ ] Analytics configured
- [ ] Error tracking setup (Sentry, etc.)
- [ ] SEO meta tags added
- [ ] Sitemap generated
- [ ] robots.txt configured

## 🚀 Deployment Options

### 1. Vercel (Recommended)

Vercel provides zero-config deployments for React applications.

#### Quick Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from Git repository
4. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variables
6. Deploy

#### Custom Domain
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

---

### 2. Netlify

#### Deploy via CLI
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

#### Using Netlify Dashboard
1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to Git provider
4. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Deploy

#### netlify.toml Configuration
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "no-referrer"
```

---

### 3. AWS S3 + CloudFront

#### Build and Upload
```bash
# Build the app
npm run build

# Install AWS CLI
# pip install awscli

# Configure AWS credentials
aws configure

# Create S3 bucket
aws s3 mb s3://monstrac-carrent

# Enable static website hosting
aws s3 website s3://monstrac-carrent --index-document index.html --error-document index.html

# Upload build files
aws s3 sync dist/ s3://monstrac-carrent --acl public-read

# Create CloudFront distribution
aws cloudfront create-distribution --origin-domain-name monstrac-carrent.s3.amazonaws.com
```

#### S3 Bucket Policy
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::monstrac-carrent/*"
    }
  ]
}
```

---

### 4. Docker

#### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "DENY";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "no-referrer";
}
```

#### Docker Commands
```bash
# Build image
docker build -t monstrac-carrent .

# Run container
docker run -d -p 80:80 monstrac-carrent

# Using Docker Compose
docker-compose up -d
```

#### docker-compose.yml
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

---

### 5. GitHub Pages

#### Setup
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

#### vite.config.ts Update
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/monstrac-carrent/', // Replace with your repo name
})
```

---

## 🔧 Environment Variables

### Production Environment Variables

Create `.env.production` file:

```env
# API Configuration
VITE_API_URL=https://api.monstrac.com/v1
VITE_APP_URL=https://monstrac.com

# Payment Gateways
VITE_STRIPE_PUBLIC_KEY=pk_live_...
VITE_RAZORPAY_KEY=rzp_live_...

# Google Services
VITE_GOOGLE_MAPS_API_KEY=AIza...
VITE_GOOGLE_ANALYTICS_ID=G-...

# Social Auth
VITE_GOOGLE_CLIENT_ID=...
VITE_FACEBOOK_APP_ID=...

# Error Tracking
VITE_SENTRY_DSN=https://...

# Feature Flags
VITE_ENABLE_3D_VIEWER=true
VITE_ENABLE_LIVE_CHAT=true
```

### Setting Environment Variables

#### Vercel
```bash
vercel env add VITE_API_URL production
```

#### Netlify
```bash
netlify env:set VITE_API_URL "https://api.monstrac.com/v1"
```

---

## 🎯 Performance Optimization

### Code Splitting
Update `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
```

### Image Optimization
```bash
# Install image optimization plugin
npm install --save-dev vite-plugin-imagemin

# Add to vite.config.ts
import viteImagemin from 'vite-plugin-imagemin'

plugins: [
  react(),
  viteImagemin({
    gifsicle: { optimizationLevel: 7 },
    optipng: { optimizationLevel: 7 },
    mozjpeg: { quality: 80 },
    pngquant: { quality: [0.8, 0.9], speed: 4 },
    svgo: {
      plugins: [
        { name: 'removeViewBox' },
        { name: 'removeEmptyAttrs', active: false },
      ],
    },
  }),
]
```

### Compression
Enable gzip/brotli compression in your server configuration.

**Nginx:**
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
gzip_min_length 1000;
```

---

## 🔐 Security

### Security Headers

Add to your hosting configuration:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(self), microphone=(), camera=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

### SSL/TLS
Ensure HTTPS is enabled on your domain.

**Vercel/Netlify**: Automatic SSL
**Custom Server**: Use Let's Encrypt

```bash
# Install certbot
sudo apt-get install certbot

# Get certificate
sudo certbot certonly --standalone -d monstrac.com -d www.monstrac.com

# Auto-renewal
sudo certbot renew --dry-run
```

---

## 📊 Monitoring & Analytics

### Google Analytics
Add to `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Sentry Error Tracking
```bash
npm install @sentry/react
```

```typescript
// main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

---

## 🧪 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 📝 Post-Deployment

### Health Checks
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Car listings display
- [ ] Booking flow works
- [ ] Login/signup functional
- [ ] Dashboard accessible
- [ ] 3D viewer renders
- [ ] Mobile responsiveness
- [ ] Performance score (Lighthouse) > 90
- [ ] No console errors

### SEO Checklist
- [ ] Add sitemap.xml
- [ ] Configure robots.txt
- [ ] Submit to Google Search Console
- [ ] Add meta descriptions
- [ ] Configure Open Graph tags
- [ ] Add schema.org markup

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routing Issues (404 on refresh)
Ensure server redirects all requests to `index.html`

### Environment Variables Not Working
- Check variable names start with `VITE_`
- Rebuild after changing env vars
- Verify vars are set in hosting platform

---

## 📞 Support

For deployment issues:
- Check hosting provider documentation
- Review build logs
- Contact support: devops@monstrac.com

---

**Last Updated**: October 2024
