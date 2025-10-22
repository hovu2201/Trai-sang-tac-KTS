import React, { useRef, useLayoutEffect } from 'react';
import { TextBox, NoteState } from '../../types';
import Draggable from './Draggable';

interface TextBoxItemProps {
    box: TextBox;
    isSelected: boolean;
    onSelect: (selection: { type: 'text', id: string } | null) => void;
    onDoubleClick: (type: 'text', id: string) => void;
    updateState: (updater: (prevState: NoteState) => NoteState, overwriteLast?: boolean) => void;
    containerRef: React.RefObject<HTMLDivElement>;
}

const ALL_CAPS_FONTS = ['Oswald', 'Anton', 'Bebas Neue', 'Barlow Condensed', 'Archivo Black', 'Teko'];

const TextBoxItem: React.FC<TextBoxItemProps> = ({ box, isSelected, onSelect, onDoubleClick, updateState, containerRef }) => {
    const textDivRef = useRef<HTMLDivElement>(null);

    const onDrag = (pos: { x: number; y: number }) => {
        updateState(s => ({...s, textBoxes: s.textBoxes.map(t => t.id === box.id ? {...t, ...pos} : t)}), true);
    }
    
    const onResizeEnd = (size: { width: number; height: number }) => {
        updateState(s => ({...s, textBoxes: s.textBoxes.map(t => t.id === box.id ? {...t, width: size.width, height: size.height} : t)}));
    }

    const handleSelect = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSelect({type: 'text', id: box.id});
    }

    const handleDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDoubleClick('text', box.id);
    };

    useLayoutEffect(() => {
        if (box.height === 'auto' && textDivRef.current && containerRef.current) {
            const parentHeight = containerRef.current.getBoundingClientRect().height;
            if (parentHeight > 0) {
                const requiredHeight = textDivRef.current.scrollHeight;
                const requiredHeightPercent = (requiredHeight / parentHeight) * 100;
                
                updateState(s => ({
                    ...s,
                    textBoxes: s.textBoxes.map(t => 
                        t.id === box.id ? { ...t, height: requiredHeightPercent } : t
                    )
                }), true);
            }
        }
    }, [box.content, box.width, box.style.fontSize, box.height, updateState, box.id, containerRef, box.style.padding]);
    
    const dynamicStyle: React.CSSProperties = {
        backgroundColor: `rgba(${parseInt(box.style.backgroundColor.slice(1,3),16)}, ${parseInt(box.style.backgroundColor.slice(3,5),16)}, ${parseInt(box.style.backgroundColor.slice(5,7),16)}, ${box.style.backgroundOpacity})`, 
        border: `${box.style.borderWidth}px solid ${box.style.borderColor}`, 
        borderRadius: `${box.style.borderRadius}px`,
        padding: `${box.style.padding || 0}px`,
    };

    return (
        <Draggable 
            initialPosition={{x: box.x, y: box.y}} 
            size={{width: box.width, height: box.height}} 
            onDrag={onDrag} 
            onDragEnd={() => updateState(s => ({...s}))} 
            onResizeEnd={onResizeEnd}
            containerRef={containerRef} 
            className={`group ${isSelected ? 'outline outline-2 outline-indigo-500 outline-offset-2' : ''}`} 
            style={dynamicStyle}
            onClick={handleSelect}
            onDoubleClick={handleDoubleClick}
            resizable={isSelected}
        >
            <div 
                ref={textDivRef}
                className="w-full h-full bg-transparent resize-none outline-none leading-tight whitespace-pre-wrap break-words" 
                style={{ 
                    fontFamily: box.style.fontFamily, 
                    fontSize: `${box.style.fontSize}vh`, 
                    fontWeight: box.style.fontWeight, 
                    fontStyle: box.style.fontStyle, 
                    textAlign: box.style.textAlign, 
                    color: box.style.color,
                    textTransform: ALL_CAPS_FONTS.includes(box.style.fontFamily) ? 'uppercase' : 'none',
                }} 
            >
                {box.content}
            </div>
        </Draggable>
    )
}

export default TextBoxItem;