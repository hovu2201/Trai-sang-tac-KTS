import React from 'react';
import { LegendStyle, NoteMarker } from '../../types';
import { IconBold, IconItalic, IconAlignLeft, IconAlignCenter, IconAlignRight, IconAlignJustify, IconStyle } from '../icons';

interface LegendOptionsPanelProps {
    legendStyle: LegendStyle;
    setLegendStyle: (style: LegendStyle) => void;
    markers: NoteMarker[];
    onDescriptionChange: (markerId: string, description: string) => void;
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

const LegendOptionsPanel: React.FC<LegendOptionsPanelProps> = ({ legendStyle, setLegendStyle, markers, onDescriptionChange }) => {
    
    const handleStyleChange = (prop: keyof LegendStyle, value: any) => {
        setLegendStyle({ ...legendStyle, [prop]: value });
    };

    const toggleStyle = (prop: 'fontWeight' | 'fontStyle', activeValue: string, normalValue: string) => {
        const currentValue = legendStyle[prop];
        handleStyleChange(prop, currentValue === activeValue ? normalValue : activeValue);
    };

    const stylePresets: { name: string, style: Partial<LegendStyle> }[] = [
        { name: 'Hiện đại', style: { fontFamily: 'Be Vietnam Pro', backgroundColor: '#000000', backgroundOpacity: 0.7, borderWidth: 1, borderColor: '#FFFFFF', borderRadius: 8, showDividers: true, itemBackgroundColor: 'transparent', titleBackgroundColor: 'transparent', itemSpacing: 0 } },
        { name: 'Kỹ thuật', style: { fontFamily: 'Roboto Mono', backgroundColor: '#FFFFFF', backgroundOpacity: 0.9, borderWidth: 0, borderRadius: 0, showDividers: false, textColor: '#000000', titleBackgroundColor: '#222222', titleTextColor: '#FFFFFF', itemBackgroundColor: '#EEEEEE', itemSpacing: 2 } },
        { name: 'Khối Hiện đại', style: { fontFamily: 'Oswald', backgroundColor: 'transparent', backgroundOpacity: 0, borderWidth: 0, borderRadius: 0, textColor: '#FFFFFF', titleTextColor: '#FFFFFF', showDividers: false, itemSpacing: 8, itemBorderRadius: 6, itemPadding: 8, titlePadding: 8, titleBackgroundColor: '#374151', itemBackgroundColor: '#4B5563' } },
        { name: 'Khối Gradient', style: { fontFamily: 'Inter', backgroundColor: 'transparent', backgroundOpacity: 0, borderWidth: 0, borderRadius: 0, textColor: '#000000', titleTextColor: '#FFFFFF', showDividers: false, itemSpacing: 8, itemBorderRadius: 6, itemPadding: 8, titlePadding: 8, titleBackgroundColor: '#1F2937', itemBackgroundColor: 'gradient' } },
        { name: 'Đồng bộ màu', style: { fontFamily: 'Montserrat', backgroundColor: '#222222', backgroundOpacity: 0.8, borderWidth: 0, borderRadius: 8, showDividers: false, itemBackgroundColor: 'marker', itemSpacing: 0, titleBackgroundColor: 'transparent' } },
    ];
    
    const isBlockStyle = (legendStyle.itemSpacing ?? 0) > 0;

    return (
        <div className="space-y-6 text-sm text-gray-300">
            <h3 className="text-lg font-bold text-white">Tùy chọn Bảng chú thích</h3>
            
            <div>
                 <label className="font-semibold block mb-2">Kiểu dáng</label>
                 <div className="grid grid-cols-2 gap-2">
                    {stylePresets.map(preset => (
                        <button key={preset.name} onClick={() => setLegendStyle({...legendStyle, ...preset.style})} className="py-2 px-2 text-xs rounded-md transition-colors bg-gray-700 text-gray-300 hover:bg-gray-600 flex items-center justify-center gap-2">
                           <IconStyle className="w-4 h-4" /> {preset.name}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="font-semibold block mb-2">Nội dung Chú thích</label>
                <div className="space-y-2 max-h-48 overflow-y-auto bg-gray-900/50 p-2 rounded-lg">
                    {markers.length > 0 ? markers.map(marker => (
                         <div key={marker.id} className="flex items-start gap-2">
                            <div className="w-6 h-6 flex-shrink-0 mt-1 flex items-center justify-center font-bold text-xs" style={{ backgroundColor: marker.style.backgroundColor, color: marker.style.textColor, borderRadius: marker.style.shape === 'circle' ? '50%' : '4px' }}>
                                {marker.label}
                            </div>
                            <textarea 
                                value={marker.description}
                                onChange={e => onDescriptionChange(marker.id, e.target.value)}
                                rows={1}
                                placeholder={`Mô tả cho ${marker.label}...`}
                                className="w-full bg-gray-700 border border-gray-600 rounded-md text-white text-xs p-1 resize-none"
                            />
                        </div>
                    )) : <p className="text-xs text-gray-500 text-center">Chưa có ghi chú nào.</p>}
                </div>
            </div>

            <div>
                <label htmlFor="legend-title" className="font-semibold block mb-2">Tiêu đề</label>
                <input 
                    id="legend-title"
                    type="text"
                    value={legendStyle.title}
                    onChange={e => handleStyleChange('title', e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
            </div>

             <div>
                <label htmlFor="font-family" className="font-semibold block mb-2">Font chữ</label>
                <select 
                    id="font-family"
                    value={legendStyle.fontFamily}
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

            <div className="space-y-3">
                 <div>
                     <label htmlFor="title-font-size" className="font-semibold block mb-1">Cỡ chữ tiêu đề ({legendStyle.titleFontSize.toFixed(1)}vh)</label>
                     <input 
                        id="title-font-size"
                        type="range" min="1.5" max="5" step="0.1" 
                        value={legendStyle.titleFontSize} 
                        onChange={e => handleStyleChange('titleFontSize', parseFloat(e.target.value))} 
                        className="w-full" />
                </div>
                 <div>
                     <label htmlFor="font-size" className="font-semibold block mb-1">Cỡ chữ nội dung ({legendStyle.fontSize.toFixed(1)}vh)</label>
                     <input 
                        id="font-size"
                        type="range" min="1" max="4" step="0.1" 
                        value={legendStyle.fontSize} 
                        onChange={e => handleStyleChange('fontSize', parseFloat(e.target.value))} 
                        className="w-full" />
                </div>
            </div>

             <div className="flex items-center justify-between">
                <label className="font-semibold">Kiểu chữ</label>
                <div className="flex bg-gray-700 rounded-lg p-1">
                    <button 
                        onClick={() => toggleStyle('fontWeight', 'bold', 'normal')}
                        className={`p-2 rounded-md ${legendStyle.fontWeight === 'bold' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-600'}`}
                    ><IconBold className="w-4 h-4" /></button>
                     <button 
                        onClick={() => toggleStyle('fontStyle', 'italic', 'normal')}
                        className={`p-2 rounded-md ${legendStyle.fontStyle === 'italic' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-600'}`}
                    ><IconItalic className="w-4 h-4" /></button>
                </div>
            </div>
            
            <div className="flex items-center justify-between">
                <label className="font-semibold">Căn lề Nội dung</label>
                <div className="flex bg-gray-700 rounded-lg p-1">
                    <button onClick={() => handleStyleChange('textAlign', 'left')} className={`p-2 rounded-md ${legendStyle.textAlign === 'left' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-600'}`}><IconAlignLeft className="w-4 h-4" /></button>
                    <button onClick={() => handleStyleChange('textAlign', 'center')} className={`p-2 rounded-md ${legendStyle.textAlign === 'center' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-600'}`}><IconAlignCenter className="w-4 h-4" /></button>
                    <button onClick={() => handleStyleChange('textAlign', 'right')} className={`p-2 rounded-md ${legendStyle.textAlign === 'right' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-600'}`}><IconAlignRight className="w-4 h-4" /></button>
                    <button onClick={() => handleStyleChange('textAlign', 'justify')} className={`p-2 rounded-md ${legendStyle.textAlign === 'justify' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-600'}`}><IconAlignJustify className="w-4 h-4" /></button>
                </div>
            </div>

            <div className="space-y-3">
                 <div className="flex items-center justify-between">
                    <label htmlFor="text-color" className="font-semibold">Màu chữ</label>
                    <input id="text-color" type="color" value={legendStyle.textColor} onChange={e => handleStyleChange('textColor', e.target.value)} className="w-8 h-8 p-0 border-none rounded-md bg-gray-700 cursor-pointer" />
                </div>
                {isBlockStyle && (
                    <>
                        <div className="flex items-center justify-between">
                            <label htmlFor="title-bg-color" className="font-semibold">Nền Tiêu đề</label>
                            <input id="title-bg-color" type="color" value={legendStyle.titleBackgroundColor || '#000000'} onChange={e => handleStyleChange('titleBackgroundColor', e.target.value)} className="w-8 h-8 p-0 border-none rounded-md bg-gray-700 cursor-pointer" />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="item-bg-color" className="font-semibold">Nền Mục</label>
                            <input id="item-bg-color" type="color" value={legendStyle.itemBackgroundColor || '#000000'} onChange={e => handleStyleChange('itemBackgroundColor', e.target.value)} className="w-8 h-8 p-0 border-none rounded-md bg-gray-700 cursor-pointer" />
                        </div>
                    </>
                )}
                 <div className="flex items-center justify-between">
                    <label htmlFor="bg-color" className="font-semibold">Nền Tổng</label>
                    <input id="bg-color" type="color" value={legendStyle.backgroundColor} onChange={e => handleStyleChange('backgroundColor', e.target.value)} className="w-8 h-8 p-0 border-none rounded-md bg-gray-700 cursor-pointer" />
                </div>
                <div className="flex items-center justify-between">
                    <label htmlFor="border-color" className="font-semibold">Màu viền</label>
                    <input id="border-color" type="color" value={legendStyle.borderColor} onChange={e => handleStyleChange('borderColor', e.target.value)} className="w-8 h-8 p-0 border-none rounded-md bg-gray-700 cursor-pointer" />
                </div>
            </div>

             <div className="space-y-3">
                {isBlockStyle && (
                    <>
                        <div>
                            <label htmlFor="item-spacing" className="font-semibold block mb-1">Khoảng cách khối ({legendStyle.itemSpacing || 0}px)</label>
                            <input id="item-spacing" type="range" min="0" max="24" step="1" value={legendStyle.itemSpacing || 0} onChange={e => handleStyleChange('itemSpacing', parseInt(e.target.value, 10))} className="w-full" />
                        </div>
                        <div>
                            <label htmlFor="item-padding" className="font-semibold block mb-1">Đệm trong khối ({legendStyle.itemPadding || 0}px)</label>
                            <input id="item-padding" type="range" min="0" max="24" step="1" value={legendStyle.itemPadding || 0} onChange={e => handleStyleChange('itemPadding', parseInt(e.target.value, 10))} className="w-full" />
                        </div>
                    </>
                )}
                <div>
                    <label htmlFor="opacity" className="font-semibold block mb-1">Độ mờ nền tổng ({Math.round(legendStyle.backgroundOpacity * 100)}%)</label>
                    <input id="opacity" type="range" min="0" max="1" step="0.1" value={legendStyle.backgroundOpacity} onChange={e => handleStyleChange('backgroundOpacity', parseFloat(e.target.value))} className="w-full" />
                </div>
                <div>
                    <label htmlFor="border-width" className="font-semibold block mb-1">Độ dày viền ({legendStyle.borderWidth}px)</label>
                    <input id="border-width" type="range" min="0" max="5" step="1" value={legendStyle.borderWidth} onChange={e => handleStyleChange('borderWidth', parseInt(e.target.value, 10))} className="w-full" />
                </div>
                <div>
                    <label htmlFor="border-radius" className="font-semibold block mb-1">Bo góc ({legendStyle.borderRadius}px)</label>
                    <input id="border-radius" type="range" min="0" max="24" step="1" value={legendStyle.borderRadius} onChange={e => handleStyleChange('borderRadius', parseInt(e.target.value, 10))} className="w-full" />
                </div>
            </div>

            {!isBlockStyle && <div className="flex items-center justify-between">
                <label htmlFor="show-dividers" className="font-semibold">Đường phân cách</label>
                <button
                    id="show-dividers"
                    onClick={() => handleStyleChange('showDividers', !legendStyle.showDividers)}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${legendStyle.showDividers ? 'bg-indigo-600' : 'bg-gray-600'}`}
                >
                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${legendStyle.showDividers ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
            </div>}

        </div>
    );
};

export default LegendOptionsPanel;