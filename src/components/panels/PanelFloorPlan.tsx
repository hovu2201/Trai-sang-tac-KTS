
import React from 'react';
import ImageUploader from '../ImageUploader';
import { ImageFile, ConversionOption } from '../../types';

interface PanelFloorPlanProps {
    floorPlanImage: ImageFile | null;
    onFileSelect: (file: File | null, type: 'floorPlan') => void;
    conversionOptions: ConversionOption[];
    selectedConversionType: string;
    onConversionTypeChange: (type: string) => void;
    roomTypes: string[];
    selectedRoomType: string;
    onRoomTypeChange: (type: string) => void;
}

export const PanelFloorPlan: React.FC<PanelFloorPlanProps> = ({
    floorPlanImage,
    onFileSelect,
    conversionOptions,
    selectedConversionType,
    onConversionTypeChange,
    roomTypes,
    selectedRoomType,
    onRoomTypeChange,
}) => {
    const showRoomTypeSelector = selectedConversionType === 'furniture_layout';

    return (
        <div className="space-y-6">
            <h2 className='text-xl font-bold text-gray-100 border-b pb-3 border-gray-600'>Chuyển đổi Mặt bằng</h2>
            
            <ImageUploader 
                id="floorplan-image" 
                label="Tải lên bản phác thảo hoặc mặt bằng" 
                previewUrl={floorPlanImage?.url || null} 
                onImageSelect={(f) => onFileSelect(f, 'floorPlan')} 
                helpText="Bản vẽ tay, ảnh chụp, file CAD..." 
            />

            {floorPlanImage && (
                <div className="space-y-4 border-t border-gray-700 pt-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Chọn loại chuyển đổi</label>
                        <div className="grid grid-cols-2 gap-2">
                            {conversionOptions.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => onConversionTypeChange(option.id)}
                                    className={`p-3 rounded-lg border-2 text-center transition-all flex flex-col items-center justify-center h-28 ${selectedConversionType === option.id ? 'border-indigo-400 bg-indigo-900/40' : 'border-gray-600 hover:border-gray-500 bg-gray-700/50'}`}
                                >
                                    <option.icon className="w-8 h-8 mb-2 text-gray-300" />
                                    <p className="font-semibold text-gray-200 text-xs">{option.name}</p>
                                </button>
                            ))}
                        </div>
                         <p className="text-xs text-gray-400 mt-2 text-center">
                            {conversionOptions.find(o => o.id === selectedConversionType)?.description}
                        </p>
                    </div>

                    {showRoomTypeSelector && (
                        <div>
                             <label htmlFor="room-type-select" className="block text-sm font-medium text-gray-300 mb-2">
                                Chọn loại phòng
                            </label>
                            <select
                                id="room-type-select"
                                value={selectedRoomType}
                                onChange={(e) => onRoomTypeChange(e.target.value)}
                                className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-200"
                            >
                                {roomTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};