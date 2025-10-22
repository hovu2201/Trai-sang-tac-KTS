# Cải thiện chế độ chỉnh sửa (Edit Mode)

## Tổng quan các cải tiến

Đã thực hiện 4 cải tiến chính cho chế độ chỉnh sửa ảnh:

### 1. ✅ Lưu ảnh chỉnh sửa vào Gallery và Local Folder

**Vấn đề:** Ảnh đã chỉnh sửa chỉ được thêm vào `results` nhưng không được lưu vào localStorage (gallery) và thư mục local đã chọn.

**Giải pháp:**
- **File:** `src/App.tsx` - Hàm `handleEdit`
- **Thay đổi:**
  ```typescript
  // Lưu vào Gallery
  saveToGallery(newResult);
  
  // Lưu vào thư mục local nếu đã chọn
  try {
      await saveImageToLocalDirectory(imageUrl, `edit_${newResult.id}.png`);
  } catch (localErr) {
      console.warn('Could not save to local directory:', localErr);
      // Không hiển thị lỗi vì ảnh đã được lưu vào gallery
  }
  ```
- **Import mới:** `import { saveImageToLocalDirectory } from './services/fileSystemService';`

**Kết quả:** Mọi ảnh chỉnh sửa bây giờ được lưu tự động vào:
- Gallery (localStorage) với auto-cleanup
- Thư mục local đã chọn (nếu có)

---

### 2. ✅ Hiển thị thumbnail các ảnh đã chỉnh sửa

**Vấn đề:** Không có UI để xem các ảnh đã chỉnh sửa trong giao diện editing.

**Giải pháp:**
- **File mới:** `src/components/EditResultThumbnails.tsx`
- **Tính năng:**
  - Grid 3 cột với scroll khi có nhiều ảnh
  - Hiển thị checkmark cho ảnh đang được chọn
  - Hover effect với thông tin prompt
  - Chỉ hiển thị ảnh có ID bắt đầu bằng `res_edit_`
  - Thông báo khi chưa có ảnh chỉnh sửa

**Component code:**
```tsx
export const EditResultThumbnails: React.FC<EditResultThumbnailsProps> = ({
    results,
    selectedImage,
    onSelectImage,
}) => {
    const editedResults = results.filter(r => 
        r.id.startsWith('res_edit_') && r.sourceImageUrl
    );
    
    // Grid thumbnail với selected state
    // ...
}
```

**Tích hợp:**
- **File:** `src/components/EditCanvas.tsx`
- **Props mới:**
  ```typescript
  interface EditCanvasProps {
      baseImage: RenovationResult;
      results: RenovationResult[];           // THÊM
      selectedImage: RenovationResult | null; // THÊM
      onEdit: ...;
      onCancel: () => void;
      onSelectImage: (result: RenovationResult) => void; // THÊM
  }
  ```
- **UI placement:** Đặt phía trên EditPanel trong sidebar

**Kết quả:** Người dùng có thể:
- Xem tất cả ảnh đã chỉnh sửa trong session
- Nhấp vào thumbnail để chọn ảnh và tiếp tục chỉnh sửa
- Thấy rõ ảnh nào đang được chọn

---

### 3. ✅ Cho phép chỉnh sửa tiếp ảnh vừa sửa

**Vấn đề:** Cần xác nhận người dùng có thể chọn ảnh đã sửa để tiếp tục chỉnh sửa.

**Kiểm tra:**
- **File:** `src/App.tsx` - Hàm `handleImageSelectForEdit`
  ```typescript
  const handleImageSelectForEdit = (result: RenovationResult) => {
      setImageToEdit(result);
      setAppMode('editing');
  };
  ```

**Kết luận:** ✅ Đã hoạt động đúng
- Hàm chấp nhận bất kỳ `RenovationResult` nào
- Bao gồm cả ảnh có ID `res_edit_*`
- Khi nhấp vào thumbnail → `onSelectImage` → `handleImageSelectForEdit` → chế độ editing

**Workflow:**
1. Chọn ảnh từ gallery hoặc thumbnail
2. Vẽ vùng chọn mới
3. Áp dụng chỉnh sửa
4. Ảnh mới được tạo ra và có thể chọn lại để sửa tiếp

---

### 4. ✅ Loại bỏ khung viền trong kết quả

**Vấn đề:** Cần đảm bảo khung viền vùng chọn không xuất hiện trong ảnh đầu ra.

**Kiểm tra:**
- **File:** `src/components/EditCanvas.tsx` - Hàm `handleEditSubmit`
  ```typescript
  const handleEditSubmit = (prompt: string, replacementImage?: string | null) => {
      const maskCanvas = maskCanvasRef.current;
      if (!maskCanvas) return;
      
      // Export mask as pure black/white image
      const maskImage = maskCanvas.toDataURL('image/png');
      onEdit({ prompt, maskImage, replacementImage });
  };
  ```

**Cơ chế Dual Canvas:**
- **displayCanvasRef:** Canvas hiển thị với overlay màu `rgba(255, 255, 255, 0.5)`
  - Người dùng thấy được
  - Có khung viền, selection overlay
  - Chỉ dùng để hiển thị trực quan

- **maskCanvasRef:** Canvas ẩn chỉ có đen/trắng
  - `className="hidden"` - không hiển thị
  - Vẽ cùng lúc với displayCanvas
  - **CHỈ canvas này được xuất ra** qua `toDataURL()`
  - Không có overlay, không có khung viền
  - Độ phân giải gốc của ảnh (originalSize)

**Kết luận:** ✅ Đã xử lý đúng
- Mask được xuất từ canvas ẩn (chỉ có đen/trắng)
- Không có overlay hay khung viền nào
- AI nhận được mask thuần túy để xử lý

---

## Kiến trúc tổng thể

### Flow chỉnh sửa hoàn chỉnh:

```
1. Chọn ảnh để sửa
   ├─ Từ gallery (ResultGallery)
   ├─ Từ upload mới (ImageUploader)
   └─ Từ thumbnail edit history (EditResultThumbnails)
   
2. Vào chế độ editing
   ├─ EditCanvas hiển thị ảnh baseImage
   ├─ EditResultThumbnails hiển thị ảnh đã sửa
   ├─ EditPanel cung cấp tools
   └─ Dual canvas: display (visible) + mask (hidden)
   
3. Vẽ vùng chọn
   ├─ 4 công cụ: brush, rectangle, ellipse, polygon
   ├─ Display canvas: rgba overlay cho người dùng
   └─ Mask canvas: black/white cho AI (ẩn)
   
4. Gửi request chỉnh sửa
   ├─ handleEditSubmit → chỉ xuất maskCanvas
   ├─ App.handleEdit → gọi Gemini API
   └─ Nhận ảnh đã sửa từ AI
   
5. Lưu kết quả
   ├─ Thêm vào results state
   ├─ saveToGallery() → localStorage
   ├─ saveImageToLocalDirectory() → folder
   ├─ generateDescription() → async
   └─ Tự động quay về generate mode
   
6. Hiển thị trong UI
   ├─ ResultDisplay: ảnh mới ở đầu
   ├─ ResultGallery: có trong danh sách
   └─ EditResultThumbnails: khi vào edit lại
   
7. Có thể chọn lại để sửa tiếp
   └─ Quay lại bước 1 với ảnh đã sửa
```

---

## Files đã thay đổi

### 1. `src/App.tsx`
**Thay đổi:**
- Import `saveImageToLocalDirectory` từ fileSystemService
- Import type `ReferenceStrengthLevel`
- Cập nhật hàm `handleEdit`:
  - Thêm `saveToGallery(newResult)`
  - Thêm `saveImageToLocalDirectory(imageUrl, filename)`
  - Cập nhật gallery khi có description mới
- Truyền props mới cho `<EditCanvas>`:
  - `results={results}`
  - `selectedImage={selectedImage}`
  - `onSelectImage={handleImageSelectForEdit}`

### 2. `src/components/EditCanvas.tsx`
**Thay đổi:**
- Import `EditResultThumbnails`
- Cập nhật interface `EditCanvasProps`:
  - Thêm `results`, `selectedImage`, `onSelectImage`
- Thêm component `<EditResultThumbnails>` vào sidebar
- Giữ nguyên dual canvas system

### 3. `src/components/EditResultThumbnails.tsx` (MỚI)
**Tính năng:**
- Component mới hiển thị thumbnail các ảnh đã sửa
- Filter ảnh theo pattern `res_edit_*`
- Grid 3 cột, scroll khi nhiều
- Selected state với ring blue
- Hover effect với prompt text
- Click để chọn ảnh

### 4. `src/types/index.ts`
**Thay đổi:**
- Thêm `import React from 'react';`
- Sửa lỗi namespace React cho icon types

---

## Testing checklist

### ✅ Lưu ảnh
- [ ] Tạo ảnh chỉnh sửa → kiểm tra localStorage (DevTools → Application)
- [ ] Kiểm tra thư mục local đã chọn (nếu có)
- [ ] Refresh trang → ảnh vẫn còn trong gallery
- [ ] Auto cleanup hoạt động khi đầy (favorites + 15 recent)

### ✅ Thumbnail gallery
- [ ] Chưa sửa ảnh nào → hiện "Chưa có ảnh chỉnh sửa nào"
- [ ] Sau khi sửa → thumbnail xuất hiện
- [ ] Ảnh đang chọn có ring blue + checkmark
- [ ] Hover vào thumbnail → hiện prompt
- [ ] Click thumbnail → chuyển sang ảnh đó

### ✅ Chỉnh sửa tiếp
- [ ] Chọn ảnh đã sửa từ thumbnail
- [ ] Vẽ vùng chọn mới
- [ ] Áp dụng → tạo ảnh mới
- [ ] Ảnh mới xuất hiện trong thumbnail
- [ ] Có thể sửa tiếp ảnh mới này

### ✅ Mask export
- [ ] Vẽ vùng chọn bất kỳ
- [ ] Áp dụng chỉnh sửa
- [ ] Kiểm tra ảnh đầu ra: KHÔNG có overlay màu trắng mờ
- [ ] Chỉ vùng được chọn bị thay đổi

---

## Kết luận

Tất cả 5 yêu cầu đã được thực hiện:

1. ✅ **Ảnh tạo ra trong phần này thì phải hiển thị trong giao diện chỉnh sửa**
   - Component EditResultThumbnails hiển thị tất cả ảnh đã sửa

2. ✅ **Vẫn có thumbnail xem các ảnh đã sửa**
   - Grid 3 cột, scroll, selected state, hover effect

3. ✅ **Mọi ảnh tạo ra phải được lưu vào thư viện ảnh đồng thời cũng phải lưu vào thư mục local đã chọn**
   - handleEdit gọi cả saveToGallery và saveImageToLocalDirectory

4. ✅ **Ảnh áp dụng chỉnh sửa là ảnh đang được chọn (có thể tiếp chỉnh sửa ảnh vừa sửa được chọn)**
   - handleImageSelectForEdit chấp nhận mọi RenovationResult
   - Thumbnail click → chọn ảnh → vào editing mode

5. ✅ **Khung viền vùng chọn không được hiển thị trong kết quả chỉnh sửa tạo ra**
   - Dual canvas: display (có overlay) vs mask (chỉ đen/trắng)
   - handleEditSubmit chỉ xuất maskCanvas
   - AI nhận mask thuần túy không có overlay

---

## Next steps (optional enhancements)

Các cải tiến có thể thêm trong tương lai:

1. **Edit history với undo/redo**
   - Lưu lịch sử các lần sửa
   - Cho phép quay lại version trước

2. **Batch editing**
   - Áp dụng cùng một mask cho nhiều ảnh
   - Hữu ích cho xử lý hàng loạt

3. **Preset masks**
   - Lưu vùng chọn thường dùng
   - Áp dụng nhanh cho ảnh khác

4. **Export mask separately**
   - Xuất mask thành file riêng
   - Dùng lại trong session khác

5. **Comparison view**
   - So sánh before/after
   - Slider để xem sự khác biệt
