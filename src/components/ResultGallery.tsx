import React from 'react';
import JSZip from 'jszip';
import { RenovationResult, AppMode } from '../types';
import { DownloadIcon } from './icons';

interface ResultGalleryProps {
  results: RenovationResult[];
  selectedImage: RenovationResult | null;
  onSelectImage: (image: RenovationResult | null) => void;
  isLoading: boolean;
  appMode: AppMode;
  onImageSelectForEdit: (result: RenovationResult) => void;
  onImageZoom: (result: RenovationResult) => void;
}

const ResultGallery: React.FC<ResultGalleryProps> = ({ 
  results, 
  selectedImage, 
  onSelectImage, 
  isLoading, 
  appMode, 
  onImageSelectForEdit,
  onImageZoom
}) => {

  React.useEffect(() => {
      if (results.length > 0 && (!selectedImage || !results.find(r => r.id === selectedImage.id))) {
          onSelectImage(results[0]);
      }
      if (results.length === 0) {
        onSelectImage(null);
      }
  }, [results, selectedImage, onSelectImage]);

  const handleSaveAll = async () => {
    const zip = new JSZip();
    const promises = results.map(async (result, index) => {
      try {
        const response = await fetch(result.imageUrl);
        const blob = await response.blob();
        const filename = `AIConcept-${result.id.slice(0, 10)}-${index + 1}.png`;
        zip.file(filename, blob);
      } catch (e) {
        console.error("Failed to fetch image for zipping:", result.imageUrl, e);
      }
    });
  
    await Promise.all(promises);
  
    zip.generateAsync({ type: "blob" }).then(content => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = "AIConcept_Gallery.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    });
  };

  if (!selectedImage && appMode !== 'edit-select') {
    return null;
  }
  
  const handleThumbnailClick = (result: RenovationResult) => {
    if (appMode === 'edit-select') {
      onImageSelectForEdit(result);
    } else {
      onSelectImage(result);
    }
  };

  const isEditing = appMode === 'edit-select' || appMode === 'editing';

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {selectedImage && (
        <div 
          className="flex-grow min-h-0 p-2 bg-gray-100 dark:bg-gray-900 flex items-center justify-center relative cursor-zoom-in"
          onClick={() => onImageZoom(selectedImage)}
        >
          <img 
            src={selectedImage.imageUrl} 
            alt="Generated architecture" 
            className="max-h-full max-w-full object-contain rounded-lg shadow-md"
          />
          <div className="absolute top-2 right-2 flex space-x-2">
              <a href={selectedImage.imageUrl} download={`AIConcept-result-${selectedImage.id}.png`} className="p-2 bg-black bg-opacity-40 text-white rounded-full hover:bg-opacity-60 transition-colors" onClick={(e) => e.stopPropagation()}>
                  <DownloadIcon className="w-5 h-5" />
              </a>
          </div>
        </div>
      )}

      <div className="flex-shrink-0 p-2 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              {appMode === 'edit-select' ? 'Hoặc chọn từ thư viện' : 'Ảnh đã tạo:'}
            </h3>
            {results.length > 1 && (
                <button
                    onClick={handleSaveAll}
                    className="px-3 py-1 text-xs font-semibold bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                    Lưu tất cả (.zip)
                </button>
            )}
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {results.map(result => (
            <div
              key={result.id}
              onClick={() => handleThumbnailClick(result)}
              className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all aspect-w-16 aspect-h-9 h-16 flex-shrink-0
                ${selectedImage?.id === result.id && !isEditing ? 'border-indigo-500 ring-2 ring-indigo-500/50' : 'border-transparent hover:border-indigo-400'}
                ${appMode === 'edit-select' ? 'hover:scale-105 transform' : ''}`}
            >
              <img src={result.imageUrl} alt="Result thumbnail" className="w-full h-full object-cover" />
               {appMode === 'edit-select' && (
                 <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold opacity-0 hover:opacity-100 transition-opacity">
                   Sửa ảnh này
                 </div>
               )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultGallery;