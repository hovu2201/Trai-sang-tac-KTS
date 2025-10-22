/**
 * Service tạo thuyết minh kiến trúc chuyên sâu cho phương án
 * Kết hợp ngữ cảnh Làng cổ Phong Nam
 */

import { GoogleGenAI } from '@google/genai';

import { PHONG_NAM_CONTEXT } from '../constants/phongNamContext';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
const model = 'gemini-2.0-flash-exp';

interface ArchitecturalDescriptionParams {
  selectedStyle?: string;
  selectedMaterials?: string[];
  selectedElements?: string[];
  selectedDramatization?: string;
  selectedEnvironment?: string;
  selectedScenery?: string;
  aspectRatio?: { width: number; height: number };
  prompt?: string;
}

/**
 * Tạo thuyết minh kiến trúc chi tiết theo ngữ cảnh Phong Nam
 */
export const generateArchitecturalDescription = async (
  params: ArchitecturalDescriptionParams
): Promise<string> => {
  try {
    const contextPrompt = buildContextPrompt(params);
    
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [{ text: contextPrompt }]
      },
      config: {
        temperature: 0.8,
        maxOutputTokens: 2048,
      }
    });

    if (response.candidates && response.candidates.length > 0) {
      const content = response.candidates[0].content;
      if (content.parts && content.parts[0].text) {
        return content.parts[0].text;
      }
    }

    throw new Error("Không thể tạo thuyết minh");
  } catch (error) {
    console.error("Error generating architectural description:", error);
    throw new Error("Lỗi khi tạo thuyết minh kiến trúc");
  }
};

/**
 * Xây dựng prompt với ngữ cảnh Làng cổ Phong Nam
 */
function buildContextPrompt(params: ArchitecturalDescriptionParams): string {
  const {
    selectedStyle,
    selectedMaterials,
    selectedElements,
    selectedDramatization,
    selectedEnvironment,
    selectedScenery,
    aspectRatio,
    prompt
  } = params;

  return `
BỐI CẢNH DỰ ÁN: LÀNG CỔ PHONG NAM - ĐÀ NẴNG

I. NGỮ CẢNH VĂN HÓA LỊCH SỬ:
${PHONG_NAM_CONTEXT.history.content}

Các di tích tiêu biểu:
${PHONG_NAM_CONTEXT.architecturalHeritage.monuments.map((m, i) => 
  `${i + 1}. ${m.name}: ${m.features?.slice(0, 2).join(', ')}`
).join('\n')}

Đặc trưng cảnh quan:
${PHONG_NAM_CONTEXT.landscape.features.map((f, i) => 
  `${i + 1}. ${f.name}: ${f.description}`
).join('\n')}

II. MỤC TIÊU TRẠI SÁNG TÁC:
"Neo kiến trúc cảnh quan làng cổ - Bất biến giữa dòng đời vạn biến"
- Giữ gìn bản sắc văn hóa kiến trúc truyền thống
- Tạo lập không gian kiến trúc bền vững cho cộng đồng
- Phát triển du lịch gắn với bảo tồn di sản
- Cải thiện đời sống người dân

III. YÊU CẦU THIẾT KẾ:
${selectedStyle ? `- Phong cách: ${selectedStyle}` : ''}
${selectedMaterials && selectedMaterials.length > 0 ? `- Vật liệu: ${selectedMaterials.join(', ')}` : ''}
${selectedElements && selectedElements.length > 0 ? `- Chi tiết kiến trúc: ${selectedElements.join(', ')}` : ''}
${selectedDramatization ? `- Điểm nhấn: ${selectedDramatization}` : ''}
${selectedEnvironment ? `- Môi trường: ${selectedEnvironment}` : ''}
${selectedScenery ? `- Cảnh quan: ${selectedScenery}` : ''}
${aspectRatio ? `- Tỷ lệ ảnh: ${aspectRatio.width}x${aspectRatio.height}` : ''}
${prompt ? `- Mô tả bổ sung: ${prompt}` : ''}

IV. NGUYÊN TẮC THIẾT KẾ:
1. Tôn trọng kiến trúc truyền thống: Nhà ba gian, mái ngói âm dương, cột gỗ chạm khắc
2. Hài hòa với cảnh quan: Luỹ tre, cây cổ thụ, cánh đồng lúa
3. Bền vững và thích ứng: Kết hợp truyền thống với nhu cầu hiện đại
4. Kết nối cộng đồng: Tạo không gian sinh hoạt văn hóa

---

NHIỆM VỤ: Viết thuyết minh kiến trúc chi tiết (500-800 từ) cho phương án thiết kế này theo cấu trúc sau:

1. TỔNG QUAN PHƯƠNG ÁN (2-3 đoạn):
   - Ý tưởng chủ đạo và triết lý thiết kế
   - Mối liên hệ với bối cảnh Làng cổ Phong Nam
   - Cách phương án "neo giữ" giá trị truyền thống

2. GIẢI PHÁP KIẾN TRÚC (3-4 đoạn):
   a) Không gian và bố cục:
      - Tổ chức không gian chức năng
      - Quan hệ trong - ngoài, công - tư
      - Trục lưu thông và điểm nhấn
   
   b) Hình thức kiến trúc:
      - Tạo hình tổng thể (khối, mái, tỷ lệ)
      - Chi tiết đặc trưng (cột, kèo, hoa văn)
      - Màu sắc và vật liệu
   
   c) Kỹ thuật - Kết cấu:
      - Giải pháp kết cấu chính
      - Vật liệu sử dụng (truyền thống + hiện đại)
      - Thích ứng khí hậu (chống nóng, mưa, bão)

3. GIẢI PHÁP CẢNH QUAN (2-3 đoạn):
   - Tổ chức không gian xanh
   - Cây trồng đặc trưng (tre, cau, chè Tàu...)
   - Kết nối với cảnh quan xung quanh (đồng lúa, ao làng)
   - Điểm dừng chân và trải nghiệm

4. GIÁ TRỊ VĂN HÓA - XÃ HỘI (2 đoạn):
   - Giữ gìn bản sắc văn hóa Làng Việt
   - Phục vụ cộng đồng (sinh hoạt, lễ hội, du lịch)
   - Phát triển kinh tế bền vững
   - Tăng thu nhập cho người dân

5. KẾT LUẬN (1 đoạn):
   - Tổng kết giá trị của phương án
   - Đóng góp vào việc bảo tồn Làng cổ Phong Nam
   - Tầm nhìn phát triển trong tương lai

LƯU Ý QUAN TRỌNG:
- Sử dụng ngôn ngữ chuyên ngành kiến trúc, rõ ràng, súc tích
- Đan xen các thuật ngữ truyền thống Việt Nam
- Liên hệ cụ thể với các di tích của Phong Nam (Đình Thần Nông, Nhà thờ Tiền Hiền...)
- Nhấn mạnh tính bền vững và thích ứng
- Thể hiện tinh thần "Neo giữ giá trị - Phát triển bền vững"

HÃY VIẾT THUYẾT MINH:
`.trim();
}

/**
 * Tạo thuyết minh ngắn cho preview
 */
export const generateShortDescription = async (
  params: ArchitecturalDescriptionParams
): Promise<string> => {
  try {
    const prompt = `
Dựa trên các thông số sau, hãy viết một đoạn thuyết minh ngắn (100-150 từ) về phương án kiến trúc:

${params.selectedStyle ? `- Phong cách: ${params.selectedStyle}` : ''}
${params.selectedMaterials ? `- Vật liệu: ${params.selectedMaterials.join(', ')}` : ''}
${params.selectedElements ? `- Chi tiết: ${params.selectedElements.join(', ')}` : ''}
${params.prompt ? `- Mô tả: ${params.prompt}` : ''}

Ngữ cảnh: Phương án cho Làng cổ Phong Nam, Đà Nẵng - Làng văn hóa truyền thống với kiến trúc đặc trưng nhà ba gian, mái ngói, cảnh quan ruộng lúa và luỹ tre.

Viết ngắn gọn, tập trung vào ý tưởng chủ đạo và giá trị nổi bật.
`.trim();

    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: [{ text: prompt }] },
      config: { temperature: 0.7, maxOutputTokens: 256 }
    });

    if (response.candidates && response.candidates.length > 0) {
      const content = response.candidates[0].content;
      if (content.parts && content.parts[0].text) {
        return content.parts[0].text;
      }
    }

    return "Phương án thiết kế kết hợp hài hòa giữa kiến trúc truyền thống và nhu cầu hiện đại, góp phần bảo tồn và phát huy giá trị văn hóa Làng cổ Phong Nam.";
  } catch (error) {
    console.error("Error generating short description:", error);
    return "Phương án thiết kế cho Làng cổ Phong Nam";
  }
};

/**
 * Tạo tiêu đề phương án
 */
export const generateProjectTitle = (params: ArchitecturalDescriptionParams): string => {
  const parts: string[] = [];
  
  if (params.selectedStyle) {
    parts.push(params.selectedStyle);
  }
  
  if (params.selectedElements && params.selectedElements.length > 0) {
    parts.push(params.selectedElements[0]);
  }
  
  if (parts.length === 0) {
    parts.push("Phương án");
  }
  
  parts.push("- Làng cổ Phong Nam");
  
  return parts.join(' ');
};
