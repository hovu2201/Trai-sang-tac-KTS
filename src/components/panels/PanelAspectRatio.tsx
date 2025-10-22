import React from 'react';
import { AspectRatioOption, ImageFile } from '../../types';

interface PanelAspectRatioProps {
    aspectRatioOptions: AspectRatioOption[];
    selectedAspectRatio: AspectRatioOption;
    onAspectRatioSelect: (option: AspectRatioOption) => void;
    baseImage: ImageFile | null;
}

const AspectRatioVisual: React.FC<{width: number, height: number}> = ({ width, height }) => {
    if (width === 0 || height === 0) {
         return (
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-sm flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
        );
    }
    const aspectRatio = width / height;
    const boxWidth = aspectRatio > 1 ? '100%' : `${aspectRatio * 100}%`;
    const boxHeight = aspectRatio < 1 ? '100%' : `${(1/aspectRatio) * 100}%`;

    return (
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-sm flex items-center justify-center mr-3">
            <div style={{ width: boxWidth, height: boxHeight }} className="bg-gray-400 dark:bg-gray-500 rounded-xs"></div>
        </div>
    );
};

export const PanelAspectRatio: React.FC<PanelAspectRatioProps> = ({ 
    aspectRatioOptions, 
    selectedAspectRatio, 
    onAspectRatioSelect,
    baseImage,
}) => {
    
    return (
        <div className="space-y-6">
            <h2 className='text-xl font-bold text-gray-800 dark:text-gray-100 border-b pb-3 border-gray-200 dark:border-gray-600'>Tỉ lệ ảnh đầu ra</h2>
            
            <p className="text-sm text-gray-500 dark:text-gray-400">
                Chọn tỉ lệ và kích thước cho hình ảnh kết quả. Điều này không phụ thuộc vào kích thước ảnh đầu vào.
            </p>

            <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-2">
                {aspectRatioOptions.map(option => {
                    const isFromInput = option.id === 'from_input';
                    const displayWidth = isFromInput ? baseImage?.width ?? 0 : option.width;
                    const displayHeight = isFromInput ? baseImage?.height ?? 0 : option.height;
                    const displayText = isFromInput 
                        ? (baseImage ? `${displayWidth} x ${displayHeight}px` : 'Vui lòng chọn ảnh đầu vào')
                        : `${option.width} x ${option.height}px`;
                    
                    return (
                        <button 
                            key={option.id} 
                            onClick={() => onAspectRatioSelect(option)}
                            disabled={isFromInput && !baseImage}
                            className={`w-full p-3 text-left rounded-lg border-2 transition-all flex items-center ${selectedAspectRatio.id === option.id ? 'bg-indigo-50 dark:bg-indigo-900/40 border-indigo-500' : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'} disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                             <AspectRatioVisual width={displayWidth} height={displayHeight} />
                             <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{option.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{displayText}</p>
                             </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
