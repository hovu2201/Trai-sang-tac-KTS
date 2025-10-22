import React from 'react';
import { IconEyedropper } from '../icons';

interface CropOptionsPanelProps {
    aspectRatio: number | null;
    setAspectRatio: (ratio: number | null) => void;
    fillColor: string;
    setFillColor: (color: string) => void;
    onApply: () => void;
    onCancel: () => void;
    onPickColor: () => void;
}

const ASPECT_RATIOS = [
    { name: 'Tùy chọn', ratio: null },
    { name: 'A4 Dọc', ratio: 1 / Math.sqrt(2) },
    { name: 'A4 Ngang', ratio: Math.sqrt(2) },
    { name: 'A3 Dọc', ratio: 1 / Math.sqrt(2) },
    { name: 'A3 Ngang', ratio: Math.sqrt(2) },
    { name: 'A2 Dọc', ratio: 1 / Math.sqrt(2) },
    { name: 'A2 Ngang', ratio: Math.sqrt(2) },
];

const CropOptionsPanel: React.FC<CropOptionsPanelProps> = ({
    aspectRatio,
    setAspectRatio,
    fillColor,
    setFillColor,
    onApply,
    onCancel,
    onPickColor,
}) => {
    return (
        <div className="space-y-6 text-sm text-gray-300">
            <h3 className="text-lg font-bold text-white">Tùy chọn Cắt ảnh</h3>
            
            <p>Vẽ một hình chữ nhật trên ảnh để chọn vùng cắt. Bạn có thể vẽ ra ngoài ảnh để mở rộng.</p>
            
            <div>
                <label className="font-semibold block mb-2">Tỉ lệ</label>
                <div className="grid grid-cols-2 gap-2">
                    {ASPECT_RATIOS.map(ar => (
                        <button
                            key={ar.name}
                            onClick={() => setAspectRatio(ar.ratio)}
                            className={`py-2 px-2 text-xs rounded-md transition-colors ${aspectRatio === ar.ratio ? 'bg-indigo-600 text-white shadow' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                        >
                            {ar.name}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="font-semibold block mb-2">Màu nền phần mở rộng</label>
                <div className="flex items-center gap-2">
                    <button onClick={onPickColor} className="p-2 bg-gray-700 rounded-md hover:bg-gray-600" title="Chấm màu từ ảnh">
                        <IconEyedropper className="w-5 h-5" />
                    </button>
                    <input 
                        type="color" 
                        value={fillColor}
                        onChange={e => setFillColor(e.target.value)}
                        className="w-10 h-10 p-0 border-none rounded-md bg-gray-700 cursor-pointer"
                    />
                    <input 
                        type="text"
                        value={fillColor}
                        onChange={e => setFillColor(e.target.value)}
                        className="flex-grow p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    />
                </div>
            </div>

            <div className="flex flex-col space-y-2">
                <button onClick={onApply} className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
                    Áp dụng
                </button>
                <button onClick={onCancel} className="w-full py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500">
                    Hủy bỏ
                </button>
            </div>
        </div>
    );
};

export default CropOptionsPanel;