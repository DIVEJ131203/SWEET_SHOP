# 🚀 Sweet Shop - Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com)
- MongoDB Atlas account (for production database)

## Step 1: Prepare Your Code

### 1.1 Push to GitHub
```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial commit - Sweet Shop application"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/sweet-shop.git
git branch -M main
git push -u origin main
```

## Step 2: Set Up MongoDB Atlas (Production Database)

### 2.1 Create MongoDB Atlas Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up/Login and create a new project
3. Create a new cluster (choose free tier)
4. Create a database user with read/write permissions
5. Add your IP address to the IP whitelist (or use 0.0.0.0/0 for all IPs)
6. Get your connection string (it will look like):
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sweetshop?retryWrites=true&w=majority
   ```

## Step 3: Deploy Backend to Vercel

### 3.1 Deploy Backend
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select the `BACKEND` folder as the root directory
5. Set the following environment variables in Vercel:

**Environment Variables for Backend:**
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sweetshop?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
PORT=3000
```

6. Deploy the backend
7. Note the backend URL (e.g., `https://your-backend.vercel.app`)

### 3.2 Seed Production Database
After backend deployment, you can seed the database by visiting:
```
https://your-backend.vercel.app/api/seed
```
Or create a manual seed endpoint in your backend.

## Step 4: Deploy Frontend to Vercel

### 4.1 Deploy Frontend
1. In Vercel Dashboard, click "New Project" again
2. Import the same GitHub repository
3. Select the `FRONTEND/frontend` folder as the root directory
4. Set the following environment variables:

**Environment Variables for Frontend:**
```
VITE_API_URL=https://your-backend.vercel.app/api
```

5. Deploy the frontend
6. Your frontend will be available at `https://your-frontend.vercel.app`

## Step 5: Configure CORS (Important!)

Update your backend CORS configuration to allow your frontend domain:

In `BACKEND/src/server.js` or wherever CORS is configured:
```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://your-frontend.vercel.app'  // Add your frontend URL
  ],
  credentials: true
};
```

## Step 6: Test Your Deployment

### 6.1 Test Login Credentials
- **Admin**: admin@sweetshop.com / admin123
- **User**: user@sweetshop.com / user123

### 6.2 Test Core Features
1. ✅ User registration and login
2. ✅ Browse sweets catalog
3. ✅ Add items to cart
4. ✅ Place orders
5. ✅ Admin dashboard
6. ✅ Order management

## Step 7: Custom Domain (Optional)

### 7.1 Add Custom Domain
1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Configure DNS records as instructed by Vercel
4. Update CORS settings to include your custom domain

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure frontend URL is added to CORS whitelist
2. **Database Connection**: Verify MongoDB Atlas connection string and IP whitelist
3. **Environment Variables**: Double-check all environment variables are set correctly
4. **Build Errors**: Check build logs in Vercel dashboard

### Environment Variables Summary:

**Backend (.env):**
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
PORT=3000
```

**Frontend (.env):**
```
VITE_API_URL=https://your-backend.vercel.app/api
```

## Final URLs Structure:
- **Frontend**: `https://your-frontend.vercel.app`
- **Backend API**: `https://your-backend.vercel.app/api`
- **Admin Panel**: `https://your-frontend.vercel.app/admin`

## Security Notes:
1. Use strong JWT secrets
2. Restrict MongoDB Atlas IP access if possible
3. Enable HTTPS only in production
4. Regularly update dependencies

## Support:
If you encounter issues, check:
1. Vercel deployment logs
2. Browser console for frontend errors
3. Network tab for API call failures
4. MongoDB Atlas logs for database issues

Happy Deploying! 🎉