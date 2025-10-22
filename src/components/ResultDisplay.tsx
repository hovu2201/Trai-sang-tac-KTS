import React from 'react';

import {
  AppMode,
  ArchitecturalElement,
  ArchitecturalStyle,
  DramatizationOption,
  MaterialCombination,
  RenovationResult,
} from '../types';
import ErrorAlert from './ErrorAlert';
import ImageUploader from './ImageUploader';
import { MobileSelectionSummary } from './MobileSelectionSummary';
import ResultGallery from './ResultGallery';

interface ResultDisplayProps {
  isLoading: boolean;
  error: string | null;
  results: RenovationResult[];
  appMode: AppMode;
  onImageSelectForEdit: (result: RenovationResult) => void;
  selectedImage: RenovationResult | null;
  onSelectImage: (image: RenovationResult | null) => void;
  onImageZoom: (result: RenovationResult) => void;
  onImageUploadForEdit?: (file: File) => void;
  // Mobile selection summary props
  selectedStyle?: ArchitecturalStyle;
  selectedMaterials?: MaterialCombination | null;
  selectedElements?: ArchitecturalElement[];
  selectedDramatization?: DramatizationOption[];
  baseImageUrl?: string | null;
  referenceImageUrl?: string | null;
  mainPrompt?: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  isLoading,
  error,
  results,
  appMode,
  onImageSelectForEdit,
  selectedImage,
  onSelectImage,
  onImageZoom,
  onImageUploadForEdit,
  selectedStyle,
  selectedMaterials,
  selectedElements = [],
  selectedDramatization = [],
  baseImageUrl,
  referenceImageUrl,
  mainPrompt = '',
}) => {
  if (isLoading && results.length === 0) {
    return null; // The LoadingModal will be shown at the App level
  }

  if (error && results.length === 0) {
    return <div className="w-full h-full flex items-center justify-center p-4"><ErrorAlert message={error} /></div>;
  }
  
  if (appMode === 'edit-select') {
    return (
      <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className='p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto'>
          <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Bắt đầu chỉnh sửa</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Tải lên một hình ảnh mới hoặc chọn một thiết kế đã tạo trước đó.</p>
          </div>
          
          <div className="max-w-md mx-auto w-full">
            <ImageUploader
              id="edit-uploader"
              label="Tải ảnh mới để chỉnh sửa"
              previewUrl={null}
              onImageSelect={(file) => { if (file && onImageUploadForEdit) onImageUploadForEdit(file); }}
              helpText="Tải lên bất kỳ ảnh nào bạn muốn sửa"
            />
          </div>

          {results.length > 0 && (
            <>
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400 font-semibold">HOẶC</span>
                <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
              </div>
               <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 text-center">Chọn từ thư viện</h3>
            </>
          )}
        </div>
        
        {results.length > 0 &&
          <div className='flex-grow min-h-0'>
              <ResultGallery 
                results={results}
                isLoading={isLoading}
                appMode={appMode}
                onImageSelectForEdit={onImageSelectForEdit}
                selectedImage={selectedImage}
                onSelectImage={onSelectImage}
                onImageZoom={onImageZoom}
              />
          </div>
        }
      </div>
    );
  }

  if (results.length === 0) {
      return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-none lg:rounded-2xl shadow-none lg:shadow-lg border-0 lg:border lg:border-gray-200 dark:lg:border-gray-700 overflow-auto">
            {/* Desktop: Empty state */}
            <div className="hidden lg:flex flex-col items-center justify-center h-full p-8 text-center">
                <svg className="w-24 h-24 text-gray-300 dark:text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">Chào mừng đến với AIConcept</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md">Sử dụng các công cụ bên trái để mô tả không gian mơ ước của bạn, sau đó nhấn "Kiến tạo" để bắt đầu.</p>
            </div>
            
            {/* Mobile: Show selection summary */}
            <div className="lg:hidden">
              {selectedStyle ? (
                <MobileSelectionSummary
                  selectedStyle={selectedStyle}
                  selectedMaterials={selectedMaterials || null}
                  selectedElements={selectedElements}
                  selectedDramatization={selectedDramatization}
                  baseImageUrl={baseImageUrl || null}
                  referenceImageUrl={referenceImageUrl || null}
                  mainPrompt={mainPrompt}
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center min-h-[60vh]">
                  <svg className="w-20 h-20 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">Bắt đầu thiết kế</h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm px-4">
                    Nhấn "Thiết kế" bên dưới để chọn phong cách, vật liệu và các yếu tố thiết kế
                  </p>
                </div>
              )}
            </div>
        </div>
      );
  }

  return <ResultGallery 
    results={results}
    isLoading={isLoading}
    appMode={appMode}
    onImageSelectForEdit={onImageSelectForEdit}
    selectedImage={selectedImage}
    onSelectImage={onSelectImage}
    onImageZoom={onImageZoom}
  />;
};

export default ResultDisplay;