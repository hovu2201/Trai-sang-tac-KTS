import React, { useState } from 'react';

import InfoModal from './InfoModal';

interface WelcomeScreenProps {
  onLogin: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'traisangtackts' && password === 'danang2025') {
      onLogin();
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không đúng');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (showLogin) {
    return (
      <div className="min-h-screen w-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-y-auto">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555528208-47cd02d2c6ca?w=1920&q=80')] opacity-20 bg-cover bg-center"></div>
        
        <div className="relative z-10 max-w-md w-full my-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 md:p-10">
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mb-3 sm:mb-4">
                <img 
                  src="/logo.png" 
                  alt="Logo Trại Sáng tác Kiến trúc" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Đăng nhập</h2>
              <p className="text-sm sm:text-base text-blue-200">Trại Sáng tác Kiến trúc - Đà Nẵng 2025</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-blue-100 mb-2">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="traisangtackts"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-blue-100 mb-2">
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2.5 sm:py-3 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg text-sm sm:text-base"
              >
                Đăng nhập
              </button>
            </form>

            <button
              onClick={() => setShowLogin(false)}
              className="mt-4 sm:mt-6 w-full text-blue-200 hover:text-white text-xs sm:text-sm transition-colors"
            >
              ← Quay lại trang giới thiệu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-full w-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 overflow-y-auto relative">
      {/* Background Pattern - Đà Nẵng cityscape */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555528208-47cd02d2c6ca?w=1920&q=80')] bg-cover bg-center"></div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-between p-4 sm:p-8 py-8 sm:py-12">
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-6xl">
          {/* Logo & Title */}
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mb-4 sm:mb-6 animate-float">
              <img 
                src="/logo.png" 
                alt="Logo Trại Sáng tác Kiến trúc" 
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
            
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4 tracking-tight px-4 leading-tight">
              HỘI KIẾN TRÚC SƯ<br className="sm:hidden" /> TP ĐÀ NẴNG
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-200 font-light mb-2 px-4">
              Trại Sáng tác Kiến trúc Đà Nẵng 2025
            </p>
            <p className="text-sm sm:text-base md:text-lg text-blue-300/80 max-w-2xl mx-auto px-4">
              Bảo tồn và Phát triển Làng cổ Phong Nam
            </p>
          </div>

          {/* Features Grid - Hidden on mobile, shown on tablet+ */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-12 max-w-4xl w-full px-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 lg:p-6 border border-white/20 hover:bg-white/15 transition-all transform hover:scale-105">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-3 lg:mb-4">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-base lg:text-lg font-semibold text-white mb-2">Tạo hình ảnh AI</h3>
              <p className="text-blue-200 text-xs lg:text-sm">
                Chuyển đổi ý tưởng kiến trúc thành hình ảnh photorealistic với AI
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 lg:p-6 border border-white/20 hover:bg-white/15 transition-all transform hover:scale-105">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-3 lg:mb-4">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-base lg:text-lg font-semibold text-white mb-2">Chỉnh sửa nâng cao</h3>
              <p className="text-blue-200 text-xs lg:text-sm">
                Vẽ mask và chỉnh sửa từng phần ảnh với độ chính xác cao
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 lg:p-6 border border-white/20 hover:bg-white/15 transition-all transform hover:scale-105">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-3 lg:mb-4">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-base lg:text-lg font-semibold text-white mb-2">Thư viện ảnh</h3>
              <p className="text-blue-200 text-xs lg:text-sm">
                Lưu trữ và quản lý tất cả các thiết kế kiến trúc của bạn
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md px-4 mb-8">
            <button
              onClick={() => setShowLogin(true)}
              className="w-full px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-2xl text-lg sm:text-xl"
            >
              Bắt đầu sử dụng →
            </button>
            
            <button
              onClick={() => setShowInfoModal(true)}
              className="w-full px-6 sm:px-8 py-4 sm:py-5 bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all transform hover:scale-105 active:scale-95 text-lg sm:text-xl"
            >
              Tìm hiểu thêm
            </button>
          </div>
        </div>

        {/* Footer - Responsive */}
        <div className="text-center text-blue-200/60 text-xs sm:text-sm max-w-2xl px-4 pb-4 sm:pb-8">
          <p>© 2025 Trại Sáng tác Kiến trúc Đà Nẵng</p>
          <p className="mt-2 text-[11px] sm:text-sm">Ứng dụng được tạo bởi: KTS. Hồ Lê Quốc Vũ - UV BCH Hội KTS TP Đà Nẵng</p>
        </div>
      </div>

      <InfoModal isOpen={showInfoModal} onClose={() => setShowInfoModal(false)} />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};
