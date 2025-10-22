import React from 'react';

import {
  MarkerShape,
  MarkerStyle,
  NumberingStyle,
} from '../../types';
import {
  IconBold,
  IconItalic,
} from '../icons';

interface MarkerOptionsPanelProps {
    numberingStyle: NumberingStyle;
    setNumberingStyle: (style: NumberingStyle) => void;
    markerStyle: MarkerStyle;
    setMarkerStyle: (style: MarkerStyle) => void;
    description?: string;
    onDescriptionChange?: (desc: string) => void;
    inputRef?: React.RefObject<HTMLTextAreaElement>;
}

const FONT_GROUPS = [
    {
        name: 'Sans-serif (Hiện đại)',
        fonts: ['Be Vietnam Pro', 'Montserrat', 'Roboto', 'Open Sans', 'Lato', 'Inter', 'Jost', 'Arial', 'Verdana', 'Segoe UI']
    },
    {
        name: 'Serif (Trang trọng)',
        fonts: ['Playfair Display', 'Merriweather', 'Libre Baskerville', 'Cormorant Garamond', 'Times New Roman', 'Georgia', 'Palatino']
    },
    {
        name: 'Display & Kỹ thuật',
        fonts: ['Oswald', 'Anton', 'Bebas Neue', 'Barlow Condensed', 'Archivo Black', 'Teko']
    },
    {
        name: 'Monospace (Đơn cách)',
        fonts: ['Roboto Mono', 'Source Code Pro', 'Courier New']
    }
];

const MarkerOptionsPanel: React.FC<MarkerOptionsPanelProps> = ({
    numberingStyle,
    setNumberingStyle,
    markerStyle,
    setMarkerStyle,
    description,
    onDescriptionChange,
    inputRef
}) => {
    
    const handleStyleChange = (prop: keyof MarkerStyle, value: any) => {
        setMarkerStyle({ ...markerStyle, [prop]: value });
    };
    
    const toggleStyle = (prop: 'fontWeight' | 'fontStyle', activeValue: string, normalValue: string) => {
        const currentValue = markerStyle[prop];
        handleStyleChange(prop, currentValue === activeValue ? normalValue : activeValue);
    };

    const numberingOptions: { id: NumberingStyle, label: string }[] = [
        { id: '123', label: '1, 2, 3...' },
        { id: 'ABC', label: 'A, B, C...' },
        { id: 'roman', label: 'I, II, III...' },
    ];
    
    const shapeOptions: { id: MarkerShape, label: string }[] = [
        { id: 'circle', label: 'Tròn' },
        { id: 'square', label: 'Vuông' },
    ];
    
    const isEditing = description !== undefined;

    return (
        <div className="space-y-6 text-sm">
            <h3 className="text-lg font-bold text-white">
                {isEditing ? 'Sửa Ghi chú' : 'Tùy chọn Ghi chú mới'}
            </h3>
            
            {!isEditing && (
                <div>
                    <label className="font-semibold text-gray-300 block mb-2">Kiểu đánh số</label>
                    <div className="flex bg-gray-700 rounded-lg p-1">
                        {numberingOptions.map(opt => (
                            <button
                                key={opt.id}
                                onClick={() => setNumberingStyle(opt.id)}
                                className={`w-full py-1.5 text-xs rounded-md transition-colors ${numberingStyle === opt.id ? 'bg-indigo-600 text-white shadow' : 'text-gray-300 hover:bg-gray-600'}`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            
            {isEditing && onDescriptionChange && (
                <div>
                    <label htmlFor="marker-description" className="font-semibold text-gray-300 block mb-2">Mô tả</label>
                    <textarea
                        id="marker-description"
                        ref={inputRef}
                        rows={4}
                        value={description}
                        onChange={(e) => onDescriptionChange(e.target.value)}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        placeholder="Nhập mô tả cho ghi chú..."
                    />
                </div>
            )}

            <div>
                <label className="font-semibold text-gray-300 block mb-2">Hình dạng</label>
                <div className="flex bg-gray-700 rounded-lg p-1">
                     {shapeOptions.map(opt => (
                        <button
                            key={opt.id}
                            onClick={() => handleStyleChange('shape', opt.id)}
                            className={`w-full py-1.5 text-xs rounded-md transition-colors ${markerStyle.shape === opt.id ? 'bg-indigo-600 text-white shadow' : 'text-gray-300 hover:bg-gray-600'}`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="font-family" className="font-semibold text-gray-300 block mb-2">Font chữ</label>
                <select 
                    id="font-family"
                    value={markerStyle.fontFamily}
                    onChange={e => handleStyleChange('fontFamily', e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                >
                    {FONT_GROUPS.map(group => (
                        <optgroup label={group.name} key={group.name}>
                            {group.fonts.map(font => <option key={font} value={font} style={{fontFamily: font}}>{font}</option>)}
                        </optgroup>
                    ))}
                </select>
            </div>
            
            <div>
                 <label htmlFor="font-size" className="font-semibold text-gray-300 block mb-1">Cỡ chữ ({markerStyle.fontSize.toFixed(1)}vh)</label>
                 <input 
                    id="font-size"
                    type="range" min="1.5" max="8" step="0.1" 
                    value={markerStyle.fontSize} 
                    onChange={e => handleStyleChange('fontSize', parseFloat(e.target.value))} 
                    className="w-full" />
            </div>

             <div className="flex items-center justify-between">
                <label className="font-semibold text-gray-300">Kiểu chữ</label>
                <div className="flex bg-gray-700 rounded-lg p-1">
                    <button 
                        onClick={() => toggleStyle('fontWeight', 'bold', 'normal')}
                        className={`p-2 rounded-md ${markerStyle.fontWeight === 'bold' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-600'}`}
                    ><IconBold className="w-4 h-4" /></button>
                     <button 
                        onClick={() => toggleStyle('fontStyle', 'italic', 'normal')}
                        className={`p-2 rounded-md ${markerStyle.fontStyle === 'italic' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-600'}`}
                    ><IconItalic className="w-4 h-4" /></button>
                </div>
            </div>

            <div className="space-y-3">
                 <div className="flex items-center justify-between">
                    <label htmlFor="bg-color" className="font-semibold text-gray-300">Màu nền</label>
                    <input id="bg-color" type="color" value={markerStyle.backgroundColor} onChange={(e) => handleStyleChange('backgroundColor', e.target.value)} className="w-8 h-8 p-0 border-none rounded-md bg-gray-700 cursor-pointer" />
                </div>
                <div className="flex items-center justify-between">
                    <label htmlFor="border-color" className="font-semibold text-gray-300">Màu viền</label>
                    <input id="border-color" type="color" value={markerStyle.borderColor} onChange={(e) => handleStyleChange('borderColor', e.target.value)} className="w-8 h-8 p-0 border-none rounded-md bg-gray-700 cursor-pointer" />
                </div>
                 <div className="flex items-center justify-between">
                    <label htmlFor="text-color" className="font-semibold text-gray-300">Màu chữ</label>
                    <input id="text-color" type="color" value={markerStyle.textColor} onChange={(e) => handleStyleChange('textColor', e.target.value)} className="w-8 h-8 p-0 border-none rounded-md bg-gray-700 cursor-pointer" />
                </div>
            </div>

             <div className="space-y-3">
                <div>
                    <label htmlFor="opacity" className="font-semibold text-gray-300 block mb-1">Độ mờ nền ({Math.round(markerStyle.backgroundOpacity * 100)}%)</label>
                    <input id="opacity" type="range" min="0" max="1" step="0.1" value={markerStyle.backgroundOpacity} onChange={(e) => handleStyleChange('backgroundOpacity', parseFloat(e.target.value))} className="w-full" />
                </div>
                <div>
                    <label htmlFor="border-width" className="font-semibold text-gray-300 block mb-1">Độ dày viền ({markerStyle.borderWidth}px)</label>
                    <input id="border-width" type="range" min="0" max="5" step="1" value={markerStyle.borderWidth} onChange={(e) => handleStyleChange('borderWidth', parseInt(e.target.value, 10))} className="w-full" />
                </div>
            </div>
        </div>
    );
};

export default MarkerOptionsPanel;