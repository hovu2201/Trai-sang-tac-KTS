import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import html2canvas from 'html2canvas';

import {
  LegendStyle,
  MarkerStyle,
  NoteState,
  NoteTool,
  NumberingStyle,
  RenovationResult,
  TextBox,
  TextStyle,
} from '../../types';
import {
  DownloadIcon,
  IconPlus,
  IconRedo,
  IconTrash,
  IconUndo,
} from '../icons';
import ConfirmExitModal from './ConfirmExitModal';
import CropOptionsPanel from './CropOptionsPanel';
import Draggable from './Draggable';
import LegendOptionsPanel from './LegendOptionsPanel';
import MarkerItem from './MarkerItem';
import MarkerOptionsPanel from './MarkerOptionsPanel';
import NoteLegend from './NoteLegend';
import NoteToolbar from './NoteToolbar';
import TextBoxItem from './TextBoxItem';
import TextOptionsPanel from './TextOptionsPanel';

const DEFAULT_MARKER_STYLE: MarkerStyle = { shape: 'circle', backgroundColor: '#ff0000', backgroundOpacity: 0.8, borderColor: '#ffffff', borderWidth: 2, textColor: '#ffffff', fontFamily: 'Be Vietnam Pro', fontSize: 3.5, fontWeight: 'bold', fontStyle: 'normal' };
const DEFAULT_TEXT_STYLE: TextStyle = { fontFamily: 'Be Vietnam Pro', fontSize: 2.5, fontWeight: 'normal', fontStyle: 'normal', textAlign: 'left', color: '#ffffff', backgroundColor: '#000000', backgroundOpacity: 0.6, borderRadius: 8, borderColor: '#ffffff', borderWidth: 0, padding: 8 };
const DEFAULT_LEGEND_STYLE: LegendStyle = { title: 'Chú thích', backgroundColor: '#000000', backgroundOpacity: 0.7, borderColor: '#ffffff', borderWidth: 1, borderRadius: 8, textColor: '#ffffff', fontFamily: 'Be Vietnam Pro', fontSize: 2, titleFontSize: 2.5, fontWeight: 'normal', fontStyle: 'normal', textAlign: 'left', showDividers: true };

interface NoteEditorProps {
    imageToNote: RenovationResult;
    onSave: (notedImageDataUrl: string) => void;
    onExit: () => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ imageToNote, onSave, onExit }) => {
    const [history, setHistory] = useState<NoteState[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [hasChanges, setHasChanges] = useState(false);
    const [showMobilePanel, setShowMobilePanel] = useState(false);

    const currentState = history[historyIndex];
    const { markers = [], textBoxes = [], legendBox = null, image = null } = currentState || {};

    const [activeTool, setActiveTool] = useState<NoteTool>('marker');
    const [selectedElement, setSelectedElement] = useState<{ type: 'marker' | 'text' | 'legend', id: string } | null>(null);
    const [numberingStyle, setNumberingStyle] = useState<NumberingStyle>('123');
    const [nextLabel, setNextLabel] = useState<string>('1');

    const [defaultMarkerStyle, setDefaultMarkerStyle] = useState<MarkerStyle>(DEFAULT_MARKER_STYLE);
    const [defaultTextStyle, setDefaultTextStyle] = useState<TextStyle>(DEFAULT_TEXT_STYLE);

    const [isExitModalOpen, setIsExitModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [transform, setTransform] = useState({ scale: 1, offsetX: 0, offsetY: 0 });
    const isPanning = useRef(false);
    const panStart = useRef({ x: 0, y: 0 });

    const isCropping = useRef(false);
    const cropStartPoint = useRef({ x: 0, y: 0 });
    const [cropRect, setCropRect] = useState<{ x: number, y: number, width: number, height: number } | null>(null);
    const [cropAspectRatio, setCropAspectRatio] = useState<number | null>(null);
    const [cropFillColor, setCropFillColor] = useState('#ffffff');
    const [isPickingColor, setIsPickingColor] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const editorContentRef = useRef<HTMLDivElement>(null);
    
    const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
    const contentInputRef = useRef<HTMLTextAreaElement>(null);

    const updateState = useCallback((updater: (prevState: NoteState) => NoteState, overwriteLast: boolean = false) => {
        setHistory(prevHistory => {
            const prevState = prevHistory[historyIndex];
            if (!prevState) return prevHistory;
            const newState = updater(prevState);
            const newHistory = overwriteLast ? prevHistory.slice(0, historyIndex) : prevHistory.slice(0, historyIndex + 1);
            const finalHistory = [...newHistory, newState];
            setHistoryIndex(finalHistory.length - 1);
            return finalHistory;
        });
        if (!overwriteLast) {
            setHasChanges(true);
        }
    }, [historyIndex]);

    const handleUndo = useCallback(() => {
        if (historyIndex > 0) setHistoryIndex(prev => prev - 1);
    }, [historyIndex]);

    const handleRedo = useCallback(() => {
        if (historyIndex < history.length - 1) setHistoryIndex(prev => prev + 1);
    }, [historyIndex, history.length]);

    useEffect(() => {
        const initialState: NoteState = {
            markers: [], textBoxes: [], legendBox: null,
            image: {
                url: imageToNote.imageUrl, width: imageToNote.width || 1024, height: imageToNote.height || 1024,
                originalUrl: imageToNote.imageUrl,
            },
        };
        setHistory([initialState]);
        setHistoryIndex(0);
        setHasChanges(false);
    }, [imageToNote]);
    
    const toRoman = (num: number): string => {
        const roman: { [key: string]: number } = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
        let str = ''; for (let i of Object.keys(roman)) { let q = Math.floor(num / roman[i]); num -= q * roman[i]; str += i.repeat(q); } return str;
    };

    useEffect(() => {
        if (!markers) return;
        // Tìm số lớn nhất trong các markers hiện tại
        let currentMaxNumber = 0;
        markers.forEach(marker => {
            // Thử parse theo từng loại numbering
            let num = 0;
            if (numberingStyle === 'ABC') {
                // Chuyển A->1, B->2, etc
                num = marker.label.charCodeAt(0) - 64;
            } else if (numberingStyle === 'roman') {
                // Roman numerals - đơn giản hóa: đếm số markers
                const romanMap: {[key: string]: number} = { 'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5, 'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10 };
                num = romanMap[marker.label] || 0;
            } else {
                // Numbering style 123
                num = parseInt(marker.label, 10);
            }
            if (!isNaN(num) && num > currentMaxNumber) {
                currentMaxNumber = num;
            }
        });
        
        const nextNum = currentMaxNumber + 1;
        let label: string;
        switch (numberingStyle) {
            case 'ABC': label = String.fromCharCode(64 + nextNum); break;
            case 'roman': label = toRoman(nextNum); break;
            default: label = nextNum.toString();
        }
        setNextLabel(label);
    }, [markers, numberingStyle]);

    useLayoutEffect(() => {
        if (!image || !containerRef.current) return;
        const container = containerRef.current;
        const { width: imageWidth, height: imageHeight } = image;
        const containerRect = container.getBoundingClientRect();
        if (containerRect.width === 0 || containerRect.height === 0) return;
        const imageAspectRatio = imageWidth / imageHeight;
        const containerAspectRatio = containerRect.width / containerRect.height;
        let scale = Math.min(1, (imageAspectRatio > containerAspectRatio) ? containerRect.width / imageWidth : containerRect.height / imageHeight);
        scale = Math.min(scale * 0.95, 1);
        const scaledWidth = imageWidth * scale;
        const scaledHeight = imageHeight * scale;
        const offsetX = (containerRect.width - scaledWidth) / 2;
        const offsetY = (containerRect.height - scaledHeight) / 2;
        setTransform({ scale, offsetX, offsetY });
    }, [image]);
    
    const getMousePosOnImagePercent = useCallback((e: React.MouseEvent | MouseEvent) => {
        const container = editorContentRef.current;
        if (!container) return { x: 0, y: 0 };
    
        const rect = container.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return { x: 0, y: 0 };
    
        const xInPixels = e.clientX - rect.left;
        const yInPixels = e.clientY - rect.top;

        const xPercent = (xInPixels / rect.width) * 100;
        const yPercent = (yInPixels / rect.height) * 100;
    
        return { x: xPercent, y: yPercent };
    }, []);

    const handleContainerMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.button === 1) { // Middle mouse button for panning
            isPanning.current = true;
            panStart.current = { x: e.clientX - transform.offsetX, y: e.clientY - transform.offsetY };
            e.preventDefault();
        }
    };

    const handleEditorMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.button !== 0) return;
        
        const target = e.target as HTMLElement;
        if (target !== editorContentRef.current && !target.closest(`[data-id="editor-content"]`)) {
            return;
        }

        const posPercent = getMousePosOnImagePercent(e);
        if (!editorContentRef.current) return;
        
        if (activeTool === 'crop') {
            isCropping.current = true;
            const rect = editorContentRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            cropStartPoint.current = { x, y };
            setCropRect({ x, y, width: 0, height: 0 });
            return;
        }
        
        if (activeTool === 'marker') {
            const newId = `m-${Date.now()}`;
            updateState(s => ({ ...s, markers: [...s.markers, { id: newId, x: posPercent.x, y: posPercent.y, label: nextLabel, style: defaultMarkerStyle, description: '' }] }));
            setSelectedElement({type: 'marker', id: newId });
        }
        if (activeTool === 'text') {
            const newId = `t-${Date.now()}`;
            const newTextBox: TextBox = { id: newId, x: posPercent.x, y: posPercent.y, width: 30, height: 'auto', content: 'Nhập văn bản...', style: defaultTextStyle };
            updateState(s => ({ ...s, textBoxes: [...s.textBoxes, newTextBox] }));
            setSelectedElement({type: 'text', id: newId });
        }
        if (activeTool === 'select') {
             setSelectedElement(null);
        }
    };
    
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isPanning.current) {
            setTransform(prev => ({ ...prev, offsetX: e.clientX - panStart.current.x, offsetY: e.clientY - panStart.current.y }));
            return;
        }
        if (isCropping.current && cropStartPoint.current && image) {
            const rect = editorContentRef.current!.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            let width = x - cropStartPoint.current.x;
            let height = y - cropStartPoint.current.y;
            if (cropAspectRatio) {
                if (Math.abs(width / height) > cropAspectRatio) height = width / cropAspectRatio * Math.sign(height) * Math.sign(width);
                else width = height * cropAspectRatio * Math.sign(height) * Math.sign(width);
            }
            setCropRect({ x: cropStartPoint.current.x, y: cropStartPoint.current.y, width, height });
        }
    };
    
    const handleMouseUp = () => {
        isPanning.current = false;
        isCropping.current = false;
    };
    
    const handleWheel = useCallback((e: WheelEvent) => {
        e.preventDefault();
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const imageX = (mouseX - transform.offsetX) / transform.scale;
        const imageY = (mouseY - transform.offsetY) / transform.scale;

        const zoomFactor = 1.1;
        const newScale = e.deltaY < 0 ? transform.scale * zoomFactor : transform.scale / zoomFactor;
        const clampedScale = Math.max(0.1, Math.min(10, newScale));

        const newOffsetX = mouseX - imageX * clampedScale;
        const newOffsetY = mouseY - imageY * clampedScale;
        setTransform({ scale: clampedScale, offsetX: newOffsetX, offsetY: newOffsetY });
    }, [transform]);
    
    // Add wheel listener with passive: false to allow preventDefault
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        
        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, [handleWheel]);

    const handleDoubleClick = (type: 'marker' | 'text' | 'legend', id: string) => {
        if (type === 'marker') {
            setSelectedElement({type: 'marker', id});
        }
        if (type === 'text') {
            setSelectedElement({type: 'text', id});
            setTimeout(() => contentInputRef.current?.focus(), 50);
        }
        if (type === 'legend') {
             setSelectedElement({type: 'legend', id});
        }
    };

    const addLegend = () => {
        if (legendBox) return;
        const newId = `l-${Date.now()}`;
        updateState(s => ({ ...s, legendBox: { id: newId, x: 70, y: 10, width: 28, height: 40, style: DEFAULT_LEGEND_STYLE } }));
        setSelectedElement({type: 'legend', id: newId });
    };

    const deleteSelected = () => {
        if (!selectedElement) return;
        const { type, id } = selectedElement;
        updateState(s => {
            if (type === 'marker') return { ...s, markers: s.markers.filter(m => m.id !== id) };
            if (type === 'text') return { ...s, textBoxes: s.textBoxes.filter(t => t.id !== id) };
            if (type === 'legend') return { ...s, legendBox: null };
            return s;
        });
        setSelectedElement(null);
    };
    
    const getAutoFillColor = () => {
        if (!image) return '#ffffff';
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = image.width; tempCanvas.height = image.height;
        const ctx = tempCanvas.getContext('2d');
        if (!ctx) return '#ffffff';
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = image.url;
        ctx.drawImage(img, 0, 0);
        const edgeData = ctx.getImageData(image.width - 1, 0, 1, image.height).data;
        let r = 0, g = 0, b = 0;
        for (let i = 0; i < edgeData.length; i += 4) { r += edgeData[i]; g += edgeData[i+1]; b += edgeData[i+2]; }
        const count = edgeData.length / 4;
        r = Math.round(r / count); g = Math.round(g / count); b = Math.round(b / count);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    };

    useEffect(() => {
        if(activeTool === 'crop') setCropFillColor(getAutoFillColor());
    }, [activeTool, image?.url]);

    const handlePickColor = () => {
        setIsPickingColor(true);
        alert('Di chuyển chuột trên ảnh và nhấp để chọn màu nền.');
    };

    const handleColorPickClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isPickingColor || !image) return;
        e.preventDefault(); e.stopPropagation();
        const { x, y } = getMousePosOnImagePercent(e);
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = image.width; tempCanvas.height = image.height;
        const ctx = tempCanvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = image.url;
        ctx.drawImage(img, 0, 0);
        const pixel = ctx.getImageData(x * image.width / 100, y * image.height / 100, 1, 1).data;
        setCropFillColor(`rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`);
        setIsPickingColor(false);
    };

    const handleApplyCrop = () => {
        if (!cropRect || !image) return;
        const newWidth = Math.abs(cropRect.width / transform.scale); const newHeight = Math.abs(cropRect.height / transform.scale);
        if (newWidth < 1 || newHeight < 1) return;
        
        const cropX = Math.min(cropRect.x, cropRect.x + cropRect.width) / transform.scale;
        const cropY = Math.min(cropRect.y, cropRect.y + cropRect.height) / transform.scale;

        const newCanvas = document.createElement('canvas');
        newCanvas.width = newWidth; newCanvas.height = newHeight;
        const ctx = newCanvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = cropFillColor;
        ctx.fillRect(0, 0, newWidth, newHeight);

        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            ctx.drawImage(img, cropX, cropY, newWidth, newHeight, 0, 0, newWidth, newHeight);

            const oldImage = image;
            const newImageDataUrl = newCanvas.toDataURL('image/png');

            updateState(s => {
                const transformX = (val: number) => (oldImage.width * val / 100 - cropX) / newWidth * 100;
                const transformY = (val: number) => (oldImage.height * val / 100 - cropY) / newHeight * 100;
                const scaleW = (val: number) => val * oldImage.width / newWidth;
                const scaleH = (val: number | 'auto') => typeof val === 'number' ? val * oldImage.height / newHeight : 'auto';

                return {
                    ...s,
                    image: { ...s.image, url: newImageDataUrl, width: newWidth, height: newHeight, originalUrl: newImageDataUrl },
                    markers: s.markers.map(m => ({ ...m, x: transformX(m.x), y: transformY(m.y) })),
                    textBoxes: s.textBoxes.map(t => ({ ...t, x: transformX(t.x), y: transformY(t.y), width: scaleW(t.width), height: scaleH(t.height) })),
                    legendBox: s.legendBox ? { ...s.legendBox, x: transformX(s.legendBox.x), y: transformY(s.legendBox.y), width: scaleW(s.legendBox.width), height: s.legendBox.height * oldImage.height / newHeight } : null
                };
            });

            setActiveTool('select');
            setCropRect(null);
        };
        img.src = image.url;
    };

    const handleCancelCrop = () => {
        setActiveTool('select');
        setCropRect(null);
    };
    
    const exportImage = async () => {
        if (!editorContentRef.current) return;
        setIsSaving(true);
        setSelectedElement(null); 
        await new Promise(r => setTimeout(r, 50)); 
        
        try {
            const canvas = await html2canvas(editorContentRef.current, {
                useCORS: true,
                backgroundColor: null,
                scale: 2, 
            });
            onSave(canvas.toDataURL('image/png'));
        } catch (e) {
            console.error("Lỗi khi xuất ảnh:", e);
        } finally {
            setIsSaving(false);
        }
    };
    
    const handleDownload = async () => {
        if (!editorContentRef.current) return;
        setIsSaving(true);
        setSelectedElement(null);
        await new Promise(r => setTimeout(r, 50));
        
        try {
            const canvas = await html2canvas(editorContentRef.current, { useCORS: true, backgroundColor: null, scale: 2 });
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `ghichu-${imageToNote.id}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (e) {
            console.error("Lỗi khi tải ảnh:", e);
        } finally {
             setIsSaving(false);
        }
    };

    const handleExitRequest = () => hasChanges ? setIsExitModalOpen(true) : onExit();

    const editorStyle: React.CSSProperties = image ? {
        width: `${image.width}px`,
        height: `${image.height}px`,
        aspectRatio: `${image.width} / ${image.height}`,
    } : { display: 'none' };
    
    const selectedMarker = selectedElement?.type === 'marker' ? markers.find(m => m.id === selectedElement.id) : null;
    const selectedTextBox = selectedElement?.type === 'text' ? textBoxes.find(t => t.id === selectedElement.id) : null;
    
    return (
        <div className="w-screen h-screen bg-gray-900 flex flex-col text-white overflow-hidden">
            <header className="flex-shrink-0 p-2 lg:p-3 flex items-center justify-between bg-gray-800 z-20">
                <div className="flex items-center gap-1 lg:gap-2">
                    <button onClick={handleExitRequest} className="px-3 lg:px-4 py-1.5 lg:py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-xs lg:text-sm font-semibold">Thoát</button>
                    <div className="hidden lg:flex items-center gap-2">
                      <NoteToolbar activeTool={activeTool} onToolSelect={(tool) => { setActiveTool(tool); setSelectedElement(null); }} />
                      <button onClick={handleUndo} disabled={historyIndex <= 0} className="p-2.5 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"><IconUndo className="w-5 h-5"/></button>
                      <button onClick={handleRedo} disabled={historyIndex >= history.length - 1} className="p-2.5 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"><IconRedo className="w-5 h-5"/></button>
                      {!legendBox && <button onClick={addLegend} className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 text-xs font-semibold flex items-center gap-1"><IconPlus className="w-4 h-4" /> Bảng chú thích</button>}
                      {selectedElement && <button onClick={deleteSelected} className="p-2 bg-red-600/50 text-red-200 rounded-lg hover:bg-red-600/80"><IconTrash className="w-5 h-5"/></button>}
                    </div>
                    {/* Mobile: Menu button */}
                    <button
                      onClick={() => setShowMobilePanel(!showMobilePanel)}
                      className="lg:hidden p-2 bg-gray-700 rounded-lg"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                </div>
                <div className="flex items-center gap-1 lg:gap-2">
                    <button onClick={handleDownload} disabled={isSaving} className="hidden sm:flex px-3 lg:px-4 py-1.5 lg:py-2 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors text-xs lg:text-sm font-bold disabled:bg-gray-400 items-center gap-1 lg:gap-2">
                        <DownloadIcon className="w-4 h-4 lg:w-5 lg:h-5"/> Tải về
                    </button>
                    <button onClick={exportImage} disabled={isSaving} className="px-4 lg:px-6 py-1.5 lg:py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors text-xs lg:text-sm font-bold disabled:bg-indigo-400">
                        {isSaving ? 'Lưu...' : 'Hoàn thành'}
                    </button>
                </div>
            </header>
            
            <main className="flex-grow flex flex-col lg:flex-row min-h-0">
                {/* Desktop: Sidebar */}
                <div className="hidden lg:block w-80 flex-shrink-0 h-full bg-gray-800 border-r border-gray-700 p-4 overflow-y-auto">
                    {activeTool === 'crop' && !selectedElement && <CropOptionsPanel aspectRatio={cropAspectRatio} setAspectRatio={setCropAspectRatio} fillColor={cropFillColor} setFillColor={setCropFillColor} onApply={handleApplyCrop} onCancel={handleCancelCrop} onPickColor={handlePickColor} />}
                    {activeTool === 'marker' && !selectedElement && <MarkerOptionsPanel numberingStyle={numberingStyle} setNumberingStyle={setNumberingStyle} markerStyle={defaultMarkerStyle} setMarkerStyle={setDefaultMarkerStyle} />}
                    {activeTool === 'text' && !selectedElement && <TextOptionsPanel textStyle={defaultTextStyle} setTextStyle={setDefaultTextStyle} />}
                    {selectedMarker && <MarkerOptionsPanel numberingStyle={numberingStyle} setNumberingStyle={setNumberingStyle} markerStyle={selectedMarker.style} setMarkerStyle={style => updateState(s => ({...s, markers: s.markers.map(m => m.id === selectedMarker!.id ? {...m, style} : m)}), true)} description={selectedMarker.description} onDescriptionChange={desc => updateState(s => ({...s, markers: s.markers.map(m => m.id === selectedMarker!.id ? {...m, description: desc} : m)}), true)} inputRef={descriptionInputRef} />}
                    {selectedTextBox && <TextOptionsPanel textStyle={selectedTextBox.style} setTextStyle={style => updateState(s => ({...s, textBoxes: s.textBoxes.map(t => t.id === selectedTextBox!.id ? {...t, style} : t)}), true)} content={selectedTextBox.content} onContentChange={content => updateState(s => ({...s, textBoxes: s.textBoxes.map(t => t.id === selectedTextBox!.id ? {...t, content, height: 'auto' } : t)}), true)} inputRef={contentInputRef} />}
                    {selectedElement?.type === 'legend' && legendBox && <LegendOptionsPanel markers={markers} onDescriptionChange={(id, desc) => updateState(s => ({...s, markers: s.markers.map(m => m.id === id ? {...m, description: desc} : m)}), true)} legendStyle={legendBox.style} setLegendStyle={style => updateState(s => ({...s, legendBox: s.legendBox ? {...s.legendBox, style} : null}), true)} />}
                </div>

                <div className="flex-grow flex items-center justify-center p-2 lg:p-4 overflow-hidden relative" 
                    ref={containerRef}
                    onMouseDown={handleContainerMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    style={{ cursor: isPanning.current ? 'grabbing' : (activeTool === 'select' ? 'default' : (isPickingColor ? 'copy' : 'crosshair')) }}
                >
                    <div style={{ transform: `translate(${transform.offsetX}px, ${transform.offsetY}px) scale(${transform.scale})`, transformOrigin: 'top left', willChange: 'transform' }}>
                        {image && (
                        <div ref={editorContentRef} style={editorStyle} className="relative shadow-lg bg-black" data-id="editor-content" 
                             onMouseDown={handleEditorMouseDown}
                             onClick={isPickingColor ? handleColorPickClick : undefined}
                        >
                            <img src={image.url} alt="For noting" className="w-full h-full object-contain select-none pointer-events-none" crossOrigin="anonymous"/>
                            
                            {markers.map(marker => (
                                <MarkerItem key={marker.id} marker={marker} isSelected={selectedElement?.id === marker.id} onSelect={setSelectedElement} onDoubleClick={handleDoubleClick} updateState={updateState} containerRef={editorContentRef} />
                            ))}
                            {textBoxes.map(box => (
                                <TextBoxItem key={box.id} box={box} isSelected={selectedElement?.id === box.id} onSelect={setSelectedElement} onDoubleClick={handleDoubleClick} updateState={updateState} containerRef={editorContentRef} />
                            ))}
                            {legendBox && (
                                <Draggable
                                    key={legendBox.id}
                                    initialPosition={{x: legendBox.x, y: legendBox.y}}
                                    size={{width: legendBox.width, height: legendBox.height}}
                                    onDrag={(pos) => updateState(s => ({...s, legendBox: s.legendBox ? {...s.legendBox, ...pos} : null }), true)}
                                    onDragEnd={() => updateState(s => s)}
                                    onResizeEnd={(size) => updateState(s => ({...s, legendBox: s.legendBox ? {...s.legendBox, ...size} : null}))}
                                    containerRef={editorContentRef}
                                    className={`group ${selectedElement?.id === legendBox.id ? 'outline outline-2 outline-indigo-500 outline-offset-2' : ''}`}
                                    onClick={(e) => { e.stopPropagation(); setSelectedElement({type: 'legend', id: legendBox.id})}}
                                    onDoubleClick={(e) => { e.stopPropagation(); handleDoubleClick('legend', legendBox.id)}}
                                    resizable={selectedElement?.id === legendBox.id}
                                >
                                    <NoteLegend 
                                        markers={markers} 
                                        onDescriptionChange={(id, desc) => updateState(s => ({...s, markers: s.markers.map(m => m.id === id ? {...m, description: desc} : m)}), true)} 
                                        legendBox={legendBox} 
                                        onTitleChange={(title) => updateState(s => ({...s, legendBox: s.legendBox ? {...s.legendBox, style: {...s.legendBox.style, title}} : null}), true)} />
                                </Draggable>
                            )}

                            {activeTool === 'crop' && cropRect && (
                                <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{width: image.width, height: image.height}}>
                                    <div className="absolute top-0 left-0 w-full h-full bg-black/50" style={{ clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% ${cropRect.y}px, ${cropRect.x}px ${cropRect.y}px, ${cropRect.x}px ${cropRect.y+cropRect.height}px, ${cropRect.x+cropRect.width}px ${cropRect.y+cropRect.height}px, ${cropRect.x+cropRect.width}px ${cropRect.y}px, 0 ${cropRect.y}px)`}}></div>
                                    <div className="absolute border-2 border-dashed border-white" style={{ left: Math.min(cropRect.x, cropRect.x+cropRect.width), top: Math.min(cropRect.y, cropRect.y+cropRect.height), width: Math.abs(cropRect.width), height: Math.abs(cropRect.height) }}></div>
                                </div>
                            )}
                        </div>
                        )}
                    </div>
                     <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs rounded-md p-2 pointer-events-none backdrop-blur-sm">
                        <p>Zoom: {Math.round(transform.scale * 100)}%</p>
                        <p>X: {Math.round(transform.offsetX)}, Y: {Math.round(transform.offsetY)}</p>
                    </div>
                    
                    {/* Mobile: Bottom drawer */}
                    {showMobilePanel && (
                      <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-gray-800 rounded-t-3xl shadow-2xl max-h-[60vh] overflow-y-auto z-30">
                        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-3 flex justify-between items-center">
                          <h3 className="font-bold text-sm">Công cụ</h3>
                          <button onClick={() => setShowMobilePanel(false)} className="p-1 hover:bg-gray-700 rounded">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <div className="p-4 space-y-3">
                          <NoteToolbar activeTool={activeTool} onToolSelect={(tool) => { setActiveTool(tool); setSelectedElement(null); }} />
                          <div className="flex gap-2">
                            <button onClick={handleUndo} disabled={historyIndex <= 0} className="flex-1 p-2 bg-gray-700 rounded-lg disabled:opacity-50 text-sm">
                              <IconUndo className="w-4 h-4 mx-auto"/>
                              <span className="text-xs">Undo</span>
                            </button>
                            <button onClick={handleRedo} disabled={historyIndex >= history.length - 1} className="flex-1 p-2 bg-gray-700 rounded-lg disabled:opacity-50 text-sm">
                              <IconRedo className="w-4 h-4 mx-auto"/>
                              <span className="text-xs">Redo</span>
                            </button>
                          </div>
                          {!legendBox && <button onClick={addLegend} className="w-full p-2 bg-gray-700 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"><IconPlus className="w-4 h-4" /> Thêm bảng chú thích</button>}
                          {selectedElement && <button onClick={deleteSelected} className="w-full p-2 bg-red-600 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"><IconTrash className="w-4 h-4" /> Xóa</button>}
                          
                          {/* Options panels */}
                          {activeTool === 'crop' && !selectedElement && <CropOptionsPanel aspectRatio={cropAspectRatio} setAspectRatio={setCropAspectRatio} fillColor={cropFillColor} setFillColor={setCropFillColor} onApply={handleApplyCrop} onCancel={handleCancelCrop} onPickColor={handlePickColor} />}
                          {activeTool === 'marker' && !selectedElement && <MarkerOptionsPanel numberingStyle={numberingStyle} setNumberingStyle={setNumberingStyle} markerStyle={defaultMarkerStyle} setMarkerStyle={setDefaultMarkerStyle} />}
                          {activeTool === 'text' && !selectedElement && <TextOptionsPanel textStyle={defaultTextStyle} setTextStyle={setDefaultTextStyle} />}
                          {selectedMarker && <MarkerOptionsPanel numberingStyle={numberingStyle} setNumberingStyle={setNumberingStyle} markerStyle={selectedMarker.style} setMarkerStyle={style => updateState(s => ({...s, markers: s.markers.map(m => m.id === selectedMarker!.id ? {...m, style} : m)}), true)} description={selectedMarker.description} onDescriptionChange={desc => updateState(s => ({...s, markers: s.markers.map(m => m.id === selectedMarker!.id ? {...m, description: desc} : m)}), true)} inputRef={descriptionInputRef} />}
                          {selectedTextBox && <TextOptionsPanel textStyle={selectedTextBox.style} setTextStyle={style => updateState(s => ({...s, textBoxes: s.textBoxes.map(t => t.id === selectedTextBox!.id ? {...t, style} : t)}), true)} content={selectedTextBox.content} onContentChange={content => updateState(s => ({...s, textBoxes: s.textBoxes.map(t => t.id === selectedTextBox!.id ? {...t, content, height: 'auto' } : t)}), true)} inputRef={contentInputRef} />}
                          {selectedElement?.type === 'legend' && legendBox && <LegendOptionsPanel markers={markers} onDescriptionChange={(id, desc) => updateState(s => ({...s, markers: s.markers.map(m => m.id === id ? {...m, description: desc} : m)}), true)} legendStyle={legendBox.style} setLegendStyle={style => updateState(s => ({...s, legendBox: s.legendBox ? {...s.legendBox, style} : null}), true)} />}
                        </div>
                      </div>
                    )}
                </div>
            </main>
            <ConfirmExitModal isOpen={isExitModalOpen} onConfirm={onExit} onCancel={() => setIsExitModalOpen(false)} />
        </div>
    );
};