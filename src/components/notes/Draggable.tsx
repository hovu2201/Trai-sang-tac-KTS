import React, { useState, useRef, useCallback, useEffect } from 'react';

interface DraggableProps {
    initialPosition: { x: number; y: number };
    size: { width: number; height: number | 'auto' }; // In percentage or auto
    onDrag: (pos: { x: number; y: number }) => void;
    onDragEnd?: () => void;
    onResizeEnd?: (size: { width: number; height: number }) => void;
    containerRef: React.RefObject<HTMLElement>;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: (e: React.MouseEvent) => void;
    onDoubleClick?: (e: React.MouseEvent) => void;
    resizable?: boolean;
}

const Draggable: React.FC<DraggableProps> = ({ 
    initialPosition, 
    size,
    onDrag, 
    onDragEnd,
    onResizeEnd,
    containerRef, 
    children, 
    className, 
    style,
    onClick,
    onDoubleClick,
    resizable = false,
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const interactionStartInfo = useRef({ elementX: 0, elementY: 0, mouseX: 0, mouseY: 0, elementW: 0, elementH: 0 });

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (e.button !== 0) return;
        
        const target = e.target as HTMLElement;
        const isResizeHandle = target.dataset.resizeHandle === 'true';

        if (isResizeHandle && resizable) {
            e.preventDefault();
            e.stopPropagation();
            setIsResizing(true);
        } else {
            e.stopPropagation();
            setIsDragging(true);
        }

        const parentRect = containerRef.current?.getBoundingClientRect();
        if (!parentRect || !ref.current) return;

        const elementRect = ref.current.getBoundingClientRect();

        interactionStartInfo.current = {
            elementX: initialPosition.x,
            elementY: initialPosition.y,
            mouseX: e.clientX,
            mouseY: e.clientY,
            elementW: (elementRect.width / parentRect.width) * 100, // Current width in %
            elementH: (elementRect.height / parentRect.height) * 100, // Current height in %
        };
    }, [initialPosition, containerRef, resizable]);
    
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging && !isResizing) return;
        if (!ref.current || !containerRef.current) return;
        e.preventDefault();
        e.stopPropagation();
        
        const parentRect = containerRef.current.getBoundingClientRect();
        if (parentRect.width === 0 || parentRect.height === 0) return;

        const deltaX = e.clientX - interactionStartInfo.current.mouseX;
        const deltaY = e.clientY - interactionStartInfo.current.mouseY;
        
        const deltaXPercent = (deltaX / parentRect.width) * 100;
        const deltaYPercent = (deltaY / parentRect.height) * 100;
        
        if (isDragging) {
            const newX = interactionStartInfo.current.elementX + deltaXPercent;
            const newY = interactionStartInfo.current.elementY + deltaYPercent;

            const currentWidthPercent = typeof size.width === 'number' ? size.width : interactionStartInfo.current.elementW;
            const currentHeightPercent = typeof size.height === 'number' ? size.height : interactionStartInfo.current.elementH;

            const clampedX = Math.max(0, Math.min(100 - currentWidthPercent, newX));
            const clampedY = Math.max(0, Math.min(100 - currentHeightPercent, newY));
            onDrag({ x: clampedX, y: clampedY });
        } else if (isResizing) {
            const newWidth = Math.max(5, interactionStartInfo.current.elementW + deltaXPercent);
            const newHeight = Math.max(5, interactionStartInfo.current.elementH + deltaYPercent);
            
            const clampedWidth = Math.min(100 - initialPosition.x, newWidth);
            const clampedHeight = Math.min(100 - initialPosition.y, newHeight);

            // Directly manipulate DOM to avoid React re-renders during drag
            ref.current.style.width = `${clampedWidth}%`;
            ref.current.style.height = `${clampedHeight}%`;
        }
    }, [isDragging, isResizing, onDrag, containerRef, size, initialPosition]);

    const handleMouseUp = useCallback((e: MouseEvent) => {
        e.stopPropagation();
        if (isDragging) {
            setIsDragging(false);
            if(onDragEnd) onDragEnd();
        }
        if (isResizing) {
            setIsResizing(false);
            if(onResizeEnd && ref.current) {
                // Get final size from style and commit to React state
                const finalWidth = parseFloat(ref.current.style.width);
                const finalHeight = parseFloat(ref.current.style.height);
                onResizeEnd({ width: finalWidth, height: finalHeight });
            }
        }
    }, [isDragging, isResizing, onDragEnd, onResizeEnd]);
    
    useEffect(() => {
        if (isDragging || isResizing) {
            document.addEventListener('mousemove', handleMouseMove, { passive: false });
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

    const cursorStyle = isResizing ? 'se-resize' : (isDragging ? 'grabbing' : 'grab');

    return (
        <div
            ref={ref}
            className={`${className} relative`}
            style={{
                ...style,
                position: 'absolute',
                top: `${initialPosition.y}%`,
                left: `${initialPosition.x}%`,
                width: `${size.width}%`,
                height: typeof size.height === 'number' ? `${size.height}%` : 'auto',
                cursor: cursorStyle,
                willChange: 'transform, width, height',
            }}
            onMouseDown={handleMouseDown}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
        >
            {children}
            {resizable && (
                <div 
                    data-resize-handle="true" 
                    className="absolute -right-1 -bottom-1 w-4 h-4 bg-indigo-500 rounded-full cursor-se-resize border-2 border-white"
                    style={{ zIndex: 10 }}
                ></div>
            )}
        </div>
    );
};

export default Draggable;