<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/10o_cXjv4U8S6Ta5abTAr_rjgsfwlmUWb

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Tính năng Lưu trữ Thư viện

Ứng dụng hỗ trợ **2 phương thức lưu trữ song song**:

### 1. Bộ nhớ trình duyệt (localStorage)
- **Dung lượng**: ~9MB (tối đa 50 ảnh)
- **Tự động lưu**: Mỗi ảnh được tạo ra đều tự động lưu
- **Giới hạn**: Khi đầy, hệ thống sẽ xóa ảnh cũ (giữ lại ảnh yêu thích)
- **Cảnh báo**: Thanh tiến trình chuyển đỏ khi >90%

### 2. Thư mục máy tính (File System Access API)
- **Dung lượng**: Không giới hạn
- **Yêu cầu**: Trình duyệt Chrome/Edge 86+
- **Cách sử dụng**:
  1. Nhấn nút **"Chọn thư mục"** trong tab Thư viện
  2. Chọn thư mục muốn lưu ảnh
  3. Tất cả ảnh mới sẽ được lưu vào thư mục này
  4. Tên file: `phongnam_[id]_[timestamp].png`

### 3. Tải về file ZIP
- Nhấn nút **"ZIP"** để tải tất cả ảnh trong thư viện
- File ZIP chứa tất cả ảnh với tên có timestamp
- Định dạng: `PhongNam_Gallery_[timestamp].zip`

### Lưu ý quan trọng
- ⚠️ **Khi bộ nhớ trình duyệt đầy**: Hệ thống sẽ hỏi có muốn tải ZIP trước khi xóa
- 💡 **Khuyến nghị**: Chọn thư mục lưu trữ ngay từ đầu để tránh mất dữ liệu
- ⭐ **Ảnh yêu thích**: Luôn được ưu tiên giữ lại trong localStorage
- 🔒 **Quyền truy cập**: Trình duyệt sẽ hỏi quyền truy cập thư mục mỗi phiên làm việc

### Trình duyệt hỗ trợ
| Tính năng | Chrome/Edge | Firefox | Safari |
|-----------|-------------|---------|--------|
| localStorage | ✅ | ✅ | ✅ |
| Thư mục máy tính | ✅ (86+) | ❌ | ❌ |
| Tải ZIP | ✅ | ✅ | ✅ |
