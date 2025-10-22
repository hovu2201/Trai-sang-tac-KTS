import React from 'react';
import ImageUploader from '../ImageUploader';
import { REFERENCE_STRENGTH_LEVELS, INPUT_FIDELITY_LEVELS } from '../../constants';
import { ReferenceStrengthLevel, InputFidelityLevel } from '../../types';

interface PanelImagesProps {
    baseImageUrl: string | null;
    referenceImageUrl: string | null;
    onImageSelect: (file: File | null, type: 'base' | 'reference') => void;
    referenceStrength?: ReferenceStrengthLevel;
    onReferenceStrengthChange?: (level: ReferenceStrengthLevel) => void;
    inputFidelity: InputFidelityLevel;
    onInputFidelityChange: (level: InputFidelityLevel) => void;
    mainPrompt: string;
    onMainPromptChange: (value: string) => void;
    isReferenceDisabled?: boolean;
}

export const PanelImages: React.FC<PanelImagesProps> = ({ 
    baseImageUrl, 
    referenceImageUrl, 
    onImageSelect,
    referenceStrength,
    onReferenceStrengthChange,
    inputFidelity,
    onInputFidelityChange,
    mainPrompt,
    onMainPromptChange,
    isReferenceDisabled,
}) => {
    return (
        <div className="space-y-6">
            <h2 className='text-xl font-bold text-gray-800 dark:text-gray-100 border-b pb-3 border-gray-200 dark:border-gray-600'>Hình ảnh đầu vào</h2>
            <ImageUploader 
                id="base-image" 
                label="Hình ảnh đầu vào (bắt buộc)" 
                previewUrl={baseImageUrl} 
                onImageSelect={(f) => onImageSelect(f, 'base')} 
                helpText="Ảnh chụp, sketch, 3D, bản vẽ..." 
            />
            {baseImageUrl && (
              <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div>
                      <label htmlFor="main-prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Mô tả công trình / không gian (tùy chọn)
                      </label>
                      <textarea
                          id="main-prompt"
                          rows={2}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700"
                          placeholder="Ví dụ: một biệt thự hiện đại..."
                          value={mainPrompt}
                          onChange={(e) => onMainPromptChange(e.target.value)}
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mức độ bám theo hình ảnh đầu vào</label>
                      <div className="bg-gray-100 dark:bg-gray-700/50 p-2 rounded-lg">
                          <input
                              type="range"
                              min="1"
                              max={INPUT_FIDELITY_LEVELS.length}
                              value={inputFidelity.id}
                              onChange={(e) => {
                                  const level = INPUT_FIDELITY_LEVELS[parseInt(e.target.value) - 1];
                                  onInputFidelityChange(level);
                              }}
                              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="text-center text-sm font-semibold text-gray-800 dark:text-gray-200 mt-2">
                              {`Mức ${inputFidelity.id}: ${inputFidelity.name}`}
                          </div>
                      </div>
                  </div>
              </div>
            )}
            {!isReferenceDisabled && (
              <>
                <ImageUploader 
                    id="reference-image" 
                    label="Hình ảnh tham khảo phong cách (tùy chọn)" 
                    previewUrl={referenceImageUrl} 
                    onImageSelect={(f) => onImageSelect(f, 'reference')} 
                    helpText="AI sẽ học hỏi phong cách từ đây" 
                />
                
                {referenceImageUrl && referenceStrength && onReferenceStrengthChange && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mức độ ảnh hưởng của ảnh tham khảo</label>
                        <div className="bg-gray-100 dark:bg-gray-700/50 p-2 rounded-lg">
                            <input
                                type="range"
                                min="1"
                                max={REFERENCE_STRENGTH_LEVELS.length}
                                value={referenceStrength.id}
                                onChange={(e) => {
                                    const level = REFERENCE_STRENGTH_LEVELS[parseInt(e.target.value) - 1];
                                    onReferenceStrengthChange(level);
                                }}
                                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="text-center text-sm font-semibold text-gray-800 dark:text-gray-200 mt-2">
                                {`Mức ${referenceStrength.id}: ${referenceStrength.name}`}
                            </div>
                        </div>
                    </div>
                )}
              </>
            )}
        </div>
    );
};