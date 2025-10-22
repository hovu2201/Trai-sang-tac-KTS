import React, {
  useCallback,
  useRef,
  useState,
} from 'react';

interface ImageUploaderProps {
  id: string;
  label: string;
  previewUrl: string | null;
  onImageSelect: (file: File | null) => void;
  helpText: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ id, label, previewUrl, onImageSelect, helpText }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const processFile = useCallback((file: File | null) => {
    if (file && file.type.startsWith('image/')) {
        onImageSelect(file);
    } else if (file) {
        alert('Vui lòng chỉ tải lên tệp ảnh (PNG, JPG, WEBP).');
    } else {
        onImageSelect(null);
    }
  }, [onImageSelect]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    processFile(file);
  }, [processFile]);

  const handleRemoveImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    processFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [processFile]);

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0] || null;
    if (file) {
      processFile(file);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>
      
      {previewUrl ? (
        /* Preview Mode - Show image with actions */
        <div className="relative w-full">
          <div className="relative w-full h-48 sm:h-64 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={openFileDialog}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Đổi ảnh</span>
            </button>
            
            <button
              onClick={handleRemoveImage}
              className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        /* Upload Mode - Desktop: Drag & Drop, Mobile: Big Button */
        <>
          {/* Mobile: Big Upload Button */}
          <button
            onClick={openFileDialog}
            className="lg:hidden w-full flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all active:scale-98"
          >
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-base font-semibold text-gray-900 dark:text-gray-100">Chọn ảnh từ thư viện</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{helpText}</p>
            </div>
          </button>

          {/* Desktop: Drag & Drop Area */}
          <div 
            onClick={openFileDialog}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`hidden lg:flex group relative justify-center items-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 bg-gray-50 dark:bg-gray-700/50 ${
              isDraggingOver
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/40'
                : 'border-gray-300 dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-400'
            }`}
          >
            <div className="text-center text-gray-500 dark:text-gray-400 pointer-events-none">
              <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-2 text-sm">Nhấn hoặc kéo thả để tải lên</p>
              <p className="text-xs text-gray-400 mt-1">{helpText}</p>
            </div>
          </div>
        </>
      )}

      {/* Hidden File Input */}
      <input
        id={id}
        type="file"
        accept="image/png, image/jpeg, image/webp, image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="sr-only"
      />
    </div>
  );
};

export default ImageUploader;