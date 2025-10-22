import { ArchitecturalElementCategory } from '../types';

export const INTERIOR_ARCHITECTURAL_DETAILS: ArchitecturalElementCategory[] = [
    {
        category: 'Kết cấu & Không gian',
        options: [
            { id: 'int-struct-vikèo', name: 'Hệ vì kèo gỗ lộ thiên', prompt: 'exposed wooden truss and beam system (vì kèo) of the roof structure', description: 'Toàn bộ kết cấu gỗ của mái được để lộ.' },
            { id: 'int-struct-cotgo', name: 'Hàng cột gỗ', prompt: 'a row of polished wooden columns defining the interior bays (gian)', description: 'Hệ thống cột gỗ tròn hoặc vuông, phân chia không gian.' },
            { id: 'int-space-gaclung', name: 'Gác lửng gỗ', prompt: 'a wooden mezzanine or loft space', description: 'Thêm một tầng lửng bằng gỗ để tăng diện tích.' },
            { id: 'int-space-gianthong', name: 'Không gian liên thông', prompt: 'an open-plan interior where living, dining, and worship spaces flow into each other', description: 'Không gian phòng khách, ăn, thờ tự không có vách ngăn.' },
            { id: 'int-feature-skylight', name: 'Giếng trời', prompt: 'a large skylight or internal courtyard flooding the space with natural light', description: 'Khoảng thông tầng lấy sáng tự nhiên.' },
            { id: 'int-struct-vault', name: 'Trần vòm/Vòm gạch', prompt: 'brick vaulted ceiling creating spacious and cool interior, colonial influence', description: 'Trần vòm gạch tạo không gian rộng và mát, ảnh hưởng thuộc địa.' },
            { id: 'int-space-split-level', name: 'Không gian sàn sai tầng', prompt: 'split-level floor design creating distinct zones while maintaining visual connection', description: 'Sàn sai cao độ tạo phân khu nhưng vẫn liên thông.' },
            { id: 'int-feature-double-height', name: 'Không gian cao 2 tầng', prompt: 'double-height ceiling space creating grandeur and better air circulation', description: 'Trần cao xuyên 2 tầng tạo sự uy nghi và thông gió tốt.' },
            { id: 'int-struct-partition', name: 'Vách ngăn di động', prompt: 'movable partition walls (cửa bàn) allowing flexible space configuration', description: 'Vách ngăn có thể di chuyển, linh hoạt không gian.' },
            { id: 'int-space-corridor', name: 'Hành lang quanh sân trong', prompt: 'covered corridor surrounding internal courtyard, connecting rooms', description: 'Hành lang có mái quanh sân trong, nối các phòng.' },
        ]
    },
    {
        category: 'Nội thất & Đồ gỗ',
        options: [
            { id: 'int-furn-sapgu', name: 'Sập gụ, tủ chè', prompt: 'traditional antique furniture including a wooden divan (sập gụ) and a tea cabinet (tủ chè)', description: 'Bộ đồ gỗ cổ, thường là trung tâm của phòng khách.' },
            { id: 'int-furn-trangtho', name: 'Trang thờ gia tiên', prompt: 'an ornate, carved wooden ancestral altar', description: 'Bàn thờ tổ tiên được chạm khắc công phu.' },
            { id: 'int-furn-binhphong', name: 'Bình phong gỗ', prompt: 'an indoor wooden folding screen, often with carvings or paintings', description: 'Tấm vách ngăn di động bằng gỗ, dùng để che chắn.' },
            { id: 'int-furn-phan', name: 'Phản gỗ', prompt: 'a simple wooden platform bed or daybed (phản)', description: 'Tấm gỗ lớn dùng để nằm hoặc ngồi.' },
            { id: 'int-furn-truongky', name: 'Bộ bàn ghế Trường kỷ', prompt: 'a set of traditional long wooden benches (trường kỷ) with a matching table', description: 'Bộ bàn ghế gồm hai ghế dài và một bàn.' },
            { id: 'int-furn-tu-ao', name: 'Tủ áo gỗ cổ', prompt: 'antique wooden wardrobe with intricate carvings and brass hardware', description: 'Tủ quần áo gỗ cổ chạm khắc, kim loại đồng.' },
            { id: 'int-furn-ke-sach', name: 'Kệ sách gỗ', prompt: 'traditional wooden bookshelf for displaying books, scrolls, and scholarly items', description: 'Kệ gỗ trưng bày sách, cuốn thư, đồ học trò.' },
            { id: 'int-furn-ban-tho', name: 'Bàn thờ Phật', prompt: 'Buddhist altar table with incense burners, candles, offering bowls, and Buddha statues', description: 'Bàn thờ Phật với lư hương, nến, bát cúng, tượng.' },
            { id: 'int-furn-ghe-salon', name: 'Ghế salon gỗ + Mây', prompt: 'colonial-style wooden salon chairs with rattan seats, French Indochina influence', description: 'Ghế salon gỗ lưng tựa mây, phong cách Đông Dương.' },
            { id: 'int-furn-ban-tron', name: 'Bàn tròn mặt đá', prompt: 'round table with marble top and carved wooden base for family dining', description: 'Bàn tròn mặt đá, chân gỗ chạm, ăn cơm gia đình.' },
            { id: 'int-furn-tu-tho', name: 'Tủ thờ kín', prompt: 'enclosed altar cabinet that can be closed when not in use', description: 'Tủ thờ có cửa đóng mở khi không dùng.' },
            { id: 'int-furn-ban-hoc', name: 'Bàn học kiểu Nho', prompt: 'traditional scholar\'s desk with drawers for writing materials and books', description: 'Bàn học trò kiểu Nho với ngăn kéo, bút mực sách.' },
            { id: 'int-furn-ghe-toa', name: 'Ghế tựa/Ghế quốc', prompt: 'traditional Vietnamese armchair with high back and carved armrests', description: 'Ghế bành tựa lưng cao, tay vịn chạm khắc.' },
        ]
    },
    {
        category: 'Hoàn thiện & Trang trí',
        options: [
            { id: 'int-decor-hoanhphi', name: 'Hoành phi, câu đối', prompt: 'decorative lacquered and gilded horizontal boards (hoành phi) and parallel sentences (câu đối) with Chinese characters', description: 'Các tấm bảng chữ Hán và câu đối được sơn son thếp vàng.' },
            { id: 'int-decor-chamkhac', name: 'Chi tiết chạm khắc gỗ', prompt: 'intricate wood carvings featuring traditional motifs (dragons, phoenixes, flowers) on beams, doors, and partitions', description: 'Các họa tiết được chạm khắc trên gỗ ở kèo, cột, cửa.' },
            { id: 'int-wall-vachgo', name: 'Vách ngăn gỗ', prompt: 'wooden partition walls, some with carved lattice work for ventilation', description: 'Tường ngăn chia trong nhà bằng các tấm gỗ.' },
            { id: 'int-floor-gachbong', name: 'Sàn gạch bông (gạch hoa)', prompt: 'a floor paved with decorative cement encaustic tiles (gạch bông)', description: 'Sàn lát gạch xi măng có hoa văn trang trí.' },
            { id: 'int-floor-gachbattrang', name: 'Sàn gạch Bát Tràng', prompt: 'a floor paved with rustic, red terracotta tiles from Bát Tràng', description: 'Sàn lát bằng gạch đất nung màu đỏ mộc mạc.' },
            { id: 'int-decor-khamtrai', name: 'Chi tiết khảm trai', prompt: 'mother-of-pearl inlays on furniture or decorative panels', description: 'Nghệ thuật khảm vỏ trai lên bề mặt đồ gỗ.' },
            { id: 'int-decor-sonmai', name: 'Sơn mài truyền thống', prompt: 'traditional Vietnamese lacquerware (sơn mài) decoration on walls, columns, or furniture with natural lacquer and eggshell inlay', description: 'Trang trí sơn mài với sơn ta và khảm vỏ trứng trên tường, cột, đồ gỗ.' },
            { id: 'int-decor-tranh-dan-gian', name: 'Tranh dân gian (Đông Hồ, Hàng Trống)', prompt: 'traditional Vietnamese folk paintings (Đông Hồ, Hàng Trống) displayed as interior decoration', description: 'Tranh dân gian truyền thống trang trí trong nhà.' },
            { id: 'int-ceiling-mo', name: 'Trần mó gỗ', prompt: 'wooden plank ceiling with visible beams and traditional joinery techniques', description: 'Trần ốp gỗ tấm với kèo và mối nối truyền thống lộ ra.' },
            { id: 'int-floor-go-lon', name: 'Sàn gỗ lim/gụ nguyên tấm', prompt: 'solid wood flooring made from large planks of ironwood (lim) or rosewood (gụ)', description: 'Sàn gỗ quý nguyên tấm lớn, bền vững theo thời gian.' },
            { id: 'int-wall-tuong-trang', name: 'Tường trát vôi trắng', prompt: 'white lime-plastered walls creating clean, bright interior space', description: 'Tường trát vôi trắng tạo không gian sáng sủa.' },
            { id: 'int-decor-tranh-thu-phap', name: 'Tranh thư pháp', prompt: 'calligraphy scrolls with poetic verses or philosophical sayings hanging on walls', description: 'Tranh chữ thư pháp, thơ văn, triết lý treo tường.' },
            { id: 'int-decor-den-go', name: 'Đèn gỗ/Đèn lồng', prompt: 'wooden or paper lantern lighting fixtures creating warm ambient light', description: 'Đèn bằng gỗ hoặc giấy tạo ánh sáng ấm áp.' },
            { id: 'int-wall-op-go', name: 'Ốp tường gỗ', prompt: 'wooden wall paneling (ốp gỗ) providing warmth and acoustic insulation', description: 'Tường ốp gỗ tạo ấm và cách âm.' },
            { id: 'int-ceiling-cong', name: 'Trần cong/Vòm', prompt: 'curved or vaulted ceiling creating architectural interest and spaciousness', description: 'Trần cong hoặc vòm tạo điểm nhấn kiến trúc, rộng rãi.' },
            { id: 'int-decor-binh-hoa', name: 'Bình hoa/Lọ sứ cổ', prompt: 'antique ceramic vases and flower pots as decorative elements', description: 'Bình hoa, lọ sứ cổ trang trí.' },
            { id: 'int-floor-da-tu-nhien', name: 'Sàn đá tự nhiên', prompt: 'natural stone flooring with traditional patterns and textures', description: 'Sàn lát đá tự nhiên với họa tiết, kết cấu truyền thống.' },
            { id: 'int-decor-rem-lua', name: 'Rèm lụa thêu', prompt: 'embroidered silk curtains with traditional Vietnamese patterns', description: 'Rèm lụa thêu họa tiết truyền thống Việt Nam.' },
        ]
    },
    {
        category: 'Đặc trưng Miền Trung',
        options: [
            { id: 'int-central-bancau', name: 'Bàn cầu gỗ', prompt: 'traditional Central Vietnamese areca palm motif carved wooden altar table (bàn cầu) for ancestor worship', description: 'Bàn thờ gỗ chạm họa tiết cây cau đặc trưng miền Trung.' },
            { id: 'int-central-tuongnho', name: 'Tượng nhỏ tứ linh', prompt: 'small carved wooden statues of Four Sacred Animals (dragon, unicorn, tortoise, phoenix) on altar or shelves', description: 'Tượng gỗ nhỏ tứ linh (long, ly, quy, phượng) đặt trên bàn thờ.' },
            { id: 'int-central-den-dau', name: 'Đèn dầu đồng', prompt: 'traditional bronze or brass oil lamps providing warm ambient lighting', description: 'Đèn dầu bằng đồng thau tạo ánh sáng ấm áp truyền thống.' },
            { id: 'int-central-khung-anh', name: 'Khung ảnh gỗ chạm', prompt: 'intricately carved wooden photo frames displaying ancestor portraits or family photos', description: 'Khung ảnh gỗ chạm khắc trưng bày ảnh tổ tiên, gia đình.' },
            { id: 'int-central-ro-gao', name: 'Rọ gạo tre đan', prompt: 'traditional woven bamboo rice storage containers as decorative elements', description: 'Rọ đựng gạo bằng tre đan truyền thống làm điểm nhấn trang trí.' },
            { id: 'int-central-bep-thon', name: 'Bếp thôn truyền thống', prompt: 'traditional village kitchen with wood-fired stove, earthenware pots, and bamboo utensil holders', description: 'Bếp làng với bếp đốt củi, nồi gốm, giá đựng đồ tre.' },
            { id: 'int-central-gian-tho', name: 'Gian thờ trung đường', prompt: 'central ceremonial hall for ancestor worship with elaborate altar, incense holders, and ritual objects', description: 'Gian chính nhà thờ tổ tiên với bàn thờ lớn, lư hương, đồ lễ.' },
            { id: 'int-central-cua-ban', name: 'Cửa bàn gỗ thông', prompt: 'traditional movable wooden panel doors (cửa bàn) with ventilation slots for interior room divisions', description: 'Cửa bàn gỗ có thể tháo lắp với khe thoáng khí ngăn phòng.' },
            { id: 'int-central-tuong-dat-nen', name: 'Tường đất nện', prompt: 'interior rammed earth walls with natural earth tones and thermal mass properties', description: 'Tường đất nện trong nhà với màu đất tự nhiên và tính chất cách nhiệt.' },
            { id: 'int-central-gio-hoa', name: 'Giỏ hoa quả cúng', prompt: 'traditional woven offering baskets containing fruits and flowers for altar arrangements', description: 'Giỏ cúng bằng tre đựng hoa quả trang trí bàn thờ.' },
        ]
    },
    {
        category: 'Ánh sáng & Thông gió',
        options: [
            { id: 'int-light-cua-song', name: 'Cửa song gỗ', prompt: 'wooden lattice windows allowing filtered light and natural ventilation', description: 'Cửa sổ gỗ nan cho ánh sáng lọc qua và gió tự nhiên.' },
            { id: 'int-light-khe-gio', name: 'Khe gió tường cao', prompt: 'high wall ventilation gaps near ceiling for hot air escape and cross ventilation', description: 'Khe thoáng khí cao gần trần cho không khí nóng thoát ra.' },
            { id: 'int-light-den-long', name: 'Đèn lồng giấy', prompt: 'traditional paper lanterns providing soft diffused lighting in living spaces', description: 'Đèn lồng giấy truyền thống chiếu sáng mềm mại.' },
            { id: 'int-light-gieng-troi-trong', name: 'Giếng trời trung tâm', prompt: 'central skylight courtyard bringing natural light deep into interior spaces', description: 'Sân giếng trời trung tâm đưa ánh sáng tự nhiên vào sâu trong nhà.' },
            { id: 'int-vent-ong-gio', name: 'Ống gió tre', prompt: 'bamboo air ducts for natural ventilation system connecting spaces', description: 'Hệ thống ống tre dẫn gió tự nhiên kết nối các không gian.' },
            { id: 'int-light-cua-kinh-mau', name: 'Cửa kính màu', prompt: 'stained glass windows with traditional Vietnamese motifs filtering colorful light', description: 'Cửa kính màu họa tiết Việt Nam lọc ánh sáng nhiều màu.' },
        ]
    }
];