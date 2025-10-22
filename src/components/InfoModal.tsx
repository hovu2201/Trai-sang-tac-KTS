import React from 'react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Giới thiệu Ứng dụng & Làng Cổ Phong Nam</h2>
            <p className="text-blue-100">Trại Sáng tác Kiến trúc Đà Nẵng 2025</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-colors"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-8">
          <div className="space-y-8 text-gray-200">
            
            {/* Section 1: About the App */}
            <section className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center">
                <svg className="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Về Ứng dụng
              </h3>
              <div className="space-y-3">
                <p className="leading-relaxed">
                  <strong className="text-blue-300">Ứng dụng Trại Sáng tác Kiến trúc</strong> là công cụ AI hỗ trợ kiến trúc sư và sinh viên trong việc nghiên cứu, phát triển ý tưởng thiết kế cho dự án <strong>Bảo tồn và Phát triển Làng cổ Phong Nam</strong>.
                </p>
                <p className="leading-relaxed">
                  Ứng dụng sử dụng công nghệ <strong className="text-purple-300">Google Gemini AI</strong> để chuyển đổi ý tưởng kiến trúc thành hình ảnh photorealistic, giúp trực quan hóa các phương án thiết kế một cách nhanh chóng và chuyên nghiệp.
                </p>
              </div>
            </section>

            {/* Section 2: How to Use */}
            <section className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center">
                <svg className="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Hướng dẫn Sử dụng
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold mr-3">1</span>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Tải ảnh gốc</h4>
                      <p className="text-sm text-gray-300">Tải lên ảnh hiện trạng công trình hoặc khu đất cần thiết kế</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold mr-3">2</span>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Chọn phong cách</h4>
                      <p className="text-sm text-gray-300">Lựa chọn phong cách kiến trúc phù hợp (Bảo tồn, Hiện đại, Đối thoại...)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold mr-3">3</span>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Chọn vật liệu</h4>
                      <p className="text-sm text-gray-300">Chọn vật liệu xây dựng (gạch, ngói, gỗ, tre, bê tông...)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold mr-3">4</span>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Thêm chi tiết</h4>
                      <p className="text-sm text-gray-300">Bổ sung yếu tố kiến trúc (mái, cửa, cảnh quan, trang trí...)</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center font-bold mr-3">5</span>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Chọn góc nhìn</h4>
                      <p className="text-sm text-gray-300">Xác định góc chụp (phối cảnh, chính diện, drone...)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center font-bold mr-3">6</span>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Diễn họa</h4>
                      <p className="text-sm text-gray-300">Thêm các yếu tố sinh động (người, xe, ánh sáng, thời tiết...)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center font-bold mr-3">7</span>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Tạo ảnh AI</h4>
                      <p className="text-sm text-gray-300">Nhấn nút "Tạo ảnh" và chờ AI xử lý (20-40 giây)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center font-bold mr-3">8</span>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Chỉnh sửa & Ghi chú</h4>
                      <p className="text-sm text-gray-300">Dùng công cụ Edit để chỉnh sửa, Note để thêm chú thích</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <h4 className="font-semibold text-yellow-300 mb-2">💡 Mẹo sử dụng hiệu quả:</h4>
                <ul className="space-y-1 text-sm text-gray-300 list-disc list-inside">
                  <li>Sử dụng ô "Mô tả thêm" để cung cấp thông tin cụ thể về hiện trạng</li>
                  <li>Thử nghiệm nhiều phối hợp phong cách và vật liệu khác nhau</li>
                  <li>Dùng chức năng "Hình ảnh tham khảo" để AI học theo phong cách có sẵn</li>
                  <li>Tận dụng công cụ Edit để chọn vùng cần thay đổi cụ thể</li>
                  <li>Lưu các phương án vào Gallery để so sánh và đánh giá</li>
                </ul>
              </div>
            </section>

            {/* Section 3: About Phong Nam Village */}
            <section className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 rounded-xl p-6 border border-amber-500/30">
              <h3 className="text-2xl font-bold text-amber-400 mb-4 flex items-center">
                <svg className="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Làng Cổ Phong Nam - Di sản Văn hóa Đà Nẵng
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-semibold text-amber-300 mb-2">📍 Vị trí & Lịch sử</h4>
                  <p className="leading-relaxed">
                    Làng cổ Phong Nam nằm tại xã Hòa Phong, huyện Hòa Vang, thành phố Đà Nẵng. Được hình thành từ năm <strong className="text-white">1582</strong> (thời Lê - Trịnh), làng có tuổi đời hơn <strong className="text-white">440 năm</strong>, là một trong những làng cổ nhất còn tồn tại ở Đà Nẵng.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-amber-300 mb-2">🏛️ Di tích Kiến trúc</h4>
                  <p className="mb-3">Làng hiện còn bảo tồn <strong className="text-white">125 căn nhà cổ</strong> và nhiều công trình kiến trúc tiêu biểu:</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h5 className="font-semibold text-orange-300 mb-2">🏯 Đình Thần Nông</h5>
                      <p className="text-sm text-gray-300">Công trình thờ Thần Nông - vị thần nông nghiệp, với kiến trúc mái cong vút, kết cấu gỗ truyền thống, cột rồng chạm khắc tinh xảo.</p>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h5 className="font-semibold text-orange-300 mb-2">⛩️ Miếu Thái Giám</h5>
                      <p className="text-sm text-gray-300">Ngôi miếu thờ quan Thái giám thời Lê, quy mô nhỏ gọn, kiến trúc giản dị nhưng trang nghiêm.</p>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h5 className="font-semibold text-orange-300 mb-2">🏠 Nhà thờ Tiền Hiền</h5>
                      <p className="text-sm text-gray-300">Nhà thờ tổ tiên khai sáng làng, với hệ thống hoành phi câu đối sơn son thếp vàng, kiến trúc mái kép uy nghiêm.</p>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h5 className="font-semibold text-orange-300 mb-2">🏡 Nhà Ba Gian</h5>
                      <p className="text-sm text-gray-300">Kiến trúc nhà ở truyền thống với 3 gian: gian giữa thờ tự, hai gian bên sinh hoạt. Mái cong sừng trâu đặc trưng.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-amber-300 mb-2">🎨 Đặc trưng Kiến trúc</h4>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="text-amber-400 mr-2">▸</span>
                      <p className="text-gray-300"><strong className="text-white">Mái cong sừng trâu:</strong> Dáng mái đặc trưng với hai đầu vút cao, tạo nét thanh thoát, nhẹ nhàng</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-amber-400 mr-2">▸</span>
                      <p className="text-gray-300"><strong className="text-white">Kết cấu cột-kèo:</strong> Hệ kết cấu gỗ lộ thiên (nhà rường), các cột và kèo được liên kết bằng mộng gỗ truyền thống</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-amber-400 mr-2">▸</span>
                      <p className="text-gray-300"><strong className="text-white">Ngói âm dương:</strong> Loại ngói ống lợp một úp một ngửa, tạo độ bền cao và thoát nước tốt</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-amber-400 mr-2">▸</span>
                      <p className="text-gray-300"><strong className="text-white">Chạm khắc:</strong> Hoa văn rồng phượng, tứ linh trên cột, kèo, bờ nóc, đầu hồi</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-amber-400 mr-2">▸</span>
                      <p className="text-gray-300"><strong className="text-white">Không gian mở:</strong> Nhà ba gian có không gian liên thông, cửa bức bàn có thể tháo rời</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-amber-300 mb-2">🌳 Cảnh quan & Môi trường</h4>
                  <p className="mb-2">Làng Phong Nam nằm giữa môi trường nông thôn thanh bình với:</p>
                  <div className="grid md:grid-cols-3 gap-2">
                    <div className="bg-green-900/20 border border-green-700/30 p-3 rounded-lg text-sm">
                      <strong className="text-green-300">🌾 Cánh đồng lúa:</strong> Bao quanh làng, tạo nên bối cảnh xanh mướt
                    </div>
                    <div className="bg-blue-900/20 border border-blue-700/30 p-3 rounded-lg text-sm">
                      <strong className="text-blue-300">💧 Sông suối:</strong> Hệ thống thủy lợi và ao hồ tự nhiên
                    </div>
                    <div className="bg-green-900/20 border border-green-700/30 p-3 rounded-lg text-sm">
                      <strong className="text-green-300">🎋 Lũy tre:</strong> Hàng rào tre bao quanh các khu nhà
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-amber-300 mb-2">🎯 Thách thức Bảo tồn</h4>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="text-red-400 mr-2">⚠</span>
                      <p className="text-gray-300"><strong className="text-orange-300">Xuống cấp tự nhiên:</strong> Nhiều công trình cổ bị hư hỏng do thời gian, thiếu bảo trì</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-red-400 mr-2">⚠</span>
                      <p className="text-gray-300"><strong className="text-orange-300">Áp lực đô thị hóa:</strong> Nguy cơ phá bỏ nhà cổ để xây mới theo kiểu hiện đại</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-red-400 mr-2">⚠</span>
                      <p className="text-gray-300"><strong className="text-orange-300">Thiếu nguồn lực:</strong> Chi phí tu bổ, phục hồi công trình cổ rất cao</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-red-400 mr-2">⚠</span>
                      <p className="text-gray-300"><strong className="text-orange-300">Mất dần kỹ năng:</strong> Thợ thủ công truyền thống (mộc, hồ, lợp ngói) ngày càng hiếm</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Conservation Principles */}
            <section className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center">
                <svg className="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Nguyên tắc Bảo tồn & Phục chế
              </h3>
              
              <div className="space-y-4">
                <div className="bg-blue-900/20 border border-blue-700/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-300 mb-2">1. Nguyên tắc Can thiệp Tối thiểu (Minimal Intervention)</h4>
                  <p className="text-sm text-gray-300 mb-2">Chỉ can thiệp vào những phần thật sự cần thiết, giữ nguyên tối đa các yếu tố gốc.</p>
                  <ul className="text-sm text-gray-400 list-disc list-inside space-y-1 ml-4">
                    <li>Ưu tiên gia cố thay vì thay thế hoàn toàn</li>
                    <li>Giữ nguyên vật liệu, kết cấu gốc nếu còn khả năng chịu lực</li>
                    <li>Chỉ thay thế những bộ phận hư hỏng không thể phục hồi</li>
                  </ul>
                </div>

                <div className="bg-green-900/20 border border-green-700/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-300 mb-2">2. Nguyên tắc Tính Khả đảo (Reversibility)</h4>
                  <p className="text-sm text-gray-300 mb-2">Các biện pháp can thiệp phải có thể đảo ngược được trong tương lai nếu cần.</p>
                  <ul className="text-sm text-gray-400 list-disc list-inside space-y-1 ml-4">
                    <li>Sử dụng kỹ thuật liên kết cơ học thay vì dán/hàn vĩnh viễn</li>
                    <li>Các bộ phận mới phải tháo lắp được mà không làm hư hại phần gốc</li>
                    <li>Ghi chép đầy đủ các can thiệp để hậu thế có thể đánh giá lại</li>
                  </ul>
                </div>

                <div className="bg-purple-900/20 border border-purple-700/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-300 mb-2">3. Nguyên tắc Phân biệt Rõ ràng (Distinguishability)</h4>
                  <p className="text-sm text-gray-300 mb-2">Phân biệt được đâu là phần gốc, đâu là phần mới thêm vào.</p>
                  <ul className="text-sm text-gray-400 list-disc list-inside space-y-1 ml-4">
                    <li>Vật liệu mới có màu sắc/kết cấu hơi khác để nhận diện được</li>
                    <li>Ghi nhãn thời gian trên các bộ phận phục hồi (ví dụ: "Phục chế 2025")</li>
                    <li>Lưu trữ hồ sơ ảnh chụp, bản vẽ trước và sau can thiệp</li>
                  </ul>
                </div>

                <div className="bg-amber-900/20 border border-amber-700/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-300 mb-2">4. Nguyên tắc Sử dụng Vật liệu Tương thích (Compatibility)</h4>
                  <p className="text-sm text-gray-300 mb-2">Vật liệu mới phải tương thích về cơ học, hóa học với vật liệu cũ.</p>
                  <ul className="text-sm text-gray-400 list-disc list-inside space-y-1 ml-4">
                    <li>Dùng gỗ cùng loại hoặc tính chất tương đương</li>
                    <li>Vữa mới phải có độ bền, độ co giãn phù hợp với vữa cũ</li>
                    <li>Tránh dùng vật liệu quá cứng gây nứt cho kết cấu cũ</li>
                  </ul>
                </div>

                <div className="bg-red-900/20 border border-red-700/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-300 mb-2">5. Nguyên tắc Tôn trọng Giá trị Lịch sử (Respect for Historical Value)</h4>
                  <p className="text-sm text-gray-300 mb-2">Giữ gìn các dấu ấn thời gian, không "làm mới" quá mức.</p>
                  <ul className="text-sm text-gray-400 list-disc list-inside space-y-1 ml-4">
                    <li>Chấp nhận vẻ "cũ kỹ" tự nhiên của vật liệu theo thời gian</li>
                    <li>Không sơn phủ quá mức che mất vân gỗ, họa tiết gốc</li>
                    <li>Giữ lại các dấu vết sửa chữa từ thời kỳ trước (nếu có giá trị lịch sử)</li>
                  </ul>
                </div>

                <div className="bg-teal-900/20 border border-teal-700/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-teal-300 mb-2">6. Nguyên tắc Cải thiện Điều kiện Sinh hoạt (Adaptive Reuse)</h4>
                  <p className="text-sm text-gray-300 mb-2">Thích ứng hóa nhà cổ với nhu cầu sống hiện đại một cách khéo léo.</p>
                  <ul className="text-sm text-gray-400 list-disc list-inside space-y-1 ml-4">
                    <li>Lắp thêm điện, nước, nhà vệ sinh mà không phá vỡ kết cấu chính</li>
                    <li>Ẩn các thiết bị hiện đại (điều hòa, đường ống) một cách khéo léo</li>
                    <li>Bảo đảm an toàn phòng cháy nổ, chống sét, chống mối mọt</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5: Workshop Goals */}
            <section className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 rounded-xl p-6 border border-indigo-500/30">
              <h3 className="text-2xl font-bold text-indigo-400 mb-4 flex items-center">
                <svg className="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Mục tiêu Trại Sáng tác 2025
              </h3>
              
              <div className="space-y-3">
                <p className="text-lg font-semibold text-white">"Neo kiến trúc cảnh quan làng cổ - Bất biến giữa dòng đời vạn biến"</p>
                
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="font-semibold text-indigo-300 mb-2">🎯 Mục tiêu Chính</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-start">
                        <span className="text-indigo-400 mr-2">•</span>
                        <span>Nghiên cứu, đề xuất phương án bảo tồn các di tích kiến trúc</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-400 mr-2">•</span>
                        <span>Thiết kế các công trình kiến trúc mới hòa hợp với bối cảnh cổ</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-400 mr-2">•</span>
                        <span>Quy hoạch cảnh quan, không gian công cộng cho làng</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-400 mr-2">•</span>
                        <span>Phát triển du lịch văn hóa bền vững gắn với bảo tồn</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-300 mb-2">🌟 Giá trị Kỳ vọng</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>Nâng cao nhận thức cộng đồng về giá trị di sản</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>Tạo sinh kế bền vững cho người dân địa phương</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>Xây dựng mô hình làng cổ điểm cho Đà Nẵng</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>Lan tỏa tinh thần bảo tồn đến các làng cổ khác</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: Credits */}
            <section className="text-center py-6 border-t border-white/10">
              <p className="text-gray-400 mb-2">Ứng dụng được phát triển bởi:</p>
              <p className="text-lg font-semibold text-white">KTS. Hồ Lê Quốc Vũ</p>
              <p className="text-blue-300">UV BCH Hội Kiến trúc sư TP Đà Nẵng</p>
              <p className="text-gray-500 mt-4 text-sm">© 2025 Trại Sáng tác Kiến trúc Đà Nẵng</p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
