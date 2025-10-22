import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

interface CropBoxProps {
    rect: { x: number; y: number; width: number; height: number };
    imageSize: { width: number; height: number };
    scale: number;
    aspectRatio: number | null;
    onChange: (rect: { x: number; y: number; width: number; height: number }) => void;
}

type ResizeHandle = 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'e' | 'w' | null;

const CropBox: React.FC<CropBoxProps> = ({ rect, imageSize, scale, aspectRatio, onChange }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState<ResizeHandle>(null);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [initialRect, setInitialRect] = useState(rect);

    const normalizedRect = {
        x: Math.min(rect.x, rect.x + rect.width),
        y: Math.min(rect.y, rect.y + rect.height),
        width: Math.abs(rect.width),
        height: Math.abs(rect.height),
    };

    const handleMouseDown = useCallback((e: React.MouseEvent, handle: ResizeHandle) => {
        e.stopPropagation();
        setIsResizing(handle);
        setDragStart({ x: e.clientX, y: e.clientY });
        setInitialRect(rect);
    }, [rect]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const dx = (e.clientX - dragStart.x) / scale;
        const dy = (e.clientY - dragStart.y) / scale;

        if (isDragging) {
            // Move the entire crop box
            const newX = Math.max(0, Math.min(initialRect.x + dx, imageSize.width - Math.abs(initialRect.width)));
            const newY = Math.max(0, Math.min(initialRect.y + dy, imageSize.height - Math.abs(initialRect.height)));
            onChange({ ...initialRect, x: newX, y: newY });
        } else if (isResizing) {
            let newRect = { ...initialRect };

            switch (isResizing) {
                case 'nw':
                    newRect.x = initialRect.x + dx;
                    newRect.y = initialRect.y + dy;
                    newRect.width = initialRect.width - dx;
                    newRect.height = initialRect.height - dy;
                    break;
                case 'ne':
                    newRect.y = initialRect.y + dy;
                    newRect.width = initialRect.width + dx;
                    newRect.height = initialRect.height - dy;
                    break;
                case 'sw':
                    newRect.x = initialRect.x + dx;
                    newRect.width = initialRect.width - dx;
                    newRect.height = initialRect.height + dy;
                    break;
                case 'se':
                    newRect.width = initialRect.width + dx;
                    newRect.height = initialRect.height + dy;
                    break;
                case 'n':
                    newRect.y = initialRect.y + dy;
                    newRect.height = initialRect.height - dy;
                    break;
                case 's':
                    newRect.height = initialRect.height + dy;
                    break;
                case 'e':
                    newRect.width = initialRect.width + dx;
                    break;
                case 'w':
                    newRect.x = initialRect.x + dx;
                    newRect.width = initialRect.width - dx;
                    break;
            }

            // Apply aspect ratio if set
            if (aspectRatio && ['nw', 'ne', 'sw', 'se'].includes(isResizing)) {
                const absWidth = Math.abs(newRect.width);
                const absHeight = Math.abs(newRect.height);
                const currentRatio = absWidth / absHeight;

                if (currentRatio > aspectRatio) {
                    newRect.height = newRect.width / aspectRatio;
                } else {
                    newRect.width = newRect.height * aspectRatio;
                }
            }

            // Constrain to image bounds
            newRect.x = Math.max(0, Math.min(newRect.x, imageSize.width));
            newRect.y = Math.max(0, Math.min(newRect.y, imageSize.height));
            newRect.width = Math.max(20, Math.min(newRect.width, imageSize.width - newRect.x));
            newRect.height = Math.max(20, Math.min(newRect.height, imageSize.height - newRect.y));

            onChange(newRect);
        }
    }, [isDragging, isResizing, dragStart, initialRect, scale, imageSize, aspectRatio, onChange]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        setIsResizing(null);
    }, []);

    useEffect(() => {
        if (isDragging || isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

    const handleBoxMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
        setInitialRect(rect);
    };

    const handleSize = 12;

    return (
        <div className="absolute pointer-events-none" style={{ width: imageSize.width, height: imageSize.height, top: 0, left: 0 }}>
            {/* Dark overlay */}
            <div 
                className="absolute top-0 left-0 w-full h-full bg-black/60" 
                style={{ 
                    clipPath: `polygon(
                        0% 0%, 
                        100% 0%, 
                        100% 100%, 
                        0% 100%, 
                        0% ${normalizedRect.y}px, 
                        ${normalizedRect.x}px ${normalizedRect.y}px, 
                        ${normalizedRect.x}px ${normalizedRect.y + normalizedRect.height}px, 
                        ${normalizedRect.x + normalizedRect.width}px ${normalizedRect.y + normalizedRect.height}px, 
                        ${normalizedRect.x + normalizedRect.width}px ${normalizedRect.y}px, 
                        0 ${normalizedRect.y}px
                    )` 
                }}
            />

            {/* Crop box */}
            <div
                className="absolute border-2 border-white shadow-lg pointer-events-auto cursor-move"
                style={{
                    left: normalizedRect.x,
                    top: normalizedRect.y,
                    width: normalizedRect.width,
                    height: normalizedRect.height,
                    boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)'
                }}
                onMouseDown={handleBoxMouseDown}
            >
                {/* Grid lines */}
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="border border-white/30" />
                    ))}
                </div>

                {/* Corner handles */}
                <div
                    className="absolute bg-white border-2 border-blue-500 rounded-full cursor-nwse-resize hover:scale-125 transition-transform"
                    style={{ width: handleSize, height: handleSize, left: -handleSize / 2, top: -handleSize / 2 }}
                    onMouseDown={(e) => handleMouseDown(e, 'nw')}
                />
                <div
                    className="absolute bg-white border-2 border-blue-500 rounded-full cursor-nesw-resize hover:scale-125 transition-transform"
                    style={{ width: handleSize, height: handleSize, right: -handleSize / 2, top: -handleSize / 2 }}
                    onMouseDown={(e) => handleMouseDown(e, 'ne')}
                />
                <div
                    className="absolute bg-white border-2 border-blue-500 rounded-full cursor-nesw-resize hover:scale-125 transition-transform"
                    style={{ width: handleSize, height: handleSize, left: -handleSize / 2, bottom: -handleSize / 2 }}
                    onMouseDown={(e) => handleMouseDown(e, 'sw')}
                />
                <div
                    className="absolute bg-white border-2 border-blue-500 rounded-full cursor-nwse-resize hover:scale-125 transition-transform"
                    style={{ width: handleSize, height: handleSize, right: -handleSize / 2, bottom: -handleSize / 2 }}
                    onMouseDown={(e) => handleMouseDown(e, 'se')}
                />

                {/* Edge handles */}
                <div
                    className="absolute bg-white border-2 border-blue-500 rounded-full cursor-ns-resize hover:scale-125 transition-transform"
                    style={{ width: handleSize, height: handleSize, left: '50%', top: -handleSize / 2, transform: 'translateX(-50%)' }}
                    onMouseDown={(e) => handleMouseDown(e, 'n')}
                />
                <div
                    className="absolute bg-white border-2 border-blue-500 rounded-full cursor-ns-resize hover:scale-125 transition-transform"
                    style={{ width: handleSize, height: handleSize, left: '50%', bottom: -handleSize / 2, transform: 'translateX(-50%)' }}
                    onMouseDown={(e) => handleMouseDown(e, 's')}
                />
                <div
                    className="absolute bg-white border-2 border-blue-500 rounded-full cursor-ew-resize hover:scale-125 transition-transform"
                    style={{ width: handleSize, height: handleSize, right: -handleSize / 2, top: '50%', transform: 'translateY(-50%)' }}
                    onMouseDown={(e) => handleMouseDown(e, 'e')}
                />
                <div
                    className="absolute bg-white border-2 border-blue-500 rounded-full cursor-ew-resize hover:scale-125 transition-transform"
                    style={{ width: handleSize, height: handleSize, left: -handleSize / 2, top: '50%', transform: 'translateY(-50%)' }}
                    onMouseDown={(e) => handleMouseDown(e, 'w')}
                />

                {/* Size indicator */}
                <div className="absolute -top-8 left-0 bg-black/80 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap">
                    {Math.round(normalizedRect.width)} × {Math.round(normalizedRect.height)}
                </div>
            </div>
        </div>
    );
};

export default CropBox;
