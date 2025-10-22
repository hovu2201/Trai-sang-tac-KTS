import {
  IconAngleCenter,
  IconAngleDown,
  IconAngleLeft,
  IconAngleLeft45,
  IconAngleOpposite,
  IconAngleRight,
  IconAngleRight45,
  IconAngleTop,
  IconAngleTwoPoint,
  IconAngleWide,
  IconViewElevation,
  IconViewPlan,
  IconViewSection,
  IconZoomIn,
  IconZoomOut,
} from '../components/icons';
import { AngleOption } from '../types';

export const ANGLE_OPTIONS: AngleOption[] = [
    { id: 'center', name: 'Chính diện', prompt: 'A centered, eye-level frontal shot, perfectly straight, architectural elevation style.', icon: IconAngleCenter },
    { id: 'left_45', name: 'Trái 45°', prompt: 'CRITICAL VIEW CHANGE: Rotate the camera 45 degrees to the left from the current viewpoint, showing a three-quarter perspective view.', icon: IconAngleLeft45 },
    { id: 'left', name: 'Bên trái (90°)', prompt: 'CRITICAL VIEW CHANGE: Rotate the camera exactly 90 degrees to the left from the current viewpoint to show the full left side facade of the structure in a straight-on elevation view.', icon: IconAngleLeft },
    { id: 'right_45', name: 'Phải 45°', prompt: 'CRITICAL VIEW CHANGE: Rotate the camera 45 degrees to the right from the current viewpoint, showing a three-quarter perspective view.', icon: IconAngleRight45 },
    { id: 'right', name: 'Bên phải (90°)', prompt: 'CRITICAL VIEW CHANGE: Rotate the camera exactly 90 degrees to the right from the current viewpoint to show the full right side facade of the structure in a straight-on elevation view.', icon: IconAngleRight },
    { id: 'two_point', name: 'Phối cảnh 2 điểm tụ', prompt: 'CRITICAL VIEW CHANGE: Redraw the entire scene from a classic two-point perspective, emphasizing depth and architectural form. All vertical lines must remain perfectly vertical.', icon: IconAngleTwoPoint },
    { id: 'high', name: 'Góc cao', prompt: 'A high-angle shot, looking down, bird\'s-eye view.', icon: IconAngleTop },
    { id: 'low', name: 'Góc thấp', prompt: 'A low-angle shot, looking up, worm\'s-eye view, emphasizing height.', icon: IconAngleDown },
    { id: 'wide', name: 'Góc rộng', prompt: 'A wide-angle panoramic shot, capturing the entire scene.', icon: IconAngleWide },
    { id: 'zoom_in', name: 'Zoom gần', prompt: 'A detailed close-up shot of an interesting architectural feature.', icon: IconZoomIn },
    { id: 'zoom_out', name: 'Zoom xa', prompt: 'A distant shot, showing the building in its wider context.', icon: IconZoomOut },
    { id: 'opposite', name: 'Đối diện (180°)', prompt: 'A shot from the exact opposite angle of the original view.', icon: IconAngleOpposite },
];

export const VIEW_2D_OPTIONS: AngleOption[] = [
    { id: 'plan', name: 'Mặt bằng', prompt: 'ABSOLUTE REQUIREMENT: Generate a technically accurate architectural 2D floor plan of the main level, derived strictly from the provided 3D image. The view MUST be a top-down, non-perspective, orthographic projection. The output MUST be a clean, high-contrast, black and white line drawing (no colors, shading, or textures). Accurately represent wall thicknesses, room layouts, and the precise locations of doors and windows as seen in the 3D source. Exclude all furniture and annotations.', icon: IconViewPlan },
    { id: 'front_elevation', name: 'Mặt đứng', prompt: 'ABSOLUTE REQUIREMENT: Generate a technically accurate architectural 2D front elevation drawing. This drawing MUST be a precise representation of the front facade from the provided 3D image. The view MUST be a straight-on, non-perspective, orthographic projection. The output MUST be a clean, high-contrast, black and white line drawing (no colors, shading, or textures). All exterior details, including windows, doors, material joints, and rooflines, must be depicted with geometric accuracy based on the 3D source.', icon: IconViewElevation },
    { id: 'left_elevation', name: 'Mặt bên trái', prompt: 'ABSOLUTE REQUIREMENT: Generate a technically accurate architectural 2D left side elevation drawing. This drawing MUST be a precise representation of the left facade from the provided 3D image. The view MUST be a straight-on, non-perspective, orthographic projection. The output MUST be a clean, high-contrast, black and white line drawing (no colors, shading, or textures). All exterior details, including windows, doors, material joints, and rooflines, must be depicted with geometric accuracy based on the 3D source.', icon: IconViewElevation },
    { id: 'right_elevation', name: 'Mặt bên phải', prompt: 'ABSOLUTE REQUIREMENT: Generate a technically accurate architectural 2D right side elevation drawing. This drawing MUST be a precise representation of the right facade from the provided 3D image. The view MUST be a straight-on, non-perspective, orthographic projection. The output MUST be a clean, high-contrast, black and white line drawing (no colors, shading, or textures). All exterior details, including windows, doors, material joints, and rooflines, must be depicted with geometric accuracy based on the 3D source.', icon: IconViewElevation },
    { id: 'rear_elevation', name: 'Mặt sau', prompt: 'ABSOLUTE REQUIREMENT: Generate a technically accurate architectural 2D rear elevation drawing. This drawing MUST be a precise representation of the back facade from the provided 3D image. The view MUST be a straight-on, non-perspective, orthographic projection. The output MUST be a clean, high-contrast, black and white line drawing (no colors, shading, or textures). All exterior details, including windows, doors, material joints, and rooflines, must be depicted with geometric accuracy based on the 3D source.', icon: IconViewElevation },
    { id: 'section', name: 'Mặt cắt', prompt: 'ABSOLUTE REQUIREMENT: Generate a technically accurate architectural 2D cross-section drawing. This drawing MUST be derived strictly from the provided 3D image, cutting vertically through its center. The view must be a non-perspective, orthographic projection. The output MUST be a clean, high-contrast, black and white line drawing (no colors, shading, gradients, textures, or perspective distortion). CRITICAL: All cut elements (walls, floors, roof) MUST be drawn with a significantly heavier line weight than non-cut elements. These cut sections must be filled with standard architectural hatching patterns (e.g., double diagonal lines for concrete). Your drawing must accurately represent the internal structure, including floor levels, roof construction, wall thicknesses, and the layout of major interior spaces, all logically derived from the visual information in the 3D image. This is a technical drawing, not an artistic interpretation.', icon: IconViewSection },
];

export const EXTERIOR_ANGLE_PROMPTS: string[] = [
  // Góc chụp cơ bản
  "Góc chụp trực diện toàn cảnh mặt tiền căn nhà, chụp thẳng góc",
  "Góc chụp 3/4 bên trái, thể hiện cả mặt tiền và hông nhà, tạo chiều sâu",
  "Góc chụp 3/4 bên phải, lấy được chiều sâu công trình, góc 45 độ",
  
  // Góc chụp từ trên
  "Góc chụp từ trên cao nhìn xuống (drone view, bird's eye) toàn cảnh khuôn viên và mái nhà, độ cao 15-20m",
  "Góc chụp drone nghiêng 45° nhìn xuống mặt tiền, thể hiện cả mái và sân vườn",
  "Góc chụp drone panorama quay 360° quanh công trình, thể hiện toàn cảnh",
  
  // Góc chụp từ dưới
  "Góc chụp từ dưới lên (low angle, worm's eye view), nhấn mạnh chiều cao và sự bề thế",
  "Góc chụp từ sân vườn nhìn lên mặt tiền, tầm thấp 0.5m, dramatic",
  
  // Góc chụp chi tiết
  "Góc chụp cận cảnh chi tiết cửa chính và vật liệu mặt tiền, macro detail",
  "Góc chụp chi tiết kết cấu mái ngói, hoa văn chạm khắc, architectural detail",
  "Góc chụp cận cảnh cột gỗ, trụ đá, chi tiết trang trí, texture close-up",
  "Góc chụp chi tiết cửa sổ, khung cửa, lan can, pattern detail",
  
  // Góc chụp có khung cảnh
  "Góc chụp xuyên qua hàng cây/cảnh quan để tạo khung tự nhiên (framing composition)",
  "Góc chụp từ sau cây cổ thụ nhìn về nhà, tạo khung cây tự nhiên",
  "Góc chụp qua cổng chính nhìn vào sân trong, depth of field",
  "Góc chụp từ trong nhà nhìn ra sân vườn hoặc cổng, inside-out view",
  
  // Góc chụp góc rộng
  "Góc chụp panorama quét ngang 180°, bao trọn bối cảnh và môi trường xung quanh",
  "Góc chụp wide angle 16mm lens, thể hiện tổng thể công trình và khuôn viên",
  
  // Góc chụp đêm
  "Góc chụp ban đêm với ánh sáng nhân tạo, nhấn mạnh hệ thống đèn trang trí",
  "Góc chụp twilight (golden hour, blue hour), bầu trời xanh thẫm, đèn vàng ấm",
  "Góc chụp night scene với long exposure, light trail, artistic lighting",
  
  // Góc chụp nghệ thuật
  "Góc chụp reflection (phản chiếu) qua mặt nước, ao, hồ, mirror effect",
  "Góc chụp silhouette backlight, ánh sáng chiếu sau tạo bóng đen dramatic",
  "Góc chụp symmetrical (đối xứng) hoàn hảo, centered composition",
  
  // Góc chụp bối cảnh
  "Góc chụp từ đường phố nhìn vào, thể hiện mối quan hệ với môi trường đô thị",
  "Góc chụp từ vườn sau nhìn lại nhà, thể hiện không gian sân vườn riêng tư",
  "Góc chụp aerial view nghiêng, thể hiện mối quan hệ với khu phố xung quanh",
  
  // Góc chụp chuyên nghiệp
  "Góc chụp architectural photography standard: eye-level, straight-on, no distortion",
  "Góc chụp two-point perspective, vertical lines thẳng đứng, professional shot",
  "Góc chụp tilt-shift effect, selective focus, miniature effect (optional)",
  "Góc chụp editorial style, magazine quality, perfect lighting and composition",
];

export const INTERIOR_ANGLE_PROMPTS: string[] = [
  // Góc chụp tổng quan phòng
  "Ảnh chụp thực tế từ trên cao nhìn xuống toàn bộ không gian phòng (overhead shot)",
  "Ảnh chụp thực tế góc 3/4 bên trái bao quát cả căn phòng, wide angle",
  "Ảnh chụp thực tế góc 3/4 bên phải bao quát cả căn phòng, comprehensive view",
  "Ảnh chụp thực tế góc chính diện thẳng vào trung tâm phòng, frontal symmetrical",
  
  // Góc chụp từ các vị trí đặc biệt
  "Ảnh chụp thực tế góc chéo từ cửa ra vào nhìn vào trong phòng, welcoming view",
  "Ảnh chụp thực tế góc chụp từ phía sau sofa nhìn về hướng cửa sổ, cozy angle",
  "Ảnh chụp thực tế góc chụp từ trong phòng nhìn ngược ra cửa chính, exit view",
  "Ảnh chụp thực tế góc chụp từ góc tường chéo tạo cảm giác rộng, corner perspective",
  
  // Góc chụp nghệ thuật
  "Ảnh chụp thực tế góc chụp từ trần nhà thấp xuống tạo chiều sâu không gian, dramatic ceiling",
  "Ảnh chụp thực tế góc chụp đối xứng cân bằng toàn bộ phòng, perfect symmetry",
  "Ảnh chụp thực tế one-point perspective, focal point ở giữa, perfect alignment",
  "Ảnh chụp thực tế two-point perspective, natural depth, professional shot",
  
  // Góc chụp khu vực cụ thể
  "Ảnh chụp thực tế khu vực sofa và bàn trà từ góc nhìn ngang, eye-level",
  "Ảnh chụp thực tế khu vực kệ tivi và tường trang trí từ góc chính diện, media wall",
  "Ảnh chụp thực tế bàn ăn và ghế từ góc nghiêng 45 độ, dining area",
  "Ảnh chụp thực tế khu vực bếp từ góc island nhìn ra, kitchen view",
  "Ảnh chụp thực tế góc làm việc, bàn học từ góc nghiêng, workspace setup",
  "Ảnh chụp thực tế khu vực đọc sách với kệ sách và ghế đơn, reading nook",
  
  // Góc chụp ánh sáng tự nhiên
  "Ảnh chụp thực tế cửa sổ lớn và ánh sáng tự nhiên tràn vào phòng, natural light",
  "Ảnh chụp thực tế backlight qua rèm cửa, soft diffused light, dreamy atmosphere",
  "Ảnh chụp thực tế golden hour light streaming through windows, warm glow",
  "Ảnh chụp thực tế side lighting tạo bóng đổ dramatic, sculptural shadows",
  
  // Góc chụp chi tiết
  "Ảnh chụp thực tế cận cảnh sofa với chất liệu vải hoặc da, texture detail",
  "Ảnh chụp thực tế cận cảnh bàn trà với mặt kính hoặc gỗ, material close-up",
  "Ảnh chụp thực tế cận cảnh đèn chùm pha lê hoặc đèn thả trần, chandelier detail",
  "Ảnh chụp thực tế cận cảnh gối trang trí nhiều màu sắc trên sofa, cushion styling",
  "Ảnh chụp thực tế chi tiết tường trang trí với tranh nghệ thuật và đèn hắt sáng, wall art",
  "Ảnh chụp thực tế chi tiết kệ trưng bày với đồ decor, shelf styling detail",
  "Ảnh chụp thực tế chi tiết thảm trải sàn, pattern và texture, rug detail",
  "Ảnh chụp thực tế chi tiết rèm cửa, vải vóc, curtain draping",
  
  // Góc chụp không gian mở
  "Ảnh chụp thực tế phòng khách liên thông bếp, open-plan layout",
  "Ảnh chụp thực tế từ phòng khách nhìn sang phòng ăn, flow between spaces",
  "Ảnh chụp thực tế corridor/hallway perspective, deep space",
  
  // Góc chụp chuyên nghiệp
  "Ảnh chụp thực tế editorial interior shot, magazine quality, perfect styling",
  "Ảnh chụp thực tế architectural digest style, high-end professional",
  "Ảnh chụp thực tế real estate photography standard, wide and bright",
  "Ảnh chụp thực tế HDR bracketing merged, balanced exposure throughout",
  
  // Góc chụp lifestyle
  "Ảnh chụp thực tế lifestyle shot với người ngồi đọc sách, lived-in atmosphere",
  "Ảnh chụp thực tế morning scene với cà phê trên bàn, breakfast setup",
  "Ảnh chụp thực tế evening ambiance với đèn vàng ấm, cozy night scene",
  
  // Góc chụp sáng tạo
  "Ảnh chụp thực tế reflection in mirror or glass, creative composition",
  "Ảnh chụp thực tế through doorway framing, layered depth",
  "Ảnh chụp thực tế low angle from floor level, unique perspective",
  "Ảnh chụp thực tế high angle bird's eye of furniture arrangement, layout overview",
];