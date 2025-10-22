import React from 'react';
import { AngleOption } from '../../types';

interface Panel2DViewsProps {
    viewOptions: AngleOption[];
    onGenerate: (prompt: string) => void;
    isLoading: boolean;
    canGenerate: boolean;
}

export const Panel2DViews: React.FC<Panel2DViewsProps> = ({
    viewOptions,
    onGenerate,
    isLoading,
    canGenerate,
}) => {
    return (
        <div className="space-y-6 flex flex-col h-full">
            <h2 className='text-xl font-bold text-gray-800 dark:text-gray-100 border-b pb-3 border-gray-200 dark:border-gray-600 flex-shrink-0'>Tạo Bản vẽ 2D</h2>
            <div className="flex-grow overflow-y-auto pr-2 space-y-3">
                <p className="text-sm text-gray-500 dark:text-gray-400 bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    Sử dụng ảnh 3D **đã chọn** để tạo các bản vẽ kỹ thuật. Kết quả sẽ là bản vẽ đường nét đen trắng. Vui lòng chọn một ảnh từ thư viện trước.
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
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Tạo bản vẽ {option.name.toLowerCase()} từ ảnh đã chọn.</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};