import React, { useState } from 'react';

import {
  AppMode,
  PanelType,
} from '../types';
import {
  IconAngleCenter,
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

interface ControlBarProps {
  activePanel: PanelType;
  onPanelChange: (panel: PanelType) => void;
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
  onGenerate: () => void;
  isLoading: boolean;
  canGenerate: boolean;
  renderActivePanel?: () => React.ReactNode;
}

const NavButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ label, isActive, onClick, children }) => (
  <button
    onClick={onClick}
    className={`w-full flex flex-col items-center p-1.5 rounded-lg transition-colors text-xs space-y-0.5 ${
      isActive
        ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`}
    aria-label={label}
  >
    {children}
    <span className="font-semibold">{label}</span>
  </button>
);

const MobileNavButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ label, isActive, onClick, children }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all flex-1 min-w-0 ${
      isActive
        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
        : 'text-gray-600 dark:text-gray-400'
    }`}
    aria-label={label}
  >
    <div className={`transition-transform ${isActive ? 'scale-110' : ''}`}>
      {children}
    </div>
    <span className="text-[10px] font-semibold mt-1 truncate w-full">{label}</span>
  </button>
);

const ControlBar: React.FC<ControlBarProps> = ({
  activePanel,
  onPanelChange,
  appMode,
  setAppMode,
  onGenerate,
  isLoading,
  canGenerate,
  renderActivePanel,
}) => {
  const [showPanelDrawer, setShowPanelDrawer] = useState(false);
  const [showContentDrawer, setShowContentDrawer] = useState(false);

  const PANELS: { id: PanelType, label: string, icon: React.FC<any> }[] = [
    { id: 'phongnam', label: 'Phong Nam', icon: IconInfo },
    { id: 'context', label: 'Hình ảnh', icon: IconImage },
    { id: 'angleGeneration', label: 'Góc nhìn', icon: IconAngleCenter },
    { id: 'views2d', label: 'Bản vẽ 2D', icon: IconViewPlan },
    { id: 'style', label: 'Tiếp cận', icon: IconStyle },
    { id: 'materials', label: 'Vật liệu', icon: IconMaterial },
    { id: 'elements', label: 'Yếu tố', icon: IconDetails },
    { id: 'dramatization', label: 'Diễn họa', icon: IconDramatization },
    { id: 'aspectRatio', label: 'Tỉ lệ', icon: IconAspectRatio },
  ];

  return (
    <>
      {/* Desktop Version - Sidebar */}
      <div className="hidden lg:flex bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex-col p-2 space-y-1 w-28 flex-shrink-0">
        <div className="space-y-1">
          <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider py-1">THIẾT KẾ</p>
          {PANELS.slice(0, 9).map((panel) => (
            <NavButton
              key={panel.id}
              label={panel.label}
              isActive={appMode === 'generate' && activePanel === panel.id}
              onClick={() => {
                setAppMode('generate');
                onPanelChange(panel.id as PanelType);
              }}
            >
              <panel.icon className="w-6 h-6" />
            </NavButton>
          ))}
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-1 mt-1">
          <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider py-1">CÔNG CỤ</p>
          <div className="space-y-1 bg-gray-100 dark:bg-gray-700/50 rounded-lg p-1">
            <NavButton
              key="edit"
              label="Chỉnh sửa"
              isActive={appMode === 'edit-select' || appMode === 'editing'}
              onClick={() => setAppMode('edit-select')}
            >
              <IconEdit className="w-6 h-6" />
            </NavButton>
          </div>
        </div>
        <div className="flex-grow"></div>
        <div className="mt-auto">
          <button
            onClick={onGenerate}
            disabled={isLoading || !canGenerate}
            className="w-full py-3 px-2 text-center text-sm font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-green-400 dark:disabled:bg-green-800 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {isLoading ? '...' : `Phác thảo`}
          </button>
        </div>
      </div>

      {/* Mobile Version - Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-2xl z-50">
        <div className="flex items-center justify-around px-2 py-2 pb-safe">
          {/* Panels Button */}
          <MobileNavButton
            label="Thiết kế"
            isActive={showPanelDrawer}
            onClick={() => setShowPanelDrawer(!showPanelDrawer)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </MobileNavButton>

          {/* Generate Button - CENTER & PROMINENT */}
          <button
            onClick={onGenerate}
            disabled={isLoading || !canGenerate}
            className={`flex flex-col items-center justify-center px-8 py-2.5 rounded-xl transition-all transform flex-1 max-w-[140px] ${
              isLoading || !canGenerate
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg active:scale-95'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="text-xs font-bold mt-1">Đang tạo...</span>
              </>
            ) : (
              <>
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-xs font-bold mt-1">PHÁC THẢO</span>
              </>
            )}
          </button>

          {/* Gallery */}
          <MobileNavButton
            label="Thư viện"
            isActive={activePanel === 'gallery'}
            onClick={() => {
              setAppMode('generate');
              onPanelChange('gallery');
              setShowPanelDrawer(false);
              setShowContentDrawer(false);
            }}
          >
            <IconGallery className="w-6 h-6" />
          </MobileNavButton>
        </div>
      </div>

      {/* Panel Drawer - Mobile */}
      {showPanelDrawer && (
        <>
          {/* Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-40 animate-fade-in"
            onClick={() => setShowPanelDrawer(false)}
          />
          
          {/* Drawer Content */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-3xl z-50 animate-slide-up shadow-2xl max-h-[70vh] overflow-y-auto pb-20">
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">Tùy chọn thiết kế</h3>
              <button
                onClick={() => setShowPanelDrawer(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-3 gap-3">
                {PANELS.map((panel) => (
                  <button
                    key={panel.id}
                    onClick={() => {
                      setAppMode('generate');
                      onPanelChange(panel.id);
                      setShowPanelDrawer(false); // Đóng drawer chọn panel
                      setShowContentDrawer(true); // Mở drawer nội dung
                    }}
                    className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                      activePanel === panel.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <panel.icon className="w-8 h-8 mb-2" />
                    <span className="text-xs font-semibold text-center">{panel.label}</span>
                  </button>
                ))}
              </div>
              
              {/* Hint text */}
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <p className="text-xs text-center text-blue-700 dark:text-blue-300">
                  💡 Chọn một tùy chọn để xem và điều chỉnh chi tiết
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Content Drawer - Show panel content */}
      {showContentDrawer && renderActivePanel && (
        <>
          {/* Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-50 animate-fade-in"
            onClick={() => setShowContentDrawer(false)}
          />
          
          {/* Drawer Content */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-3xl z-50 animate-slide-up shadow-2xl overflow-hidden" style={{ maxHeight: '90vh' }}>
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between z-10">
              <h3 className="text-lg font-bold">{PANELS.find(p => p.id === activePanel)?.label || 'Tùy chọn'}</h3>
              <button
                onClick={() => setShowContentDrawer(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="overflow-y-auto pb-20" style={{ maxHeight: 'calc(90vh - 70px)' }}>
              {renderActivePanel()}
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .pb-safe {
          padding-bottom: max(0.25rem, env(safe-area-inset-bottom));
        }
      `}</style>
    </>
  );
};

export default ControlBar;