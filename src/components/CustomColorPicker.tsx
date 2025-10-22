import React, { useState, useEffect } from 'react';

// A curated list of web colors for the picker
const PALETTE_COLORS = [
  // Grays
  '#FFFFFF', '#F2F2F2', '#E6E6E6', '#CCCCCC', '#B3B3B3', '#808080', '#4D4D4D', '#1A1A1A', '#000000',
  // Reds
  '#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#F44336', '#D32F2F', '#B71C1C',
  // Pinks
  '#FCE4EC', '#F8BBD0', '#F48FB1', '#F06292', '#E91E63', '#C2185B', '#880E4F',
  // Purples
  '#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#9C27B0', '#7B1FA2', '#4A148C',
  // Deep Purples
  '#EDE7F6', '#D1C4E9', '#B39DDB', '#7E57C2', '#673AB7', '#512DA8', '#311B92',
  // Indigos
  '#E8EAF6', '#C5CAE9', '#9FA8DA', '#5C6BC0', '#3F51B5', '#303F9F', '#1A237E',
  // Blues
  '#E3F2FD', '#BBDEFB', '#90CAF9', '#42A5F5', '#2196F3', '#1976D2', '#0D47A1',
  // Light Blues
  '#E1F5FE', '#B3E5FC', '#81D4FA', '#29B6F6', '#03A9F4', '#0288D1', '#01579B',
  // Cyans
  '#E0F7FA', '#B2EBF2', '#80DEEA', '#26C6DA', '#00BCD4', '#0097A7', '#006064',
  // Teals
  '#E0F2F1', '#B2DFDB', '#80CBC4', '#26A69A', '#009688', '#00796B', '#004D40',
  // Greens
  '#E8F5E9', '#C8E6C9', '#A5D6A7', '#66BB6A', '#4CAF50', '#388E3C', '#1B5E20',
  // Light Greens
  '#F1F8E9', '#DCEDC8', '#C5E1A5', '#9CCC65', '#8BC34A', '#689F38', '#33691E',
  // Limes
  '#F9FBE7', '#F0F4C3', '#E6EE9C', '#D4E157', '#CDDC39', '#AFB42B', '#827717',
  // Yellows
  '#FFFDE7', '#FFF9C4', '#FFF59D', '#FFEE58', '#FFEB3B', '#FBC02D', '#F57F17',
  // Ambers
  '#FFF8E1', '#FFECB3', '#FFE082', '#FFCA28', '#FFC107', '#FFA000', '#FF6F00',
  // Oranges
  '#FFF3E0', '#FFE0B2', '#FFCC80', '#FFA726', '#FF9800', '#F57C00', '#E65100',
  // Deep Oranges
  '#FBE9E7', '#FFCCBC', '#FFAB91', '#FF7043', '#FF5722', '#E64A19', '#BF360C',
  // Browns
  '#EFEBE9', '#D7CCC8', '#BCAAA4', '#A1887F', '#8D6E63', '#795548', '#5D4037', '#3E2727',
];

interface CustomColorPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (colors: string[]) => void;
  initialColors: string[];
}

const CustomColorPickerModal: React.FC<CustomColorPickerModalProps> = ({ isOpen, onClose, onSave, initialColors }) => {
  const [selectedColors, setSelectedColors] = useState<string[]>(initialColors);

  useEffect(() => {
    setSelectedColors(initialColors);
  }, [initialColors, isOpen]);

  const handleColorClick = (color: string) => {
    setSelectedColors(prev => {
      if (prev.includes(color)) {
        return prev.filter(c => c !== color);
      }
      if (prev.length < 4) {
        return [...prev, color];
      }
      return prev;
    });
  };

  const handleSave = () => {
    onSave(selectedColors);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Chọn màu tùy chỉnh</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Chọn tối đa 4 màu để tạo bảng màu của riêng bạn.</p>
        </div>

        <div className="p-6 flex-shrink-0">
            <div className="flex items-center space-x-4">
                <div className="w-full h-12 grid grid-cols-4 gap-2 rounded-lg p-2 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-full rounded" style={{ backgroundColor: selectedColors[i] || 'transparent' }} />
                    ))}
                </div>
                 <span className="text-sm font-medium text-gray-600 dark:text-gray-300 w-20 text-right">
                    {selectedColors.length} / 4
                </span>
            </div>
        </div>

        <div className="p-6 overflow-y-auto flex-grow">
          <div className="grid grid-cols-9 gap-2">
            {PALETTE_COLORS.map(color => (
              <div
                key={color}
                onClick={() => handleColorClick(color)}
                className={`w-full aspect-square rounded-md cursor-pointer border-2 transition-transform transform hover:scale-110 ${selectedColors.includes(color) ? 'border-indigo-500 dark:border-indigo-400 ring-2 ring-indigo-300 dark:ring-indigo-500/50' : 'border-transparent'}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end items-center space-x-4">
          <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">Hủy</button>
          <button onClick={handleSave} className="px-6 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50" disabled={selectedColors.length === 0}>Lưu bảng màu</button>
        </div>
      </div>
    </div>
  );
};

export default CustomColorPickerModal;