/**
 * Ngữ cảnh văn hóa - lịch sử Làng cổ Phong Nam
 * Nguồn: Giới thiệu Làng cổ Phong Nam - Trại sáng tác 2025
 */

export const PHONG_NAM_CONTEXT = {
  // Thông tin tổng quan
  overview: {
    name: "Làng cổ Phong Nam",
    location: "Xã Hòa Vang, Thành phố Đà Nẵng",
    area: "1.62 km²",
    population: "848 hộ (3,185 nhân khẩu)",
    established: "Khoảng năm 1582 (theo bài vị hậu hiền)",
    formerName: "Đà Ly xứ, sau đổi thành Phong Lệ (1841), chia thành Phong Bắc và Phong Nam (1896)",
  },

  // Lịch sử hình thành
  history: {
    title: "Lịch sử hình thành",
    content: `Làng cổ Phong Nam là một phần phía Nam của làng Phong Lệ, từng có tên gọi là "Đà Ly xứ" với vị trí "Nam giáp Trà Kiệu, Bắc giáp Sơn Trà, Tây giáp Núi Chúa và Đông giáp Ngũ Hành Sơn". Làng có thờ ba vị tiền hiền - những người có công "khai hoang lập đất", sau đó có thêm 13 tộc họ và phát triển thành 17 chư phái tộc. Năm Thiệu Trị nguyên niên (1841), tên Đà Ly đổi thành làng Phong Lệ. Năm Thành Thái thứ 8 (1896), Phong Lệ được chia thành hai làng là Phong Bắc và Phong Nam.`,
    keyDates: [
      { year: "1582", event: "Khắc bài vị hậu hiền các tộc" },
      { year: "1841", event: "Đổi tên từ Đà Ly thành Phong Lệ" },
      { year: "1896", event: "Chia thành Phong Bắc và Phong Nam" },
      { year: "1933", event: "Di dời Đình Thần Nông" },
      { year: "2001", event: "Đình được công nhận di tích cấp thành phố" },
      { year: "2007", event: "Phục dựng Lễ hội rước Mục Đồng" },
    ],
  },

  // Các công trình kiến trúc tiêu biểu
  architecturalHeritage: {
    title: "Di sản kiến trúc",
    monuments: [
      {
        name: "Đình Thần Nông (Đình Phong Lệ)",
        type: "Di tích văn hóa - lịch sử cấp thành phố",
        built: "Cuối đời vua Minh Mạng, di dời năm 1933",
        style: "Ba gian, hai chái",
        features: [
          "Hệ thống vì kèo, cột gỗ chạm khắc kỳ công",
          "Mái đình uốn theo hình sừng trâu (khác biệt với kiểu truyền thống)",
          "Trang trí Tứ linh (Long, Ly, Quy, Phụng)",
          "Hoành phi sơn son thếp vàng '勇禮亭' (Phong Lễ Đình)",
          "Thờ Thần Nông - Tổ sư ngành nông nghiệp",
        ],
        significance: "Trung tâm sinh hoạt cộng đồng, gắn với Lễ hội rước Mục Đồng",
      },
      {
        name: "Nhà thờ Tiền Hiền",
        built: "Khoảng năm 1582",
        features: [
          "Gian giữa thờ 3 vị Tiền Hiền",
          "Hai gian tả hữu thờ 13 vị hậu hiền",
          "Phát triển thêm 4 họ: Nhị Trần, Tộc Phan, Tộc Bùi",
        ],
        relatedStructures: [
          "Nhà thờ Lê tứ phái",
          "Nhà thờ tộc Ngô văn (5 nhánh)",
          "Nhà thờ Tộc Võ, Trần, Ông, Lê văn",
        ],
      },
      {
        name: "Miếu Thái Giám",
        features: [
          "Thờ thần Bạch Mã (thần sông biển)",
          "Cây Trâm (Chim chim) cổ thụ trên 100 năm tuổi",
          "Lễ cúng hằng năm vào mồng 10 tháng 7 âm lịch",
        ],
        significance: "Gắn với nghề sông nước, đánh cá của cư dân",
      },
      {
        name: "Nhà cổ truyền thống",
        count: "5 nhà cổ + 125 nhà ba gian",
        style: "Nhà 3 gian, mái ngói âm dương",
        features: [
          "Nền đất, trụ gỗ hoặc đá chạm khắc",
          "Kết hợp nhà ba gian với tầng gác (chống lụt bão)",
        ],
        examples: [
          "Nhà ông Lê Đức Dục",
          "Nhà ông Trần Ngọc Duật",
          "Nhà ông Bùi Trọng Trung",
          "Nhà Ngô Viêm",
          "Nhà thờ Ngô Văn",
        ],
      },
    ],
  },

  // Làng nghề truyền thống
  traditionalCrafts: {
    title: "Làng nghề truyền thống",
    crafts: [
      { name: "Tráng bánh", households: "~400 hộ (theo mùa)" },
      { name: "Mì Quảng", description: "Đặc sản truyền thống" },
      { name: "Bánh ít lá gai", description: "Bánh dân gian" },
      { name: "Đan lát tre", description: "Thủ công mỹ nghệ" },
    ],
    agriculture: [
      "Trồng lúa (cánh đồng lúa bạt ngàn)",
      "Hoa màu",
      "Chăn nuôi",
    ],
    market: "Chợ quê Phong Nam - Trung tâm giao thương địa phương",
  },

  // Lễ hội truyền thống
  festivals: {
    title: "Lễ hội rước Mục Đồng",
    schedule: "3 năm/lần (Tam niên nhứt lệ) - Các năm Tý, Ngọ, Mẹo, Dậu",
    date: "Mùng 1 tháng 4 Âm lịch",
    duration: "2 ngày 3 đêm",
    activities: [
      {
        name: "Lễ rước Thần Nông",
        description: "52 mục đồng cầm 26 cây cờ rước Thần Nông từ Cồn Thần về đình",
        roles: ["Trùm bành (Trùm mục) - Cầm phèng la đánh hiệu lệnh", "Trùm chỉ", "Trùm phụ"],
      },
      {
        name: "Dạo đồng ban đêm",
        description: "Rước thần dạo trên cánh đồng để cầu mùa màng bội thu",
      },
      {
        name: "Trò chơi dân gian",
        games: [
          "Rồng rắn lên mây",
          "Cờ gánh",
          "Đánh cụm",
          "Đẩy cây",
          "Đấu vật",
          "Chơi ô làng",
          "Kéo co",
          "Đập om",
        ],
      },
      {
        name: "Hát Mục đồng",
        description: "Đêm thứ 3 sau lễ rước",
      },
    ],
    history: "Gián đoạn 70 năm, phục dựng năm 2007, hiện nguy cơ mai một",
  },

  // Đặc trưng cảnh quan
  landscape: {
    title: "Cảnh quan đặc trưng",
    features: [
      {
        name: "Đường giao thông nội đồng",
        description: "3 tuyến bao quanh làng tạo hình vòng tròn, nhìn ra cánh đồng lúa",
      },
      {
        name: "Cây xanh đặc trưng",
        elements: ["Khóm tre xanh", "Hàng cau", "Chè Tàu", "Cây truyền thống"],
        coverage: "85% hai bên đường",
      },
      {
        name: "Mô hình làng trong phố",
        description: "Phố trong làng - Kết hợp đô thị và nông thôn",
      },
      {
        name: "Cánh đồng lúa",
        description: "Bạt ngàn, xanh mướt, bao quanh làng",
      },
    ],
  },

  // Thách thức hiện tại
  challenges: {
    title: "Thách thức bảo tồn",
    issues: [
      "Đô thị hóa tác động đến di tích lịch sử",
      "Không gian cảnh quan làng quê bị biến đổi",
      "Đặc trưng văn hóa làng Việt dần bị thay thế",
      "Kiến trúc thiếu đồng nhất, không hài hòa với thiên nhiên",
      "Lễ hội truyền thống đứng trước nguy cơ mai một",
      "Người dân chuyển sang làm việc tại cơ quan, nhà máy",
      "Hệ thống nước thải chưa được xử lý hiệu quả",
    ],
  },

  // Giải pháp tôn tạo
  solutions: {
    title: "Giải pháp tôn tạo và phát triển",
    strategies: [
      {
        category: "Chính sách",
        actions: [
          "Xây dựng quy hoạch tổng thể, chi tiết làng Phong Nam",
          "Sưu tầm, nghiên cứu, tôn tạo các giá trị văn hóa lịch sử",
          "Phục dựng và sân khấu hóa Lễ hội Mục đồng",
          "Xúc tiến hoạt động du lịch đa dạng",
          "Tuyên truyền nâng cao ý thức bảo vệ bản sắc",
        ],
      },
      {
        category: "Kiến trúc - Cảnh quan",
        actions: [
          "Quy hoạch lại hệ thống giao thông nội bộ",
          "Tổ chức giao thông xanh, không gian đi bộ",
          "Tôn tạo hệ thống cây xanh đặc trưng, cây bản địa",
          "Phát triển luỹ tre, hàng chè Tàu làm hàng rào",
          "Thiết kế nhà ở nông thôn kiểu mẫu (thân thiện khí hậu)",
          "Tạo điểm dừng chân để trải nghiệm cảnh quan",
          "Chuyển đổi cánh đồng thành không gian sinh thái du lịch",
        ],
      },
      {
        category: "Hạ tầng kỹ thuật",
        actions: [
          "Cải thiện giao thông tiếp cận từ thành phố",
          "Xây dựng hệ thống thu gom nước thải sinh hoạt",
          "Đánh giá tác động môi trường cho hoạt động du lịch",
        ],
      },
      {
        category: "Kinh tế - Xã hội",
        actions: [
          "Đào tạo nghề gắn với du lịch sinh thái",
          "Phát triển homestay từ nhà cổ",
          "Tạo không gian trải nghiệm nông nghiệp",
          "Tăng thu nhập để người dân tham gia bảo tồn",
        ],
      },
    ],
  },

  // Mục tiêu trại sáng tác
  workshopObjectives: {
    title: "Neo kiến trúc cảnh quan làng cổ - Bất biến giữa dòng đời vạn biến",
    goals: [
      {
        objective: "Mục tiêu 1: Phân tích & ghi nhận hiện trạng",
        tasks: [
          "Lập bản đồ di sản và nguy cơ",
          "Khảo sát kiến trúc cổ, di tích lịch sử, cảnh quan cốt lõi",
          "Ghi nhận dấu tích bị tổn thương",
          "Phỏng vấn cộng đồng về ký ức và mong muốn",
        ],
      },
      {
        objective: "Mục tiêu 2: Xây dựng cơ sở khoa học",
        tasks: [
          "Phân tích dữ liệu thu thập",
          "Đánh giá thách thức thiết kế, xây dựng, quản lý",
          "Tìm hiểu kinh nghiệm thành công ở nước ngoài và Việt Nam",
        ],
      },
      {
        objective: "Mục tiêu 3: Sáng tạo chiến lược 'Neo'",
        tasks: [
          "Định hình khung kiến trúc và cảnh quan quan trọng",
          "Đề xuất khoanh vùng và nguyên tắc quản lý",
          "Thiết kế 2-3 điểm neo cụ thể (nhà cổ, miếu thờ, đất nông nghiệp)",
          "Can thiệp chi tiết: homestay, không gian văn hóa, sinh thái",
        ],
      },
      {
        objective: "Mục tiêu 4: Hoàn thiện và khuyến nghị",
        tasks: [
          "Hoàn thiện bản vẽ/mô hình ý tưởng",
          "Trình bày và phản biện với cộng đồng/chính quyền",
          "Đúc kết khuyến nghị thiết kế và quy hoạch",
        ],
      },
    ],
  },

  // Từ khóa thiết kế
  designKeywords: {
    architecture: [
      "Nhà ba gian",
      "Mái ngói âm dương",
      "Mái cong hình sừng trâu",
      "Cột gỗ chạm khắc",
      "Đá ong",
      "Hoa văn Tứ linh",
      "Kiến trúc nông thôn Việt Nam",
    ],
    landscape: [
      "Luỹ tre làng quê",
      "Hàng cau",
      "Chè Tàu hàng rào",
      "Cánh đồng lúa",
      "Đường giao thông bao quanh",
      "Không gian xanh",
      "Cây cổ thụ",
    ],
    culture: [
      "Đình làng",
      "Nhà thờ tộc",
      "Lễ hội Mục đồng",
      "Làng nghề truyền thống",
      "Cộng đồng làng Việt",
      "Sinh hoạt văn hóa truyền thống",
    ],
  },
};

// Preset thiết kế cho Làng cổ Phong Nam
export const PHONG_NAM_DESIGN_PRESETS = {
  style: "Kiến trúc truyền thống Việt Nam, Làng quê Miền Trung",
  materials: [
    "Gỗ tự nhiên",
    "Ngói âm dương",
    "Đá ong",
    "Tre trúc",
    "Gạch cổ",
  ],
  colors: [
    "Gỗ nâu tự nhiên",
    "Ngói đỏ truyền thống",
    "Trắng kem tường nhà",
    "Xanh lá tre trúc",
  ],
  details: [
    "Mái cong đặc trưng",
    "Chạm khắc hoa văn",
    "Cột gỗ trụ đá",
    "Hoành phi sơn son thếp vàng",
    "Trang trí Tứ linh",
  ],
  environment: [
    "Làng quê nông thôn",
    "Cánh đồng lúa xanh",
    "Luỹ tre xanh mát",
    "Đường làng nhỏ",
    "Cây cổ thụ",
    "Ao làng",
  ],
};
