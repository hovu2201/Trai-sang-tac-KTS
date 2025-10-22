
import React, { useState, useEffect } from 'react';

const messages = [
  "AI đang phân tích cấu trúc không gian...",
  "Pha trộn các yếu tố phong cách...",
  "Lựa chọn vật liệu và màu sắc...",
  "Kết xuất hình ảnh chất lượng cao...",
  "Sắp hoàn thành rồi, vui lòng chờ trong giây lát..."
];

const Loader: React.FC = () => {
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = messages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % messages.length;
        return messages[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center">
       <svg className="animate-spin h-12 w-12 text-indigo-600 mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
       </svg>
       <h2 className="text-xl font-bold text-gray-700 mb-2">Đang kiến tạo không gian mới...</h2>
       <p className="text-gray-500 transition-opacity duration-500">{message}</p>
       <p className="text-sm text-gray-400 mt-4">(Quá trình này có thể mất vài phút)</p>
    </div>
  );
};

export default Loader;
