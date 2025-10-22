import { AspectRatioOption } from '../types';

export const ASPECT_RATIO_OPTIONS: AspectRatioOption[] = [
  // Tùy chọn mới, mặc định
  { id: 'from_input', name: 'Theo ảnh đầu vào (Mặc định)', width: 0, height: 0 },
  
  // Tỉ lệ ngang (Landscape)
  { id: 'landscape_2_1', name: 'Ngang Siêu rộng (2:1)', width: 1536, height: 768 },
  { id: 'landscape_16_9', name: 'Ngang Rộng (16:9)', width: 1344, height: 768 },
  { id: 'landscape_3_2', name: 'Ngang (3:2)', width: 1152, height: 768 },
  { id: 'landscape_4_3', name: 'Ngang Cổ điển (4:3)', width: 1024, height: 768 },
  
  // Tỉ lệ vuông
  { id: 'square_1_1', name: 'Vuông (1:1)', width: 1024, height: 1024 },

  // Tỉ lệ đứng (Portrait)
  { id: 'portrait_3_4', name: 'Đứng Cổ điển (3:4)', width: 768, height: 1024 },
  { id: 'portrait_2_3', name: 'Đứng (2:3)', width: 768, height: 1152 },
  { id: 'portrait_9_16', name: 'Đứng Cao (9:16)', width: 768, height: 1344 },
  { id: 'portrait_1_2', name: 'Đứng Siêu cao (1:2)', width: 768, height: 1536 },
];