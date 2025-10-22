# Kiểm tra lưu ảnh - Tất cả các điểm tạo ảnh

## ✅ Tóm tắt

**Tất cả 3 điểm tạo ảnh đều đã lưu đầy đủ vào:**
1. ✅ Gallery (localStorage)
2. ✅ Local Folder (nếu đã chọn)

---

## Chi tiết từng chức năng

### 1. ✅ Tạo ảnh thông thường (handleGenerate)

**Location:** `src/App.tsx` - Line ~240-295

**Trigger:**
- User nhấn "Tạo ảnh" với base image
- Chọn góc nhìn từ Panel2DViews
- Thay đổi góc nhìn từ angle selector

**Luồng xử lý:**
```typescript
const handleGenerate = async (customPrompt?: string) => {
    // ... generate image from Gemini API
    
    const newResult: RenovationResult = {
        id: `res_${Date.now()}`,
        imageUrl,
        // ...
    };
    setResults(prev => [newResult, ...prev]);
    
    // ✅ Lưu vào Gallery
    saveToGallery(newResult);
    
    // ✅ Lưu vào Local Folder
    try {
        await saveImageToLocalDirectory(imageUrl, `generated_${newResult.id}.png`);
    } catch (localErr) {
        console.warn('Could not save to local directory:', localErr);
    }
    
    // Generate description asynchronously
    generateShortDescription({...}).then(description => {
        const updatedResult = { ...newResult, description };
        setResults(prev => prev.map(r => r.id === newResult.id ? updatedResult : r));
        // ✅ Cập nhật gallery với description mới
        saveToGallery(updatedResult);
    });
}
```

**Filename pattern:** `generated_res_[timestamp].png`

**Hiển thị:**
- ✅ ResultDisplay (ảnh được chọn)
- ✅ ResultGallery (tất cả ảnh)
- ✅ PanelGallery (thư viện)

---

### 2. ✅ Chỉnh sửa ảnh (handleEdit)

**Location:** `src/App.tsx` - Line ~297-360

**Trigger:**
- Chọn ảnh để sửa từ gallery/results
- Vẽ vùng chọn với brush/rectangle/ellipse/polygon
- Nhập prompt chỉnh sửa
- Nhấn "Áp dụng"

**Luồng xử lý:**
```typescript
const handleEdit = async (params: { prompt: string, maskImage: string }) => {
    // ... edit image with Gemini API
    
    const newResult: RenovationResult = {
        id: `res_edit_${Date.now()}`,
        imageUrl,
        sourceImageUrl: imageToEdit.imageUrl,
        // ...
    };
    setResults(prev => [newResult, ...prev]);
    
    // ✅ Lưu vào Gallery
    saveToGallery(newResult);
    
    // ✅ Lưu vào Local Folder
    try {
        await saveImageToLocalDirectory(imageUrl, `edit_${newResult.id}.png`);
    } catch (localErr) {
        console.warn('Could not save to local directory:', localErr);
    }
    
    // Generate description asynchronously
    generateShortDescription({...}).then(description => {
        const updatedResult = { ...newResult, description };
        setResults(prev => prev.map(r => r.id === newResult.id ? updatedResult : r));
        // ✅ Cập nhật gallery với description mới
        saveToGallery(updatedResult);
    });
}
```

**Filename pattern:** `edit_res_edit_[timestamp].png`

**Hiển thị:**
- ✅ ResultDisplay (ảnh được chọn)
- ✅ ResultGallery (tất cả ảnh)
- ✅ PanelGallery (thư viện)
- ✅ EditResultThumbnails (trong edit mode)

---

### 3. ✅ Ghi chú trên ảnh (handleSaveNote)

**Location:** `src/App.tsx` - Line ~408-435

**Trigger:**
- Chọn ảnh và nhấn "Ghi chú"
- Vẽ marker, text, crop trong NoteEditor
- Nhấn "Lưu"

**Luồng xử lý:**
```typescript
const handleSaveNote = async (notedImageDataUrl: string) => {
    const newResult: RenovationResult = {
        id: `note_${Date.now()}`,
        imageUrl: notedImageDataUrl,
        sourceImageUrl: imageToNote?.imageUrl,
        prompt: "Annotated Image",
        description: "Image with notes and annotations.",
        // ...
    };
    setResults(prev => [newResult, ...prev]);
    
    // ✅ Lưu vào Gallery
    saveToGallery(newResult);
    
    // ✅ Lưu vào Local Folder
    try {
        await saveImageToLocalDirectory(notedImageDataUrl, `note_${newResult.id}.png`);
    } catch (localErr) {
        console.warn('Could not save to local directory:', localErr);
    }
}
```

**Filename pattern:** `note_note_[timestamp].png`

**Hiển thị:**
- ✅ ResultDisplay (ảnh được chọn)
- ✅ ResultGallery (tất cả ảnh)
- ✅ PanelGallery (thư viện)

---

## Kiến trúc lưu trữ

### Gallery Service (localStorage)

**File:** `src/services/galleryService.ts`

**Function:** `saveToGallery(result: RenovationResult)`

**Features:**
- Lưu vào localStorage với key `architecture_gallery`
- Auto cleanup khi đạt giới hạn:
  - Max size: 50MB
  - Max images: 200
  - Strategy: Giữ tất cả favorites + 15 ảnh gần nhất
- Không có modal cảnh báo (silent cleanup)
- Hỗ trợ favorite/unfavorite
- Search, sort, filter

**Storage structure:**
```typescript
interface GalleryImage {
    id: string;
    imageUrl: string;  // base64 data URL
    sourceImageUrl?: string;
    prompt: string;
    description: string;
    width: number;
    height: number;
    timestamp: number;
    favorite: boolean;
}
```

---

### File System Service (Local Folder)

**File:** `src/services/fileSystemService.ts`

**Function:** `saveImageToLocalDirectory(dataUrl: string, filename: string)`

**Features:**
- Sử dụng File System Access API
- User chọn folder một lần, app nhớ permission
- Lưu ảnh dưới dạng PNG file
- Base64 → Blob → File
- Có button "Mở" để xem folder info

**Permission model:**
- Request once với `requestDirectoryAccess()`
- Browser lưu permission
- Có thể revoke từ browser settings

**Error handling:**
- Try-catch để không block UI
- Console.warn nếu thất bại
- Ảnh vẫn được lưu vào gallery

---

## Workflow tổng quát

```
┌─────────────────────────────────────────────────────────┐
│  USER ACTION                                            │
│  (Generate / Edit / Note)                               │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│  CREATE RenovationResult                                │
│  - Generate unique ID                                   │
│  - Store image as base64 data URL                       │
│  - Add metadata (prompt, size, timestamp)               │
└────────────────┬────────────────────────────────────────┘
                 │
                 ├──────────────────────────────┐
                 │                              │
                 ▼                              ▼
┌─────────────────────────────┐  ┌─────────────────────────────┐
│  ADD TO STATE               │  │  SAVE TO GALLERY            │
│  setResults([new, ...prev]) │  │  saveToGallery(newResult)   │
│  setSelectedImage(new)      │  │  → localStorage             │
└─────────────────────────────┘  │  → Auto cleanup if needed   │
                                 └──────────────┬──────────────┘
                                                │
                                                ▼
                                 ┌─────────────────────────────┐
                                 │  SAVE TO LOCAL FOLDER       │
                                 │  saveImageToLocalDirectory()│
                                 │  → File System Access API   │
                                 │  → .png file                │
                                 └──────────────┬──────────────┘
                                                │
                                                ▼
                                 ┌─────────────────────────────┐
                                 │  GENERATE DESCRIPTION       │
                                 │  (async, non-blocking)      │
                                 │  → Update result            │
                                 │  → Re-save to gallery       │
                                 └─────────────────────────────┘
```

---

## Filename patterns

| Function | ID Pattern | Filename Pattern | Example |
|----------|-----------|------------------|---------|
| Generate | `res_{timestamp}` | `generated_res_{timestamp}.png` | `generated_res_1729600000000.png` |
| Edit | `res_edit_{timestamp}` | `edit_res_edit_{timestamp}.png` | `edit_res_edit_1729600000000.png` |
| Note | `note_{timestamp}` | `note_note_{timestamp}.png` | `note_note_1729600000000.png` |

---

## Display locations

**Mọi ảnh đều hiển thị tại:**

1. **ResultDisplay** (`src/components/ResultDisplay.tsx`)
   - Ảnh được chọn hiện tại
   - Full size với zoom
   - Info panel: prompt, description, dimensions

2. **ResultGallery** (`src/components/ResultGallery.tsx`)
   - Tất cả ảnh trong session
   - Grid layout với thumbnails
   - Buttons: View, Edit, Note, Select

3. **PanelGallery** (`src/components/panels/PanelGallery.tsx`)
   - Persistent gallery từ localStorage
   - Search, sort, filter
   - Favorites
   - Download all as ZIP
   - Open local folder
   - Delete images

4. **EditResultThumbnails** (`src/components/EditResultThumbnails.tsx`)
   - Chỉ trong edit mode
   - Chỉ ảnh đã chỉnh sửa (`res_edit_*`)
   - Click để chọn và sửa tiếp

---

## Testing checklist

### ✅ Generate images
- [ ] Tạo ảnh từ base image → Kiểm tra local folder + gallery
- [ ] Thay đổi góc nhìn → Kiểm tra local folder + gallery
- [ ] Tạo 2D view → Kiểm tra local folder + gallery
- [ ] Refresh page → Ảnh vẫn trong gallery

### ✅ Edit images
- [ ] Chọn ảnh → Edit với brush → Kiểm tra local folder + gallery
- [ ] Edit với rectangle → Kiểm tra local folder + gallery
- [ ] Edit với ellipse → Kiểm tra local folder + gallery
- [ ] Edit với polygon → Kiểm tra local folder + gallery
- [ ] Chọn ảnh đã edit → Edit tiếp → Kiểm tra local folder + gallery
- [ ] Refresh page → Ảnh edit vẫn trong gallery

### ✅ Note images
- [ ] Chọn ảnh → Add marker → Save → Kiểm tra local folder + gallery
- [ ] Add text → Save → Kiểm tra local folder + gallery
- [ ] Add crop → Save → Kiểm tra local folder + gallery
- [ ] Add legend → Save → Kiểm tra local folder + gallery
- [ ] Refresh page → Ảnh note vẫn trong gallery

### ✅ Local folder
- [ ] Chưa chọn folder → Tạo ảnh → Chỉ lưu gallery (console.warn)
- [ ] Chọn folder → Tạo ảnh → Lưu cả 2
- [ ] Nhấn "Mở" trong PanelGallery → Hiện thông tin folder
- [ ] Mở folder trong File Explorer → Đếm file PNG

### ✅ Gallery persistence
- [ ] Tạo 5 ảnh → Refresh → Vẫn còn 5 ảnh
- [ ] Đánh dấu favorite → Refresh → Vẫn favorite
- [ ] Tạo 200+ ảnh → Auto cleanup → Giữ favorites + 15 recent
- [ ] Search ảnh → Tìm được
- [ ] Sort by newest/oldest/favorites → Đúng thứ tự
- [ ] Delete ảnh → Biến mất khỏi gallery

---

## Error handling

### Gallery save
- ✅ Luôn thành công (localStorage available)
- ✅ Auto cleanup khi đầy
- ✅ Silent operation (no modals)

### Local folder save
- ✅ Try-catch wrapper
- ✅ Console.warn nếu thất bại
- ✅ Không block UI
- ✅ Ảnh vẫn trong gallery

### Possible errors:
1. **User chưa chọn folder** → `directoryHandle is null` → console.warn
2. **Permission denied** → User revoked → console.warn
3. **Disk full** → Write failed → console.warn
4. **Browser không hỗ trợ File System API** → console.warn

---

## Summary

### ✅ Completed

**Tất cả ảnh tạo ra (Generate, Edit, Note) đều:**
1. ✅ Được lưu vào Gallery (localStorage)
2. ✅ Được lưu vào Local Folder (nếu đã chọn)
3. ✅ Hiển thị trong ResultDisplay
4. ✅ Hiển thị trong ResultGallery
5. ✅ Hiển thị trong PanelGallery
6. ✅ Persist sau khi refresh
7. ✅ Có description từ AI
8. ✅ Có search/sort/filter
9. ✅ Có favorite
10. ✅ Có download ZIP
11. ✅ Có delete
12. ✅ Auto cleanup khi đầy

**Không có điểm tạo ảnh nào bị bỏ sót!**

### Code locations

- **Generate:** `src/App.tsx` line ~240-295
- **Edit:** `src/App.tsx` line ~297-360
- **Note:** `src/App.tsx` line ~408-435
- **Gallery service:** `src/services/galleryService.ts`
- **File system service:** `src/services/fileSystemService.ts`

### Dependencies

```typescript
import { saveToGallery } from './services/galleryService';
import { saveImageToLocalDirectory } from './services/fileSystemService';
```

Đã được import đầy đủ trong `src/App.tsx`.
