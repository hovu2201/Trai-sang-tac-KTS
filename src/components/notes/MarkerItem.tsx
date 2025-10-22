import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  NoteMarker,
  NoteState,
} from '../../types';
import Draggable from './Draggable';

interface MarkerItemProps {
    marker: NoteMarker;
    isSelected: boolean;
    onSelect: (selection: { type: 'marker', id: string }) => void;
    onDoubleClick: (type: 'marker', id: string) => void;
    updateState: (updater: (prevState: NoteState) => NoteState, overwriteLast?: boolean) => void;
    containerRef: React.RefObject<HTMLDivElement>;
}

const ALL_CAPS_FONTS = ['Oswald', 'Anton', 'Bebas Neue', 'Barlow Condensed', 'Archivo Black', 'Teko'];

const MarkerItem: React.FC<MarkerItemProps> = ({ marker, isSelected, onSelect, onDoubleClick, updateState, containerRef }) => {
    const [isEditingLabel, setIsEditingLabel] = useState(false);
    const [editedLabel, setEditedLabel] = useState(marker.label);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditingLabel && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditingLabel]);
    
    const onDrag = (pos: { x: number; y: number }) => {
        updateState(s => ({...s, markers: s.markers.map(m => m.id === marker.id ? {...m, ...pos} : m)}), true);
    }
    
    const handleSelect = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSelect({type: 'marker', id: marker.id});
    }

    const handleDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setEditedLabel(marker.label);
        setIsEditingLabel(true);
        // We don't call the prop onDoubleClick anymore as editing is handled internally
    };

    const handleLabelChange = () => {
        setIsEditingLabel(false);
        if (editedLabel.trim() !== '' && editedLabel !== marker.label) {
             updateState(s => ({...s, markers: s.markers.map(m => m.id === marker.id ? {...m, label: editedLabel} : m)}));
        }
    };
    
    return (
        <Draggable 
            initialPosition={{x: marker.x, y: marker.y}} 
            size={{width: 0, height: 0}} // Draggable container is a point, visual is offset
            onDrag={onDrag} 
            onDragEnd={() => updateState(s => ({...s}))} 
            containerRef={containerRef} 
            className={`select-none transform -translate-x-1/2 -translate-y-1/2 ${isSelected ? 'z-10' : ''}`} 
            onClick={handleSelect}
            onDoubleClick={handleDoubleClick}
        >
            <div 
                className={`flex items-center justify-center font-bold transition-transform duration-150 ease-in-out`}
                style={{
                    borderRadius: marker.style.shape === 'circle' ? '50%' : '0.4em',
                    backgroundColor: marker.style.backgroundColor,
                    opacity: marker.style.backgroundOpacity,
                    border: `${marker.style.borderWidth}px solid ${marker.style.borderColor}`,
                    color: marker.style.textColor,
                    boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                    fontFamily: marker.style.fontFamily,
                    fontSize: `${marker.style.fontSize}vh`,
                    fontWeight: marker.style.fontWeight,
                    fontStyle: marker.style.fontStyle,
                    lineHeight: 1.1,
                    cursor: 'grab',
                    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                    textTransform: ALL_CAPS_FONTS.includes(marker.style.fontFamily) ? 'uppercase' : 'none',
                    // Đảm bảo marker có kích thước tự động điều chỉnh theo fontSize
                    minWidth: '1.5em',
                    minHeight: '1.5em',
                    width: 'auto',
                    height: 'auto',
                    padding: '0.2em 0.4em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    aspectRatio: marker.style.shape === 'circle' ? '1' : 'auto',
                }}
            >
                {isEditingLabel ? (
                    <input
                        ref={inputRef}
                        type="text"
                        value={editedLabel}
                        onChange={(e) => setEditedLabel(e.target.value)}
                        onBlur={handleLabelChange}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleLabelChange(); }}
                        onClick={(e) => e.stopPropagation()} // Prevent dragging while editing
                        className="bg-transparent text-center outline-none"
                        style={{
                            color: 'inherit',
                            fontFamily: 'inherit',
                            fontSize: 'inherit',
                            fontWeight: 'inherit',
                            fontStyle: 'inherit',
                            textTransform: 'inherit',
                            width: 'auto',
                            minWidth: '1em',
                            textAlign: 'center',
                        }}
                    />
                ) : (
                    <span style={{ 
                        whiteSpace: 'nowrap',
                        textAlign: 'center',
                        display: 'block',
                        width: '100%'
                    }}>
                        {marker.label}
                    </span>
                )}
            </div>
        </Draggable>
    );
};

export default MarkerItem;