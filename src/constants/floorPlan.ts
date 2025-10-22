import { ConversionOption } from '../types';
import { IconTechnicalDrawing, Icon3dSection, IconFurnitureLayout, IconEmptyPlan } from '../components/icons';

export const CONVERSION_OPTIONS: ConversionOption[] = [
    { id: 'technical_drawing', name: 'Bản vẽ Kỹ thuật 2D', description: 'Chuyển đổi thành bản vẽ 2D sạch sẽ, chính xác', icon: IconTechnicalDrawing },
    { id: '3d_section', name: 'Mặt cắt 3D', description: 'Tạo phối cảnh 3D dạng mặt cắt', icon: Icon3dSection },
    { id: "furniture_layout", name: "Bố trí Nội thất", description: "Tự động đề xuất cách bố trí nội thất", icon: IconFurnitureLayout },
    { id: "empty_plan", name: "Dọn dẹp mặt bằng", description: "Loại bỏ đồ đạc để có mặt bằng trống", icon: IconEmptyPlan }
];

export const ROOM_TYPES: string[] = [
    'Phòng khách',
    'Phòng ngủ',
    'Bếp & Phòng ăn',
    'Văn phòng làm việc',
    'Quán cà phê',
    'Không gian triển lãm'
];
