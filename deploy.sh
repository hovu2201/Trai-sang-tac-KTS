#!/bin/bash

# 🚀 Quick Deploy Script for Phong Nam Gallery

echo "================================================"
echo "🚀 DEPLOYING PHONG NAM GALLERY"
echo "================================================"
echo ""

# 1. Check for uncommitted changes
echo "📋 Checking git status..."
if [[ -n $(git status -s) ]]; then
    echo "⚠️  You have uncommitted changes!"
    echo ""
    git status -s
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Deployment cancelled"
        exit 1
    fi
fi

# 2. Run build
echo ""
echo "🔨 Building production..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Fix errors before deploying."
    exit 1
fi

echo "✅ Build successful!"

# 3. Check .env file
echo ""
echo "🔐 Checking environment variables..."
if [ ! -f .env ]; then
    echo "⚠️  WARNING: No .env file found!"
    echo "Make sure to add VITE_GEMINI_API_KEY in your deployment platform."
fi

# 4. Deploy options
echo ""
echo "================================================"
echo "📦 DEPLOYMENT OPTIONS"
echo "================================================"
echo ""
echo "1. Deploy to Vercel (vercel --prod)"
echo "2. Deploy to Netlify (netlify deploy --prod)"
echo "3. Manual (just built, upload dist/ folder)"
echo "4. Git push only (git push origin main)"
echo ""
read -p "Select option (1-4): " option

case $option in
    1)
        echo ""
        echo "🚀 Deploying to Vercel..."
        vercel --prod
        ;;
    2)
        echo ""
        echo "🚀 Deploying to Netlify..."
        netlify deploy --prod --dir=dist
        ;;
    3)
        echo ""
        echo "✅ Build complete! Upload dist/ folder to your host."
        echo "📁 Build location: $(pwd)/dist"
        ;;
    4)
        echo ""
        echo "📤 Pushing to GitHub..."
        git add .
        read -p "Enter commit message: " message
        git commit -m "$message"
        git push origin main
        echo "✅ Pushed to GitHub!"
        ;;
    *)
        echo "❌ Invalid option"
        exit 1
        ;;
esac

# 5. Post-deployment reminders
echo ""
echo "================================================"
echo "✅ DEPLOYMENT COMPLETE!"
echo "================================================"
echo ""
echo "📋 Post-Deployment Checklist:"
echo ""
echo "1. ✓ Add VITE_GEMINI_API_KEY to environment variables"
echo "2. ✓ Test on production URL"
echo "3. ✓ Test File System API (Chrome/Edge only)"
echo "4. ✓ Test image generation"
echo "5. ✓ Test gallery load/save"
echo "6. ✓ Test mobile responsive"
echo ""
echo "🌐 Browser Support:"
echo "   ✅ Chrome 86+"
echo "   ✅ Edge 86+"
echo "   ⚠️  Firefox (limited - no File System API)"
echo "   ⚠️  Safari (limited - no File System API)"
echo ""
echo "📚 See DEPLOYMENT_CHECKLIST.md for full details"
echo ""
echo "🎉 Happy deploying!"
echo ""
