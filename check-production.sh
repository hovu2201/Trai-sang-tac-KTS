#!/bin/bash

# Production Readiness Check Script
# Run this before deploying

echo "🔍 Checking Production Readiness..."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node version
echo "📦 Checking Node.js version..."
NODE_VERSION=$(node -v)
echo "   Node version: $NODE_VERSION"

if [[ "$NODE_VERSION" < "v18" ]]; then
    echo -e "${RED}❌ Node.js version should be 18 or higher${NC}"
    exit 1
else
    echo -e "${GREEN}✅ Node.js version OK${NC}"
fi

echo ""

# Check npm version
echo "📦 Checking npm version..."
NPM_VERSION=$(npm -v)
echo "   npm version: $NPM_VERSION"
echo -e "${GREEN}✅ npm OK${NC}"

echo ""

# Check if .env.local exists
echo "🔐 Checking environment variables..."
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  .env.local not found (OK for deployment platforms)${NC}"
else
    echo -e "${GREEN}✅ .env.local found${NC}"
fi

if [ ! -f ".env.local.example" ]; then
    echo -e "${RED}❌ .env.local.example not found${NC}"
else
    echo -e "${GREEN}✅ .env.local.example found${NC}"
fi

echo ""

# Check .gitignore
echo "📝 Checking .gitignore..."
if grep -q ".env.local" .gitignore; then
    echo -e "${GREEN}✅ .env.local in .gitignore${NC}"
else
    echo -e "${RED}❌ .env.local NOT in .gitignore!${NC}"
fi

echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install --silent
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi

echo ""

# TypeScript check
echo "🔍 Checking TypeScript..."
npx tsc --noEmit
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ TypeScript check passed${NC}"
else
    echo -e "${RED}❌ TypeScript errors found${NC}"
    exit 1
fi

echo ""

# Build
echo "🔨 Building production bundle..."
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

echo ""

# Check bundle size
echo "📊 Checking bundle size..."
DIST_SIZE=$(du -sh dist | cut -f1)
echo "   Bundle size: $DIST_SIZE"

if [ -d "dist" ]; then
    echo -e "${GREEN}✅ dist/ folder created${NC}"
    
    # Count files
    FILE_COUNT=$(find dist -type f | wc -l)
    echo "   Files in dist/: $FILE_COUNT"
    
    # Check for index.html
    if [ -f "dist/index.html" ]; then
        echo -e "${GREEN}✅ index.html found${NC}"
    else
        echo -e "${RED}❌ index.html not found in dist/${NC}"
    fi
else
    echo -e "${RED}❌ dist/ folder not found${NC}"
    exit 1
fi

echo ""

# Check for hardcoded API keys
echo "🔐 Checking for hardcoded API keys..."
if grep -r "AIza" src/ 2>/dev/null | grep -v ".env" | grep -v "example"; then
    echo -e "${RED}❌ Possible hardcoded API key found!${NC}"
else
    echo -e "${GREEN}✅ No hardcoded API keys detected${NC}"
fi

echo ""

# Check deployment configs
echo "📄 Checking deployment configs..."

if [ -f "vercel.json" ]; then
    echo -e "${GREEN}✅ vercel.json found${NC}"
else
    echo -e "${YELLOW}⚠️  vercel.json not found${NC}"
fi

if [ -f "netlify.toml" ]; then
    echo -e "${GREEN}✅ netlify.toml found${NC}"
else
    echo -e "${YELLOW}⚠️  netlify.toml not found${NC}"
fi

echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}🎉 PRODUCTION READY!${NC}"
echo ""
echo "Next steps:"
echo "1. Test preview: npm run preview"
echo "2. Commit: git add . && git commit -m 'Ready for deployment'"
echo "3. Push: git push"
echo "4. Deploy: Visit vercel.com or netlify.com"
echo ""
echo "Don't forget to:"
echo "- Add GEMINI_API_KEY to your deployment platform"
echo "- Test on production URL after deployment"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
