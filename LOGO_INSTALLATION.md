# 📌 HƯỚNG DẪN CÀI ĐẶT LOGO

## ⚠️ QUAN TRỌNG - BẠN CẦN LÀM:

### Bước 1: Lưu file logo
Hình ảnh logo đã được gửi trong chat. Bạn cần:

1. **Lưu hình ảnh logo** với tên: `logo.png`
2. **Đặt vào thư mục**: `f:\ZZZ_TraisangtacKTS\public\logo.png`

### Bước 2: Xác nhận đường dẫn
Đảm bảo file nằm đúng vị trí:
```
f:\ZZZ_TraisangtacKTS\
  └── public\
      └── logo.png  ← File này phải tồn tại!
```

### Bước 3: Khởi động lại server (nếu cần)
```bash
# Trong terminal
Ctrl + C  # Dừng server hiện tại
npm run dev  # Khởi động lại
```

---

## ✅ Đã cập nhật trong code:

### 1. WelcomeScreen.tsx
- ✅ Logo trong form đăng nhập: `<img src="/logo.png" />`
- ✅ Logo chính màn hình welcome: `<img src="/logo.png" />`
- ✅ Kích thước: 96x96px (login), 256px width (welcome)

### 2. Header.tsx
- ✅ Logo trong header: `<img src="/logo.png" />`
- ✅ Kích thước: height 48px, width auto

### 3. index.html
- ✅ Favicon: `<link rel="icon" type="image/png" href="/logo.png" />`

---

## 🎨 Thông số kỹ thuật

### Logo specs:
- **Format**: PNG with transparent background (hoặc có background như trong hình)
- **Recommended size**: 512x512px hoặc lớn hơn
- **Current display sizes**:
  - Welcome screen: 256px width
  - Login form: 96x96px
  - Header: 48px height
  - Favicon: 32x32px (browser auto-resize)

### Responsive:
- Logo tự động scale theo container
- Giữ nguyên aspect ratio
- Object-fit: contain

---

## 🔍 Kiểm tra

### Sau khi đặt file logo.png vào public/:

1. **Check favicon**:
   - Mở browser tab
   - Xem icon ở tab có hiển thị logo không

2. **Check Welcome screen**:
   - Logo lớn ở giữa màn hình
   - Logo nhỏ trong form đăng nhập

3. **Check Header**:
   - Logo ở góc trái
   - Cạnh title "Hội KTS TP Đà Nẵng"

### Nếu logo không hiển thị:

**Nguyên nhân 1**: File chưa được đặt đúng vị trí
- ✔️ Kiểm tra: `f:\ZZZ_TraisangtacKTS\public\logo.png` có tồn tại không

**Nguyên nhân 2**: Cache trình duyệt
- ✔️ Giải pháp: Hard refresh (Ctrl + Shift + R hoặc Ctrl + F5)

**Nguyên nhân 3**: Server chưa cập nhật
- ✔️ Giải pháp: Khởi động lại server (Ctrl+C rồi npm run dev)

---

## 📝 Chi tiết thay đổi

### WelcomeScreen.tsx - Login form:
```tsx
<div className="inline-flex items-center justify-center w-24 h-24 mb-4">
  <img 
    src="/logo.png" 
    alt="Logo Trại Sáng tác Kiến trúc" 
    className="w-full h-full object-contain"
  />
</div>
```

### WelcomeScreen.tsx - Main screen:
```tsx
<div className="inline-flex items-center justify-center w-64 h-auto mb-6 animate-float">
  <img 
    src="/logo.png" 
    alt="Logo Trại Sáng tác Kiến trúc" 
    className="w-full h-auto object-contain drop-shadow-2xl"
  />
</div>
```

### Header.tsx:
```tsx
<div className="h-12 w-auto flex items-center justify-center">
  <img 
    src="/logo.png" 
    alt="Logo Trại Sáng tác Kiến trúc" 
    className="h-full w-auto object-contain"
  />
</div>
```

### index.html:
```html
<link rel="icon" type="image/png" href="/logo.png" />
```

---

## 🚀 Sau khi hoàn tất

1. ✅ File logo.png trong public/
2. ✅ Server đang chạy
3. ✅ Browser đã refresh
4. ✅ Logo hiển thị ở 4 vị trí:
   - Favicon (browser tab)
   - Welcome screen (large)
   - Login form (medium)
   - Header (small)

---

## 📸 Vị trí hiển thị logo

```
┌─────────────────────────────────────┐
│ Browser Tab                         │
│ [Logo] Hội KTS TP Đà Nẵng...       │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Header                              │
│ [Logo] Hội KTS TP ĐN  [...tools...] │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Welcome Screen                      │
│                                     │
│         [LOGO - LARGE]              │
│   HỘI KIẾN TRÚC SƯ TP ĐÀ NẴNG      │
│                                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Login Form                          │
│      [Logo - Medium]                │
│         Đăng nhập                   │
│    [Username] [Password]            │
└─────────────────────────────────────┘
```

---

**Sau khi đặt file logo.png vào đúng vị trí, ứng dụng sẽ tự động load logo!**
