// Dựa trên bảng giá Gemini 2.5 Flash Image Preview
export const USD_TO_VND_RATE = 25500; // Cập nhật tỷ giá
export const INPUT_COST_PER_MILLION_TOKENS_USD = 0.30;
export const OUTPUT_COST_PER_MILLION_TOKENS_USD = 30.00;

// Dựa trên ví dụ của Google: ảnh 1024x1024px (khoảng 1 triệu pixels) tiêu thụ 1290 tokens.
// Ta dùng đây làm cơ sở để tính toán.
const REFERENCE_MEGAPIXELS = (1024 * 1024) / 1000000;
const REFERENCE_TOKENS_OUTPUT = 1290;
const TOKENS_PER_MEGAPIXEL_OUTPUT = REFERENCE_TOKENS_OUTPUT / REFERENCE_MEGAPIXELS;

// Ước tính token đầu vào (cho prompt text + ảnh gốc).
// Đây là con số ước lượng cho mục đích UX vì không thể tính chính xác.
const ESTIMATED_INPUT_TOKENS = 2500;

/**
 * Tính toán chi phí ước tính để tạo ra một hình ảnh dựa trên mô hình giá mới (input + output).
 * @param width Chiều rộng của ảnh (pixels)
 * @param height Chiều cao của ảnh (pixels)
 * @returns Chi phí ước tính bằng VNĐ, được làm tròn lên đơn vị nghìn đồng gần nhất.
 */
export const calculateImageCostVND = (width: number, height: number): number => {
    if (width <= 0 || height <= 0) {
        return 0;
    }

    // 1. Tính chi phí đầu ra (output) dựa trên số pixel
    const totalPixels = width * height;
    const megapixels = totalPixels / 1000000;
    const estimatedOutputTokens = megapixels * TOKENS_PER_MEGAPIXEL_OUTPUT;
    const outputCostUSD = (estimatedOutputTokens / 1000000) * OUTPUT_COST_PER_MILLION_TOKENS_USD;

    // 2. Tính chi phí đầu vào (input) ước tính
    const inputCostUSD = (ESTIMATED_INPUT_TOKENS / 1000000) * INPUT_COST_PER_MILLION_TOKENS_USD;

    // 3. Tổng chi phí
    const totalCostUSD = inputCostUSD + outputCostUSD;
    const totalCostVND = totalCostUSD * USD_TO_VND_RATE;
    
    // 4. Tính giá cuối cùng cho người dùng (bao gồm chi phí vận hành, lợi nhuận, v.v.)
    const userPrice = totalCostVND * 10;
    
    // Làm tròn lên đơn vị nghìn đồng gần nhất để số đẹp hơn (ví dụ: 1,234đ -> 2,000đ)
    // Mức giá tối thiểu là 1,000đ
    const finalCost = Math.max(1000, Math.ceil(userPrice / 1000) * 1000);
    
    return finalCost;
};
