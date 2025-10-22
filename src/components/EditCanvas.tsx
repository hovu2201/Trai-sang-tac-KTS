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
        <div className="flex flex-col lg:flex-row h-full gap-2 lg:gap-4">
            {/* Canvas - Full screen on mobile */}
            <div
                ref={containerRef}
                className="flex-grow h-full lg:h-full bg-gray-900 dark:bg-gray-950 rounded-xl lg:rounded-2xl flex items-center justify-center p-2 lg:p-4 relative overflow-hidden"
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
                    className="absolute cursor-crosshair touch-none"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onClick={handleCanvasClick}
                    onTouchStart={(e) => {
                        e.preventDefault();
                        const touch = e.touches[0];
                        const mouseEvent = new MouseEvent('mousedown', {
                            clientX: touch.clientX,
                            clientY: touch.clientY,
                            bubbles: true
                        });
                        e.currentTarget.dispatchEvent(mouseEvent);
                    }}
                    onTouchMove={(e) => {
                        e.preventDefault();
                        const touch = e.touches[0];
                        const mouseEvent = new MouseEvent('mousemove', {
                            clientX: touch.clientX,
                            clientY: touch.clientY,
                            bubbles: true
                        });
                        e.currentTarget.dispatchEvent(mouseEvent);
                    }}
                    onTouchEnd={(e) => {
                        e.preventDefault();
                        const mouseEvent = new MouseEvent('mouseup', {
                            bubbles: true
                        });
                        e.currentTarget.dispatchEvent(mouseEvent);
                    }}
                />
                {/* Mask canvas - hidden, for AI */}
                <canvas
                    ref={maskCanvasRef}
                    className="hidden"
                />
                
                {/* Mobile: Floating toolbar at bottom */}
                <div className="lg:hidden absolute bottom-4 left-0 right-0 px-4">
                  <div className="bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl p-3 space-y-2">
                    {/* Tool selector */}
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => setActiveTool('brush')}
                        className={`p-2 rounded-lg ${activeTool === 'brush' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setActiveTool('rectangle')}
                        className={`p-2 rounded-lg ${activeTool === 'rectangle' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <rect x="4" y="4" width="16" height="16" strokeWidth={2} rx="2"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => setActiveTool('ellipse')}
                        className={`p-2 rounded-lg ${activeTool === 'ellipse' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="8" strokeWidth={2}/>
                        </svg>
                      </button>
                      <button
                        onClick={() => setActiveTool('polygon')}
                        className={`p-2 rounded-lg ${activeTool === 'polygon' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21l3-9 9-3-9-3-3-9-3 9-9 3 9 3z" />
                        </svg>
                      </button>
                      <button
                        onClick={clearCanvas}
                        className="p-2 rounded-lg bg-red-600 text-white"
                      >
                        🗑️
                      </button>
                    </div>
                    
                    {/* Brush size */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-300 w-16">Cỡ: {brushSize}px</span>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={brushSize}
                        onChange={(e) => setBrushSize(Number(e.target.value))}
                        className="flex-1"
                      />
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={onCancel}
                        className="flex-1 py-2 bg-gray-700 text-white rounded-lg text-sm font-semibold"
                      >
                        Hủy
                      </button>
                      <button
                        onClick={handleEditSubmit}
                        className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold"
                      >
                        Thực hiện
                      </button>
                    </div>
                  </div>
                </div>
            </div>
            
            {/* Desktop: Sidebar panel */}
            <div className="hidden lg:flex w-96 flex-shrink-0 flex-col gap-2 overflow-y-auto">
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
                    className="w-full py-3 text-base bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors shadow-lg"
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
