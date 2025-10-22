import React from 'react';

import { RenovationResult } from '../types';

interface EditResultThumbnailsProps {
    results: RenovationResult[];
    selectedImage: RenovationResult | null;
    onSelectImage: (result: RenovationResult) => void;
}

export const EditResultThumbnails: React.FC<EditResultThumbnailsProps> = ({
    results,
    selectedImage,
    onSelectImage,
}) => {
    // Filter only edited images (those with sourceImageUrl and starting with res_edit_)
    const editedResults = results.filter(r => 
        r.id.startsWith('res_edit_') && r.sourceImageUrl
    );

    if (editedResults.length === 0) {
        return (
            <div className="w-full h-32 bg-gray-800/50 dark:bg-gray-900/50 rounded-xl border border-gray-700/50 flex items-center justify-center">
                <p className="text-gray-500 text-sm">Chưa có ảnh chỉnh sửa nào</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-300">
                    Ảnh đã chỉnh sửa ({editedResults.length})
                </h3>
            </div>
            <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1 bg-gray-800/30 dark:bg-gray-900/30 rounded-lg border border-gray-700/30">
                {editedResults.map((result) => {
                    const isSelected = selectedImage?.id === result.id;
                    return (
                        <button
                            key={result.id}
                            onClick={() => onSelectImage(result)}
                            className={`
                                relative aspect-square rounded-lg overflow-hidden
                                transition-all duration-200 group
                                ${isSelected 
                                    ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/50' 
                                    : 'hover:ring-2 hover:ring-blue-400/50 opacity-70 hover:opacity-100'
                                }
                            `}
                            title={result.prompt || 'Edited image'}
                        >
                            <img
                                src={result.imageUrl}
                                alt={result.prompt || 'Edited'}
                                className="w-full h-full object-cover"
                            />
                            {isSelected && (
                                <div className="absolute top-1 right-1 bg-blue-500 rounded-full p-1">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-xs text-white truncate">
                                    {result.prompt?.substring(0, 20) || 'Edited'}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
            <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Nhấp vào ảnh để chọn và tiếp tục chỉnh sửa</span>
            </div>
        </div>
    );
};
