# 🚀 Deployment Guide

## Deployment Options

This guide covers deploying the Sweet Shop Management System to popular hosting platforms.

## Backend Deployment

### Option 1: Railway (Recommended)

1. **Create Railway Account**
   - Visit https://railway.app
   - Sign up with GitHub

2. **Deploy Backend**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login
   railway login
   
   # Navigate to backend
   cd BACKEND
   
   # Initialize project
   railway init
   
   # Deploy
   railway up
   ```

3. **Set Environment Variables**
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_production_jwt_secret
   NODE_ENV=production
   ```

4. **Add MongoDB Atlas**
   - Create free cluster at https://mongodb.com/atlas
   - Get connection string
   - Add to Railway environment variables

### Option 2: Render

1. **Create Render Account**
   - Visit https://render.com
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Root Directory: `BACKEND`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Environment Variables**
   Add in Render dashboard:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_production_jwt_secret
   NODE_ENV=production
   ```

### Option 3: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Deploy**
   ```bash
   cd BACKEND
   heroku login
   heroku create sweetshop-api
   
   # Set environment variables
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set NODE_ENV=production
   
   # Deploy
   git push heroku main
   ```

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd FRONTEND/frontend
   vercel login
   vercel
   ```

3. **Configure**
   - Root Directory: `FRONTEND/frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Environment Variables**
   Add in Vercel dashboard:
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```

5. **Update API URL**
   In `FRONTEND/frontend/src/services/api.js`:
   ```javascript
   const api = axios.create({
     baseURL: import.meta.env.VITE_API_URL || '/api',
     headers: {
       'Content-Type': 'application/json'
     }
   });
   ```

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build**
   ```bash
   cd FRONTEND/frontend
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify login
   netlify deploy --prod --dir=dist
   ```

4. **Configure Redirects**
   Create `FRONTEND/frontend/public/_redirects`:
   ```
   /*    /index.html   200
   ```

### Option 3: GitHub Pages

1. **Update vite.config.js**
   ```javascript
   export default defineConfig({
     base: '/sweetshop/',
     plugins: [react()],
     // ... rest of config
   });
   ```

2. **Build and Deploy**
   ```bash
   cd FRONTEND/frontend
   npm run build
   
   # Deploy to gh-pages branch
   npx gh-pages -d dist
   ```

## MongoDB Atlas Setup

1. **Create Cluster**
   - Visit https://mongodb.com/atlas
   - Create free M0 cluster
   - Choose region closest to your backend

2. **Create Database User**
   - Database Access → Add New User
   - Choose password authentication
   - Save credentials

3. **Whitelist IP**
   - Network Access → Add IP Address
   - Allow access from anywhere: `0.0.0.0/0`
   - (For production, restrict to your backend IPs)

4. **Get Connection String**
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `sweetshop`

   Example:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sweetshop?retryWrites=true&w=majority
   ```

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sweetshop
JWT_SECRET=your_super_secret_production_key_min_32_chars
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.vercel.app
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.railway.app/api
```

## Post-Deployment Checklist

### Backend
- [ ] Environment variables set correctly
- [ ] MongoDB connection working
- [ ] Health check endpoint responding: `/api/health`
- [ ] CORS configured for frontend domain
- [ ] JWT secret is strong and unique
- [ ] Logs are accessible

### Frontend
- [ ] API URL points to deployed backend
- [ ] Build completes without errors
- [ ] All routes work (no 404s)
- [ ] Authentication flow works
- [ ] Assets load correctly
- [ ] Responsive design works

### Testing
- [ ] Register new user
- [ ] Login works
- [ ] Create sweet (admin)
- [ ] Purchase sweet (user)
- [ ] Search and filter work
- [ ] Edit and delete work (admin)

## CORS Configuration

Update `BACKEND/src/server.js`:

```javascript
import cors from 'cors';

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsOptions));
```

## Custom Domain Setup

### Backend (Railway)
1. Railway Dashboard → Settings → Domains
2. Add custom domain
3. Update DNS records as instructed

### Frontend (Vercel)
1. Vercel Dashboard → Settings → Domains
2. Add custom domain
3. Update DNS records as instructed

## Monitoring & Logging

### Backend Logging
Add logging service like:
- **Logtail** (https://logtail.com)
- **Papertrail** (https://papertrailapp.com)

```javascript
// Add to server.js
import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ]
});
```

### Uptime Monitoring
- **UptimeRobot** (https://uptimerobot.com)
- **Pingdom** (https://pingdom.com)

## Performance Optimization

### Backend
1. Enable compression:
   ```javascript
   import compression from 'compression';
   app.use(compression());
   ```

2. Add rate limiting:
   ```javascript
   import rateLimit from 'express-rate-limit';
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 100
   });
   app.use('/api/', limiter);
   ```

### Frontend
1. Code splitting already handled by Vite
2. Lazy load routes:
   ```javascript
   const Dashboard = lazy(() => import('./pages/Dashboard'));
   ```

## Security Checklist

- [ ] HTTPS enabled (automatic on Vercel/Railway)
- [ ] Environment variables not in code
- [ ] JWT secret is strong (32+ characters)
- [ ] MongoDB user has minimal permissions
- [ ] CORS restricted to frontend domain
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] Passwords hashed with bcrypt
- [ ] No sensitive data in logs

## Troubleshooting

### Backend Issues

**MongoDB Connection Failed**
- Check connection string format
- Verify database user credentials
- Ensure IP whitelist includes backend server

**JWT Errors**
- Verify JWT_SECRET is set
- Check token expiration time
- Ensure secret is same across deployments

**CORS Errors**
- Add frontend URL to CORS_ORIGIN
- Check credentials: true in CORS config

### Frontend Issues

**API Calls Failing**
- Verify VITE_API_URL is correct
- Check backend is running
- Inspect network tab for errors

**Build Errors**
- Clear node_modules and reinstall
- Check for TypeScript errors
- Verify all imports are correct

**Routing Issues**
- Add _redirects file for Netlify
- Configure vercel.json for Vercel

## Rollback Strategy

### Railway/Render
- Use dashboard to rollback to previous deployment
- Or redeploy from specific git commit

### Vercel
- Deployments → Previous deployment → Promote to Production

## Cost Estimates

### Free Tier (Recommended for Testing)
- **MongoDB Atlas:** Free M0 cluster (512MB)
- **Railway:** $5 credit/month (enough for small apps)
- **Vercel:** Unlimited for personal projects
- **Total:** ~$0-5/month

### Production Tier
- **MongoDB Atlas:** M10 cluster (~$57/month)
- **Railway:** ~$10-20/month
- **Vercel:** Pro plan ($20/month)
- **Total:** ~$87-97/month

## Support

For deployment issues:
- Railway: https://railway.app/help
- Vercel: https://vercel.com/support
- MongoDB Atlas: https://support.mongodb.com

---

**Last Updated:** November 1, 2025
