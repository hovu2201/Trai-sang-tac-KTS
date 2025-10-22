import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  EditTool,
  RenovationResult,
} from '../types';
import EditPanel from './EditPanel';
import { EditResultThumbnails } from './EditResultThumbnails';

interface EditCanvasProps {
    baseImage: RenovationResult;
    results: RenovationResult[];
    selectedImage: RenovationResult | null;
    onEdit: (params: { prompt: string, maskImage: string, replacementImage?: string | null }) => void;
    onCancel: () => void;
    onSelectImage: (result: RenovationResult) => void;
    isLoading: boolean;
}

interface Point {
    x: number;
    y: number;
}

const EditCanvas: React.FC<EditCanvasProps> = ({ 
    baseImage, 
    results, 
    selectedImage, 
    onEdit, 
    onCancel, 
    onSelectImage,
    isLoading
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const displayCanvasRef = useRef<HTMLCanvasElement>(null); // Canvas hiển thị (có màu bán trong suốt)
    const maskCanvasRef = useRef<HTMLCanvasElement>(null); // Canvas mask ẩn (đen/trắng cho AI)
    
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
    const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 });

    const [activeTool, setActiveTool] = useState<EditTool>('brush');
    const [brushSize, setBrushSize] = useState(30);
    const [editMode, setEditMode] = useState<'remove' | 'replace'>('replace');
    
    // Drawing states
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPos, setStartPos] = useState<Point | null>(null);
    const [lastPos, setLastPos] = useState<Point | null>(null);
    const [polygonPoints, setPolygonPoints] = useState<Point[]>([]);

    const getDisplayContext = () => displayCanvasRef.current?.getContext('2d');
    const getMaskContext = () => maskCanvasRef.current?.getContext('2d');

    // Resize handler
    const handleResize = useCallback(() => {
        const container = containerRef.current;
        const image = imageRef.current;
        if (container && image && image.complete) {
            const { width: cw, height: ch } = container.getBoundingClientRect();
            const { naturalWidth: iw, naturalHeight: ih } = image;
            
            setOriginalSize({ width: iw, height: ih });
            
            const imgRatio = iw / ih;
            const containerRatio = cw / ch;

            let newWidth, newHeight;
            if (imgRatio > containerRatio) {
                newWidth = Math.min(cw - 32, iw); // padding 32px
                newHeight = newWidth / imgRatio;
            } else {
                newHeight = Math.min(ch - 32, ih);
                newWidth = newHeight * imgRatio;
            }
            setCanvasSize({ width: newWidth, height: newHeight });
        }
    }, []);

    useEffect(() => {
        const image = new Image();
        image.src = baseImage.imageUrl;
        image.onload = () => {
            if (imageRef.current) {
                imageRef.current.src = image.src;
                handleResize();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [baseImage.imageUrl, handleResize]);

    // Initialize mask canvas with original image size
    useEffect(() => {
        if (originalSize.width > 0 && maskCanvasRef.current) {
            const canvas = maskCanvasRef.current;
            canvas.width = originalSize.width;
            canvas.height = originalSize.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        }
    }, [originalSize]);

    const getMousePos = (e: React.MouseEvent): Point => {
        const rect = displayCanvasRef.current!.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    // Convert display coordinates to original image coordinates
    const displayToOriginal = (point: Point): Point => {
        const scaleX = originalSize.width / canvasSize.width;
        const scaleY = originalSize.height / canvasSize.height;
        return {
            x: point.x * scaleX,
            y: point.y * scaleY
        };
    };

    // Draw on both display canvas (colored) and mask canvas (white)
    const drawBrush = (start: Point, end: Point) => {
        // Display canvas - semi-transparent white
        const displayCtx = getDisplayContext();
        if (displayCtx) {
            displayCtx.beginPath();
            displayCtx.moveTo(start.x, start.y);
            displayCtx.lineTo(end.x, end.y);
            displayCtx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            displayCtx.lineWidth = brushSize;
            displayCtx.lineCap = 'round';
            displayCtx.lineJoin = 'round';
            displayCtx.stroke();
        }

        // Mask canvas - pure white, scaled coordinates
        const maskCtx = getMaskContext();
        if (maskCtx) {
            const startOrig = displayToOriginal(start);
            const endOrig = displayToOriginal(end);
            const scaledBrushSize = brushSize * (originalSize.width / canvasSize.width);
            
            maskCtx.beginPath();
            maskCtx.moveTo(startOrig.x, startOrig.y);
            maskCtx.lineTo(endOrig.x, endOrig.y);
            maskCtx.strokeStyle = 'white';
            maskCtx.lineWidth = scaledBrushSize;
            maskCtx.lineCap = 'round';
            maskCtx.lineJoin = 'round';
            maskCtx.stroke();
        }
    };

    const drawRectanglePreview = (start: Point, end: Point) => {
        const displayCtx = getDisplayContext();
        if (!displayCtx || !displayCanvasRef.current) return;
        
        // Clear and redraw
        displayCtx.clearRect(0, 0, displayCanvasRef.current.width, displayCanvasRef.current.height);
        
        const width = end.x - start.x;
        const height = end.y - start.y;
        
        // Fill with semi-transparent white
        displayCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        displayCtx.fillRect(start.x, start.y, width, height);
        
        // Border
        displayCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        displayCtx.lineWidth = 2;
        displayCtx.strokeRect(start.x, start.y, width, height);
    };

    const finalizeRectangle = (start: Point, end: Point) => {
        const maskCtx = getMaskContext();
        if (!maskCtx) return;
        
        const startOrig = displayToOriginal(start);
        const endOrig = displayToOriginal(end);
        
        const width = endOrig.x - startOrig.x;
        const height = endOrig.y - startOrig.y;
        
        maskCtx.fillStyle = 'white';
        maskCtx.fillRect(startOrig.x, startOrig.y, width, height);
    };

    const drawEllipsePreview = (start: Point, end: Point) => {
        const displayCtx = getDisplayContext();
        if (!displayCtx || !displayCanvasRef.current) return;
        
        displayCtx.clearRect(0, 0, displayCanvasRef.current.width, displayCanvasRef.current.height);
        
        const centerX = (start.x + end.x) / 2;
        const centerY = (start.y + end.y) / 2;
        const radiusX = Math.abs(end.x - start.x) / 2;
        const radiusY = Math.abs(end.y - start.y) / 2;
        
        displayCtx.beginPath();
        displayCtx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        displayCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        displayCtx.fill();
        displayCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        displayCtx.lineWidth = 2;
        displayCtx.stroke();
    };

    const finalizeEllipse = (start: Point, end: Point) => {
        const maskCtx = getMaskContext();
        if (!maskCtx) return;
        
        const startOrig = displayToOriginal(start);
        const endOrig = displayToOriginal(end);
        
        const centerX = (startOrig.x + endOrig.x) / 2;
        const centerY = (startOrig.y + endOrig.y) / 2;
        const radiusX = Math.abs(endOrig.x - startOrig.x) / 2;
        const radiusY = Math.abs(endOrig.y - startOrig.y) / 2;
        
        maskCtx.beginPath();
        maskCtx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        maskCtx.fillStyle = 'white';
        maskCtx.fill();
    };

    const drawPolygonPreview = (points: Point[]) => {
        const displayCtx = getDisplayContext();
        if (!displayCtx || !displayCanvasRef.current || points.length < 2) return;
        
        displayCtx.clearRect(0, 0, displayCanvasRef.current.width, displayCanvasRef.current.height);
        
        displayCtx.beginPath();
        displayCtx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            displayCtx.lineTo(points[i].x, points[i].y);
        }
        
        // If more than 2 points, close the path for preview
        if (points.length > 2) {
            displayCtx.closePath();
            displayCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            displayCtx.fill();
        }
        
        displayCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        displayCtx.lineWidth = 2;
        displayCtx.stroke();
        
        // Draw points
        points.forEach((point, index) => {
            displayCtx.beginPath();
            displayCtx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
            displayCtx.fillStyle = index === 0 ? 'rgba(0, 255, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';
            displayCtx.fill();
        });
    };

    const finalizePolygon = (points: Point[]) => {
        const maskCtx = getMaskContext();
        if (!maskCtx || points.length < 3) return;
        
        const origPoints = points.map(displayToOriginal);
        
        maskCtx.beginPath();
        maskCtx.moveTo(origPoints[0].x, origPoints[0].y);
        for (let i = 1; i < origPoints.length; i++) {
            maskCtx.lineTo(origPoints[i].x, origPoints[i].y);
        }
        maskCtx.closePath();
        maskCtx.fillStyle = 'white';
        maskCtx.fill();
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        const pos = getMousePos(e);
        
        if (activeTool === 'polygon') {
            // Add point to polygon
            setPolygonPoints(prev => [...prev, pos]);
            drawPolygonPreview([...polygonPoints, pos]);
            return;
        }
        
        setIsDrawing(true);
        setStartPos(pos);
        setLastPos(pos);
        
        if (activeTool === 'brush') {
            drawBrush(pos, pos);
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const currentPos = getMousePos(e);
        
        if (!isDrawing) return;
        
        if (activeTool === 'brush' && lastPos) {
            drawBrush(lastPos, currentPos);
            setLastPos(currentPos);
        } else if (activeTool === 'rectangle' && startPos) {
            drawRectanglePreview(startPos, currentPos);
        } else if (activeTool === 'ellipse' && startPos) {
            drawEllipsePreview(startPos, currentPos);
        }
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (!isDrawing || !startPos) {
            return;
        }
        
        const endPos = getMousePos(e);
        
        if (activeTool === 'rectangle') {
            finalizeRectangle(startPos, endPos);
        } else if (activeTool === 'ellipse') {
            finalizeEllipse(startPos, endPos);
        }
        
        setIsDrawing(false);
        setStartPos(null);
        setLastPos(null);
    };

    const handleCanvasClick = (e: React.MouseEvent) => {
        if (activeTool === 'polygon' && e.detail === 2) { // Double click
            // Finalize polygon
            if (polygonPoints.length >= 3) {
                finalizePolygon(polygonPoints);
            }
            setPolygonPoints([]);
            
            const displayCtx = getDisplayContext();
            if (displayCtx && displayCanvasRef.current) {
                displayCtx.clearRect(0, 0, displayCanvasRef.current.width, displayCanvasRef.current.height);
            }
        }
    };

    const clearCanvas = () => {
        // Clear display canvas
        const displayCtx = getDisplayContext();
        if (displayCtx && displayCanvasRef.current) {
            displayCtx.clearRect(0, 0, displayCanvasRef.current.width, displayCanvasRef.current.height);
        }
        
        // Clear mask canvas (fill with black)
        const maskCtx = getMaskContext();
        if (maskCtx && maskCanvasRef.current) {
            maskCtx.fillStyle = 'black';
            maskCtx.fillRect(0, 0, maskCanvasRef.current.width, maskCanvasRef.current.height);
        }
        
        // Reset polygon points
        setPolygonPoints([]);
        setIsDrawing(false);
        setStartPos(null);
        setLastPos(null);
    };

    const handleEditSubmit = (prompt: string, replacementImage?: string | null) => {
        const maskCanvas = maskCanvasRef.current;
        if (!maskCanvas) return;
        
        // Export mask as pure black/white image
        const maskImage = maskCanvas.toDataURL('image/png');
        onEdit({ prompt, maskImage, replacementImage });
    };

    // Redraw polygon preview when points change
    useEffect(() => {
        if (activeTool === 'polygon' && polygonPoints.length > 0) {
            drawPolygonPreview(polygonPoints);
        }
    }, [polygonPoints, activeTool]);

    return (
        <div className="flex h-full gap-4">
            <div
                ref={containerRef}
                className="flex-grow h-full bg-gray-900 dark:bg-gray-950 rounded-2xl flex items-center justify-center p-4 relative overflow-hidden"
            >
                <img
                    ref={imageRef}
                    src={baseImage.imageUrl}
                    alt="Image to edit"
                    className="max-w-full max-h-full object-contain pointer-events-none"
                    style={{ width: canvasSize.width, height: canvasSize.height }}
                />
                {/* Display canvas - visible overlay */}
                <canvas
                    ref={displayCanvasRef}
                    width={canvasSize.width}
                    height={canvasSize.height}
                    className="absolute cursor-crosshair"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onClick={handleCanvasClick}
                />
                {/* Mask canvas - hidden, for AI */}
                <canvas
                    ref={maskCanvasRef}
                    className="hidden"
                />
            </div>
            <div className="w-96 flex-shrink-0 flex flex-col gap-2">
                {/* Thumbnails của các ảnh đã chỉnh sửa */}
                <EditResultThumbnails
                    results={results}
                    selectedImage={selectedImage}
                    onSelectImage={onSelectImage}
                />
                
                <EditPanel
                    onEdit={handleEditSubmit}
                    onCancel={onCancel}
                    activeTool={activeTool}
                    onToolChange={(tool) => {
                        setActiveTool(tool);
                        setPolygonPoints([]);
                        setIsDrawing(false);
                    }}
                    brushSize={brushSize}
                    onBrushSizeChange={setBrushSize}
                    editMode={editMode}
                    onEditModeChange={setEditMode}
                />
                <button 
                    onClick={clearCanvas} 
                    className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors shadow-lg"
                >
                    🗑️ Xóa vùng chọn
                </button>
                {activeTool === 'polygon' && polygonPoints.length > 0 && (
                    <div className="w-full p-3 bg-blue-500 text-white text-sm rounded-lg text-center">
                        <p className="font-semibold">Đa giác: {polygonPoints.length} điểm</p>
                        <p className="text-xs mt-1">Nhấp đúp để hoàn thành</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditCanvas;

