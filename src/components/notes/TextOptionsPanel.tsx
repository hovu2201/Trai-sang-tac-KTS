import React from 'react';
import { TextStyle } from '../../types';
import { IconBold, IconItalic, IconAlignLeft, IconAlignCenter, IconAlignRight, IconAlignJustify, IconStyle } from '../icons';

interface TextOptionsPanelProps {
    textStyle: TextStyle;
    setTextStyle: (style: TextStyle) => void;
    content?: string;
    onContentChange?: (content: string) => void;
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

const TextOptionsPanel: React.FC<TextOptionsPanelProps> = ({ 
    textStyle, 
    setTextStyle,
    content,
    onContentChange,
    inputRef
}) => {
    
    const handleStyleChange = (prop: keyof TextStyle, value: any) => {
        setTextStyle({ ...textStyle, [prop]: value });
    };

    const toggleStyle = (prop: 'fontWeight' | 'fontStyle', activeValue: string, normalValue: string) => {
        const currentValue = textStyle[prop];
        handleStyleChange(prop, currentValue === activeValue ? normalValue : activeValue);
    };
    
    const stylePresets: { name: string, style: Partial<TextStyle> }[] = [
        { name: 'Hiện đại', style: { fontFamily: 'Be Vietnam Pro', color: '#FFFFFF', backgroundColor: '#000000', backgroundOpacity: 0.7, borderWidth: 0, borderRadius: 8, padding: 8 } },
        { name: 'Kỹ thuật', style: { fontFamily: 'Roboto Mono', color: '#000000', backgroundColor: '#FFFFFF', backgroundOpacity: 0.9, borderWidth: 1, borderColor: '#000000', borderRadius: 0, padding: 8 } },
        { name: 'Cổ điển', style: { fontFamily: 'Playfair Display', color: '#333333', backgroundColor: '#F5F5DC', backgroundOpacity: 0.9, borderWidth: 0, borderRadius: 4, padding: 8 } },
        { name: 'Khối chữ', style: { fontFamily: 'Oswald', color: '#FFFFFF', backgroundColor: '#2d3748', backgroundOpacity: 1, borderWidth: 1, borderColor: '#4a5568', borderRadius: 6, padding: 12 } },
    ];

    const isEditing = content !== undefined;

    return (
        <div className="space-y-6 text-sm text-gray-300">
            <h3 className="text-lg font-bold text-white">
                {isEditing ? 'Sửa Văn bản' : 'Tùy chọn Văn bản mới'}
            </h3>
            
            {isEditing && onContentChange && (
                <div>
                    <label htmlFor="text-content" className="font-semibold block mb-2">Nội dung</label>
                    <textarea
                        id="text-content"
                        ref={inputRef}
                        rows={5}
                        value={content}
                        onChange={(e) => onContentChange(e.target.value)}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        placeholder="Nhập nội dung văn bản..."
                    />
                </div>
            )}
            
            <div>
                 <label className="font-semibold block mb-2">Kiểu dáng</label>
                 <div className="grid grid-cols-2 gap-2">
                    {stylePresets.map(preset => (
                        <button key={preset.name} onClick={() => setTextStyle({...textStyle, ...preset.style})} className="py-2 px-2 text-xs rounded-md transition-colors bg-gray-700 text-gray-300 hover:bg-gray-600 flex items-center justify-center gap-2">
                           <IconStyle className="w-4 h-4" /> {preset.name}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="font-family" className="font-semibold block mb-2">Font chữ</label>
                <select 
                    id="font-family"
                    value={textStyle.fontFamily}
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
                 <label htmlFor="font-size" className="font-semibold block mb-1">Cỡ chữ ({textStyle.fontSize.toFixed(1)}vh)</label>
                 <input 
                    id="font-size"
                    type="range" min="1" max="10" step="0.1" 
                    value={textStyle.fontSize} 
                    onChange={e => handleStyleChange('fontSize', parseFloat(e.target.value))} 
                    className="w-full" />
            </div>

             <div className="flex items-center justify-between">
                <label className="font-semibold">Kiểu chữ</label>
                <div className="flex bg-gray-700 rounded-lg p-1">
                    <button 
                        onClick={() => toggleStyle('fontWeight', 'bold', 'normal')}
                        className={`p-2 rounded-md ${textStyle.fontWeight === 'bold' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-600'}`}
                    ><IconBold className="w-4 h-4" /></button>
                     <button 
                        onClick={() => toggleStyle('fontStyle', 'italic', 'normal')}
                        className={`p-2 rounded-md ${textStyle.fontStyle === 'italic' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-600'}`}
                    ><IconItalic className="w-4 h-4" /></button>
                </div>
            </div>
            
            <div className="flex items-center justify-between">
                <label className="font-semibold">Căn lề</label>
                <div className="flex bg-gray-700 rounded-lg p-1">
                    <button onClick={() => handleStyleChange('textAlign', 'left')} className={`p-2 rounded-md ${textStyle.textAlign === 'left' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-600'}`}><IconAlignLeft className="w-4 h-4" /></button>
                    <button onClick={() => handleStyleChange('textAlign', 'center')} className={`p-2 rounded-md ${textStyle.textAlign === 'center' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-600'}`}><IconAlignCenter className="w-4 h-4" /></button>
                    <button onClick={() => handleStyleChange('textAlign', 'right')} className={`p-2 rounded-md ${textStyle.textAlign === 'right' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-600'}`}><IconAlignRight className="w-4 h-4" /></button>
                    <button onClick={() => handleStyleChange('textAlign', 'justify')} className={`p-2 rounded-md ${textStyle.textAlign === 'justify' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-600'}`}><IconAlignJustify className="w-4 h-4" /></button>
                </div>
            </div>

            <div className="space-y-3">
                 <div className="flex items-center justify-between">
                    <label htmlFor="text-color" className="font-semibold">Màu chữ</label>
                    <input id="text-color" type="color" value={textStyle.color} onChange={e => handleStyleChange('color', e.target.value)} className="w-8 h-8 p-0 border-none rounded-md bg-gray-700 cursor-pointer" />
                </div>
                 <div className="flex items-center justify-between">
                    <label htmlFor="bg-color" className="font-semibold">Màu nền</label>
                    <input id="bg-color" type="color" value={textStyle.backgroundColor} onChange={e => handleStyleChange('backgroundColor', e.target.value)} className="w-8 h-8 p-0 border-none rounded-md bg-gray-700 cursor-pointer" />
                </div>
                 <div className="flex items-center justify-between">
                    <label htmlFor="border-color" className="font-semibold">Màu viền</label>
                    <input id="border-color" type="color" value={textStyle.borderColor} onChange={(e) => handleStyleChange('borderColor', e.target.value)} className="w-8 h-8 p-0 border-none rounded-md bg-gray-700 cursor-pointer" />
                </div>
            </div>

             <div className="space-y-3">
                <div>
                    <label htmlFor="opacity" className="font-semibold block mb-1">Độ mờ nền ({Math.round(textStyle.backgroundOpacity * 100)}%)</label>
                    <input id="opacity" type="range" min="0" max="1" step="0.1" value={textStyle.backgroundOpacity} onChange={e => handleStyleChange('backgroundOpacity', parseFloat(e.target.value))} className="w-full" />
                </div>
                <div>
                    <label htmlFor="border-width" className="font-semibold block mb-1">Độ dày viền ({textStyle.borderWidth}px)</label>
                    <input id="border-width" type="range" min="0" max="5" step="1" value={textStyle.borderWidth} onChange={e => handleStyleChange('borderWidth', parseInt(e.target.value, 10))} className="w-full" />
                </div>
                 <div>
                    <label htmlFor="border-radius" className="font-semibold block mb-1">Bo góc ({textStyle.borderRadius}px)</label>
                    <input id="border-radius" type="range" min="0" max="24" step="1" value={textStyle.borderRadius} onChange={e => handleStyleChange('borderRadius', parseInt(e.target.value, 10))} className="w-full" />
                </div>
                <div>
                    <label htmlFor="padding" className="font-semibold block mb-1">Đệm trong ({textStyle.padding || 0}px)</label>
                    <input id="padding" type="range" min="0" max="24" step="1" value={textStyle.padding || 0} onChange={e => handleStyleChange('padding', parseInt(e.target.value, 10))} className="w-full" />
                </div>
            </div>

        </div>
    );
};

export default TextOptionsPanel;