import React from 'react';
import {
  IconImage,
  IconStyle,
  IconMaterial,
  IconDetails,
  IconDramatization,
  IconEdit,
  IconAspectRatio,
  IconFloorPlan, // Using this icon for "Category"
} from './icons';
import { PanelType, AppMode } from '../types';

interface ControlBarProps {
  activePanel: PanelType;
  onPanelChange: (panel: PanelType) => void;
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
  onGenerate: () => void;
  isLoading: boolean;
  canGenerate: boolean;
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

const ControlBar: React.FC<ControlBarProps> = ({
  activePanel,
  onPanelChange,
  appMode,
  setAppMode,
  onGenerate,
  isLoading,
  canGenerate,
}) => {
  const PANELS: { id: PanelType, label: string, icon: React.FC<any> }[] = [
    { id: 'context', label: 'Hiện trạng', icon: IconImage },
    { id: 'category', label: 'Hạng mục', icon: IconFloorPlan },
    { id: 'style', label: 'Tiếp cận', icon: IconStyle },
    { id: 'materials', label: 'Vật liệu', icon: IconMaterial },
    { id: 'elements', label: 'Yếu tố', icon: IconDetails },
    { id: 'dramatization', label: 'Diễn họa', icon: IconDramatization },
    { id: 'aspectRatio', label: 'Tỉ lệ', icon: IconAspectRatio },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col p-2 space-y-1 w-28 flex-shrink-0">
      <div className="space-y-1">
        <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider py-1">THIẾT KẾ</p>
        {PANELS.map((panel) => (
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
  );
};

export default ControlBar;