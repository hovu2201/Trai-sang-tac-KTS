import React from 'react';

import {
  EXTERIOR_ANGLE_PROMPTS,
  INTERIOR_ANGLE_PROMPTS,
} from '../constants';
import {
  ArchitecturalElement,
  ArchitecturalStyle,
  DramatizationOption,
  MaterialCombination,
  RenovationResult,
} from '../types';
import AngleSelector from './AngleSelector';

interface InfoPanelProps {
  selectedImage: RenovationResult | null;
  onGenerateAngle: (prompt: string) => void;
  isLoading: boolean;
  selectedStyle: ArchitecturalStyle;
  selectedMaterials: MaterialCombination | null;
  selectedElements: ArchitecturalElement[];
  selectedDramatization: DramatizationOption[];
}

const InfoPanel: React.FC<InfoPanelProps> = ({ 
  selectedImage, 
  onGenerateAngle, 
  isLoading, 
  selectedStyle,
  selectedMaterials,
  selectedElements,
  selectedDramatization
}) => {
  const isInterior = selectedStyle.name.toLowerCase().includes('interior') || selectedStyle.name.toLowerCase().includes('nội thất');
  const anglePrompts = isInterior ? INTERIOR_ANGLE_PROMPTS : EXTERIOR_ANGLE_PROMPTS;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 flex flex-col h-full">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 border-b dark:border-gray-600 pb-3 mb-4">
        Thông tin &amp; Hành động
      </h2>
      <div className="flex-grow overflow-y-auto pr-2 space-y-4">
        {selectedImage ? (
          <div>
            <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-2">Thuyết minh phương án</h3>
            
            {selectedImage.description && selectedImage.description.trim() !== "" ? (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-750 p-4 rounded-lg border border-blue-200 dark:border-gray-600 mb-4">
                    <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">{selectedImage.description}</p>
                </div>
            ) : (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-700 mb-4 animate-pulse">
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 italic flex items-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang tạo thuyết minh...
                    </p>
                </div>
            )}
            
            <div className="text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800/50 p-2 rounded border border-gray-200 dark:border-gray-700 mb-4 max-h-24 overflow-y-auto">
              <div className="font-semibold mb-1">Prompt kỹ thuật:</div>
              <code className="break-words">{selectedImage.prompt}</code>
            </div>
            
            <AngleSelector 
                angleOptions={anglePrompts}
                onGenerateAngle={onGenerateAngle}
                isLoading={isLoading}
            />

          </div>
        ) : (
          <div>
            <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-3">Tùy chọn đang chọn</h3>
            
            <div className="space-y-3 text-sm">
              {/* Style */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="font-semibold text-blue-900 dark:text-blue-300 mb-1">Phong cách</div>
                <div className="text-gray-700 dark:text-gray-300">{selectedStyle.name}</div>
              </div>
              
              {/* Materials */}
              {selectedMaterials && (
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
                  <div className="font-semibold text-amber-900 dark:text-amber-300 mb-1">Vật liệu</div>
                  <div className="text-gray-700 dark:text-gray-300">{selectedMaterials.name}</div>
                </div>
              )}
              
              {/* Elements */}
              {selectedElements.length > 0 && (
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="font-semibold text-green-900 dark:text-green-300 mb-1">Chi tiết kiến trúc</div>
                  <div className="text-gray-700 dark:text-gray-300 text-xs">
                    {selectedElements.map(e => e.name).join(', ')}
                  </div>
                </div>
              )}
              
              {/* Dramatization */}
              {selectedDramatization.length > 0 && (
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="font-semibold text-purple-900 dark:text-purple-300 mb-1">Diễn họa</div>
                  <div className="text-gray-700 dark:text-gray-300 text-xs">
                    {selectedDramatization.map(d => d.name).join(', ')}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPanel;
