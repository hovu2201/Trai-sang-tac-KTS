# Cải tiến Ứng dụng - Tích hợp Ngữ cảnh Làng cổ Phong Nam

## 📌 Tổng quan

Đã hoàn tất tích hợp đầy đủ nội dung văn hóa - lịch sử Làng cổ Phong Nam vào ứng dụng, bao gồm:

### ✅ Files Mới Tạo

1. **src/constants/phongNamContext.ts**
   - Chứa toàn bộ dữ liệu về Làng cổ Phong Nam từ PDF
   - Bao gồm: lịch sử, kiến trúc, văn hóa, thách thức, giải pháp
   - Export các preset thiết kế đặc trưng

2. **src/services/architecturalDescriptionService.ts**
   - Service tạo thuyết minh kiến trúc chi tiết
   - Tích hợp ngữ cảnh Phong Nam vào prompt
   - Hàm `generateArchitecturalDescription()` - Thuyết minh đầy đủ 500-800 từ
   - Hàm `generateShortDescription()` - Mô tả ngắn 100-150 từ
   - Hàm `generateProjectTitle()` - Tạo tiêu đề phương án

3. **src/components/panels/PanelPhongNam.tsx**
   - Panel UI mới hiển thị thông tin Làng cổ Phong Nam
   - 5 tabs: Tổng quan, Lịch sử, Kiến trúc, Văn hóa, Thách thức
   - Thiết kế responsive với dark mode

### ✅ Files Đã Cập nhật

1. **src/App.tsx**
   - Import `PanelPhongNam`
   - Thêm case 'phongnam' vào `renderActivePanel()`

2. **src/types/index.ts**
   - Thêm 'phongnam' vào type `PanelType`

3. **src/components/Header.tsx**
   - Thêm tab "Phong Nam" vào PANELS
   - Import `IconInfo`

4. **src/components/icons.tsx**
   - Thêm `IconInfo` mới

## 🎯 Tính năng mới

### Panel Làng cổ Phong Nam

#### Tab "Tổng quan"
- Thông tin cơ bản (diện tích, dân số, lịch sử thành lập)
- 4 mục tiêu trại sáng tác với các nhiệm vụ cụ thể
- Mục tiêu "Neo kiến trúc cảnh quan - Bất biến giữa dòng đời vạn biến"

#### Tab "Lịch sử"
- Lịch sử hình thành đầy đủ
- Timeline các mốc quan trọng (1582 - 2007)
- Câu chuyện về các tộc họ khai hoang

#### Tab "Kiến trúc"
- Đình Thần Nông (Di tích cấp TP)
  - Đặc điểm mái cong hình sừng trâu
  - Trang trí Tứ linh
  - Hoành phi sơn son thếp vàng
- Nhà thờ Tiền Hiền (17 chư phái tộc)
- Miếu Thái Giám (Thần Bạch Mã)
- 5 nhà cổ + 125 nhà ba gian

#### Tab "Văn hóa"
- **Làng nghề**: Tráng bánh, mì quảng, bánh ít lá gai, đan lát tre
- **Lễ hội rước Mục Đồng**:
  - 3 năm/lần (Tam niên nhứt lệ)
  - 52 mục đồng, 26 cây cờ
  - Rước thần dạo đồng 2 ngày 3 đêm
  - Trò chơi dân gian (8 trò)
- **Cảnh quan đặc trưng**: Luỹ tre, cánh đồng lúa, đường bao quanh

#### Tab "Thách thức"
- 7 thách thức bảo tồn (đô thị hóa, kiến trúc không đồng nhất...)
- 4 nhóm giải pháp:
  - Chính sách
  - Kiến trúc - Cảnh quan
  - Hạ tầng kỹ thuật
  - Kinh tế - Xã hội

### Service Thuyết minh Kiến trúc

#### generateArchitecturalDescription()
Tạo thuyết minh đầy đủ theo cấu trúc:

1. **TỔNG QUAN PHƯƠNG ÁN** (2-3 đoạn)
   - Ý tưởng chủ đạo và triết lý thiết kế
   - Mối liên hệ với Làng cổ Phong Nam
   - Cách "neo giữ" giá trị truyền thống

2. **GIẢI PHÁP KIẾN TRÚC** (3-4 đoạn)
   - Không gian và bố cục
   - Hình thức kiến trúc
   - Kỹ thuật - Kết cấu

3. **GIẢI PHÁP CẢNH QUAN** (2-3 đoạn)
   - Tổ chức không gian xanh
   - Cây trồng đặc trưng
   - Kết nối với cảnh quan xung quanh

4. **GIÁ TRỊ VĂN HÓA - XÃ HỘI** (2 đoạn)
   - Giữ gìn bản sắc
   - Phục vụ cộng đồng
   - Phát triển kinh tế bền vững

5. **KẾT LUẬN** (1 đoạn)
   - Tổng kết giá trị
   - Đóng góp vào bảo tồn Phong Nam
   - Tầm nhìn phát triển

## 🔧 Cách sử dụng

### 1. Xem thông tin Phong Nam
```typescript
// Trong App.tsx, tab "Phong Nam" ở Header
<PanelPhongNam darkMode={isDarkMode} />
```

### 2. Sử dụng Service Thuyết minh
```typescript
import { generateArchitecturalDescription } from './services/architecturalDescriptionService';

const description = await generateArchitecturalDescription({
  selectedStyle: "Kiến trúc truyền thống Việt Nam",
  selectedMaterials: ["Gỗ tự nhiên", "Ngói âm dương"],
  selectedElements: ["Mái cong", "Cột gỗ chạm khắc"],
  prompt: "Nhà thờ tộc phong cách Phong Nam"
});
```

### 3. Truy cập dữ liệu Phong Nam
```typescript
import { PHONG_NAM_CONTEXT, PHONG_NAM_DESIGN_PRESETS } from './constants/phongNamContext';

// Lấy thông tin lịch sử
console.log(PHONG_NAM_CONTEXT.history);

// Lấy preset thiết kế
console.log(PHONG_NAM_DESIGN_PRESETS.materials);
```

## 📊 Dữ liệu đã tích hợp

### Từ PDF "Giới thiệu Làng cổ Phong Nam"

#### Thông tin tổng quan
- Diện tích: 1.62 km²
- Dân số: 848 hộ (3,185 nhân khẩu)
- 10 tổ dân cư

#### Lịch sử
- 6 mốc thời gian quan trọng
- Câu chuyện 3 vị Tiền Hiền
- 17 chư phái tộc

#### Kiến trúc
- 4 loại công trình chính
- 5 nhà cổ tiêu biểu
- 125 nhà ba gian
- Đặc điểm kiến trúc độc đáo (mái sừng trâu)

#### Văn hóa
- 4 làng nghề truyền thống
- Lễ hội Mục Đồng (chi tiết đầy đủ)
- 4 đặc điểm cảnh quan

#### Thách thức & Giải pháp
- 7 thách thức cụ thể
- 4 nhóm giải pháp (15+ hành động)

## 🎨 Design Keywords

### Kiến trúc
- Nhà ba gian
- Mái ngói âm dương  
- Mái cong hình sừng trâu
- Cột gỗ chạm khắc
- Đá ong
- Hoa văn Tứ linh

### Cảnh quan
- Luỹ tre làng quê
- Hàng cau
- Chè Tàu hàng rào
- Cánh đồng lúa
- Đường giao thông bao quanh
- Cây cổ thụ

### Văn hóa
- Đình làng
- Nhà thờ tộc
- Lễ hội Mục đồng
- Làng nghề truyền thống
- Cộng đồng làng Việt

## 🚀 Tính năng tiếp theo (Đề xuất)

### 1. Tích hợp AI Description vào InfoPanel
```typescript
// Trong InfoPanel.tsx, thay vì dùng description từ Gemini Image
const description = await generateArchitecturalDescription({
  selectedStyle,
  selectedMaterials,
  selectedElements,
  // ... các tham số khác
});
```

### 2. Export Báo cáo PDF
```typescript
// Tạo reportService.ts
export const generateProjectReport = async (
  images: RenovationResult[],
  descriptions: string[]
) => {
  // Sử dụng jsPDF
  // - Trang bìa với logo
  // - Giới thiệu Phong Nam
  // - Các phương án (ảnh + thuyết minh)
  // - So sánh phương án
  // - Kết luận & khuyến nghị
};
```

### 3. Preset "Phong Nam Style"
```typescript
// Trong PanelStyle.tsx
const PHONG_NAM_PRESET = {
  id: 'phong-nam-traditional',
  name: 'Phong Nam Truyền thống',
  description: 'Kiến trúc đặc trưng Làng cổ Phong Nam',
  autoSelect: {
    style: ARCHITECTURAL_STYLES.find(s => s.id === 'traditional'),
    materials: ['Gỗ tự nhiên', 'Ngói âm dương', 'Đá ong'],
    elements: ['Mái cong', 'Cột gỗ chạm khắc', 'Hoành phi'],
    environment: 'Làng quê nông thôn'
  }
};
```

### 4. Timeline Visualization
```typescript
// Component mới: TimelineView.tsx
// Hiển thị lịch sử 1582-2025 dạng timeline tương tác
// Với hình ảnh, mô tả chi tiết mỗi mốc
```

### 5. 3D Interactive Map
```typescript
// Sử dụng Mapbox/Leaflet
// Đánh dấu các di tích, nhà cổ trên bản đồ
// Click vào từng điểm để xem thông tin chi tiết
```

## 📝 Ghi chú

- Tất cả nội dung từ PDF đã được cấu trúc hóa trong `phongNamContext.ts`
- Service thuyết minh sử dụng Gemini 2.0 Flash (nhanh, chất lượng cao)
- UI Panel responsive, hỗ trợ dark mode đầy đủ
- Dữ liệu có thể mở rộng dễ dàng (thêm di tích, lễ hội, v.v.)

## 🎓 Nguồn tham khảo

**Giới thiệu Làng cổ Phong Nam - Trại sáng tác 2025**
- PGS. TS. KTS. Nguyễn Anh Tuấn – Trường ĐH Bách khoa, ĐHĐN
- TS. KTS. Phan Bảo An – Trường ĐH Sư phạm Kỹ thuật, ĐHĐN

Chủ đề: "Neo kiến trúc cảnh quan làng cổ - Bất biến giữa dòng đời vạn biến"
