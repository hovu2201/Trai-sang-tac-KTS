import { ArchitecturalElementCategory } from '../types';

/**
 * Các yếu tố văn hóa đặc trưng miền Trung Việt Nam
 * Phục vụ cho dự án bảo tồn và phát triển làng cổ Phong Nam, Đà Nẵng
 */
export const CULTURAL_ELEMENTS: ArchitecturalElementCategory[] = [
  {
    category: 'Lễ hội & Tín ngưỡng',
    options: [
      { 
        id: 'culture-festival-dinh', 
        name: 'Lễ hội Đình làng', 
        prompt: 'village communal house festival with ceremonial processions, traditional music, dragon dances, offerings at ancestral altar',
        description: 'Lễ hội tại đình làng với rước kiệu, nhạc lễ, múa rồng, lễ vật trên bàn thờ tổ tiên'
      },
      { 
        id: 'culture-festival-cau-ngu', 
        name: 'Lễ cầu ngư', 
        prompt: 'fishing village ceremony with decorated boats, offerings to sea gods, traditional costumes, ceremonial flags',
        description: 'Lễ cầu ngư của làng chài với thuyền trang trí, lễ vật cúng thần biển, trang phục truyền thống'
      },
      { 
        id: 'culture-festival-kate', 
        name: 'Lễ hội Kate Chăm', 
        prompt: 'Cham ethnic Kate festival at ancient tower ruins with traditional Cham costumes, ritual dances, offerings',
        description: 'Lễ hội Kate của người Chăm tại tháp cổ với trang phục, múa lễ, lễ vật truyền thống'
      },
      { 
        id: 'culture-ancestor-worship', 
        name: 'Giỗ tổ', 
        prompt: 'ancestral death anniversary ceremony with elaborate altar setup, incense, food offerings, family gathering',
        description: 'Lễ giỗ tổ tiên với bàn thờ hoành tráng, hương đèn, mâm cỗ, sum họp gia đình'
      },
      { 
        id: 'culture-temple-fair', 
        name: 'Hội chùa', 
        prompt: 'temple fair with Buddhist devotees, prayer flags, lotus offerings, vegetarian food stalls, ceremonial activities',
        description: 'Hội chùa với phật tử, cờ phướn, hoa sen cúng, quầy ăn chay, các nghi lễ tôn giáo'
      },
      { 
        id: 'culture-tet-celebration', 
        name: 'Tết Nguyên Đán', 
        prompt: 'Lunar New Year celebration with peach blossom trees, red decorations, traditional cakes, family gatherings',
        description: 'Tết Nguyên Đán với cây đào, đồ trang trí đỏ, bánh truyền thống, sum họp gia đình'
      },
      { 
        id: 'culture-mid-autumn', 
        name: 'Tết Trung Thu', 
        prompt: 'Mid-Autumn Festival with colorful lanterns, moon cakes, lion dances, children parade with lanterns',
        description: 'Tết Trung Thu với đèn lồng nhiều màu, bánh trung thu, múa lân, đoàn rước đèn trẻ em'
      },
    ]
  },
  {
    category: 'Nghề truyền thống',
    options: [
      { 
        id: 'craft-pottery', 
        name: 'Làng gốm', 
        prompt: 'traditional pottery village with clay workshops, pottery wheels, drying ceramics, kilns, finished pottery displays',
        description: 'Làng nghề gốm với xưởng đất sét, bàn xoay, gốm phơi khô, lò nung, trưng bày sản phẩm'
      },
      { 
        id: 'craft-weaving', 
        name: 'Dệt chiếu', 
        prompt: 'mat weaving craft with artisans working on traditional looms, sedge materials, finished colorful mats',
        description: 'Nghề dệt chiếu với thợ dệt trên khung cửi truyền thống, cói cây, chiếu thành phẩm nhiều màu'
      },
      { 
        id: 'craft-bamboo', 
        name: 'Đan tre', 
        prompt: 'bamboo weaving craft with skilled artisans creating baskets, fish traps, furniture from bamboo strips',
        description: 'Nghề đan tre với thợ thủ công tạo rổ, lợp, đồ nội thất từ nan tre'
      },
      { 
        id: 'craft-incense', 
        name: 'Làng hương', 
        prompt: 'incense making village with colorful incense sticks drying in sun, workers hand-rolling incense, fragrant atmosphere',
        description: 'Làng nghề hương với nhang nhiều màu phơi nắng, thợ vo hương thủ công, không khí thơm'
      },
      { 
        id: 'craft-fishing-net', 
        name: 'Đan lưới', 
        prompt: 'traditional fishing net making with fishermen weaving nets, piles of nylon or natural fiber nets',
        description: 'Nghề đan lưới đánh cá với ngư dân dệt lưới, đống lưới nylon hoặc sợi tự nhiên'
      },
      { 
        id: 'craft-wood-carving', 
        name: 'Chạm khắc gỗ', 
        prompt: 'wood carving workshop with master craftsmen sculpting intricate designs, wood shavings, carved panels',
        description: 'Xưởng chạm khắc gỗ với nghệ nhân điêu khắc họa tiết tinh xảo, mùn cưa, pano chạm khắc'
      },
      { 
        id: 'craft-conical-hat', 
        name: 'Làm nón lá', 
        prompt: 'conical hat making with artisans stitching palm leaves, bamboo frames, finished nón lá stacked',
        description: 'Nghề làm nón lá với thợ khâu lá cọ, khung tre, nón lá thành phẩm xếp chồng'
      },
      { 
        id: 'craft-silk', 
        name: 'Dệt lụa', 
        prompt: 'silk weaving with traditional wooden looms, silkworm cocoons, colorful silk fabric production',
        description: 'Nghề dệt lụa với khung cửi gỗ truyền thống, kén tằm, sản xuất vải lụa nhiều màu'
      },
      { 
        id: 'craft-stone-carving', 
        name: 'Chạm khắc đá', 
        prompt: 'stone carving craft with sculptors working on marble from Marble Mountains, creating statues and decorative elements',
        description: 'Nghề chạm khắc đá với thợ điêu khắc đá cẩm thạch Ngũ Hành Sơn, tạo tượng và đồ trang trí'
      },
    ]
  },
  {
    category: 'Sinh hoạt Cộng đồng',
    options: [
      { 
        id: 'community-market', 
        name: 'Chợ phiên', 
        prompt: 'periodic village market with vendors selling fresh produce, local crafts, traditional foods, bustling atmosphere',
        description: 'Chợ phiên làng với người bán nông sản tươi, đồ thủ công, đồ ăn truyền thống, không khí nhộn nhịp'
      },
      { 
        id: 'community-well', 
        name: 'Giếng làng', 
        prompt: 'communal village well with women washing clothes, children playing, stone structure, social gathering point',
        description: 'Giếng nước chung làng với phụ nữ giặt quần áo, trẻ em chơi đùa, kết cấu đá, điểm tụ họp xã hội'
      },
      { 
        id: 'community-playground', 
        name: 'Sân chơi trẻ em', 
        prompt: 'children playing traditional games like bamboo dancing, shuttlecock, tug of war in village square',
        description: 'Trẻ em chơi trò chơi dân gian như nhảy sạp, đá cầu, kéo co trong sân làng'
      },
      { 
        id: 'community-tea', 
        name: 'Quán nước vỉa hè', 
        prompt: 'traditional street-side tea shop with low plastic stools, locals chatting, Vietnamese coffee or tea service',
        description: 'Quán trà vỉa hè truyền thống với ghế nhựa thấp, dân địa phương trò chuyện, phục vụ cà phê hoặc trà'
      },
      { 
        id: 'community-elderly', 
        name: 'Người già tâm sự', 
        prompt: 'elderly villagers sitting under banyan tree sharing stories, playing traditional board games, peaceful scene',
        description: 'Người già làng ngồi dưới cây đa kể chuyện, chơi cờ truyền thống, cảnh bình yên'
      },
      { 
        id: 'community-fishing', 
        name: 'Đánh cá tập thể', 
        prompt: 'communal fishing activity with villagers pulling nets together, sorting catch, sharing harvest',
        description: 'Hoạt động đánh cá tập thể với dân làng kéo lưới cùng nhau, phân loại cá, chia thu hoạch'
      },
      { 
        id: 'community-rice-threshing', 
        name: 'Đập lúa chung', 
        prompt: 'communal rice threshing with farmers working together, traditional threshing tools, rice grain piles',
        description: 'Đập lúa cộng đồng với nông dân làm việc cùng nhau, công cụ đập lúa truyền thống, đống thóc'
      },
    ]
  },
  {
    category: 'Ẩm thực & Đồ ăn',
    options: [
      { 
        id: 'food-street-vendor', 
        name: 'Hàng rong', 
        prompt: 'street food vendor with shoulder pole (gánh hàng rong), traditional food baskets, local customers',
        description: 'Người bán hàng rong với đòn gánh, rổ đựng đồ ăn truyền thống, khách địa phương'
      },
      { 
        id: 'food-banh-mi', 
        name: 'Quầy bánh mì', 
        prompt: 'Vietnamese banh mi cart with fresh baguettes, various fillings, charcoal grill for pork, busy vendor',
        description: 'Xe bánh mì với bánh mì tươi, nhiều loại nhân, lò than nướng thịt, người bán bận rộn'
      },
      { 
        id: 'food-pho', 
        name: 'Quán phở', 
        prompt: 'traditional pho noodle shop with steaming broth pot, fresh herbs, customers slurping noodles',
        description: 'Quán phở truyền thống với nồi nước dùng bốc khói, rau thơm tươi, khách ăn phở'
      },
      { 
        id: 'food-banh-xeo', 
        name: 'Làm bánh xèo', 
        prompt: 'making Vietnamese crepe (bánh xèo) with sizzling pan, turmeric batter, shrimp and sprout filling',
        description: 'Làm bánh xèo với chảo xèo xèo, bột nghệ, nhân tôm và giá'
      },
      { 
        id: 'food-mi-quang', 
        name: 'Mì Quảng', 
        prompt: 'Quang Nam noodle dish (Mì Quảng) with turmeric noodles, herbs, peanuts, rice crackers, local specialty',
        description: 'Món mì Quảng với mì nghệ, rau thơm, đậu phộng, bánh tráng nướng, đặc sản địa phương'
      },
      { 
        id: 'food-com-hen', 
        name: 'Cơm hến', 
        prompt: 'Hue baby clam rice (cơm hến) with mixed herbs, peanuts, pork crackling, traditional bowl presentation',
        description: 'Cơm hến Huế với rau thơm trộn, đậu phộng, tóp mỡ, trình bày tô truyền thống'
      },
      { 
        id: 'food-market-scene', 
        name: 'Chợ hải sản', 
        prompt: 'fresh seafood market with fish, crabs, shrimp on ice, vendors bargaining, coastal village atmosphere',
        description: 'Chợ hải sản tươi với cá, cua, tôm trên đá, người bán mặc cả, không khí làng biển'
      },
    ]
  },
  {
    category: 'Giao thông & Di chuyển',
    options: [
      { 
        id: 'transport-bicycle', 
        name: 'Xe đạp', 
        prompt: 'bicycles as main transportation with people riding, parked bikes under trees, traditional Vietnamese life',
        description: 'Xe đạp là phương tiện chính với người đi xe, xe đỗ dưới cây, đời sống Việt Nam truyền thống'
      },
      { 
        id: 'transport-motorbike', 
        name: 'Xe máy', 
        prompt: 'motorbikes weaving through village paths, carrying goods, families, everyday Vietnamese transportation',
        description: 'Xe máy len lỏi qua đường làng, chở hàng hóa, gia đình, phương tiện hàng ngày của Việt Nam'
      },
      { 
        id: 'transport-boat', 
        name: 'Thuyền thúng', 
        prompt: 'traditional round basket boats (thuyền thúng) on river or lagoon, fishermen rowing with unique paddle technique',
        description: 'Thuyền thúng truyền thống trên sông hoặc đầm phá, ngư dân chèo với kỹ thuật mái chèo độc đáo'
      },
      { 
        id: 'transport-buffalo-cart', 
        name: 'Xe trâu', 
        prompt: 'water buffalo pulling wooden cart on rural road, farmer driving, transporting harvest or goods',
        description: 'Trâu kéo xe gỗ trên đường làng, nông dân lái, vận chuyển mùa màng hoặc hàng hóa'
      },
      { 
        id: 'transport-bridge', 
        name: 'Cầu khỉ', 
        prompt: 'traditional bamboo monkey bridge crossing stream or canal, precarious but functional village connection',
        description: 'Cầu khỉ tre truyền thống bắc qua suối hoặc kênh, lung lay nhưng hữu dụng nối làng'
      },
      { 
        id: 'transport-ferry', 
        name: 'Phà sông', 
        prompt: 'river ferry transporting people, bicycles, motorbikes across waterway, essential village connection',
        description: 'Phà sông chở người, xe đạp, xe máy qua sông, kết nối thiết yếu giữa các làng'
      },
      { 
        id: 'transport-footpath', 
        name: 'Đường mòn đồng', 
        prompt: 'narrow earthen footpath through rice fields with people walking, carrying tools, traditional rural route',
        description: 'Đường mòn đất hẹp qua đồng lúa với người đi bộ, mang đồ nghề, lối đi nông thôn truyền thống'
      },
    ]
  },
];
