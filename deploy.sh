#!/bin/bash

# Sweet Shop Deployment Helper Script

echo "🍬 Sweet Shop Deployment Helper"
echo "================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📝 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - Sweet Shop application"
    echo "✅ Git repository initialized"
else
    echo "📝 Adding changes to Git..."
    git add .
    git commit -m "Deployment preparation - $(date)"
    echo "✅ Changes committed"
fi

echo ""
echo "🚀 Next Steps for Vercel Deployment:"
echo "1. Push to GitHub: git remote add origin <your-repo-url> && git push -u origin main"
echo "2. Go to vercel.com and import your repository"
echo "3. Deploy backend first (BACKEND folder)"
echo "4. Deploy frontend second (FRONTEND/frontend folder)"
echo "5. Set up environment variables as described in VERCEL_DEPLOYMENT_GUIDE.md"
echo ""
echo "📖 Read VERCEL_DEPLOYMENT_GUIDE.md for detailed instructions"
echo ""
echo "🎉 Happy Deploying!"