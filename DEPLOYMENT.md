# Trại Sáng Tác Kiến Trúc - Làng Cổ Phong Nam 2025

Ứng dụng AI hỗ trợ thiết kế kiến trúc cho Làng cổ Phong Nam, Đà Nẵng - sử dụng Google Gemini 2.5 Flash Image.

## 🌟 Tính năng chính

### 🎨 Tạo ảnh phương án kiến trúc
- Upload ảnh gốc hoặc bản vẽ mặt bằng
- Chọn phong cách kiến trúc (70+ phong cách)
- Tùy chọn vật liệu (50+ kết hợp)
- Chi tiết kiến trúc (97 ngoại thất + 41 nội thất)
- Hiệu ứng bầu không khí và nhiếp ảnh
- Tỷ lệ khung hình linh hoạt

### 🖼️ Hình ảnh tham khảo
- Upload ảnh tham khảo phong cách
- Điều chỉnh mức độ áp dụng (Nhẹ/Vừa/Mạnh/Rất mạnh)
- AI học phong cách từ ảnh tham khảo

### 📐 Tạo góc nhìn 2D
- Chuyển đổi ảnh 3D sang mặt bằng
- Mặt đứng, mặt cắt
- Phối cảnh 1 điểm, 2 điểm
- Isometric, Axonometric

### ✏️ Chỉnh sửa ảnh thông minh
- 4 công cụ: Brush, Rectangle, Ellipse, Polygon
- Chế độ: Xóa đối tượng / Thay thế
- Dual canvas (display + mask)
- Thumbnail các ảnh đã sửa
- Tiếp tục sửa ảnh đã sửa

### 📝 Ghi chú trên ảnh
- Đánh dấu marker (số, chữ, ký hiệu La Mã)
- Thêm text box tùy chỉnh
- Chú thích (legend) cho các marker
- Crop ảnh với aspect ratio
- Export ảnh có chú thích

### 📚 Thư viện ảnh
- Lưu tự động vào localStorage (50MB, 200 ảnh)
- Lưu vào thư mục local (không giới hạn)
- Yêu thích, tìm kiếm, sắp xếp
- Tải tất cả về ZIP
- Auto cleanup thông minh

### 🎯 Các tùy chọn từ thư viện
- Ghi chú
- Tạo góc nhìn khác
- Tạo bản vẽ 2D
- Chỉnh sửa

## 🚀 Công nghệ

- **React 19** + TypeScript
- **Vite 6** - Build tool
- **Google Gemini 2.5 Flash Image** - AI model
- **Tailwind CSS** - Styling
- **html2canvas** - Export ảnh
- **JSZip** - Nén file
- **File System Access API** - Lưu local

## 📦 Cài đặt

```bash
# Clone repository
git clone <repo-url>

# Cài dependencies
npm install

# Tạo file .env.local từ mẫu
cp .env.local.example .env.local

# Thêm API key vào .env.local
GEMINI_API_KEY=your_api_key_here

# Chạy dev server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

## 🔑 Lấy Gemini API Key

1. Truy cập: https://aistudio.google.com/app/apikey
2. Đăng nhập Google
3. Tạo API key mới
4. Copy và paste vào `.env.local`

## 🌐 Deployment

### Vercel (Khuyên dùng)
```bash
npm i -g vercel
vercel login
vercel
```

### Netlify
```bash
npm run build
# Upload folder dist/
```

### GitHub Pages
Thêm vào `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/repo-name/',
  // ...
})
```

## 📁 Cấu trúc thư mục

```
src/
├── components/
│   ├── notes/          # Ghi chú: Marker, Text, Crop, Legend
│   ├── panels/         # Các panel tùy chọn
│   ├── EditCanvas.tsx  # Canvas chỉnh sửa
│   └── ...
├── constants/          # Dữ liệu phong cách, vật liệu, chi tiết
├── services/
│   ├── geminiService.ts        # API Gemini
│   ├── galleryService.ts       # Quản lý gallery
│   ├── fileSystemService.ts    # Lưu local
│   └── architecturalDescriptionService.ts
├── types/              # TypeScript types
└── utils/              # Utilities

```

## 🎨 Dữ liệu phong cách

- **70+ phong cách kiến trúc**: Truyền thống, Hiện đại, Đương đại, Tân cổ điển, Công nghiệp, Scandinavian, Tropical, Colonial...
- **50+ kết hợp vật liệu**: Gỗ, Gạch, Đá, Tre, Bê tông, Kính, Thép...
- **97 chi tiết ngoại thất**: Mái, Cửa, Cột, Hoa văn, Cảnh quan...
- **41 chi tiết nội thất**: Trần, Tường, Sàn, Đồ nội thất...

## 📖 Hướng dẫn sử dụng

### 1. Đăng nhập
- Nhập mật khẩu: `TrạiPhongNam2025`

### 2. Tạo phương án
1. Chọn tab **Phong Nam** để đọc về dự án
2. Tab **Tùy chọn** → Upload ảnh gốc
3. Tab **Phong cách** → Chọn phong cách kiến trúc
4. Tab **Vật liệu** → Chọn kết hợp vật liệu
5. Tab **Chi tiết** → Chọn các yếu tố kiến trúc
6. Tab **Bầu không khí** → Chọn hiệu ứng
7. Tab **Tỷ lệ** → Chọn tỷ lệ khung hình
8. Nhấn **TẠO ẢNH**

### 3. Chỉnh sửa
1. Chọn ảnh trong gallery
2. Nhấn nút **Chỉnh sửa**
3. Chọn công cụ và vẽ vùng cần sửa
4. Nhập mô tả thay đổi
5. Nhấn **Áp dụng**
6. Tiếp tục sửa hoặc nhấn **Thoát**

### 4. Ghi chú
1. Chọn ảnh và nhấn **Ghi chú**
2. Đánh marker, thêm text
3. Tạo legend cho các marker
4. Crop nếu cần
5. Nhấn **Lưu**

### 5. Quản lý thư viện
- Nhấn ⭐ để đánh dấu yêu thích
- Tìm kiếm theo mô tả
- Sắp xếp: Mới nhất / Cũ nhất / Yêu thích
- Tải ZIP tất cả ảnh
- Chọn thư mục lưu local

## 🔒 Bảo mật

- API key không được commit vào Git
- Sử dụng biến môi trường
- File `.env.local` trong `.gitignore`
- Authentication đơn giản với password

## 📊 Giới hạn

- **localStorage**: 50MB, 200 ảnh
- **File System API**: Chrome/Edge 86+
- **API Gemini**: Rate limit theo plan
- **Upload size**: Tùy browser (thường ~10MB/file)

## 🐛 Troubleshooting

### Lỗi "API key not found"
→ Kiểm tra file `.env.local` và restart dev server

### Không lưu được vào thư mục
→ Dùng Chrome/Edge và cấp quyền truy cập

### localStorage đầy
→ Tải ZIP và xóa ảnh cũ, hoặc chọn thư mục local

### Ảnh tạo ra không đúng ý
→ Thử điều chỉnh Input Fidelity, thêm chi tiết mô tả

## 📝 License

MIT License - Tự do sử dụng cho mục đích học tập và nghiên cứu.

## 👥 Credits

- **Developed for**: Hội Kiến trúc sư TP Đà Nẵng
- **Event**: Trại Sáng tác Kiến trúc 2025
- **Location**: Làng cổ Phong Nam, Đà Nẵng
- **AI Model**: Google Gemini 2.5 Flash Image
- **Framework**: React + TypeScript + Vite

## 📞 Support

Gặp vấn đề? Mở issue trên GitHub hoặc liên hệ ban tổ chức sự kiện.

---

**Phiên bản**: 1.0.0  
**Cập nhật**: Tháng 10, 2025
