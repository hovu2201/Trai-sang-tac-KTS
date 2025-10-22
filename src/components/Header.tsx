import React from 'react';

import {
  AppMode,
  PanelType,
} from '../types';
import {
  IconAspectRatio,
  IconDetails,
  IconDramatization,
  IconEdit,
  IconGallery,
  IconImage,
  IconInfo,
  IconMaterial,
  IconStyle,
  IconViewPlan,
} from './icons';
import { Tooltip } from './Tooltip';

interface HeaderProps {
  activePanel: PanelType;
  onPanelChange: (panel: PanelType) => void;
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
  onGenerate: () => void;
  isLoading: boolean;
  canGenerate: boolean;
  onLogout: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const ToolButton: React.FC<{
  label: string;
  tooltip: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ label, tooltip, isActive, onClick, children }) => (
  <Tooltip text={tooltip} position="bottom">
    <button
      onClick={onClick}
      className={`
        group relative p-3 rounded-xl transition-all duration-200
        ${isActive
          ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg scale-105'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
        }
      `}
      aria-label={label}
    >
      <div className={`transition-transform ${isActive ? '' : 'group-hover:scale-110'}`}>
        {children}
      </div>
    </button>
  </Tooltip>
);

const Header: React.FC<HeaderProps> = ({
  activePanel,
  onPanelChange,
  appMode,
  setAppMode,
  onGenerate,
  isLoading,
  canGenerate,
  onLogout,
  isDarkMode,
  setIsDarkMode,
}) => {
  const PANELS: { 
    id: PanelType; 
    label: string; 
    tooltip: string;
    icon: React.FC<any>;
  }[] = [
    { 
      id: 'phongnam', 
      label: 'Phong Nam', 
      tooltip: 'Giới thiệu Làng cổ Phong Nam - Ngữ cảnh văn hóa lịch sử',
      icon: IconInfo 
    },
    { 
      id: 'context', 
      label: 'Hình ảnh', 
      tooltip: 'Tải lên ảnh đầu vào và nhập mô tả dự án',
      icon: IconImage 
    },
    { 
      id: 'style', 
      label: 'Tiếp cận', 
      tooltip: 'Chọn phong cách kiến trúc phù hợp với dự án',
      icon: IconStyle 
    },
    { 
      id: 'materials', 
      label: 'Vật liệu', 
      tooltip: 'Chọn vật liệu xây dựng cho công trình',
      icon: IconMaterial 
    },
    { 
      id: 'elements', 
      label: 'Yếu tố', 
      tooltip: 'Thêm các chi tiết kiến trúc đặc trưng',
      icon: IconDetails 
    },
    { 
      id: 'dramatization', 
      label: 'Diễn họa', 
      tooltip: 'Điều chỉnh ánh sáng, thời tiết và bầu không khí',
      icon: IconDramatization 
    },
    { 
      id: 'aspectRatio', 
      label: 'Tỉ lệ', 
      tooltip: 'Chọn tỉ lệ khung hình cho ảnh đầu ra',
      icon: IconAspectRatio 
    },
  ];

  const TOOLS = [
    {
      id: 'gallery',
      label: 'Thư viện',
      tooltip: 'Xem và quản lý tất cả ảnh đã tạo',
      icon: IconGallery,
      isActive: appMode === 'generate' && activePanel === 'gallery',
      onClick: () => {
        setAppMode('generate');
        onPanelChange('gallery');
      }
    },
    {
      id: 'views2d',
      label: 'Bản vẽ 2D',
      tooltip: 'Tạo mặt bằng, mặt cắt, mặt đứng từ ảnh 3D',
      icon: IconViewPlan,
      isActive: appMode === 'generate' && activePanel === 'views2d',
      onClick: () => {
        setAppMode('generate');
        onPanelChange('views2d');
      }
    },
    {
      id: 'edit',
      label: 'Chỉnh sửa',
      tooltip: 'Vẽ mask và chỉnh sửa một phần ảnh',
      icon: IconEdit,
      isActive: appMode === 'edit-select' || appMode === 'editing',
      onClick: () => setAppMode('edit-select')
    }
  ];

  return (
    <header className="flex-shrink-0 bg-gradient-to-r from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 border-b-2 border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo & Title */}
        <div className="flex items-center gap-4">
          <Tooltip text="Click để đăng xuất" position="bottom">
            <button 
              onClick={onLogout}
              className="h-12 w-auto flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <img 
                src="/logo.png" 
                alt="Logo Trại Sáng tác Kiến trúc" 
                className="h-full w-auto object-contain cursor-pointer"
              />
            </button>
          </Tooltip>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Hội KTS TP Đà Nẵng - Làng Phong Nam
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Trại Sáng tác Đà Nẵng 2025
            </p>
          </div>
        </div>

        {/* Main Toolbar */}
        <div className="flex items-center gap-2 bg-white dark:bg-gray-900 rounded-2xl p-2 shadow-inner border border-gray-200 dark:border-gray-700">
          {/* Panel Tools */}
          <div className="flex items-center gap-1">
            {PANELS.map((panel) => (
              <ToolButton
                key={panel.id}
                label={panel.label}
                tooltip={panel.tooltip}
                isActive={appMode === 'generate' && activePanel === panel.id}
                onClick={() => {
                  setAppMode('generate');
                  onPanelChange(panel.id as PanelType);
                }}
              >
                <panel.icon className="w-6 h-6" />
              </ToolButton>
            ))}
          </div>

          {/* Divider */}
          <div className="w-px h-10 bg-gray-300 dark:bg-gray-600 mx-1"></div>

          {/* Additional Tools */}
          <div className="flex items-center gap-1">
            {TOOLS.map((tool) => (
              <ToolButton
                key={tool.id}
                label={tool.label}
                tooltip={tool.tooltip}
                isActive={tool.isActive}
                onClick={tool.onClick}
              >
                <tool.icon className="w-6 h-6" />
              </ToolButton>
            ))}
          </div>
        </div>

        {/* Right Side - Theme Toggle & Generate Button */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Tooltip text={isDarkMode ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"} position="bottom">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all shadow-md hover:shadow-lg"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </Tooltip>

          {/* Generate Button */}
          <Tooltip text={canGenerate ? "Tạo ảnh từ các tùy chọn đã chọn" : "Vui lòng tải lên ảnh đầu vào"}>
            <button
              onClick={onGenerate}
              disabled={isLoading || !canGenerate}
              className={`
                relative px-8 py-3 rounded-xl font-semibold text-white
                transition-all duration-200 shadow-lg
                ${isLoading || !canGenerate
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:shadow-xl hover:scale-105 active:scale-95'
                }
              `}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Đang xử lý...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Phác thảo
              </span>
            )}
          </button>
        </Tooltip>
        </div>
      </div>
    </header>
  );
};

export default Header;