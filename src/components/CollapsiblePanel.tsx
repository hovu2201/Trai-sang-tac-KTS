import React from 'react';

import { Tooltip } from './Tooltip';

interface CollapsiblePanelProps {
  children: React.ReactNode;
  position: 'left' | 'right';
  isCollapsed: boolean;
  onToggle: () => void;
  title?: string;
  className?: string;
}

export const CollapsiblePanel: React.FC<CollapsiblePanelProps> = ({
  children,
  position,
  isCollapsed,
  onToggle,
  title = 'Panel',
  className = ''
}) => {
  const isLeft = position === 'left';
  
  // VỊ TRÍ NÚT TOGGLE - ĐƠN GIẢN HÓA
  const buttonPosition = isLeft 
    ? (isCollapsed ? 'right-0' : '-right-3')     // Panel trái: nhô ra mép phải
    : (isCollapsed ? '-left-6' : '-left-3');     // Panel phải: nhô ra mép trái (ĐỐI XỨNG)
  
  // HƯỚNG MŨI TÊN
  const arrowRotation = isCollapsed 
    ? (isLeft ? 'rotate-180' : 'rotate-0')     // Collapsed: trái←, phải→
    : (isLeft ? 'rotate-0' : 'rotate-180');    // Expanded: trái→, phải←
  
  return (
    <div 
      className={`
        relative flex-shrink-0 transition-all duration-300 ease-in-out overflow-visible
        ${isCollapsed ? 'w-0' : 'w-[320px]'}
        ${isLeft ? 'order-1' : 'order-3'}
        ${className}
      `}
    >
      {/* Panel Content */}
      <div className={`
        h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 
        overflow-hidden transition-opacity duration-300
        ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}>
        <div className="h-full p-4 overflow-y-auto">
          {children}
        </div>
      </div>

      {/* Toggle Button */}
      <Tooltip 
        text={isCollapsed ? `Mở ${title}` : `Đóng ${title}`}
        position={isLeft ? 'right' : 'left'}
      >
        <button
          onClick={onToggle}
          className={`
            absolute top-24 z-[100] pointer-events-auto
            ${buttonPosition}
            w-6 h-12 bg-gradient-to-br from-blue-500 to-purple-600 
            rounded-full shadow-lg hover:shadow-xl
            flex items-center justify-center
            transition-all duration-300 hover:scale-105 active:scale-95
            group border border-white/50 dark:border-gray-700/50
          `}
        >
          <svg 
            className={`
              w-3.5 h-3.5 text-white
              transition-transform duration-300
              ${arrowRotation}
              group-hover:scale-110
            `}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </Tooltip>
    </div>
  );
};
