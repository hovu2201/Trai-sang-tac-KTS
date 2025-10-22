import {
  EnvironmentCategory,
  LightingCategory,
} from '../types';

export const LIGHTING_CATEGORIES: LightingCategory[] = [
  {
    category: 'Ánh sáng Tự nhiên',
    options: [
      { id: 'light-natural-dawn', name: 'Bình minh', prompt: 'soft dawn light with pink and orange hues, gentle shadows, peaceful morning atmosphere' },
      { id: 'light-natural-morning', name: 'Sáng sớm', prompt: 'bright morning sunlight with crisp shadows, fresh atmosphere with dew on plants' },
      { id: 'light-natural-noon', name: 'Trưa gắt', prompt: 'harsh overhead midday sun with strong contrasting shadows and intense heat haze' },
      { id: 'light-natural-golden', name: 'Golden Hour', prompt: 'warm golden hour lighting during late afternoon with long soft shadows' },
      { id: 'light-natural-sunset', name: 'Hoàng hôn', prompt: 'dramatic sunset with orange, red, and purple sky colors, silhouettes' },
      { id: 'light-natural-dusk', name: 'Chạng vạng', prompt: 'blue hour twilight with deep blue sky and first artificial lights turning on' },
      { id: 'light-natural-overcast', name: 'Trời u ám', prompt: 'soft diffused light from overcast cloudy sky, no harsh shadows, even illumination' },
      { id: 'light-natural-moonlight', name: 'Ánh trăng', prompt: 'ethereal moonlight creating silver illumination and deep shadows at night' },
      { id: 'light-natural-filtered', name: 'Ánh sáng lọc qua tán lá', prompt: 'dappled sunlight filtering through tree canopy creating patterns on ground' },
      { id: 'light-natural-reflected', name: 'Phản chiếu từ nước', prompt: 'soft diffused light reflected from water surfaces illuminating underside of structures' },
    ]
  },
  {
    category: 'Ánh sáng Nhân tạo',
    options: [
      { id: 'light-artificial-lantern', name: 'Đèn lồng truyền thống', prompt: 'warm ambient light from traditional silk or paper lanterns creating soft glow' },
      { id: 'light-artificial-oil', name: 'Đèn dầu', prompt: 'flickering warm light from traditional oil lamps creating intimate atmosphere' },
      { id: 'light-artificial-candle', name: 'Nến -촛불', prompt: 'romantic candlelight with warm orange glow and dancing flame shadows' },
      { id: 'light-artificial-incandescent', name: 'Bóng đèn dây tóc', prompt: 'warm yellow light from traditional incandescent bulbs, nostalgic feel' },
      { id: 'light-artificial-led-warm', name: 'LED ấm', prompt: 'modern warm LED lighting providing even illumination without harshness' },
      { id: 'light-artificial-accent', name: 'Đèn chiếu điểm', prompt: 'dramatic accent lighting highlighting architectural details and textures' },
      { id: 'light-artificial-string', name: 'Dây đèn trang trí', prompt: 'festive string lights creating celebratory atmosphere and warm ambiance' },
      { id: 'light-artificial-pathway', name: 'Đèn lối đi', prompt: 'low pathway lighting guiding movement while preserving night atmosphere' },
      { id: 'light-artificial-underwater', name: 'Đèn dưới nước', prompt: 'submerged lights in ponds or pools creating magical water effects' },
      { id: 'light-artificial-firefly', name: 'Đom đóm', prompt: 'magical ambiance of fireflies providing natural bioluminescent lighting' },
    ]
  },
  {
    category: 'Chất lượng Ánh sáng',
    options: [
      { id: 'quality-hard', name: 'Ánh sáng cứng', prompt: 'hard direct lighting creating sharp defined shadows and high contrast' },
      { id: 'quality-soft', name: 'Ánh sáng mềm', prompt: 'soft diffused lighting with gradual shadows and low contrast' },
      { id: 'quality-rim', name: 'Rim Light', prompt: 'backlight creating luminous edge outline separating subject from background' },
      { id: 'quality-volumetric', name: 'God Rays', prompt: 'volumetric light beams visible through mist, dust, or tree canopy' },
      { id: 'quality-chiaroscuro', name: 'Chiaroscuro', prompt: 'dramatic contrast between light and dark areas, artistic lighting' },
      { id: 'quality-silhouette', name: 'Silhouette', prompt: 'backlit subjects creating dark shapes against bright background' },
      { id: 'quality-haze', name: 'Mờ ảo', prompt: 'atmospheric haze diffusing light creating soft dreamy quality' },
      { id: 'quality-sparkle', name: 'Lấp lánh', prompt: 'sparkling light reflections on water, glass, or wet surfaces' },
    ]
  }
];

export const ENVIRONMENT_CATEGORIES: EnvironmentCategory[] = [
  {
    category: 'Bối cảnh Địa lý',
    options: [
      { id: 'env-coastal', name: 'Ven biển', prompt: 'coastal environment with ocean views, sea breeze, sandy beaches, and maritime vegetation' },
      { id: 'env-riverside', name: 'Ven sông', prompt: 'riverside setting along major river with water views, boats, and riparian landscape' },
      { id: 'env-mountain', name: 'Vùng núi', prompt: 'mountainous terrain with hills, valleys, elevated views, and mountain vegetation' },
      { id: 'env-delta', name: 'Đồng bằng', prompt: 'flat delta landscape with rice fields, waterways, and agricultural land' },
      { id: 'env-lagoon', name: 'Vùng đầm phá', prompt: 'lagoon environment with shallow brackish water, fishing, and aquaculture' },
      { id: 'env-forest', name: 'Rừng', prompt: 'forested area with dense tree cover, dappled light, and natural understory' },
      { id: 'env-village', name: 'Làng quê', prompt: 'traditional village setting with clustered houses, paths, and community spaces' },
      { id: 'env-island', name: 'Hòn đảo', prompt: 'island location surrounded by water with coastal vegetation and maritime atmosphere' },
    ]
  },
  {
    category: 'Khí hậu & Thời tiết',
    options: [
      { id: 'env-tropical-humid', name: 'Nhiệt đới ẩm', prompt: 'hot humid tropical climate with lush vegetation, moisture in air' },
      { id: 'env-monsoon', name: 'Mùa mưa', prompt: 'monsoon season with heavy rainfall, overcast skies, wet surfaces, flooding' },
      { id: 'env-dry-season', name: 'Mùa khô', prompt: 'dry season with clear skies, dusty ground, less vegetation, intense sun' },
      { id: 'env-typhoon', name: 'Mùa bão', prompt: 'typhoon season atmosphere with dark clouds, strong winds, stormy conditions' },
      { id: 'env-cool-season', name: 'Mùa lạnh nhẹ', prompt: 'cool season with mild temperatures, clear skies, pleasant weather' },
      { id: 'env-foggy', name: 'Sương mù', prompt: 'foggy conditions with reduced visibility, mysterious atmosphere, moisture' },
      { id: 'env-humid', name: 'Oi bức', prompt: 'oppressive humid heat with heavy air, people seeking shade and water' },
    ]
  },
  {
    category: 'Mùa & Thời điểm',
    options: [
      { id: 'season-spring', name: 'Mùa xuân', prompt: 'spring season with blooming flowers, new growth, fresh green leaves, Tet festival' },
      { id: 'season-summer', name: 'Mùa hè', prompt: 'summer with intense sun, lush vegetation, vibrant colors, outdoor activities' },
      { id: 'season-autumn', name: 'Mùa thu', prompt: 'autumn with harvest activities, golden rice fields, comfortable weather' },
      { id: 'season-winter', name: 'Mùa đông', prompt: 'winter with cool temperatures, less rainfall, clear skies, harvest season' },
      { id: 'season-tet', name: 'Tết Nguyên Đán', prompt: 'Tet lunar new year with peach blossoms, decorations, festive atmosphere' },
      { id: 'season-harvest', name: 'Mùa gặt', prompt: 'harvest time with golden rice fields, farming activities, abundance' },
      { id: 'season-planting', name: 'Mùa cấy', prompt: 'planting season with water-filled paddies, farmers working, preparation' },
    ]
  },
  {
    category: 'Bầu không khí',
    options: [
      { id: 'mood-peaceful', name: 'Thanh bình', prompt: 'peaceful serene atmosphere with calm stillness and tranquility' },
      { id: 'mood-nostalgic', name: 'Hoài niệm', prompt: 'nostalgic atmosphere evoking memories of past times and traditions' },
      { id: 'mood-vibrant', name: 'Sôi động', prompt: 'vibrant energetic atmosphere with activity, people, and liveliness' },
      { id: 'mood-mystical', name: 'Huyền bí', prompt: 'mystical mysterious atmosphere with fog, shadows, and ethereal quality' },
      { id: 'mood-festive', name: 'Lễ hội', prompt: 'festive celebratory atmosphere with decorations, crowds, and joy' },
      { id: 'mood-contemplative', name: 'Trầm tư', prompt: 'contemplative meditative atmosphere with quiet reflection and solitude' },
      { id: 'mood-rustic', name: 'Mộc mạc', prompt: 'rustic rural atmosphere with simplicity, natural materials, and earthiness' },
      { id: 'mood-romantic', name: 'Lãng mạn', prompt: 'romantic atmosphere with soft lighting, intimate spaces, and beauty' },
    ]
  },
  {
    category: 'Âm thanh & Cảm giác',
    options: [
      { id: 'sense-birdsong', name: 'Tiếng chim hót', prompt: 'atmosphere suggesting birdsong with perched birds and natural soundscape' },
      { id: 'sense-water', name: 'Tiếng nước chảy', prompt: 'environment with flowing water sounds from streams, fountains, or rain' },
      { id: 'sense-wind', name: 'Tiếng gió', prompt: 'windy atmosphere with moving vegetation, fluttering fabric, dynamic elements' },
      { id: 'sense-temple-bell', name: 'Chuông chùa', prompt: 'spiritual atmosphere around temples with bell towers and religious ambiance' },
      { id: 'sense-market', name: 'Chợ náo nhiệt', prompt: 'bustling market atmosphere with vendors, shoppers, and commerce' },
      { id: 'sense-cicada', name: 'Ve sầu kêu', prompt: 'summer atmosphere with cicadas visible on trees suggesting their loud chorus' },
      { id: 'sense-rain', name: 'Tiếng mưa rơi', prompt: 'rainy environment with visible rain, wet surfaces, and precipitation' },
      { id: 'sense-silence', name: 'Yên tĩnh', prompt: 'silent peaceful environment with no human activity, stillness, and calm' },
    ]
  }
];
