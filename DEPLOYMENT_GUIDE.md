# Coralreaf eCommerce - Deployment Guide

## 🚀 Quick Deployment to Vercel

### Prerequisites
- Node.js 18+ installed
- Git repository
- Vercel account

### Step 1: Prepare Your Project
\`\`\`bash
# Clone the repository
git clone <your-repo-url>
cd coralreaf-ecommerce

# Install dependencies
npm install

# Build the project locally to test
npm run build
\`\`\`

### Step 2: Deploy to Vercel
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# ? Set up and deploy "~/coralreaf-ecommerce"? [Y/n] y
# ? Which scope do you want to deploy to? [Your Account]
# ? Link to existing project? [y/N] n
# ? What's your project's name? coralreaf-ecommerce
# ? In which directory is your code located? ./
\`\`\`

### Step 3: Configure Environment Variables
In your Vercel dashboard, go to Settings > Environment Variables and add:

\`\`\`env
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-super-secret-key-here

# Database (when ready)
DATABASE_URL=your-database-connection-string

# Email Service (when ready)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@coralreaf.com

# Payment Providers (when ready)
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
\`\`\`

## 🗄️ Database Setup Options

### Option 1: Supabase (Recommended)
\`\`\`bash
# 1. Create account at supabase.com
# 2. Create new project
# 3. Get connection string from Settings > Database
# 4. Add to environment variables:
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres
\`\`\`

### Option 2: Neon
\`\`\`bash
# 1. Create account at neon.tech
# 2. Create new project
# 3. Get connection string
# 4. Add to environment variables:
DATABASE_URL=postgresql://[user]:[password]@[host]/[database]
\`\`\`

### Option 3: PlanetScale
\`\`\`bash
# 1. Create account at planetscale.com
# 2. Create new database
# 3. Get connection string
# 4. Add to environment variables:
DATABASE_URL=mysql://[user]:[password]@[host]/[database]?sslaccept=strict
\`\`\`

## 📧 Email Service Setup

### Option 1: Gmail SMTP
\`\`\`env
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password  # Generate app password in Gmail
EMAIL_FROM=noreply@coralreaf.com
\`\`\`

### Option 2: SendGrid
\`\`\`env
EMAIL_SERVER_HOST=smtp.sendgrid.net
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=apikey
EMAIL_SERVER_PASSWORD=your-sendgrid-api-key
EMAIL_FROM=noreply@coralreaf.com
\`\`\`

### Option 3: Resend (Recommended)
\`\`\`env
RESEND_API_KEY=re_your-api-key
EMAIL_FROM=noreply@coralreaf.com
\`\`\`

## 💳 Payment Provider Setup

### Stripe Setup
1. Create account at stripe.com
2. Get API keys from Dashboard > Developers > API keys
3. Set up webhook endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`
4. Add webhook events: `payment_intent.succeeded`, `payment_intent.payment_failed`

\`\`\`env
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
\`\`\`

### PayPal Setup
1. Create account at developer.paypal.com
2. Create new app
3. Get Client ID and Secret

\`\`\`env
PAYPAL_CLIENT_ID=your-client-id
PAYPAL_CLIENT_SECRET=your-client-secret
PAYPAL_ENVIRONMENT=production  # or sandbox for testing
\`\`\`

## 📁 File Storage Setup

### Option 1: Vercel Blob
\`\`\`bash
# Install Vercel Blob
npm install @vercel/blob

# Add to environment variables:
BLOB_READ_WRITE_TOKEN=your-blob-token
\`\`\`

### Option 2: Cloudinary
\`\`\`env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
\`\`\`

### Option 3: AWS S3
\`\`\`env
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
\`\`\`

## 📊 Analytics Setup

### Google Analytics 4
1. Create GA4 property at analytics.google.com
2. Get Measurement ID
3. Add to environment variables:

\`\`\`env
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
\`\`\`

### Vercel Analytics
\`\`\`bash
# Install Vercel Analytics
npm install @vercel/analytics

# Add to environment variables:
VERCEL_ANALYTICS_ID=your-analytics-id
\`\`\`

## 🔒 Security Checklist

### SSL Certificate
- ✅ Automatic with Vercel
- ✅ Force HTTPS redirect

### Environment Variables
- ✅ Never commit secrets to Git
- ✅ Use different keys for development/production
- ✅ Rotate keys regularly

### Authentication Security
- ✅ Strong JWT secret (32+ characters)
- ✅ Secure session configuration
- ✅ Rate limiting on auth endpoints

### Payment Security
- ✅ Use Stripe/PayPal official SDKs
- ✅ Never store payment details
- ✅ Validate webhooks

## 🚨 Monitoring Setup

### Error Tracking with Sentry
\`\`\`bash
# Install Sentry
npm install @sentry/nextjs

# Add to environment variables:
SENTRY_DSN=your-sentry-dsn
\`\`\`

### Uptime Monitoring
- **UptimeRobot**: Free uptime monitoring
- **Pingdom**: Advanced monitoring
- **Vercel Analytics**: Built-in monitoring

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:

\`\`\`yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Build project
        run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
\`\`\`

## 🌍 Custom Domain Setup

### Step 1: Add Domain in Vercel
1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records

### Step 2: DNS Configuration
Add these records to your DNS provider:

\`\`\`
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
\`\`\`

## 📱 PWA Configuration

### Add PWA Manifest
Create `public/manifest.json`:

\`\`\`json
{
  "name": "Coralreaf - Sustainable Fashion",
  "short_name": "Coralreaf",
  "description": "Eco-friendly clothing for conscious consumers",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#F5F5DC",
  "theme_color": "#8B9467",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
\`\`\`

## 🔧 Performance Optimization

### Image Optimization
- Use Next.js Image component
- Optimize images before upload
- Use WebP format when possible
- Implement lazy loading

### Caching Strategy
\`\`\`javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
\`\`\`

### Bundle Optimization
\`\`\`javascript
// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}
\`\`\`

## 📋 Pre-Launch Checklist

### Functionality Testing
- [ ] User registration/login works
- [ ] Product browsing and search
- [ ] Add to cart functionality
- [ ] Checkout process
- [ ] Payment processing
- [ ] Order confirmation emails
- [ ] Admin dashboard access

### Performance Testing
- [ ] Page load times < 3 seconds
- [ ] Mobile responsiveness
- [ ] Image optimization
- [ ] Core Web Vitals scores

### Security Testing
- [ ] SSL certificate active
- [ ] Environment variables secure
- [ ] Authentication working
- [ ] Payment security verified

### SEO Optimization
- [ ] Meta tags configured
- [ ] Sitemap generated
- [ ] Google Analytics setup
- [ ] Open Graph tags

## 🚀 Go Live Steps

1. **Final Testing**: Test all functionality in production environment
2. **DNS Update**: Point your domain to Vercel
3. **SSL Verification**: Ensure HTTPS is working
4. **Analytics**: Verify tracking is working
5. **Monitoring**: Set up uptime monitoring
6. **Backup**: Ensure database backups are configured
7. **Launch**: Announce your store is live!

## 📞 Support Resources

### Vercel Support
- Documentation: vercel.com/docs
- Community: github.com/vercel/vercel/discussions
- Support: vercel.com/support

### Payment Provider Support
- Stripe: stripe.com/docs
- PayPal: developer.paypal.com/docs

### Database Support
- Supabase: supabase.com/docs
- Neon: neon.tech/docs
- PlanetScale: planetscale.com/docs
