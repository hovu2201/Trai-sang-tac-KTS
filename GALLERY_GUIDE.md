# 📚 TÍNH NĂNG THƯ VIỆN ẢNH (GALLERY)

## 🎯 Tổng quan

Hệ thống Thư viện Ảnh cho phép lưu trữ, quản lý và tái sử dụng tất cả các ảnh đã tạo ra từ ứng dụng. Ảnh được tự động lưu vào LocalStorage của trình duyệt và có thể truy cập bất cứ lúc nào.

---

## ✨ Tính năng chính

### 1. **Tự động lưu ảnh**
- ✅ Tất cả ảnh được tạo ra tự động lưu vào thư viện
- ✅ Ảnh được chỉnh sửa (Edit) cũng được lưu
- ✅ Ảnh có chú thích (Notes) được lưu riêng
- ✅ Không cần thao tác thủ công

### 2. **Xem ảnh dạng lưới (Grid View)**
- 📸 Hiển thị thumbnail theo dạng lưới 2 cột
- 🔍 Xem nhanh tất cả ảnh đã tạo
- ⚡ Hover để xem các hành động nhanh
- 🌟 Hiển thị badge yêu thích

### 3. **Xem ảnh dạng danh sách (List View)**
- 📋 Hiển thị chi tiết hơn với mô tả đầy đủ
- 📏 Hiển thị kích thước ảnh (width x height)
- 📅 Hiển thị thời gian tạo
- ⭐ Trạng thái yêu thích

### 4. **Tìm kiếm thông minh**
```
🔍 Tìm kiếm theo:
   - Mô tả (prompt)
   - Nội dung (description)
   - Tags/từ khóa
```

### 5. **Lọc và sắp xếp**
```
📊 Sắp xếp:
   - Mới nhất
   - Cũ nhất
   - Yêu thích trước

🔖 Lọc:
   - Chỉ hiển thị ảnh yêu thích
   - Tất cả ảnh
```

### 6. **Quản lý ảnh**

#### 🌟 Yêu thích (Favorite)
- Click vào icon ⭐ để đánh dấu ảnh quan trọng
- Ảnh yêu thích không bị xóa khi dọn dẹp tự động
- Có thể lọc chỉ xem ảnh yêu thích

#### ✏️ Chỉnh sửa (Edit)
- Click icon bút chì để mở chế độ Edit
- Vẽ mask và chỉnh sửa một phần ảnh
- Ảnh sau chỉnh sửa được lưu riêng

#### 🔄 Tạo góc nhìn mới (Generate from Image)
- Click icon vòng tròn để tạo các góc nhìn khác
- Chuyển sang panel "Bản vẽ 2D" với ảnh đã chọn
- Có thể tạo: mặt bằng, mặt cắt, mặt đứng, góc nhìn khác

#### 👁️ Xem phóng to (View)
- Click vào ảnh để xem lightbox
- Có thể di chuyển qua lại giữa các ảnh
- Xem chi tiết mô tả và thông tin

#### 🗑️ Xóa (Delete)
- Click icon thùng rác để xóa ảnh
- Có xác nhận trước khi xóa
- Ảnh yêu thích cũng có thể xóa (sau xác nhận)

---

## 💾 Lưu trữ

### LocalStorage
- **Dung lượng**: Tối đa 50MB
- **Vị trí**: Trình duyệt của bạn (không đồng bộ giữa các thiết bị)
- **Bảo mật**: Chỉ bạn có thể truy cập

### Tự động dọn dẹp
Khi đạt giới hạn 50MB:
- Giữ lại ảnh yêu thích ⭐
- Giữ lại 50 ảnh mới nhất
- Xóa các ảnh cũ không được yêu thích

### Thông tin lưu trữ
Mỗi ảnh lưu:
```json
{
  "id": "res_1729600000000",
  "imageUrl": "data:image/png;base64,...",
  "sourceImageUrl": "data:image/png;base64,...",
  "prompt": "Generate a photorealistic...",
  "description": "AI description of the image",
  "width": 1024,
  "height": 1024,
  "createdAt": 1729600000000,
  "favorite": false,
  "tags": [],
  "category": ""
}
```

---

## 🚀 Cách sử dụng

### Truy cập Thư viện
1. Click vào icon **Thư viện** 📚 trên thanh Header
2. Hoặc nhấn phím tắt (nếu được cấu hình)

### Tìm kiếm ảnh
1. Gõ từ khóa vào ô tìm kiếm
2. Ví dụ: "nhà rường", "mái ngói", "làng cổ"
3. Kết quả hiển thị ngay lập tức

### Lọc ảnh yêu thích
1. Click nút **⭐ Yêu thích**
2. Chỉ hiển thị ảnh đã đánh dấu
3. Click lại để tắt lọc

### Đổi chế độ xem
1. Click icon **Lưới** (grid) hoặc **Danh sách** (list)
2. Grid: Xem nhiều ảnh cùng lúc
3. List: Xem chi tiết từng ảnh

### Sử dụng lại ảnh

#### Tạo góc nhìn mới:
1. Hover vào ảnh trong Grid View
2. Click icon 🔄 (vòng tròn)
3. Tự động chuyển sang panel "Bản vẽ 2D"
4. Chọn loại view muốn tạo (mặt bằng, mặt cắt, etc.)
5. Click "Phác thảo" để tạo

#### Chỉnh sửa ảnh:
1. Hover vào ảnh
2. Click icon ✏️ (bút chì)
3. Vẽ mask trên phần muốn chỉnh sửa
4. Nhập mô tả thay đổi
5. Click "Áp dụng"

#### Xem chi tiết:
1. Click vào bất kỳ ảnh nào
2. Lightbox mở ra
3. Sử dụng mũi tên để xem ảnh khác
4. Nhấn ESC hoặc X để đóng

---

## 📱 Responsive Design

### Desktop (> 1024px)
- Hiển thị đầy đủ sidebar với Gallery
- Grid 2 cột
- Tất cả thông tin hiển thị

### Tablet (768px - 1024px)
- Gallery trong panel trượt
- Grid 2 cột
- Các hành động rút gọn

### Mobile (< 768px)
- Gallery toàn màn hình
- Grid 2 cột responsive
- Icon actions trong hover overlay

---

## ⚙️ API cho Developers

### Lấy tất cả ảnh
```typescript
import { getGalleryImages } from './services/galleryService';

const images = getGalleryImages();
// Returns: GalleryImage[]
```

### Lưu ảnh mới
```typescript
import { saveToGallery } from './services/galleryService';

const result: RenovationResult = {
  id: 'res_123',
  imageUrl: 'data:image/png;base64,...',
  prompt: 'Description...',
  width: 1024,
  height: 1024
};

const success = saveToGallery(result);
// Returns: boolean
```

### Xóa ảnh
```typescript
import { deleteFromGallery } from './services/galleryService';

const success = deleteFromGallery('res_123');
// Returns: boolean
```

### Đánh dấu yêu thích
```typescript
import { toggleFavorite } from './services/galleryService';

const success = toggleFavorite('res_123');
// Returns: boolean
```

### Cập nhật metadata
```typescript
import { updateImageMetadata } from './services/galleryService';

const success = updateImageMetadata('res_123', {
  tags: ['làng cổ', 'nhà rường'],
  category: 'Bảo tồn',
  description: 'Updated description'
});
// Returns: boolean
```

### Export/Import
```typescript
import { exportGallery, importGallery } from './services/galleryService';

// Export to JSON string
const jsonString = exportGallery();

// Import from JSON string
const success = importGallery(jsonString);
```

### Kiểm tra dung lượng
```typescript
import { getStorageInfo } from './services/galleryService';

const info = getStorageInfo();
// Returns: { used: number, max: number, percentage: number }

console.log(`Đã dùng: ${info.percentage.toFixed(2)}%`);
```

### Xóa toàn bộ
```typescript
import { clearGallery } from './services/galleryService';

const success = clearGallery();
// Returns: boolean
```

---

## 🔐 Bảo mật & Riêng tư

### Lưu trữ Local
- ✅ Dữ liệu chỉ lưu trên máy tính của bạn
- ✅ Không gửi lên server
- ✅ Không chia sẻ với bên thứ ba

### Xóa dữ liệu
```
Để xóa hoàn toàn:
1. Mở DevTools (F12)
2. Tab Application > Local Storage
3. Tìm key "phong_nam_gallery"
4. Click Delete
```

---

## 🐛 Khắc phục sự cố

### Ảnh không hiển thị
- ✔️ Kiểm tra LocalStorage chưa bị vô hiệu hóa
- ✔️ Xóa cache trình duyệt và tải lại
- ✔️ Kiểm tra dung lượng còn trống

### Ảnh bị mất
- ✔️ Xóa cache trình duyệt có thể xóa LocalStorage
- ✔️ Chế độ riêng tư (Incognito) không lưu dữ liệu
- ✔️ Export định kỳ để backup

### Chậm khi mở Gallery
- ✔️ Quá nhiều ảnh (>100) có thể làm chậm
- ✔️ Xóa ảnh cũ không cần thiết
- ✔️ Chỉ giữ ảnh yêu thích quan trọng

### Lỗi "Quota exceeded"
- ✔️ Đã đạt giới hạn 50MB
- ✔️ Hệ thống tự động dọn dẹp
- ✔️ Xóa thủ công ảnh không cần

---

## 🚀 Tính năng Tương lai

### Đang phát triển:
- [ ] Export ảnh ra file ZIP
- [ ] Export gallery sang JSON file
- [ ] Import gallery từ JSON file
- [ ] Sync với Cloud Storage (Google Drive, Dropbox)
- [ ] Tags tự động bằng AI
- [ ] Phân loại tự động theo style
- [ ] Tìm kiếm bằng hình ảnh
- [ ] Tạo collections/albums
- [ ] Chia sẻ gallery qua link
- [ ] PWA - Offline support

### Đề xuất từ cộng đồng:
- Chia sẻ ảnh lên mạng xã hội
- So sánh 2 ảnh cạnh nhau
- Timeline view theo thời gian
- Stats & Analytics
- Batch operations (xóa nhiều, favorite nhiều)

---

## 📞 Hỗ trợ

Nếu gặp vấn đề hoặc có đề xuất, vui lòng:
1. Mở issue trên GitHub
2. Liên hệ team phát triển
3. Tham gia cộng đồng Discord

---

**Phiên bản:** 1.0.0  
**Cập nhật:** 22/10/2025  
**Dự án:** Trại Sáng tác Kiến trúc Đà Nẵng 2025 - Làng cổ Phong Nam
