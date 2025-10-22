import React from 'react';

import {
  ArchitecturalElement,
  ArchitecturalStyle,
  DramatizationOption,
  MaterialCombination,
} from '../types';

interface MobileSelectionSummaryProps {
  selectedStyle: ArchitecturalStyle;
  selectedMaterials: MaterialCombination | null;
  selectedElements: ArchitecturalElement[];
  selectedDramatization: DramatizationOption[];
  baseImageUrl: string | null;
  referenceImageUrl: string | null;
  mainPrompt: string;
}

export const MobileSelectionSummary: React.FC<MobileSelectionSummaryProps> = ({
  selectedStyle,
  selectedMaterials,
  selectedElements,
  selectedDramatization,
  baseImageUrl,
  referenceImageUrl,
  mainPrompt,
}) => {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        Tùy chọn thiết kế hiện tại
      </h2>

      {/* Images */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Ảnh đầu vào</p>
          {baseImageUrl ? (
            <img src={baseImageUrl} alt="Base" className="w-full h-32 object-cover rounded-lg border-2 border-blue-500" />
          ) : (
            <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
              Chưa có ảnh
            </div>
          )}
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Ảnh tham khảo</p>
          {referenceImageUrl ? (
            <img src={referenceImageUrl} alt="Reference" className="w-full h-32 object-cover rounded-lg border-2 border-purple-500" />
          ) : (
            <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 text-xs text-center p-2">
              Không có
            </div>
          )}
        </div>
      </div>

      {/* Prompt */}
      {mainPrompt && (
        <div>
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Mô tả</p>
          <p className="text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">{mainPrompt}</p>
        </div>
      )}

      {/* Style */}
      <div>
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Phong cách</p>
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium">
          {selectedStyle.name}
        </div>
      </div>

      {/* Materials */}
      {selectedMaterials && (
        <div>
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Vật liệu</p>
          <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg font-medium">
            {selectedMaterials.name}
          </div>
          {selectedMaterials.materials && selectedMaterials.materials.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {selectedMaterials.materials.map((mat, idx) => (
                <span key={idx} className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                  {mat}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Elements */}
      {selectedElements && selectedElements.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            Yếu tố kiến trúc ({selectedElements.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedElements.map((elem) => (
              <span key={elem.id} className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">
                {elem.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Dramatization */}
      {selectedDramatization && selectedDramatization.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            Diễn họa ({selectedDramatization.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedDramatization.map((drama) => (
              <span key={drama.id} className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full">
                {drama.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Hint */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3">
        <p className="text-xs text-yellow-800 dark:text-yellow-200">
          💡 Nhấn nút "Phác thảo" để tạo ảnh từ các tùy chọn trên
        </p>
      </div>
    </div>
  );
};
