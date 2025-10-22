# 🚀 Quick Deploy Script for Phong Nam Gallery (PowerShell)

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "🚀 DEPLOYING PHONG NAM GALLERY" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Check for uncommitted changes
Write-Host "📋 Checking git status..." -ForegroundColor Yellow
$gitStatus = git status -s
if ($gitStatus) {
    Write-Host "⚠️  You have uncommitted changes!" -ForegroundColor Yellow
    Write-Host ""
    git status -s
    Write-Host ""
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne "y") {
        Write-Host "❌ Deployment cancelled" -ForegroundColor Red
        exit 1
    }
}

# 2. Run build
Write-Host ""
Write-Host "🔨 Building production..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Fix errors before deploying." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green

# 3. Check .env file
Write-Host ""
Write-Host "🔐 Checking environment variables..." -ForegroundColor Yellow
if (-not (Test-Path .env)) {
    Write-Host "⚠️  WARNING: No .env file found!" -ForegroundColor Yellow
    Write-Host "Make sure to add VITE_GEMINI_API_KEY in your deployment platform." -ForegroundColor Yellow
}

# 4. Deploy options
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "📦 DEPLOYMENT OPTIONS" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Deploy to Vercel (vercel --prod)"
Write-Host "2. Deploy to Netlify (netlify deploy --prod)"
Write-Host "3. Manual (just built, upload dist/ folder)"
Write-Host "4. Git push only (git push origin main)"
Write-Host ""
$option = Read-Host "Select option (1-4)"

switch ($option) {
    "1" {
        Write-Host ""
        Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Cyan
        vercel --prod
    }
    "2" {
        Write-Host ""
        Write-Host "🚀 Deploying to Netlify..." -ForegroundColor Cyan
        netlify deploy --prod --dir=dist
    }
    "3" {
        Write-Host ""
        Write-Host "✅ Build complete! Upload dist/ folder to your host." -ForegroundColor Green
        Write-Host "📁 Build location: $(Get-Location)\dist" -ForegroundColor Yellow
    }
    "4" {
        Write-Host ""
        Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
        git add .
        $message = Read-Host "Enter commit message"
        git commit -m "$message"
        git push origin main
        Write-Host "✅ Pushed to GitHub!" -ForegroundColor Green
    }
    default {
        Write-Host "❌ Invalid option" -ForegroundColor Red
        exit 1
    }
}

# 5. Post-deployment reminders
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "✅ DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Post-Deployment Checklist:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. ✓ Add VITE_GEMINI_API_KEY to environment variables"
Write-Host "2. ✓ Test on production URL"
Write-Host "3. ✓ Test File System API (Chrome/Edge only)"
Write-Host "4. ✓ Test image generation"
Write-Host "5. ✓ Test gallery load/save"
Write-Host "6. ✓ Test mobile responsive"
Write-Host ""
Write-Host "🌐 Browser Support:" -ForegroundColor Yellow
Write-Host "   ✅ Chrome 86+"
Write-Host "   ✅ Edge 86+"
Write-Host "   ⚠️  Firefox (limited - no File System API)"
Write-Host "   ⚠️  Safari (limited - no File System API)"
Write-Host ""
Write-Host "📚 See DEPLOYMENT_CHECKLIST.md for full details" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎉 Happy deploying!" -ForegroundColor Green
Write-Host ""
