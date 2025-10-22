# 🚀 Hướng dẫn Deploy Ứng dụng

## 📋 Tổng quan các nền tảng

| Nền tảng | Miễn phí | Dễ dàng | SSL | Custom Domain | Khuyên dùng |
|----------|----------|---------|-----|---------------|-------------|
| **Vercel** | ✅ | ⭐⭐⭐⭐⭐ | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| **Netlify** | ✅ | ⭐⭐⭐⭐⭐ | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| **GitHub Pages** | ✅ | ⭐⭐⭐⭐ | ✅ | ✅ | ⭐⭐⭐⭐ |
| **Cloudflare Pages** | ✅ | ⭐⭐⭐⭐ | ✅ | ✅ | ⭐⭐⭐⭐ |
| **Render** | ✅ | ⭐⭐⭐ | ✅ | ✅ | ⭐⭐⭐ |

---

## 🏆 1. Vercel (KHUYÊN DÙNG NHẤT)

### Ưu điểm:
- ✅ **Cực kỳ dễ dàng** - 3 bước là xong
- ✅ **Tự động deploy** khi push code
- ✅ **Edge Network toàn cầu** - Nhanh ở Việt Nam
- ✅ **Environment variables** dễ cấu hình
- ✅ **SSL tự động**
- ✅ **Preview cho mỗi PR**
- ✅ **Analytics miễn phí**

### Bước deploy:

#### Cách 1: Qua GitHub (Tự động)
1. **Push code lên GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/repo-name.git
   git push -u origin main
   ```

2. **Truy cập Vercel**:
   - Đi đến: https://vercel.com/
   - Đăng nhập bằng GitHub
   - Click **"Add New Project"**

3. **Import Repository**:
   - Chọn repository vừa push
   - Click **"Import"**

4. **Cấu hình**:
   - Framework Preset: **Vite** (tự động detect)
   - Build Command: `npm run build` (mặc định)
   - Output Directory: `dist` (mặc định)
   - Install Command: `npm install` (mặc định)

5. **Environment Variables**:
   - Click **"Environment Variables"**
   - Thêm: `GEMINI_API_KEY` = `your_api_key_here`

6. **Deploy**:
   - Click **"Deploy"**
   - Đợi 1-2 phút
   - ✅ Xong! URL: `https://project-name.vercel.app`

#### Cách 2: Qua CLI (Nhanh hơn)
```bash
# Cài Vercel CLI
npm i -g vercel

# Deploy
vercel

# Thêm API key
vercel env add GEMINI_API_KEY

# Deploy production
vercel --prod
```

### Custom Domain (Optional):
1. Vercel Dashboard → Project → Settings → Domains
2. Add domain: `phongnam.yourdomain.com`
3. Cấu hình DNS theo hướng dẫn

---

## 🌐 2. Netlify

### Ưu điểm:
- ✅ Dễ dùng như Vercel
- ✅ Drag & drop deploy
- ✅ Forms & Functions miễn phí
- ✅ Split testing
- ✅ 100GB bandwidth/tháng

### Bước deploy:

#### Cách 1: Drag & Drop (Siêu nhanh)
1. Build local:
   ```bash
   npm run build
   ```

2. Truy cập: https://app.netlify.com/drop

3. Kéo thả folder `dist/` vào

4. Thêm API key:
   - Site Settings → Environment variables
   - Add: `GEMINI_API_KEY`

5. ✅ Xong! URL: `https://random-name.netlify.app`

#### Cách 2: Qua GitHub (Tự động)
1. Push code lên GitHub

2. Netlify Dashboard:
   - Click **"Add new site"** → Import from Git
   - Chọn GitHub → Authorize
   - Chọn repository

3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

4. Environment variables:
   - Add `GEMINI_API_KEY`

5. Click **"Deploy site"**

#### Cách 3: CLI
```bash
# Cài Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod

# Thêm env
netlify env:set GEMINI_API_KEY your_key_here
```

---

## 📦 3. GitHub Pages

### Ưu điểm:
- ✅ Hoàn toàn miễn phí
- ✅ Tích hợp GitHub
- ✅ Không giới hạn bandwidth

### Nhược điểm:
- ⚠️ Không hỗ trợ env variables phía server
- ⚠️ Cần hardcode API key (không an toàn)

### Bước deploy:

1. **Cập nhật vite.config.ts**:
   ```typescript
   export default defineConfig({
     base: '/repo-name/', // Tên repository
     // ...
   })
   ```

2. **Cài gh-pages**:
   ```bash
   npm install -D gh-pages
   ```

3. **Thêm vào package.json**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Cấu hình GitHub**:
   - Repository → Settings → Pages
   - Source: **gh-pages branch**
   - ✅ URL: `https://username.github.io/repo-name/`

### ⚠️ Lưu ý về API key:
GitHub Pages không hỗ trợ env variables. Có 2 cách:

**Cách 1**: Hardcode (không khuyên dùng):
```typescript
const API_KEY = 'AIza...';
```

**Cách 2**: Prompt user nhập key (khuyên dùng):
```typescript
const API_KEY = localStorage.getItem('gemini_api_key') || prompt('Enter API key');
```

---

## ☁️ 4. Cloudflare Pages

### Ưu điểm:
- ✅ Edge network toàn cầu
- ✅ Không giới hạn bandwidth
- ✅ Không giới hạn requests
- ✅ Workers để xử lý server-side

### Bước deploy:

1. **Truy cập**: https://pages.cloudflare.com/

2. **Create project**:
   - Connect to Git → GitHub
   - Select repository

3. **Build settings**:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output: `dist`

4. **Environment variables**:
   - Add `GEMINI_API_KEY`

5. **Save and Deploy**

6. ✅ URL: `https://project-name.pages.dev`

---

## 🎯 5. Render

### Ưu điểm:
- ✅ Static sites miễn phí
- ✅ Auto SSL
- ✅ Pull request previews

### Bước deploy:

1. **Truy cập**: https://render.com/

2. **New Static Site**:
   - Connect GitHub
   - Select repository

3. **Settings**:
   - Build Command: `npm run build`
   - Publish Directory: `dist`

4. **Environment**:
   - Add `GEMINI_API_KEY`

5. **Create Static Site**

---

## 🔐 Bảo mật API Key

### ⚠️ QUAN TRỌNG:

**KHÔNG BAO GIỜ**:
- ❌ Commit API key vào Git
- ❌ Push `.env.local` lên GitHub
- ❌ Hardcode API key trong code

**NÊN LÀM**:
- ✅ Dùng environment variables
- ✅ Thêm `.env.local` vào `.gitignore`
- ✅ Tạo file `.env.local.example` để hướng dẫn
- ✅ Cấu hình env variables trên platform deploy

### Cấu trúc file:

**.gitignore**:
```
.env.local
.env
```

**.env.local.example**:
```
GEMINI_API_KEY=your_api_key_here
```

---

## 🎯 So sánh chi tiết

### Vercel
```
+ Tự động, nhanh, mạnh
+ Edge network tốt nhất
+ Analytics
+ Preview deployment
- Free plan: 100GB bandwidth
```

### Netlify
```
+ Dễ dùng nhất
+ Drag & drop
+ Forms, Functions
+ 100GB bandwidth
- Hơi chậm hơn Vercel ở VN
```

### GitHub Pages
```
+ Miễn phí 100%
+ Unlimited bandwidth
+ Tích hợp GitHub
- Không có env variables
- Chỉ static hosting
```

### Cloudflare Pages
```
+ Unlimited bandwidth
+ Unlimited requests
+ Edge network toàn cầu
+ Workers cho logic phức tạp
- Interface hơi khó
```

### Render
```
+ Đơn giản
+ Free SSL
+ PR previews
- Chậm hơn Vercel/Netlify
- 100GB bandwidth
```

---

## 📊 Khuyến nghị theo use case

### 🏆 Dùng cho workshop/sự kiện:
→ **Vercel** hoặc **Netlify**
- Deploy nhanh nhất
- Ổn định nhất
- URL đẹp
- Dễ chia sẻ

### 💰 Hoàn toàn miễn phí, không quan tâm bandwidth:
→ **Cloudflare Pages**
- Unlimited mọi thứ
- Performance tốt

### 🎓 Học tập/Demo:
→ **GitHub Pages**
- Đơn giản
- Tích hợp Git

### 🚀 Production app:
→ **Vercel**
- Performance tốt nhất
- Analytics
- Monitoring

---

## 🛠️ Checklist trước khi deploy

- [ ] `npm run build` không lỗi
- [ ] File `.gitignore` có `.env.local`
- [ ] File `.env.local.example` đã tạo
- [ ] README có hướng dẫn setup
- [ ] Đã test build local với `npm run preview`
- [ ] Đã chuẩn bị API key Gemini
- [ ] Đã commit tất cả code

---

## 🎉 Deploy ngay!

### Vercel (3 phút):
```bash
git init
git add .
git commit -m "Deploy"
git remote add origin https://github.com/username/repo.git
git push -u origin main

# Sau đó vào Vercel.com import project
```

### Netlify (2 phút):
```bash
npm run build
# Vào app.netlify.com/drop và kéo thả folder dist/
```

### GitHub Pages (5 phút):
```bash
npm install -D gh-pages
npm run deploy
```

---

## 💡 Tips

1. **URL đẹp hơn**: Đổi tên project trên platform
2. **Custom domain**: Vercel/Netlify support free
3. **HTTPS**: Tất cả platform đều auto SSL
4. **CDN**: Vercel/Cloudflare có CDN tốt nhất
5. **Monitoring**: Vercel có analytics miễn phí

---

## 🆘 Troubleshooting

### Build failed
→ Check `npm run build` local
→ Check Node version (dùng 18+)

### API key not working
→ Check env variables trên platform
→ Restart deployment

### 404 on refresh
→ Check rewrite rules (vercel.json/netlify.toml)

### Slow loading
→ Dùng Vercel/Cloudflare thay vì Render

---

**🎊 Chúc bạn deploy thành công!**

URL demo: `https://phongnam-ai.vercel.app`
