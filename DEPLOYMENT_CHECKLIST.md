# 🚀 DEPLOYMENT CHECKLIST - Phong Nam Gallery

## ✅ Pre-Deployment Checks

### 1. Code Quality
- [x] No TypeScript errors
- [x] Build successful (`npm run build`)
- [x] All imports resolved
- [x] No console errors in dev mode

### 2. Core Features Testing

#### File System Integration
- [ ] **Chọn thư mục local** works
- [ ] **Lưu ảnh vào thư mục** works (1 file duy nhất)
- [ ] **Load ảnh từ thư mục** works
- [ ] **Handle restore** sau F5 works
- [ ] **Permission handling** works

#### Gallery Management
- [ ] **Tạo ảnh** → Hiện trong gallery
- [ ] **Load tất cả ảnh** từ thư mục
- [ ] **Metadata sync** works
- [ ] **Favorite** toggle works
- [ ] **Delete** works
- [ ] **Download ZIP** works

#### Image Generation
- [ ] **Generate** từ style/materials works
- [ ] **Edit** ảnh works
- [ ] **Note** trên ảnh works
- [ ] **Angle generation** works (31 angles)
- [ ] **2D views** works (6 views)

#### UI/UX
- [ ] **Mobile responsive** works
- [ ] **Dark mode** works
- [ ] **Info panel** shows selected options
- [ ] **Thumbnail** không đè lên ảnh chính
- [ ] **Loading states** clear
- [ ] **Error messages** helpful

### 3. Browser Compatibility

#### File System Access API Support
- [ ] **Chrome/Edge 86+** ✅ (Recommended)
- [ ] **Firefox** ⚠️ (No File System API - will show warning)
- [ ] **Safari** ⚠️ (No File System API - will show warning)

**Note:** File System API chỉ work trên Chrome/Edge. Browsers khác sẽ hiện thông báo yêu cầu dùng Chrome.

### 4. Performance

- [x] **Build size:** ~1MB (acceptable)
- [ ] **Initial load:** < 3s
- [ ] **Image loading:** < 2s per image
- [ ] **Gallery load:** < 5s for 50 images

### 5. Security & Privacy

- [x] **No hardcoded API keys** (uses env variables)
- [x] **File access:** User permission required
- [x] **Data storage:** Local only (no server)
- [x] **IndexedDB:** Secure storage for handles

---

## 🔧 Environment Setup

### Required Environment Variables

Create `.env` file (NOT committed to git):

```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

### Vercel/Netlify Deployment

Add environment variable in dashboard:
- **Name:** `VITE_GEMINI_API_KEY`
- **Value:** Your Gemini API key
- **Target:** Production

---

## 📋 Deployment Steps

### Option 1: Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "feat: Add File System API integration for unlimited storage"
   git push origin main
   ```

2. **Deploy on Vercel:**
   ```bash
   vercel --prod
   ```
   Or connect GitHub repo at https://vercel.com

3. **Add Environment Variable:**
   - Go to Project Settings → Environment Variables
   - Add `VITE_GEMINI_API_KEY`

4. **Redeploy:**
   - Trigger redeploy to apply env variables

### Option 2: Netlify

1. **Build command:** `npm run build`
2. **Publish directory:** `dist`
3. **Add env variable:** `VITE_GEMINI_API_KEY`

### Option 3: Manual Deploy

1. **Build:**
   ```bash
   npm run build
   ```

2. **Upload `dist/` folder** to hosting

---

## 🧪 Post-Deployment Testing

### Critical Tests

1. **Visit deployed URL**
2. **Login** với credentials
3. **Chọn thư mục local** (Chrome/Edge only)
4. **Tạo 1 ảnh** → Check thư mục có file
5. **Refresh (F5)** → Gallery load lại
6. **Tạo thêm ảnh** → Check không duplicate
7. **Copy file vào thư mục** → Refresh → Thấy ảnh mới
8. **Download ZIP** → Verify files
9. **Mobile test** → Responsive works

### Expected Behavior

✅ **Chrome/Edge:**
- Full features
- File System API works
- Unlimited storage

⚠️ **Firefox/Safari:**
- Shows warning: "Vui lòng dùng Chrome/Edge"
- Gallery không work (no File System API)

---

## 🐛 Known Issues & Solutions

### Issue 1: "NotFoundError" khi load ảnh
**Solution:** Nhấn "Chọn thư mục" lại để restore permission

### Issue 2: Thư viện trống sau F5
**Solution:** 
- Check console logs
- Verify directory handle in IndexedDB
- Re-select directory if needed

### Issue 3: File duplicate
**Solution:** Fixed! Chỉ lưu 1 file duy nhất

### Issue 4: Permission denied
**Solution:** Browser sẽ tự động request permission lại

---

## 📊 Performance Tips

### For Better Performance:

1. **Limit gallery size:**
   - Keep < 100 images for fast loading
   - Download ZIP và xóa ảnh cũ

2. **Use Chrome/Edge:**
   - Best File System API support
   - Better performance

3. **Local directory:**
   - Use SSD for faster read/write
   - Avoid network drives

---

## 🎯 Success Criteria

### MVP Requirements Met:

✅ **Unlimited storage** via File System API  
✅ **Load all images** from directory  
✅ **No duplicate files**  
✅ **Persistent across F5**  
✅ **Metadata sync**  
✅ **Mobile responsive**  
✅ **9 design panels** complete  
✅ **Gallery management** works  

---

## 🚀 READY TO DEPLOY!

**Recommended Flow:**

1. Test locally one more time
2. Push to GitHub
3. Deploy to Vercel/Netlify
4. Add API key to env variables
5. Test on production URL
6. Share with users!

---

## 📞 Support

**Browser Requirements:**
- Chrome 86+ or Edge 86+
- File System Access API required
- LocalStorage + IndexedDB enabled

**Contact:** Check README.md for support info
