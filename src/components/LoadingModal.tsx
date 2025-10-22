import React, { useState, useEffect } from 'react';
import { LOADING_TIPS } from '../constants';

interface LoadingModalProps {
  isOpen: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen }) => {
  const [tip, setTip] = useState(LOADING_TIPS[0]);

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setTip(LOADING_TIPS[Math.floor(Math.random() * LOADING_TIPS.length)]);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 animate-fade-in">
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
      <div className="text-center text-white max-w-lg">
        <svg className="animate-spin h-12 w-12 text-white mx-auto mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h2 className="text-2xl font-bold mb-2">Đang kiến tạo không gian mới...</h2>
        <p className="text-gray-300 mb-8">(Quá trình này có thể mất một chút thời gian)</p>
        
        <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-sm font-semibold text-gray-200 mb-1">Bạn có biết?</p>
            <p className="text-gray-300 italic transition-opacity duration-500">{tip}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;