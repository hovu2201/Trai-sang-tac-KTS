import React, { useState } from 'react';

import {
  AngleOption,
  RenovationResult,
} from '../../types';
import { IconImage } from '../icons';

interface Panel2DViewsProps {
    viewOptions: AngleOption[];
    onGenerate: (prompt: string) => void;
    isLoading: boolean;
    canGenerate: boolean;
    currentImage?: RenovationResult | null;
    galleryImages?: RenovationResult[];
    onImageSelect?: (image: RenovationResult | null) => void;
    onImageUpload?: (file: File) => void;
}

export const Panel2DViews: React.FC<Panel2DViewsProps> = ({
    viewOptions,
    onGenerate,
    isLoading,
    canGenerate,
    currentImage,
    galleryImages = [],
    onImageSelect,
    onImageUpload,
}) => {
    const [showGallery, setShowGallery] = useState(false);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/') && onImageUpload) {
            onImageUpload(file);
        }
    };

    return (
        <div className="space-y-4 flex flex-col h-full">
            <div className="flex-shrink-0">
                <h2 className='text-xl font-bold text-gray-800 dark:text-gray-100 border-b pb-3 border-gray-200 dark:border-gray-600'>Tạo Bản vẽ 2D</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Chọn ảnh 3D và loại bản vẽ kỹ thuật
                </p>
            </div>

            {/* Image Selection Section */}
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Ảnh 3D để tạo bản vẽ 2D
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
                                    onClick={() => onImageSelect?.(null)}
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
                            <p className="text-sm font-medium">Chưa có ảnh 3D</p>
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
                                        onImageSelect?.(image);
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

            {/* View Options */}
            <div className="flex-grow overflow-y-auto space-y-3">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Chọn loại bản vẽ 2D
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 bg-yellow-50 dark:bg-yellow-900/30 p-2 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    💡 Kết quả sẽ là bản vẽ kỹ thuật đường nét đen trắng
                </p>
                {viewOptions.map(option => (
                    <button
                        key={option.id}
                        onClick={() => onGenerate(option.prompt)}
                        disabled={isLoading || !canGenerate}
                        className="w-full p-3 text-left rounded-lg border-2 transition-all flex items-center bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <option.icon className="w-8 h-8 text-gray-600 dark:text-gray-300 mr-4 flex-shrink-0" />
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{option.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Tạo bản vẽ {option.name.toLowerCase()}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};