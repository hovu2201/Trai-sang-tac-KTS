import { MaterialCategory } from '../types';

export const MATERIAL_COMBINATIONS: MaterialCategory[] = [
  {
    category: 'Vật liệu Truyền thống & Bản địa',
    combinations: [
      {
        name: 'Gỗ Lim & Đá Thanh',
        prompt: 'A combination of dark, resilient premium ironwood (Gỗ Lim) for structural frames, columns, and beams with traditional mortise and tenon joinery, paired with blue-grey stone (Đá Thanh) for foundation bases, column plinths, and polished flooring.',
        description: 'Sự kết hợp nền tảng, vững chãi trong kiến trúc đình chùa, nhà quan lại xưa, mộng âm dương, chân cột đá, sàn mài.',
      },
      {
        name: 'Gỗ Mít & Ngói Âm Dương',
        prompt: 'Warm honey-toned jackfruit wood (Gỗ Mít) for columns, beams, and decorative panels with hand-carved details, paired with traditional hand-pressed clay yin-yang roof tiles (Ngói Âm Dương) in natural terracotta color.',
        description: 'Phổ biến trong nhà dân gian, mang lại vẻ đẹp mộc mạc, ấm cúng và gần gũi, gỗ vàng mật, ngói đất nung.',
      },
      {
        name: 'Đá Ong (Laterite) & Gỗ Tái chế',
        prompt: 'Porous, reddish-brown laterite stone (Đá Ong) walls with exposed aggregate texture, combined with reclaimed weathered wood salvaged from old structures for doors, window frames, and decorative panels.',
        description: 'Vẻ đẹp thô mộc, bền vững với thời gian, tường đá xốp đỏ nâu, gỗ cũ tái chế. Thường thấy ở công trình phụ, tường rào.',
      },
      {
        name: 'Tường vữa Tam hợp & Ngói Liệt (Ngói vảy cá)',
        prompt: 'Walls finished with traditional "tam hợp" lime-based plaster (mixture of lime, sand, molasses, sticky rice) in warm cream or ochre color, with a roof of classic overlapping fish-scale tiles (Ngói Liệt) creating intricate shadow patterns.',
        description: 'Bề mặt tường vôi có chiều sâu, màu kem ấm, kết hợp với mái ngói vảy cá tạo vẻ đẹp hoài cổ, tinh tế, bóng râm phức hợp.',
      },
      {
        name: 'Tường trình đất & Khung tre',
        prompt: 'Rammed earth walls (Tường trình) with visible horizontal stratification layers in natural earth tones, supported by a structural framework of treated large-diameter bamboo poles with traditional lashing techniques.',
        description: 'Giải pháp kiến trúc sinh thái, thân thiện môi trường, tường đất nện lớp phân tầng, khung tre lớn buộc truyền thống, mang đậm tính bản địa.',
      },
      {
        name: 'Gạch Bát Tràng & Ngói Mũi Hài',
        prompt: 'Handcrafted terracotta floor tiles from Bát Tràng ceramic village with traditional glaze patterns, paired with ancient-style curved "hài" (shoe-tip) shaped roof tiles with distinctive upturned edges.',
        description: 'Sự kết hợp của các vật liệu đất nung thủ công, gạch men Bát Tràng, ngói mũi cong vút, mang đậm dấu ấn đồng bằng Bắc Bộ.',
      },
      {
        name: 'Khảm sành sứ & Vữa màu',
        prompt: 'Decorative mosaic art using broken ceramic and porcelain shards (Khảm sành sứ) in dragon, phoenix, and floral motifs, set into colored lime plaster in vibrant blues, greens, and reds, often seen on roof ridges and decorative screens.',
        description: 'Nghệ thuật trang trí đỉnh cao trong kiến trúc cung đình Huế, gốm vỡ ghép hình rồng phượng hoa sen, vữa vôi màu, tạo sự lộng lẫy cầu kỳ.',
      },
      {
        name: 'Gỗ Sao & Đá Non Nước',
        prompt: 'Premium ironwood (Gỗ Sao) structural beams and columns with deep chocolate color and incredible density, combined with white-veined Marble Mountains limestone (Đá Non Nước) from Da Nang for decorative pillars, carved panels, and ornamental elements.',
        description: 'Vật liệu cao cấp đặc trưng Đà Nẵng - Quảng Nam, gỗ sao quý hiếm màu nâu sẫm, đá trắng vân Ngũ Hành Sơn chạm khắc.',
      },
      {
        name: 'Gạch Chăm cổ & Vôi Cổ truyền',
        prompt: 'Ancient red Cham bricks (Gạch Chăm) with characteristic small size and porous texture, laid with traditional lime-based mortar mixed with molasses, preserving authentic 9th-13th century Champa architectural techniques from Central Vietnam.',
        description: 'Gạch đỏ Chăm cổ kích thước nhỏ kết cấu xốp, vữa vôi truyền thống pha mật mía, bảo tồn kỹ thuật xây thế kỷ 9-13 Chăm Pa miền Trung.',
      },
      {
        name: 'Tre Trúc & Lá Cọ',
        prompt: 'Large-diameter bamboo (Tre Trúc) structural framework with traditional rope lashing joints, covered with hand-woven coconut palm leaf (Lá Cọ) thatching in overlapping layers, representing traditional coastal Central Vietnamese village architecture.',
        description: 'Khung tre lớn buộc dây truyền thống, lợp lá cọ đan chồng lớp, đại diện cho kiến trúc làng biển truyền thống miền Trung Việt Nam.',
      },
      {
        name: 'Đá Cuội sông Hàn & Gỗ Dầu',
        prompt: 'Smooth river-washed pebbles (Đá Cuội) from Han River in Da Nang, used for decorative paving and wall cladding, combined with durable water-resistant dipterocarp wood (Gỗ Dầu) for structural posts and marine construction.',
        description: 'Đá cuội tròn sông Hàn Đà Nẵng lát sân, ốp tường, kết hợp gỗ dầu bền nước cho cột và công trình ven biển.',
      },
      {
        name: 'Gạch Bông Hoa văn Huế',
        prompt: 'Decorative handmade encaustic cement tiles (Gạch Bông) with Hue imperial court patterns in yellow, red, and blue colors, featuring intricate dragon, phoenix, lotus, and chrysanthemum motifs in symmetrical geometric arrangements.',
        description: 'Gạch bông thủ công hoa văn cung đình Huế màu vàng đỏ xanh, họa tiết rồng phượng sen cúc, bố cục đối xứng hình học.',
      },
      {
        name: 'Ngói Mái Cong & Cột Đá Liền',
        prompt: 'Curved clay roof tiles (Ngói Mái Cong) with dramatic upturned edges laid in traditional overlapping pattern, supported by monolithic stone columns carved from single large blocks with octagonal or circular cross-sections, typical of Central Vietnamese pagodas and communal houses.',
        description: 'Ngói đất nung mái cong vút chồng truyền thống, cột đá nguyên khối tròn hoặc bát giác, điển hình của chùa và đình miền Trung Việt Nam.',
      },
      {
        name: 'Tranh & Vách tre Đan',
        prompt: 'Thatched roofing using dried rice straw or palm leaves in layered overlapping technique, combined with woven bamboo split wall panels (Vách Đan) in decorative herringbone or diagonal patterns, creating natural ventilation and traditional rural aesthetic.',
        description: 'Mái tranh rơm hoặc lá chồng lớp, vách tre đan xương cá hoặc chéo, tạo thông gió tự nhiên và thẩm mỹ truyền thống nông thôn.',
      },
      {
        name: 'Gỗ Gụ & Đá Ong chạm khắc',
        prompt: 'Premium rosewood (Gỗ Gụ) with deep purple-brown color for decorative carved panels, doors, and altar furniture, paired with hand-carved laterite stone (Đá Ong) pillars with traditional Vietnamese motifs of dragons, bamboo, and flowers.',
        description: 'Gỗ gụ màu nâu tím sẫm cho vách chạm, cửa, bàn thờ, kết hợp cột đá ong chạm rồng tre hoa văn truyền thống Việt.'
      },
      {
        name: 'Cột gỗ Lim & Đá tảng chân cột',
        prompt: 'Massive ironwood (Gỗ Lim) pillars with traditional joinery, resting on carved stone plinths (Đá tảng) with lotus petal or cloud motifs, representing classic Vietnamese structural system.',
        description: 'Cột gỗ lim lớn mộng âm dương, đặt trên đá tảng chân cột chạm hoa sen hoặc mây, hệ kết cấu kinh điển Việt Nam.'
      },
      {
        name: 'Mành tre & Cửa Gỗ lim',
        prompt: 'Bamboo rolled blinds (Mành tre) for sun shading and privacy with natural ochre color, combined with solid ironwood plank doors (Cửa Gỗ Lim) with traditional metal hardware and decorative brass studs.',
        description: 'Mành tre cuốn che nắng tạo riêng tư màu vàng đất, kết hợp cửa gỗ lim nguyên tấm với phụ kiện kim loại, đinh đồng trang trí.'
      }
    ],
  },
  {
    category: 'Vật liệu Hiện đại & Tương phản',
    combinations: [
      {
        name: 'Bê tông trần & Kính không khung',
        prompt: 'Raw, board-formed concrete walls and ceilings paired with large panels of frameless glass.',
        description: 'Sự tương phản giữa nặng và nhẹ, đặc và rỗng, bê tông vân gỗ thô, kính trong suốt không khung, vẻ đẹp công nghiệp tối giản.',
      },
      {
        name: 'Thép Corten (gỉ) & Kính mờ',
        prompt: 'Weathering Corten steel panels developing natural rust-orange patina finish over time, combined with sandblasted or acid-etched frosted glass providing privacy while diffusing natural light.',
        description: 'Tạo hiệu ứng thị giác ấn tượng, thép gỉ cam tự nhiên theo thời gian, kính mờ tạo riêng tư và ánh sáng khuếch tán, vừa mộc vừa hiện đại.',
      },
      {
        name: 'Gạch thông gió & Thép hộp đen',
        prompt: 'Decorative perforated concrete ventilation blocks (breeze blocks) in geometric patterns forming a semi-transparent facade, supported by a structural grid of black powder-coated rectangular steel tube frame.',
        description: 'Giải pháp vừa thẩm mỹ vừa thông gió, gạch bông gió họa tiết hình học, khung thép hộp đen sơn tĩnh điện, hiệu quả cho khí hậu nhiệt đới.',
      },
       {
        name: 'Gỗ cháy (Shou Sugi Ban) & Đồng thau',
        prompt: 'Charred cedar wood siding using traditional Japanese Shou Sugi Ban technique with deep black carbonized surface texture, contrasted with accents of brushed brass or bronze hardware, light fixtures, and decorative trim.',
        description: 'Sự kết hợp đầy kịch tính sang trọng, gỗ cháy đen kỹ thuật Nhật, kim loại đồng thau chải xước, phụ kiện và đèn đồng, trang trí viền kim.',
      },
      {
        name: 'Đá mài (Terrazzo) & Gỗ sồi',
        prompt: 'Polished terrazzo flooring or wall panels with embedded white marble and brass chips in retro color palette, paired with natural light European oak wood furniture, cabinetry, and wall paneling.',
        description: 'Mang hơi hướng retro hoài cổ, terrazzo mài bóng vụn đá trắng và đồng, màu cổ điển, gỗ sồi Âu sáng thanh lịch hiện đại, phù hợp nhiều không gian.',
      },
      {
        name: 'Tấm Polycarbonate & Khung nhôm',
        prompt: 'Translucent twin-wall polycarbonate panels in opal white or bronze tint used for roofing or wall cladding to diffuse daylight, set within a lightweight anodized or powder-coated aluminum extrusion frame system.',
        description: 'Giải pháp lấy sáng thông minh, tấm polycarbonate hai lớp trắng đục hoặc nâu khuếch tán ánh sáng, khung nhôm định hình nhẹ, tạo ánh sáng mềm mại mờ ảo.',
      },
      {
        name: 'Gạch kính & Vữa trát thô',
        prompt: 'Translucent or frosted glass blocks in various sizes used to create light-transmitting privacy walls, set within a roughly textured, hand-troweled cement plaster finish in raw grey or white.',
        description: 'Vừa lấy sáng vừa riêng tư, gạch kính trong hoặc mờ nhiều kích thước truyền ánh sáng, vữa xi măng trát thủ công thô xám hoặc trắng, công nghiệp thủ công.',
      },
      {
        name: 'Tấm Aluminium đục lỗ & Gỗ Composite',
        prompt: 'Perforated aluminum sheet panels with custom-designed decorative hole patterns creating dynamic shadow effects, combined with weather-resistant wood-plastic composite (WPC) decking and wall cladding.',
        description: 'Tấm nhôm đục lỗ họa tiết thiết kế tùy chỉnh tạo bóng động, kết hợp sàn và ốp tường gỗ nhựa composite chống thời tiết.'
      },
      {
        name: 'Kính Low-E & Bê tông nhẹ',
        prompt: 'Energy-efficient Low-E (low-emissivity) coated glass with tinted solar control layer, paired with lightweight aerated autoclaved concrete (AAC) blocks providing thermal insulation.',
        description: 'Kính Low-E phủ lớp kiểm soát nhiệt tiết kiệm năng lượng, kết hợp gạch bê tông nhẹ AAC cách nhiệt tốt.'
      },
      {
        name: 'Thép Đen sơn & Kính Màu',
        prompt: 'Matte black powder-coated steel framework with slim profiles, combined with colored laminated glass panels in deep green, bronze, or blue tints creating dramatic visual effects.',
        description: 'Khung thép đen nhám sơn tĩnh điện profile mảnh, kính nhiều lớp màu xanh rêu, nâu, xanh dương đậm, hiệu ứng thị giác ấn tượng.'
      },
      {
        name: 'Tấm xi măng xơ (Fiber cement) & Gỗ Accoya',
        prompt: 'Large format fiber cement panels with smooth or wood-grain textured finish in natural grey, combined with modified Accoya wood cladding with exceptional durability and dimensional stability.',
        description: 'Tấm xi măng xơ cỡ lớn bề mặt nhẵn hoặc vân gỗ màu xám, kết hợp ốp gỗ Accoya xử lý bền vượt trội và ổn định kích thước.'
      },
      {
        name: 'Gạch Clinker & Khung thép Kẽm',
        prompt: 'High-fired dense clinker brick with vitrified surface in dark grey or charcoal color creating dramatic masonry walls, supported by galvanized steel structural frame.',
        description: 'Gạch clinker nung cao đặc màu xám đậm hoặc than tạo tường xây ấn tượng, khung kết cấu thép mạ kẽm.'
      },
      {
        name: 'Tấm Compact HPL & Nhôm Anodized',
        prompt: 'High-pressure laminate (HPL) compact panels in solid colors or wood textures for exterior facade cladding, combined with anodized aluminum trim, louvers, and sun shading systems.',
        description: 'Tấm compact HPL màu đồng nhất hoặc vân gỗ ốp mặt ngoài, kết hợp viền nhôm anodized, lam chắn nắng nhôm.'
      },
      {
        name: 'Bê tông màu & Kính Phản quang',
        prompt: 'Colored integral concrete with pigments mixed throughout in warm earth tones, paired with reflective glass featuring high-performance solar coating reflecting sky and surroundings.',
        description: 'Bê tông pha màu nguyên khối tông màu đất ấm, kết hợp kính phản quang phủ lớp kiểm soát nhiệt cao phản chiếu trời và cảnh xung quanh.'
      },
      {
        name: 'Tấm Acrylic & Khung Inox',
        prompt: 'Translucent or colored acrylic panels used for decorative screens, skylights, and partitions, set within polished stainless steel frame creating modern high-tech aesthetic.',
        description: 'Tấm acrylic trong hoặc màu cho tấm chắn trang trí, giếng trời, vách ngăn, khung inox đánh bóng tạo thẩm mỹ công nghệ cao hiện đại.'
      }
    ]
  },
  {
    category: 'Vật liệu Sinh thái & Bền vững',
    combinations: [
      {
        name: 'Tre ép & Cỏ tranh',
        prompt: 'Engineered pressed bamboo panels and structural beams with high strength and dimensional stability, combined with thatched grass roofing using sustainable local vetiver or cogon grass.',
        description: 'Tre ép công nghiệp chắc chắn ổn định kích thước, mái cỏ tranh bền vững từ cỏ vetiver hoặc cỏ tranh địa phương.'
      },
      {
        name: 'Gỗ FSC & Đá Tái chế',
        prompt: 'Forest Stewardship Council (FSC) certified sustainable timber from responsibly managed forests, paired with recycled crushed stone or terrazzo made from post-consumer waste glass and marble.',
        description: 'Gỗ chứng nhận FSC từ rừng quản lý bền vững, kết hợp đá nghiền tái chế hoặc terrazzo từ thủy tinh và đá cẩm thạch tái chế.'
      },
      {
        name: 'Gạch Đất sét không nung & Vôi Tự nhiên',
        prompt: 'Unfired compressed earth blocks (CEB) made from local soil stabilized with small amount of cement, finished with natural hydraulic lime plaster allowing walls to breathe.',
        description: 'Gạch đất sét ép không nung từ đất địa phương ổn định xi măng ít, hoàn thiện vữa vôi tự nhiên cho tường hô hấp.'
      },
      {
        name: 'Bê tông Tái chế & Gỗ Reclaimed',
        prompt: 'Recycled aggregate concrete using crushed demolition waste as aggregate, paired with reclaimed salvaged wood from demolished buildings preserving character and reducing waste.',
        description: 'Bê tông cốt liệu tái chế từ phế thải phá dỡ, kết hợp gỗ thu hồi từ công trình phá dỡ giữ đặc trưng và giảm rác thải.'
      },
      {
        name: 'Tường Rơm & Vữa Đất',
        prompt: 'Straw bale walls providing excellent insulation and carbon sequestration, finished with earthen clay plaster in natural ochre and sienna tones for breathable healthy walls.',
        description: 'Tường rơm cách nhiệt tốt và lưu trữ carbon, hoàn thiện vữa đất sét tự nhiên màu đất vàng nâu, tường thoáng khí lành mạnh.'
      },
      {
        name: 'Mycelium & Tre',
        prompt: 'Innovative mycelium-based biocomposite panels grown from mushroom roots for insulation and acoustic panels, combined with structural bamboo framework for experimental sustainable construction.',
        description: 'Tấm sinh học mycelium trồng từ rễ nấm cho cách âm cách nhiệt, kết hợp khung tre kết cấu cho xây dựng bền vững thử nghiệm.'
      },
      {
        name: 'Gạch Bay & Xỉ Lò cao',
        prompt: 'Fly ash bricks made from coal combustion byproduct reducing cement usage, paired with blast furnace slag aggregate creating low-carbon alternative to conventional masonry.',
        description: 'Gạch tro bay từ phụ phẩm đốt than giảm dùng xi măng, kết hợp cốt liệu xỉ lò cao tạo thay thế carbon thấp cho xây truyền thống.'
      },
      {
        name: 'Cork & Wool',
        prompt: 'Natural cork panels from sustainably harvested bark for wall cladding and insulation, combined with sheep wool insulation batts for thermal and acoustic performance.',
        description: 'Tấm cork tự nhiên từ vỏ cây thu hoạch bền vững ốp tường và cách nhiệt, kết hợp len cừu cách âm cách nhiệt.'
      },
      {
        name: 'Hempcrete & Vôi',
        prompt: 'Hemp-lime biocomposite (hempcrete) made from hemp hurds and lime binder creating carbon-negative breathable walls with excellent thermal mass and humidity regulation.',
        description: 'Sinh học hemp-vôi (hempcrete) từ lõi gai dầu và vôi tạo tường carbon âm thoáng khí với khối nhiệt và điều hòa ẩm tốt.'
      },
      {
        name: 'Tấm Nấm Ép & Sợi Dừa',
        prompt: 'Compressed mushroom substrate panels for interior finishes and furniture, combined with coconut coir fiber boards for insulation and acoustic treatment in fully biodegradable assembly.',
        description: 'Tấm nấm ép cho hoàn thiện nội thất và đồ nội thất, kết hợp tấm xơ dừa cách âm cách nhiệt trong lắp ráp phân hủy hoàn toàn.'
      }
    ]
  },
  {
    category: 'Vật liệu Hỗn hợp Sáng tạo',
    combinations: [
      {
        name: 'Gỗ ép Veneer & Đá nhân tạo',
        prompt: 'Engineered wood veneer panels with natural grain patterns in large formats, combined with engineered quartz or sintered stone surfaces with marble-like veining.',
        description: 'Tấm veneer gỗ ép vân tự nhiên cỡ lớn, kết hợp bề mặt thạch anh nhân tạo hoặc đá nung kết với vân giống đá cẩm thạch.'
      },
      {
        name: 'Tấm GRG & LED Tích hợp',
        prompt: 'Glass-fiber reinforced gypsum (GRG) molded panels creating complex curved forms and decorative elements, with integrated LED strip lighting creating dramatic indirect illumination.',
        description: 'Tấm thạch cao GRG sợi thủy tinh đúc hình cong phức tạp và trang trí, đèn LED dải tích hợp tạo ánh sáng gián tiếp ấn tượng.'
      },
      {
        name: 'Bê tông Xuyên sáng & Sợi quang',
        prompt: 'Translucent concrete panels embedded with optical fibers transmitting light through solid concrete, creating magical glowing wall effects especially dramatic at night.',
        description: 'Tấm bê tông trong nhúng sợi quang truyền ánh sáng xuyên bê tông đặc, tạo hiệu ứng tường phát sáng kỳ diệu đặc biệt ban đêm.'
      },
      {
        name: 'Gạch 3D In & Vữa Polymer',
        prompt: '3D-printed ceramic or concrete bricks with intricate geometric patterns impossible to achieve through traditional manufacturing, assembled with high-performance polymer-modified mortar.',
        description: 'Gạch gốm hoặc bê tông in 3D họa tiết hình học phức tạp không thể làm truyền thống, lắp với vữa polymer hiệu suất cao.'
      },
      {
        name: 'Tấm ETFE & Khung Cable',
        prompt: 'Lightweight inflated ETFE (ethylene tetrafluoroethylene) cushion panels creating transparent roof or wall systems, supported by tensile cable net structure.',
        description: 'Tấm đệm ETFE bơm hơi nhẹ tạo hệ mái hoặc tường trong suốt, đỡ bằng kết cấu lưới cáp căng.'
      },
      {
        name: 'Graphene Composite & Photovoltaic',
        prompt: 'Experimental graphene-enhanced composite panels with superior strength-to-weight ratio, integrated with semi-transparent photovoltaic cells generating electricity.',
        description: 'Tấm composite graphene thử nghiệm với tỷ lệ độ bền trọng lượng vượt trội, tích hợp pin quang điện bán trong suốt phát điện.'
      },
      {
        name: 'Aerogel & Kính Thông minh',
        prompt: 'Aerogel insulation panels providing extreme thermal performance in minimal thickness, combined with electrochromic smart glass that tints on demand for solar control.',
        description: 'Tấm cách nhiệt aerogel hiệu suất nhiệt cực cao độ dày tối thiểu, kết hợp kính thông minh electrochromic đổi màu theo yêu cầu kiểm soát nắng.'
      },
      {
        name: 'Tấm Bioplastic & Vải Tensile',
        prompt: 'Biodegradable bioplastic panels made from plant starches for temporary structures, combined with high-strength tensile fabric membranes creating lightweight dynamic forms.',
        description: 'Tấm bioplastic phân hủy sinh học từ tinh bột thực vật cho công trình tạm, kết hợp màng vải tensile bền cao tạo hình động nhẹ.'
      }
    ]
  }
];