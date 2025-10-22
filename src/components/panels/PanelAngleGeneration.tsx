import React, { useState } from 'react';

import { EXTERIOR_ANGLE_PROMPTS } from '../../constants/angles';
import { RenovationResult } from '../../types';
import { IconImage } from '../icons';

interface PanelAngleGenerationProps {
  currentImage: RenovationResult | null;
  galleryImages: RenovationResult[];
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
  canGenerate: boolean;
  onImageSelect: (image: RenovationResult | null) => void;
  onImageUpload: (file: File) => void;
}

export const PanelAngleGeneration: React.FC<PanelAngleGenerationProps> = ({
  currentImage,
  galleryImages,
  onGenerate,
  isLoading,
  canGenerate,
  onImageSelect,
  onImageUpload,
}) => {
  const [selectedAnglePrompt, setSelectedAnglePrompt] = useState<string | null>(null);
  const [showGallery, setShowGallery] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  const handleGenerate = () => {
    if (!selectedAnglePrompt || !currentImage) return;
    onGenerate(selectedAnglePrompt);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
          Tạo góc nhìn khác
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Chọn ảnh và góc nhìn muốn tạo
        </p>
      </div>

      {/* Image Selection Section */}
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Ảnh gốc để tạo góc nhìn khác
        </label>
        
        {currentImage ? (
          <div className="space-y-3">
            {/* Current Image Preview */}
            <div className="relative group">
              <img 
                src={currentImage.imageUrl} 
                alt="Selected" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <button
                  onClick={() => onImageSelect(null)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Xóa ảnh
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowGallery(!showGallery)}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                📚 Chọn từ thư viện
              </button>
              <label className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium text-center cursor-pointer">
                📤 Tải ảnh khác
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-col items-center justify-center py-8 text-gray-400">
              <IconImage className="w-16 h-16 mb-3" />
              <p className="text-sm font-medium">Chưa có ảnh</p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowGallery(!showGallery)}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                📚 Chọn từ thư viện
              </button>
              <label className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium text-center cursor-pointer">
                📤 Tải ảnh lên
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        )}

        {/* Gallery Selection */}
        {showGallery && galleryImages.length > 0 && (
          <div className="mt-4 border-t border-gray-300 dark:border-gray-600 pt-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Chọn ảnh từ thư viện:
            </p>
            <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto">
              {galleryImages.map((image) => (
                <button
                  key={image.id}
                  onClick={() => {
                    onImageSelect(image);
                    setShowGallery(false);
                  }}
                  className={`relative group border-2 rounded-lg overflow-hidden transition-all ${
                    currentImage?.id === image.id
                      ? 'border-blue-500 ring-2 ring-blue-500'
                      : 'border-transparent hover:border-blue-300'
                  }`}
                >
                  <img
                    src={image.imageUrl}
                    alt="Gallery"
                    className="w-full h-24 object-cover"
                  />
                  {currentImage?.id === image.id && (
                    <div className="absolute inset-0 bg-blue-500/30 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Angle Options */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Chọn góc nhìn muốn tạo
        </label>
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {EXTERIOR_ANGLE_PROMPTS.map((anglePrompt, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnglePrompt(anglePrompt)}
              disabled={!currentImage}
              className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                selectedAnglePrompt === anglePrompt
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 text-gray-700 dark:text-gray-300'
              } ${!currentImage ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span className="text-sm font-medium">{anglePrompt}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isLoading || !canGenerate || !currentImage || !selectedAnglePrompt}
        className={`w-full py-4 rounded-lg font-bold text-base transition-all ${
          isLoading || !canGenerate || !currentImage || !selectedAnglePrompt
            ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl active:scale-95'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Đang tạo...
          </span>
        ) : (
          <span>
            {!currentImage 
              ? '⚠️ Vui lòng chọn ảnh' 
              : !selectedAnglePrompt 
                ? '⚠️ Vui lòng chọn góc nhìn'
                : '✨ Tạo góc nhìn mới'}
          </span>
        )}
      </button>

      {selectedAnglePrompt && currentImage && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
          <p className="text-xs text-blue-700 dark:text-blue-300">
            <strong>Sẽ tạo:</strong> {selectedAnglePrompt}
          </p>
        </div>
      )}
    </div>
  );
};
