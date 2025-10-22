# Vercel Deployment Guide for Monstrac CarRent

This guide will help you deploy the Monstrac CarRent portal to Vercel.

## 🚀 Quick Deployment

### Method 1: Deploy from GitHub (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a React app

3. **Configure Build Settings**
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

4. **Set Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add the following variables:
     ```
     REACT_APP_API_URL=https://your-api.vercel.app/api
     REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
     REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_key
     ```

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Method 2: Deploy with Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from project directory**
   ```bash
   vercel
   ```

4. **Follow the prompts**
   - Link to existing project or create new
   - Set up environment variables
   - Deploy

## ⚙️ Configuration

### Build Configuration

The project includes a `vercel.json` file with optimized settings:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "headers": {
        "cache-control": "public, max-age=31536000, immutable"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Environment Variables

Set these in Vercel Dashboard → Project Settings → Environment Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `https://api.monstrac.com` |
| `REACT_APP_STRIPE_PUBLISHABLE_KEY` | Stripe public key | `pk_test_...` |
| `REACT_APP_GOOGLE_MAPS_API_KEY` | Google Maps API key | `AIza...` |
| `REACT_APP_TWILIO_ACCOUNT_SID` | Twilio account SID | `AC...` |
| `REACT_APP_SENDGRID_API_KEY` | SendGrid API key | `SG...` |

### Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Enable SSL (automatic with Vercel)

## 🔧 Build Optimization

### Pre-deployment Checklist

- [ ] All environment variables set
- [ ] Build command configured correctly
- [ ] Output directory set to `build`
- [ ] Static file caching configured
- [ ] SPA routing configured for React Router

### Performance Optimizations

The project includes several optimizations:

1. **Code Splitting**: Automatic with Create React App
2. **Static Asset Caching**: Configured in `vercel.json`
3. **Gzip Compression**: Automatic with Vercel
4. **CDN**: Global edge network
5. **Image Optimization**: Automatic with Vercel

## 📊 Monitoring

### Vercel Analytics

1. Enable Vercel Analytics in project settings
2. Monitor performance metrics
3. Track user interactions
4. Analyze Core Web Vitals

### Error Tracking

Consider adding error tracking:

```bash
npm install @sentry/react @sentry/tracing
```

## 🔄 Continuous Deployment

### Automatic Deployments

- **Production**: Deploys from `main` branch
- **Preview**: Deploys from feature branches
- **Development**: Deploys from pull requests

### Manual Deployments

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails**
   - Check Node.js version (18+)
   - Verify all dependencies installed
   - Check for TypeScript errors

2. **Environment Variables Not Working**
   - Ensure variables start with `REACT_APP_`
   - Redeploy after adding variables
   - Check variable names match exactly

3. **Routing Issues**
   - Verify `vercel.json` routes configuration
   - Check React Router setup
   - Ensure all routes redirect to `index.html`

4. **Performance Issues**
   - Enable Vercel Analytics
   - Check bundle size
   - Optimize images
   - Use lazy loading

### Debug Commands

```bash
# Check build locally
npm run build

# Test production build
npx serve -s build

# Check bundle size
npm run build && npx bundle-analyzer build/static/js/*.js
```

## 📈 Scaling

### Vercel Pro Features

- **Bandwidth**: 1TB included
- **Function Execution**: 1000GB-hours
- **Edge Functions**: Global edge network
- **Analytics**: Advanced metrics
- **Team Collaboration**: Multiple team members

### Performance Monitoring

- Monitor Core Web Vitals
- Set up alerts for performance regressions
- Use Vercel Speed Insights
- Track user experience metrics

## 🔒 Security

### Security Headers

Vercel automatically includes security headers:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-XSS-Protection: 1; mode=block`

### HTTPS

- Automatic SSL certificates
- HTTP to HTTPS redirects
- HSTS headers included

## 📞 Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Status Page**: [vercel-status.com](https://vercel-status.com)

---

**Your Monstrac CarRent portal is now ready for production! 🚀**