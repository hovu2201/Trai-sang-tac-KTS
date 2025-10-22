import React, {
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import {
  LegendBox,
  NoteMarker,
} from '../../types';

interface NoteLegendProps {
    markers: NoteMarker[];
    onDescriptionChange: (markerId: string, description: string) => void;
    legendBox: LegendBox;
    onTitleChange: (title: string) => void;
}

const AutoResizingTextarea: React.FC<{
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    style: React.CSSProperties;
    placeholder: string;
    className: string;
}> = ({ value, onChange, style, placeholder, className }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useLayoutEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Reset height to recalculate
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [value]);

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={onChange}
            style={style}
            placeholder={placeholder}
            className={className}
            rows={1}
        />
    );
};

const GRADIENT_COLORS = ['#ffadad80', '#ffd6a580', '#fdffb680', '#caffbf80', '#9bf6ff80', '#a0c4ff80', '#bdb2ff80', '#ffc6ff80'];
const ALL_CAPS_FONTS = ['Oswald', 'Anton', 'Bebas Neue', 'Barlow Condensed', 'Archivo Black', 'Teko'];

const NoteLegend: React.FC<NoteLegendProps> = ({ markers, onDescriptionChange, legendBox, onTitleChange }) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const { style } = legendBox;
    
    const sortedMarkers = [...markers].sort((a, b) => {
        const aIsNum = !isNaN(parseInt(a.label));
        const bIsNum = !isNaN(parseInt(b.label));
        if (aIsNum && bIsNum) return parseInt(a.label) - parseInt(b.label);
        return a.label.localeCompare(b.label);
    });

    const legendDynamicStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        backgroundColor: `rgba(${parseInt(style.backgroundColor.slice(1,3),16)}, ${parseInt(style.backgroundColor.slice(3,5),16)}, ${parseInt(style.backgroundColor.slice(5,7),16)}, ${style.backgroundOpacity})`,
        border: `${style.borderWidth}px solid ${style.borderColor}`,
        borderRadius: `${style.borderRadius}px`,
        color: style.textColor,
        fontFamily: style.fontFamily,
    };

    const textTransformStyle = {
        textTransform: ALL_CAPS_FONTS.includes(style.fontFamily) ? 'uppercase' : 'none',
    } as const;

    const titleStyle: React.CSSProperties = {
        ...textTransformStyle,
        fontSize: `${style.titleFontSize}vh`,
        fontWeight: 'bold',
        textAlign: style.textAlign,
        fontStyle: style.fontStyle,
        color: style.titleTextColor || style.textColor,
        padding: `${style.titlePadding || 0}px`,
        backgroundColor: style.titleBackgroundColor,
        borderRadius: `${style.itemBorderRadius || 0}px`,
    };

    const itemBaseStyle: React.CSSProperties = {
        ...textTransformStyle,
        fontSize: `${style.fontSize}vh`,
        fontWeight: style.fontWeight,
        fontStyle: style.fontStyle,
        padding: `${style.itemPadding || 0}px`,
        borderRadius: `${style.itemBorderRadius || 0}px`,
        color: style.itemTextColor || style.textColor,
    }

    const getItemRowStyle = (marker: NoteMarker, index: number): React.CSSProperties => {
        let backgroundColor = 'transparent';
        if (style.itemBackgroundColor === 'marker') {
            const markerColor = marker.style.backgroundColor;
            const isHex = markerColor.startsWith('#');
            const r = isHex ? parseInt(markerColor.slice(1, 3), 16) : 0;
            const g = isHex ? parseInt(markerColor.slice(3, 5), 16) : 0;
            const b = isHex ? parseInt(markerColor.slice(5, 7), 16) : 0;
            backgroundColor = `rgba(${r}, ${g}, ${b}, 0.3)`;
        } else if (style.itemBackgroundColor === 'gradient') {
            backgroundColor = GRADIENT_COLORS[index % GRADIENT_COLORS.length];
        } else if (style.itemBackgroundColor) {
            backgroundColor = style.itemBackgroundColor;
        }
        return { backgroundColor };
    }

    return (
        <div className="p-3 text-sm flex flex-col w-full h-full overflow-hidden" style={legendDynamicStyle}>
            <div onDoubleClick={() => setIsEditingTitle(true)}>
                {isEditingTitle ? (
                     <input
                        type="text"
                        value={style.title}
                        onChange={(e) => onTitleChange(e.target.value)}
                        onBlur={() => setIsEditingTitle(false)}
                        onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                        className="text-base font-bold w-full bg-white/20 border-b-2 border-indigo-500 outline-none flex-shrink-0"
                        style={titleStyle}
                        autoFocus
                    />
                ) : (
                    <h3 className="cursor-pointer hover:bg-white/10" style={titleStyle}>
                        {style.title}
                    </h3>
                )}
            </div>
           
            <div className="flex-grow overflow-y-auto mt-2" style={{ display: 'flex', flexDirection: 'column', gap: `${style.itemSpacing || 0}px` }}>
                {sortedMarkers.map((marker, index) => (
                    <div
                        key={marker.id} 
                        className={`flex items-start gap-2 ${style.showDividers && index > 0 && !style.itemSpacing ? "border-t border-gray-500/50 pt-2 mt-2" : ""}`}
                        style={{ ...itemBaseStyle, ...getItemRowStyle(marker, index) }}
                    >
                        <div className={`w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0 ${marker.style.shape === 'circle' ? 'rounded-full' : 'rounded-sm'}`} 
                             style={{ 
                                backgroundColor: marker.style.backgroundColor, 
                                opacity: marker.style.backgroundOpacity, 
                                borderColor: marker.style.borderColor, 
                                borderWidth: `${marker.style.borderWidth}px`, 
                                color: marker.style.textColor,
                                lineHeight: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 0,
                                fontSize: '1rem', // Tăng kích thước chữ trong legend
                            }}>
                            <span style={{ lineHeight: 1 }}>{marker.label}</span>
                        </div>
                        <div className="w-full">
                            <AutoResizingTextarea
                                value={marker.description}
                                onChange={(e) => onDescriptionChange(marker.id, e.target.value)}
                                style={{ textAlign: style.textAlign, color: 'inherit', textTransform: 'inherit' }}
                                placeholder="Mô tả..."
                                className="w-full bg-transparent outline-none border-none focus:bg-white/10 p-1 rounded resize-none overflow-hidden leading-tight"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NoteLegend;