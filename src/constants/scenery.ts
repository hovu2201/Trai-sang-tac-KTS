import { SceneryCategory } from '../types';

export const SCENERY_OPTIONS: SceneryCategory[] = [
  {
    category: 'Cây cối Bản địa Miền Trung',
    options: [
      { id: 'tree-da', name: 'Cây Đa cổ thụ', prompt: 'ancient banyan tree (cây đa) with massive trunk and aerial roots providing wide shade canopy' },
      { id: 'tree-bo-de', name: 'Cây Bồ Đề', prompt: 'sacred Bodhi tree (cây bồ đề) in temple grounds with heart-shaped leaves and spiritual significance' },
      { id: 'tree-cau', name: 'Hàng cau', prompt: 'row of tall slender areca palm trees (cây cau) characteristic of Vietnamese villages' },
      { id: 'tree-dua', name: 'Dừa nước', prompt: 'coconut palms (dừa nước) with curved trunks along waterways and coastal areas' },
      { id: 'tree-sung', name: 'Cây Sung', prompt: 'fig tree (cây sung) with dense foliage and edible fruits growing near old houses' },
      { id: 'tree-xoai', name: 'Cây Xoài', prompt: 'mango tree (cây xoài) with spreading canopy providing shade in village courtyards' },
      { id: 'tree-me', name: 'Cây Me', prompt: 'tamarind tree (cây me) with feathery leaves and brown seed pods' },
      { id: 'tree-dao', name: 'Cây Đào Xuân', prompt: 'peach blossom trees (cây đào) with pink flowers during Tet holiday season' },
      { id: 'tree-truc', name: 'Rừng Trúc', prompt: 'bamboo grove (rừng trúc) with slender green stems creating natural screen and rustling sounds' },
      { id: 'tree-muong', name: 'Cây Mường', prompt: 'Barringtonia tree (cây mường) with distinctive hanging flowers along village streams' },
      { id: 'tree-bang', name: 'Cây Bằng lăng', prompt: 'Pride of India tree (cây bằng lăng) with purple flowers in summer' },
      { id: 'tree-phoenix', name: 'Cây Phượng vĩ', prompt: 'flame tree (cây phượng vĩ) with brilliant red-orange flowers in late spring' },
      { id: 'tree-dau', name: 'Cây Dầu', prompt: 'dipterocarp tree (cây dầu) native Central Vietnam hardwood providing dense shade' },
      { id: 'tree-sao', name: 'Cây Sao', prompt: 'ironwood tree (cây sao) prized for durable timber in traditional construction' },
    ]
  },
  {
    category: 'Cây Ăn quả & Vườn',
    options: [
      { id: 'fruit-nhan', name: 'Vườn Nhãn', prompt: 'longan orchard (vườn nhãn) with clusters of brown fruits hanging from branches' },
      { id: 'fruit-vai', name: 'Vườn Vải', prompt: 'lychee garden (vườn vải) with red fruits visible through green foliage' },
      { id: 'fruit-chuoi', name: 'Vườn Chuối', prompt: 'banana plantation (vườn chuối) with large paddle-shaped leaves and fruit bunches' },
      { id: 'fruit-buoi', name: 'Cây Bưởi', prompt: 'pomelo tree (cây bưởi) with large yellow fruits and fragrant white blossoms' },
      { id: 'fruit-cam-quyt', name: 'Vườn Cam Quýt', prompt: 'orange and tangerine orchard (vườn cam quýt) with bright citrus fruits' },
      { id: 'fruit-chom-chom', name: 'Cây Chôm chôm', prompt: 'rambutan tree (cây chôm chôm) with hairy red fruits clustered on branches' },
      { id: 'fruit-mit', name: 'Cây Mít', prompt: 'jackfruit tree (cây mít) with massive spiky fruits growing directly from trunk' },
      { id: 'fruit-vu-sua', name: 'Cây Vú Sữa', prompt: 'star apple tree (cây vú sữa) with round purple or green fruits and milky latex' },
      { id: 'fruit-mang-cau', name: 'Cây Mãng cầu', prompt: 'custard apple tree (cây mãng cầu) with green scaly fruits' },
      { id: 'fruit-oi', name: 'Cây Ổi', prompt: 'guava tree (cây ổi) with smooth bark and white flowers' },
    ]
  },
  {
    category: 'Hoa & Cây Cảnh',
    options: [
      { id: 'flower-sen', name: 'Ao Sen', prompt: 'lotus pond (ao sen) with pink flowers rising above circular leaves, symbol of purity' },
      { id: 'flower-sung', name: 'Hoa Súng', prompt: 'water lily flowers (hoa súng) floating on calm water surface' },
      { id: 'flower-buom', name: 'Hoa Bướm', prompt: 'butterfly pea flowers (hoa bướm) with purple-blue petals climbing on bamboo fences' },
      { id: 'flower-giay', name: 'Hoa Giấy', prompt: 'bougainvillea (hoa giấy) cascading over walls with vibrant pink, purple, or orange bracts' },
      { id: 'flower-nhai', name: 'Hoa Nhài', prompt: 'jasmine flowers (hoa nhài) with fragrant white blossoms in village gardens' },
      { id: 'flower-hue', name: 'Hoa Huệ', prompt: 'lily flowers (hoa huệ) with elegant white or orange blooms' },
      { id: 'flower-dai', name: 'Hoa Dại', prompt: 'wildflowers (hoa dại) growing naturally along paths and in meadows' },
      { id: 'flower-nang', name: 'Hoa Hướng Dương', prompt: 'sunflower field (hoa hướng dương) facing the sun with bright yellow petals' },
      { id: 'ornamental-cay-canh', name: 'Cây cảnh tạo hình', prompt: 'sculpted ornamental trees and bonsai arranged in traditional gardens' },
      { id: 'ornamental-lan', name: 'Lan rừng', prompt: 'wild orchids (lan rừng) hanging from tree branches or in wooden baskets' },
    ]
  },
  {
    category: 'Cảnh quan Nông nghiệp',
    options: [
      { id: 'agri-rice-field', name: 'Ruộng lúa', prompt: 'terraced or flat rice paddies with water-filled fields reflecting sky, farmers planting or harvesting' },
      { id: 'agri-vegetable', name: 'Vườn rau', prompt: 'vegetable garden plots (vườn rau) with neat rows of greens, herbs, and vegetables' },
      { id: 'agri-pepper', name: 'Vườn tiêu', prompt: 'black pepper plantation (vườn tiêu) with vines climbing tall wooden poles' },
      { id: 'agri-sugarcane', name: 'Đồng mía', prompt: 'sugarcane field (đồng mía) with tall green stalks swaying in the wind' },
      { id: 'agri-peanut', name: 'Ruộng đậu phộng', prompt: 'peanut fields (ruộng đậu phộng) with low green plants covering sandy soil' },
      { id: 'agri-cassava', name: 'Đồng sắn', prompt: 'cassava plantation (đồng sắn) with woody stems and palmate leaves' },
      { id: 'agri-buffalo', name: 'Trâu cày', prompt: 'water buffalo plowing rice fields, iconic image of Vietnamese agriculture' },
      { id: 'agri-scarecrow', name: 'Bù nhìn', prompt: 'traditional scarecrow (bù nhìn) standing guard in rice or vegetable fields' },
      { id: 'agri-irrigation', name: 'Hệ thống tưới tiêu', prompt: 'traditional irrigation channels and bamboo water wheels in agricultural landscape' },
      { id: 'agri-drying', name: 'Sân phơi nông sản', prompt: 'open courtyards with rice, corn, or other crops spread to dry in the sun' },
    ]
  },
  {
    category: 'Địa hình & Phong cảnh Tự nhiên',
    options: [
      { id: 'terrain-mountain', name: 'Núi đá vôi', prompt: 'karst limestone mountains with dramatic vertical cliffs and lush vegetation' },
      { id: 'terrain-hills', name: 'Đồi núi thoải', prompt: 'rolling hills covered with green vegetation and occasional farmhouses' },
      { id: 'terrain-stream', name: 'Suối nhỏ', prompt: 'small mountain stream with clear water flowing over rocks and pebbles' },
      { id: 'terrain-river', name: 'Sông lớn', prompt: 'wide river with flowing water, fishing boats, and riverside villages' },
      { id: 'terrain-lagoon', name: 'Đầm phá', prompt: 'coastal lagoon with calm shallow water, fishing boats, and aquaculture' },
      { id: 'terrain-beach', name: 'Bãi biển', prompt: 'sandy beach with palm trees, clear blue water, and traditional fishing boats' },
      { id: 'terrain-dunes', name: 'Đồi cát', prompt: 'sand dunes with sparse vegetation creating dramatic desert-like landscape' },
      { id: 'terrain-cave', name: 'Hang động', prompt: 'limestone cave entrance with stalactites and mysterious atmosphere' },
      { id: 'terrain-waterfall', name: 'Thác nước', prompt: 'waterfall cascading over rocks surrounded by tropical forest' },
      { id: 'terrain-peninsula', name: 'Bán đảo Sơn Trà', prompt: 'Son Tra Peninsula landscape with forested mountains meeting the sea' },
    ]
  },
  {
    category: 'Yếu tố Nước',
    options: [
      { id: 'water-pond', name: 'Ao làng', prompt: 'village pond with still water, lotus plants, and fish, community gathering place' },
      { id: 'water-well', name: 'Giếng nước', prompt: 'traditional village well with stone or brick structure, water source for community' },
      { id: 'water-irrigation', name: 'Mương nước', prompt: 'irrigation canal with flowing water bringing life to agricultural fields' },
      { id: 'water-rain', name: 'Mưa nhiệt đới', prompt: 'tropical rain creating ripples on water surfaces and lush wet vegetation' },
      { id: 'water-estuary', name: 'Cửa sông', prompt: 'river estuary where fresh water meets the sea, fishing boats and aquaculture' },
      { id: 'water-mangrove', name: 'Rừng ngập mặn', prompt: 'mangrove forest with distinctive root systems in brackish coastal waters' },
      { id: 'water-spring', name: 'Suối khoáng', prompt: 'natural mineral spring with clear water and smooth rocks' },
      { id: 'water-dock', name: 'Bến thuyền', prompt: 'traditional boat dock with wooden pier, tied boats, and water access' },
    ]
  }
];
