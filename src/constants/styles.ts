import { ArchitecturalStyleCategory } from '../types';

export const ARCHITECTURAL_STYLES: ArchitecturalStyleCategory[] = [
  {
    category: 'Bảo tồn & Phục dựng Di sản',
    styles: [
      {
        name: 'Phục dựng nguyên bản Nhà Rường',
        prompt: 'An authentic restoration of a traditional Vietnamese "Nhà Rường" (beam house) from Central Vietnam, using original materials like ironwood, jackfruit wood, and yin-yang roof tiles. The structure should be meticulously preserved with traditional mortise and tenon joinery, carved dragon pillars, elaborate roof ridge decorations, and ornate wooden panels.',
        description: 'Tập trung giữ gìn tối đa các yếu tố gốc, sử dụng vật liệu và kỹ thuật truyền thống, mộng âm dương, cột chạm rồng.',
      },
      {
        name: 'Bảo tồn thích nghi (Adaptive Reuse)',
        prompt: 'Adaptive reuse of a historic structure, preserving the original facade and main structure while converting the interior into a new functional space (e.g., gallery, cafe, library). Maintain original architectural elements while inserting modern amenities with reversible interventions.',
        description: 'Giữ lại vỏ kiến trúc cũ, chuyển đổi công năng bên trong cho phú hợp với cuộc sống hiện đại, can thiệp có thể đảo ngược.',
      },
      {
        name: 'Tu bổ, gia cố kết cấu',
        prompt: 'A careful renovation focusing on reinforcing the ancient wooden structure with subtle modern techniques, while restoring decorative elements like carved panels and roof details. Use traditional carpentry methods combined with modern structural analysis and discreet steel reinforcement.',
        description: 'Tập trung vào việc gia cố, sửa chữa các cấu kiện gỗ, phục hồi các chi tiết trang trí đã hư hỏng, kết hợp kỹ thuật truyền thống và hiện đại.',
      },
      {
        name: 'Mô phỏng dấu ấn thời gian (Wabi-Sabi)',
        prompt: 'A design that embraces the beauty of aging and imperfection (Wabi-Sabi). Features weathered wood with natural patina, mossy yin-yang roof tiles, timeworn laterite stone walls, aged terracotta, capturing the serene, historic atmosphere with intentional preservation of aged textures.',
        description: 'Tôn vinh vẻ đẹp của sự không hoàn hảo, cũ kỹ của vật liệu như gỗ bạc màu, ngói rêu phong, tường đá ong, gốm cổ.',
      },
      {
        name: 'Tái hiện kiến trúc Đình làng',
        prompt: 'Recreating the majestic architecture of a traditional Vietnamese village communal house (Đình), with a large sweeping curved roof with upturned edges, intricate wood carvings of "Tứ Linh" (four sacred animals), dragon pillars, elaborate roof ridge decorations, and a spacious central hall with exposed wooden beam structure.',
        description: 'Mô phỏng kiến trúc đình làng với bộ mái lớn cong vút, các chi tiết chạm khắc tứ linh tinh xảo, cột rồng, không gian chung rộng rãi.'
      },
      {
        name: 'Phục dựng Nhà thờ họ miền Trung',
        prompt: 'Authentic reconstruction of a Central Vietnamese ancestral hall (Nhà thờ họ) with characteristic double-layer roof (mái kép), wooden pillars with dragon and phoenix carvings, elaborate roof ridge decorations, traditional "tam quan" three-gate entrance, parallel sentences (câu đối), and horizontal lacquered board (hoành phi).',
        description: 'Tái hiện nhà thờ họ miền Trung với mái kép, cột gỗ chạm rồng phượng, đầu hồi tinh xảo, cổng tam quan đặc trưng, câu đối, hoành phi.'
      },
      {
        name: 'Kiến trúc Tháp Chăm',
        prompt: 'Restoration inspired by ancient Champa tower architecture with terraced pyramid structures, red brick (gạch Chăm) with intricate relief carvings of Hindu deities, characteristic lotus-bud tower finials, decorative pilasters, and corbel arch construction techniques.',
        description: 'Lấy cảm hứng từ kiến trúc tháp Chăm với cấu trúc tháp tầng, gạch đỏ Chăm, phù điêu thần tượng Hindu, đỉnh tháp hoa sen.'
      },
      {
        name: 'Nhà sàn Miền Trung',
        prompt: 'Traditional stilt house of Central Vietnam with elevated floor on sturdy wooden pillars, thatched palm-leaf roof or traditional yin-yang tiles, open veranda (hiên), bamboo or wooden railings, and natural ventilation suitable for flood-prone coastal areas and typhoon regions.',
        description: 'Nhà sàn truyền thống miền Trung với sàn cao, cột gỗ chắc chắn, mái lá hoặc ngói, hiên rộng, lan can tre/gỗ, thích hợp vùng ven biển.'
      },
      {
        name: 'Tu bổ Nhà vườn Huế',
        prompt: 'Restoration of Hue royal garden house style with elegant curved tiled roofs (mái Huế), ornate wooden doors and windows with carved lattice patterns, interior courtyard with lotus pond, bonsai garden, ornamental rocks, and harmony between refined architecture and contemplative nature.',
        description: 'Phục dựng nhà vườn Huế với mái ngói cong thanh lịch, cửa gỗ chạm khắc hoa văn, sân trong có ao sen, cây cảnh, non bộ.'
      },
      {
        name: 'Kiến trúc Chùa Miền Trung',
        prompt: 'Traditional Central Vietnamese Buddhist temple architecture with multiple-tiered roofs (mái chồng), dramatically curved roof edges, red lacquered and gold-gilded pillars, dragon and phoenix motifs, bell and drum towers, three-gate entrance (tam quan), and tranquil meditation gardens with lotus ponds.',
        description: 'Kiến trúc chùa miền Trung với mái nhiều tầng, cong vút, cột sơn son thếp vàng, rồng phượng, chuông trống, tam quan, vườn thiền ao sen.'
      },
      {
        name: 'Nhà Cổ Phong Nam',
        prompt: 'Authentic preservation of Phong Nam ancient house with buffalo-horn curved roof (mái sừng trâu), carved wooden or stone pillars, three-compartment layout (nhà ba gian), traditional wooden partitions, ancestral altar space, yin-yang roof tiles, and original architectural details preserved from 1582-era construction.',
        description: 'Bảo tồn nguyên bản nhà cổ Phong Nam với mái cong sừng trâu, cột gỗ/đá chạm khắc, nhà ba gian, vách ngăn gỗ, gian thờ.'
      },
      {
        name: 'Đình Thần Nông Phong Nam',
        prompt: 'Restoration of Phong Nam communal house dedicated to Thần Nông (God of Agriculture) with large sweeping curved roof, wooden beam structure, dragon pillars, decorative carvings, ceremonial hall, and traditional village gathering space reflecting 1582 historical architecture.',
        description: 'Phục dựng Đình Thần Nông Phong Nam với mái cong lớn, kết cấu xà gồ, cột rồng, chạm khắc trang trí, sân lễ, không gian cộng đồng.'
      },
      {
        name: 'Miếu Thái Giám Phong Nam',
        prompt: 'Traditional shrine architecture of Phong Nam dedicated to Thái Giám with modest scale, single or double-tiered roof, wooden structure, incense altar, traditional decorative elements, and serene worship space maintaining historical authenticity.',
        description: 'Kiến trúc miếu Thái Giám Phong Nam với quy mô nhỏ gọn, mái đơn/kép, kết cấu gỗ, bàn thờ hương án, không gian thờ tự trang nghiêm.'
      },
      {
        name: 'Nhà thờ Tiền Hiền Phong Nam',
        prompt: 'Ancestral hall architecture of Phong Nam honoring founding ancestors with double-roof structure, elaborate carved wooden details, parallel sentences (câu đối), horizontal lacquered boards (hoành phi), ceremonial courtyard, and traditional worship layout.',
        description: 'Nhà thờ Tiền Hiền Phong Nam với mái kép, chi tiết gỗ chạm khắc tinh xảo, câu đối, hoành phi, sân lễ, bố cục thờ tự truyền thống.'
      },
      {
        name: 'Nhà Ba Gian Phong Nam',
        prompt: 'Traditional three-compartment house (nhà ba gian) of Phong Nam with central main compartment for worship, two side compartments for daily living, curved roof, wooden pillars, carved decorative panels, and layout reflecting 125 historical houses preserved in the village.',
        description: 'Nhà ba gian Phong Nam với gian giữa thờ tự, hai gian bên sinh hoạt, mái cong, cột gỗ, vách chạm khắc, bố cục 125 căn nhà cổ.'
      }
    ],
  },
  {
    category: 'Đối thoại giữa Hiện đại & Di sản',
    styles: [
      {
        name: 'Khối Kính trong nền Gỗ cũ',
        prompt: 'A modern minimalist glass box structure inserted into or adjacent to a traditional wooden house, creating a stark but respectful dialogue between old and new. The glass pavilion features frameless glazing, polished concrete flooring, while preserving exposed aged wooden beams and columns of the original structure.',
        description: 'Một khối kính tối giản hiện đại được đặt xen kẽ, bên trong hoặc kế bên một cấu trúc gỗ cổ, tạo đối thoại giữa cũ và mới.',
      },
      {
        name: 'Khung thép mảnh và Vách tường cũ',
        prompt: 'A minimalist structure of thin black steel frames and large glass panes built around or enclosing preserved sections of an old laterite stone wall or ancient brick wall. The steel structure is deliberately lightweight and transparent to avoid overwhelming the historic masonry.',
        description: 'Kết hợp hệ khung thép thanh mảnh, tối giản với những bức tường đá ong hoặc gạch cổ được giữ lại, khung thép nhẹ và trong suốt.',
      },
      {
        name: 'Mái truyền thống trên kết cấu hiện đại',
        prompt: 'A traditional Vietnamese curved tiled roof form with yin-yang tiles and sweeping upturned edges, placed atop a modern structure of exposed concrete and floor-to-ceiling glass. The roof appears to float above contemporary minimalist architecture.',
        description: 'Sử dụng hình thức mái dốc cong vút, ngói âm dương truyền thống cho một công trình có kết cấu bê tông và kính hiện đại.',
      },
      {
        name: 'Không gian chuyển tiếp Xưa-Nay',
        prompt: 'Creating a transitional space, like a glass-roofed atrium corridor or a semi-enclosed courtyard with steel and glass canopy, that connects a historic traditional building with a new, modern extension. This buffer zone allows both architectural styles to coexist harmoniously.',
        description: 'Tạo một không gian đệm (hành lang kính, sân trong với mái kính) kết nối công trình cũ và phần xây mới một cách hòa hợp.',
      },
      {
        name: 'Vật liệu mới trên hình khối cũ',
        prompt: 'Applying modern materials like weathering Corten steel panels, polished exposed concrete, or translucent polycarbonate panels to the surfaces of a building that retains traditional Vietnamese architectural forms and proportions.',
        description: 'Sử dụng vật liệu mới (thép Corten gỉ sét, bê tông mài, tấm polycarbonate) cho một công trình có hình khối mô phỏng kiến trúc cổ.'
      },
      {
        name: 'Thiết kế Lớp (Layer Design)',
        prompt: 'A layered architectural design where modern additions are clearly distinguishable from historic fabric through material choice, detailing, or slight setbacks. Each layer tells a story of a different era while maintaining overall visual harmony.',
        description: 'Thiết kế nhiều lớp rõ ràng, phân biệt phần mới và cũ qua vật liệu, chi tiết, mỗi lớp kể câu chuyện một thời kỳ.'
      },
      {
        name: 'Cầu nối Kính giữa hai Khối',
        prompt: 'A transparent glass bridge or connector linking a preserved traditional building with a new contemporary structure, creating physical and visual connection while maintaining the independence and identity of each architectural volume.',
        description: 'Cầu nối kính trong suốt nối công trình truyền thống với khối hiện đại, tạo liên kết nhưng giữ độc lập hai khối kiến trúc.'
      },
      {
        name: 'Khung cửa Hiện đại - View Di sản',
        prompt: 'Modern architecture with large picture windows and openings strategically positioned to frame views of preserved historic structures, creating a dialogue where new building becomes a viewing device for appreciating heritage.',
        description: 'Kiến trúc hiện đại với cửa sổ lớn đóng khung view nhìn ra các công trình di sản, tạo đối thoại giữa cái mới và cái cũ.'
      },
      {
        name: 'Châm Đính Hiện đại (Modern Infill)',
        prompt: 'Contemporary infill architecture inserted into gaps within historic fabric, using contrasting modern materials like glass, metal, concrete, but respecting the scale, rhythm, and proportions of surrounding traditional buildings.',
        description: 'Kiến trúc hiện đại lấp đầy khoảng trống trong khu cổ, vật liệu tương phản nhưng tôn trọng tỷ lệ, nhịp điệu xung quanh.'
      },
      {
        name: 'Nội thất Hiện đại - Vỏ Truyền thống',
        prompt: 'Preserving the traditional exterior envelope including roof form, walls, and fenestration pattern, while completely modernizing the interior with contemporary spatial layout, materials, and amenities.',
        description: 'Giữ nguyên vỏ ngoài truyền thống (mái, tường, cửa) nhưng cải tạo hoàn toàn nội thất với bố cục, vật liệu hiện đại.'
      }
    ],
  },
  {
      category: 'Diễn giải Đương đại',
      styles: [
        {
            name: 'Kiến trúc Tối giản Nhiệt đới',
            prompt: 'Tropical Minimalism architecture. Clean horizontal lines, open-plan spaces, neutral white and earth-tone palette, with features suited for the tropics like cross ventilation, operable louvers, horizontal brise-soleil sun shading, and lush vertical greenery integrated into facades.',
            description: 'Tối giản với đường nét sạch, màu trung tính, thông gió chéo, lam chắn nắng ngang, cây xanh trên mặt đứng.',
        },
        {
            name: 'Chủ nghĩa Brutalism Nhiệt đới',
            prompt: 'Tropical Brutalism architecture. Raw exposed concrete forms with bold geometric shapes are softened by abundant tropical plants in built-in planters, reflecting pools, water features cascading over concrete, and strategic openings that encourage natural airflow and dappled light.',
            description: 'Bê tông thô với hình khối đậm, được làm mềm bởi cây xanh nhiệt đới trong chậu, hồ nước phản chiếu, thác nước, thông gió tự nhiên.',
        },
        {
            name: 'Kiến trúc Hữu cơ - Bản địa',
            prompt: 'Local Organic Architecture. A design that seems to grow organically from the landscape, using local indigenous materials like rammed earth walls, bamboo structural elements, natural stone foundations, with soft, flowing curved forms, green roofs, and seamless integration with topography.',
            description: 'Hình khối mềm mại hữu cơ như mọc từ đất, vật liệu địa phương: đất nện, tre, đá tự nhiên, mái xanh, hòa nhập địa hình.',
        },
        {
            name: 'Cấu trúc Module Tre/Gỗ',
            prompt: 'A modular structure made from prefabricated bamboo or timber components with traditional mortise and tenon joinery, reflecting Vietnamese traditional carpentry techniques but with a contemporary systematic approach, allowing for flexible assembly and disassembly.',
            description: 'Công trình lắp ghép từ các module tre, gỗ gia công sẵn, mộng âm dương truyền thống, lắp ráp linh hoạt theo hệ thống hiện đại.',
        },
        {
            name: 'Nhà-vườn trong phố',
            prompt: 'A "House for Trees" concept inspired by Vo Trong Nghia Architects. A simple concrete building form where lush vegetation, mature trees, hanging gardens, and vertical green walls are the primary architectural expression, integrated into balconies, rooftops, atriums, and facades, creating an urban oasis.',
            description: 'Mô hình nhà ở với cây xanh là yếu tố kiến trúc chính, vườn treo, tường xanh, cây cổ thụ tích hợp ở ban công, mái, sân trong, tạo ốc đảo xanh đô thị.'
        },
        {
            name: 'Kiến trúc Tham số (Parametric)',
            prompt: 'Parametric architecture with algorithmically-generated flowing forms, intricate lattice-work screens, biomimetic structures inspired by natural patterns, creating dramatic shadows and ventilation while maintaining cultural references to traditional Vietnamese patterns.',
            description: 'Kiến trúc tham số với hình thức sinh từ thuật toán, tấm lưới tinh xảo, cấu trúc bắt chước tự nhiên, tạo bóng mát và thông gió.'
        },
        {
            name: 'Sinh thái Tự cấp (Net-Zero)',
            prompt: 'Net-zero energy building with passive solar design, photovoltaic panels integrated into roof and facade, rainwater harvesting system, natural ventilation chimneys, green roofs, greywater recycling, and locally-sourced sustainable materials.',
            description: 'Công trình tự cấp năng lượng với thiết kế hướng nắng, pin mặt trời, thu nước mưa, thông gió tự nhiên, mái xanh, tái chế nước xám.'
        },
        {
            name: 'Kiến trúc Khoảng trống (Void Architecture)',
            prompt: 'Architecture emphasizing negative space and voids, with large open courtyards, double-height atriums, strategic openings that frame sky and landscape, creating contemplative spaces where emptiness is as important as built form.',
            description: 'Kiến trúc nhấn mạnh khoảng trống với sân trong lớn, khoảng trống hai tầng, lỗ mở đóng khung trời đất, không gian thiền định.'
        },
        {
            name: 'Tân Vernacular (Neo-Vernacular)',
            prompt: 'Neo-Vernacular architecture reinterpreting traditional Vietnamese building forms through contemporary lens, using modern construction techniques and materials but maintaining the essence of local building typology, proportions, and climatic response.',
            description: 'Tái diễn giải kiến trúc bản địa Việt Nam bằng góc nhìn đương đại, kỹ thuật hiện đại nhưng giữ bản chất, tỷ lệ, ứng xử khí hậu địa phương.'
        },
        {
            name: 'Kiến trúc Biến đổi (Transformable)',
            prompt: 'Transformable architecture with operable walls, sliding panels, folding shutters, movable partitions, and adaptable spaces that can be reconfigured for different uses and climate conditions throughout the day and seasons.',
            description: 'Kiến trúc linh hoạt với tường di động, tấm trượt, cửa gấp, vách ngăn di chuyển, không gian thích ứng theo công năng và khí hậu.'
        },
        {
            name: 'Kiến trúc Làng cổ Hiện đại',
            prompt: 'Modern interpretation of traditional Vietnamese village cluster planning with low-rise buildings grouped around shared courtyards, interconnected alleyways, communal spaces, mixed-use ground floors, but using contemporary materials and sustainable systems.',
            description: 'Diễn giải hiện đại quy hoạch làng cổ Việt Nam với nhà thấp quanh sân chung, ngõ hẻm kết nối, không gian cộng đồng, vật liệu đương đại.'
        },
        {
            name: 'Kiến trúc Nước (Water Architecture)',
            prompt: 'Architecture deeply integrated with water elements including canals, reflecting pools, rain chains, water walls, floating structures, and amphibious design suitable for flood-prone Central Vietnam coastal areas.',
            description: 'Kiến trúc hòa quyện với nước: kênh rạch, hồ phản chiếu, dây dẫn mưa, tường nước, cấu trúc nổi, thiết kế lưỡng cư cho vùng ven biển.'
        }
    ]
  },
  {
      category: 'Cảnh quan & Không gian công cộng',
      styles: [
        {
            name: 'Cảnh quan Ký ức',
            prompt: 'A memorial landscape design that uses symbolic elements like old stones, water, and native plants to evoke the history and memories of the village.',
            description: 'Sử dụng các yếu tố biểu tượng (đá, nước, cây bản địa) để gợi nhớ lịch sử, ký ức.',
        },
        {
            name: 'Không gian cộng đồng Tương tác',
            prompt: 'An interactive public space with modular seating, multi-purpose platforms, and shade structures, encouraging community gathering and activities.',
            description: 'Không gian đa năng với chỗ ngồi linh hoạt, mái che, khuyến khích tụ tập cộng đồng.',
        },
        {
            name: 'Sân chơi Thiên nhiên',
            prompt: 'A natural playground for children, using elements like logs, sand, water channels, and native plants instead of plastic equipment.',
            description: 'Sân chơi trẻ em sử dụng các vật liệu tự nhiên như gỗ, cát, nước, cây cỏ thay vì đồ nhựa.',
        },
        {
            name: 'Vườn thiền Tối giản',
            prompt: 'A minimalist zen garden with raked gravel, carefully placed boulders, a water basin, and minimal planting, creating a tranquil space for contemplation.',
            description: 'Vườn tối giản với sỏi, đá tảng, mặt nước và ít cây cối, tạo không gian tĩnh tâm.',
        },
        {
            name: 'Con đường Kể chuyện',
            prompt: 'A landscaped pathway that tells a story, with integrated art installations, historical markers, and viewing points that guide visitors through the village\'s history.',
            description: 'Một lối đi dạo có các tác phẩm nghệ thuật, cột mốc lịch sử, điểm dừng chân ngắm cảnh.'
        },
        {
            name: 'Sân đình làng Hiện đại',
            prompt: 'A modern reinterpretation of traditional village communal space (Sân đình) with performance stage, flexible seating areas, traditional banyan tree, stone wells, and community gathering zones.',
            description: 'Tái hiện sân đình làng với sân khấu biểu diễn, khu vực ngồi linh hoạt, cây đa, giếng làng, không gian sinh hoạt cộng đồng.'
        },
        {
            name: 'Bến Nước làng cổ',
            prompt: 'Restoration of traditional village waterfront (Bến nước) with stone steps leading to water, washing areas, boat docks, shaded pavilions, and native aquatic plants.',
            description: 'Phục dựng bến nước làng với bậc đá xuống sông, khu giặt giũ, bến thuyền, nhà vọng, cây thủy sinh bản địa.'
        },
        {
            name: 'Vườn Cây Thuốc Nam',
            prompt: 'A traditional medicinal herb garden featuring Central Vietnamese native medicinal plants, educational signage, rammed earth paths, bamboo fencing, and rest pavilions.',
            description: 'Vườn thuốc nam với cây thuốc bản địa miền Trung, biển giới thiệu, lối đi đất nện, hàng rào tre, chòi nghỉ.'
        },
        {
            name: 'Quảng trường Chợ làng',
            prompt: 'Village market square design with covered market stalls using traditional roof forms, open plaza for festivals, permanent stone seating, water features, and native shade trees.',
            description: 'Quảng trường chợ làng với gian hàng mái truyền thống, sân mở tổ chức lễ hội, ghế đá cố định, mặt nước, cây bóng mát.'
        },
        {
            name: 'Khu Vườn Hương',
            prompt: 'A sensory garden featuring fragrant Central Vietnamese flowers and plants like jasmine (nhài), grapefruit blossoms (bưởi), milk fruit (vú sữa), creating aromatic walking paths.',
            description: 'Vườn cây thơm với hoa nhài, hoa bưởi, cây vú sữa, tạo lối đi tản bộ thơm mát đặc trưng miền Trung.'
        }
      ]
  },
  {
      category: 'Kiến trúc Nhỏ - Small Interventions',
      styles: [
        {
            name: 'Chòi nghỉ tre đan',
            prompt: 'Small bamboo pavilion with woven bamboo walls, thatched or tile roof, elevated platform, integrated seating, providing shade and rest for villagers and visitors.',
            description: 'Chòi nghỉ nhỏ bằng tre đan, mái lá hoặc ngói, sàn cao, ghế tích hợp, tạo bóng mát cho người dân và du khách.'
        },
        {
            name: 'Cổng làng Đá Ong',
            prompt: 'Village entrance gate made from laterite stone (đá ong) with traditional roof cover, carved village name, decorative motifs, flanked by guardian stone statues.',
            description: 'Cổng làng bằng đá ong với mái che truyền thống, tên làng chạm khắc, họa tiết trang trí, tượng đá gác cổng.'
        },
        {
            name: 'Giếng làng Hiện đại',
            prompt: 'Modern interpretation of traditional village well with preserved stone structure, new rain shelter, educational display about water heritage, seating area for social gathering.',
            description: 'Giếng làng hiện đại giữ kết cấu đá cổ, mái che mưa mới, bảng giới thiệu di sản nước, khu vực ngồi giao lưu.'
        },
        {
            name: 'Trạm xe đạp tre',
            prompt: 'Eco-friendly bicycle parking station made from bamboo structure, with bike racks, small tool station, information board, and green roof for natural cooling.',
            description: 'Trạm đỗ xe đạp sinh thái bằng tre với giá đỗ, trạm công cụ nhỏ, bảng thông tin, mái xanh làm mát tự nhiên.'
        },
        {
            name: 'Bục đá Kể chuyện',
            prompt: 'Traditional stone storytelling platform with built-in seating arrangement, small performance area, preserved ancient trees for shade, gathering spot for community activities.',
            description: 'Bục đá kể chuyện với chỗ ngồi tích hợp, khu vực biểu diễn nhỏ, cây cổ thụ che mát, điểm tụ họp cộng đồng.'
        },
        {
            name: 'Tủ Sách làng',
            prompt: 'Small community library structure with weatherproof book cabinets, reading benches, thatched roof pavilion design, promoting village literacy and knowledge sharing.',
            description: 'Tủ sách cộng đồng với kệ sách chống nước, ghế đọc, thiết kế chòi mái lá, khuyến khích đọc sách chia sẻ kiến thức.'
        },
        {
            name: 'Nhà Vệ sinh Sinh thái',
            prompt: 'Ecological toilet facility using traditional materials and forms, natural ventilation, composting system, rainwater harvesting, bamboo privacy screens, integrated landscaping.',
            description: 'Nhà vệ sinh sinh thái với vật liệu và hình thức truyền thống, thông gió tự nhiên, hệ thống ủ phân, thu nước mưa, vách tre.'
        },
        {
            name: 'Điểm Quan sát Phong cảnh',
            prompt: 'Scenic viewpoint structure with elevated wooden platform, bamboo railing, traditional roof shelter, viewing frames, seating for contemplation of surrounding landscape.',
            description: 'Điểm ngắm cảnh với sàn gỗ cao, lan can tre, mái che truyền thống, khung view, chỗ ngồi chiêm ngưỡng phong cảnh.'
        }
      ]
  }
];

export const INTERIOR_STYLES: ArchitecturalStyleCategory[] = [
    {
        category: 'Tái hiện & Tôn vinh Truyền thống',
        styles: [
            {
                name: 'Không gian Nhà Rường Nguyên bản',
                prompt: 'The authentic interior of a "Nhà Rường" house, showcasing the intricate wooden beam and column structure. Features antique furniture like a "sập gụ" (wooden divan) and "tủ chè" (tea cabinet), with carved details.',
                description: 'Tái hiện nội thất nhà rường với kết cấu gỗ, đồ nội thất cổ như sập gụ, tủ chè.'
            },
            {
                name: 'Nội thất Mộc mạc (Rustic) với Gỗ cũ',
                prompt: 'A rustic interior style that highlights the natural beauty of aged and reclaimed wood. Simple, sturdy furniture and a warm, cozy atmosphere.',
                description: 'Tôn vinh vẻ đẹp tự nhiên của gỗ cũ, gỗ tái chế. Nội thất đơn giản, chắc chắn, ấm cúng.'
            },
            {
                name: 'Vẻ đẹp của vật liệu thô',
                prompt: 'An interior that exposes the raw materials of the building: bare brick walls, polished concrete floors, and an exposed timber ceiling structure.',
                description: 'Phô bày vẻ đẹp của vật liệu gốc: tường gạch trần, sàn bê tông mài, trần gỗ lộ kết cấu.'
            },
            {
                name: 'Không gian thờ tự trang nghiêm',
                prompt: 'The solemn interior of an ancestral altar space, with meticulously carved wooden elements, parallel sentences ("câu đối"), and lacquered boards ("hoành phi").',
                description: 'Tái hiện không gian thờ gia tiên với đồ gỗ chạm khắc, hoành phi, câu đối.'
            },
            {
                name: 'Wabi-Sabi: Vẻ đẹp không hoàn hảo',
                prompt: 'A Wabi-Sabi interior that finds beauty in imperfection. Uses natural, unrefined materials, handmade ceramics, and celebrates the patina of age.',
                description: 'Tôn vinh vẻ đẹp của sự không hoàn hảo, vật liệu thô mộc, đồ gốm thủ công.',
            },
        ]
    },
    {
        category: 'Đương đại trên nền Di sản',
        styles: [
            {
                name: 'Tối giản trong nhà cổ',
                prompt: 'A minimalist interior set within a historic structure. Modern, clean-lined furniture creates a contrast with the old, textured walls and wooden beams.',
                description: 'Nội thất hiện đại, tối giản được đặt tương phản trong một không gian có kết cấu cổ.',
            },
            {
                name: 'Indochine (Đông Dương) Thanh lịch',
                prompt: 'A refined Indochine interior balancing French colonial elegance with Vietnamese motifs. Features dark wood, rattan furniture, decorative floor tiles, and louvered windows.',
                description: 'Cân bằng giữa nét sang trọng của Pháp và họa tiết Việt. Gỗ sẫm, mây tre, gạch bông.',
            },
            {
                name: 'Scandinavian với nét Á Đông',
                prompt: 'A Scandinavian interior with an Asian touch. Light wood and neutral colors are complemented by elements like low seating, paper lanterns, or delicate patterns.',
                description: 'Phong cách Bắc Âu với gỗ sáng, màu trung tính, kết hợp các yếu tố Á Đông như bàn thấp, đèn giấy.',
            },
            {
                name: 'Không gian mở, kết nối vườn trong',
                prompt: 'A modern, open-plan interior that revolves around an inner courtyard ("sân thiên tỉnh"), with large glass doors that blur the line between inside and out.',
                description: 'Không gian mở, liên thông, xoay quanh một sân trong với cửa kính lớn.',
            },
            {
                name: 'Gác lửng thép trong không gian cũ',
                prompt: 'A modern steel mezzanine level inserted into a high-ceilinged traditional space, creating a new functional area while respecting the original volume.',
                description: 'Thêm một gác lửng bằng thép vào không gian cũ có trần cao để tăng diện tích sử dụng.'
            },
        ]
    },
    {
        category: 'Phong cách Nhiệt đới & Bản địa',
        styles: [
            {
                name: 'Nhiệt đới Hiện đại (Modern Tropical)',
                prompt: 'Modern Tropical interior with a focus on natural light, ventilation, and indoor plants. Uses materials like teak wood, linen fabrics, and woven rattan.',
                description: 'Tập trung vào ánh sáng, thông gió, cây xanh. Vật liệu: gỗ teak, vải lanh, mây tre đan.',
            },
            {
                name: 'Bohemian (Du mục) & Mộc mạc',
                prompt: 'A relaxed, bohemian-style interior with layered textiles, handmade decor, macrame hangings, and a mix of vintage and rustic furniture.',
                description: 'Không gian thư thái với nhiều lớp vải, đồ trang trí thủ công, đồ nội thất mộc mạc.',
            },
            {
                name: 'Nhà quê Đương đại (Modern Farmhouse)',
                prompt: 'A modern take on farmhouse style. Combines rustic elements like wood beams and barn doors with modern comforts and a clean, bright color palette.',
                description: 'Kết hợp yếu tố đồng quê (xà gỗ, cửa chuồng ngựa) với tiện nghi hiện đại, màu sắc sáng sủa.',
            },
            {
                name: 'Nội thất Đất nện và Tre',
                prompt: 'An eco-friendly interior featuring rammed earth walls and furniture or structural elements made from bamboo.',
                description: 'Nội thất thân thiện môi trường với tường đất nện, các cấu kiện và đồ đạc bằng tre.',
            },
             {
                name: 'Không gian Thiền (Zen)',
                prompt: 'A tranquil, Zen-inspired interior. Minimal furniture, natural materials, a neutral color scheme, and a focus on creating a calm, uncluttered atmosphere.',
                description: 'Không gian tĩnh lặng, tối giản, vật liệu tự nhiên, bảng màu trung tính, tạo cảm giác yên bình.',
            },
        ]
    }
];