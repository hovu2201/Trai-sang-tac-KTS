import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { RenovationResult } from '../types';
import {
  DownloadIcon,
  IconAngleLeft,
  IconAngleRight,
  IconCompare,
  IconEdit,
  IconNote,
  IconZoomIn,
  IconZoomOut,
} from './icons';

interface ImageComparatorProps {
  beforeImage: string;
  afterImage: string;
  onClose: () => void;
}

const ImageComparator: React.FC<ImageComparatorProps> = ({ beforeImage, afterImage, onClose }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };
  
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
      if(!isDragging) return;
      handleMove(e.touches[0].clientX);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-fade-in"
      onClick={onClose}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
        <style>{`
            .comparator-container::before {
                content: 'TRƯỚC';
                position: absolute;
                top: 1rem;
                left: 1rem;
                padding: 0.5rem 1rem;
                background-color: rgba(0, 0, 0, 0.7);
                color: white;
                font-weight: bold;
                border-radius: 0.5rem;
                pointer-events: none;
                z-index: 1;
            }
            .after-image-container::after {
                content: 'SAU';
                position: absolute;
                top: 1rem;
                right: 1rem;
                padding: 0.5rem 1rem;
                background-color: rgba(0, 0, 0, 0.7);
                color: white;
                font-weight: bold;
                border-radius: 0.5rem;
                pointer-events: none;
                z-index: 1;
            }
        `}</style>
      <div 
        ref={containerRef}
        className="relative w-full h-full max-w-[90vw] max-h-[90vh] select-none comparator-container"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={beforeImage}
          alt="Before"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />
        <div
          className="absolute inset-0 w-full h-full overflow-hidden after-image-container"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={afterImage}
            alt="After"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />
        </div>
        <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20"
            style={{ 
                left: `${sliderPosition}%`, 
                transform: 'translateX(-50%)',
                boxShadow: '0 0 10px rgba(0,0,0,0.5)' 
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 h-10 w-10 flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
            </div>
        </div>
      </div>
       <button
        className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300 z-[70]"
        aria-label="Close comparator"
        onClick={onClose}
      >
        &times;
      </button>
    </div>
  );
};


interface LightboxProps {
  results: RenovationResult[];
  currentIndex: number;
  onNavigate: (direction: 'next' | 'prev') => void;
  onClose: () => void;
  onEdit: (result: RenovationResult) => void;
  onNote: (result: RenovationResult) => void;
}

const Lightbox: React.FC<LightboxProps> = ({ results, currentIndex, onNavigate, onClose, onEdit, onNote }) => {
  const result = results[currentIndex];

  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [isComparing, setIsComparing] = useState(false);


  const resetZoom = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    resetZoom();
  }, [currentIndex, resetZoom]);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const zoomFactor = 1.1;
    const newScale = e.deltaY < 0 ? scale * zoomFactor : scale / zoomFactor;
    const clampedScale = Math.max(0.2, Math.min(10, newScale));

    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const imageX = (mouseX - offset.x) / scale;
    const imageY = (mouseY - offset.y) / scale;

    const newOffsetX = mouseX - imageX * clampedScale;
    const newOffsetY = mouseY - imageY * clampedScale;

    setScale(clampedScale);
    setOffset({ x: newOffsetX, y: newOffsetY });
  }, [scale, offset]);
  
  // Add wheel listener with passive: false
  useEffect(() => {
    const container = document.querySelector('[data-lightbox-container]');
    if (!container) return;
    
    container.addEventListener('wheel', handleWheel as any, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel as any);
  }, [handleWheel]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && scale > 1)) { // Middle mouse or left-click when zoomed
      e.preventDefault();
      e.stopPropagation();
      setIsPanning(true);
      setPanStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      e.preventDefault();
      const newOffsetX = e.clientX - panStart.x;
      const newOffsetY = e.clientY - panStart.y;
      setOffset({ x: newOffsetX, y: newOffsetY });
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isPanning) {
        e.stopPropagation();
        setIsPanning(false);
    }
  };

  const zoomWithButtons = (direction: 'in' | 'out') => {
      const zoomFactor = 1.5;
      const newScale = direction === 'in' ? scale * zoomFactor : scale / zoomFactor;
      const clampedScale = Math.max(0.2, Math.min(10, newScale));
      
      const container = document.querySelector('.lightbox-container');
      if(!container) return;

      const centerX = container.clientWidth / 2;
      const centerY = container.clientHeight / 2;

      const imageX = (centerX - offset.x) / scale;
      const imageY = (centerY - offset.y) / scale;

      const newOffsetX = centerX - imageX * clampedScale;
      const newOffsetY = centerY - imageY * clampedScale;
      
      setScale(clampedScale);
      setOffset({ x: newOffsetX, y: newOffsetY });
  };
  
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(result);
  };
  
  const handleNoteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNote(result);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (result?.sourceImageUrl) {
          setIsComparing(true);
      }
  };


  if (!result) return null;

  return (
    <>
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
      data-lightbox-container
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
      `}</style>

      <div
        className="relative w-full h-full flex items-center justify-center overflow-hidden lightbox-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsPanning(false)}
      >
        <div 
          className="relative" 
          onClick={(e) => e.stopPropagation()}
          style={{ 
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            cursor: isPanning ? 'grabbing' : (scale > 1 ? 'grab' : 'default'),
            transition: isPanning ? 'none' : 'transform 0.1s ease-out'
          }}
        >
          <img
            src={result.imageUrl}
            alt="Full screen view"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl pointer-events-none"
          />
        </div>
      </div>

      {result.description && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-4xl bg-black bg-opacity-70 text-white p-3 sm:p-4 text-xs sm:text-sm rounded-lg" onClick={e => e.stopPropagation()}>
            <p className="font-bold mb-1">Mô tả của AI:</p>
            <p className="italic">"{result.description}"</p>
        </div>
      )}

      <button
        className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300 z-10"
        aria-label="Close image viewer"
        onClick={onClose}
      >
        &times;
      </button>

      {results.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 text-white rounded-full hover:bg-black/60 transition-colors z-10"
            aria-label="Previous image"
            onClick={(e) => { e.stopPropagation(); onNavigate('prev'); }}
          >
            <IconAngleLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 text-white rounded-full hover:bg-black/60 transition-colors z-10"
            aria-label="Next image"
            onClick={(e) => { e.stopPropagation(); onNavigate('next'); }}
          >
            <IconAngleRight className="w-6 h-6" />
          </button>
        </>
      )}

      <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm p-1 rounded-lg flex items-center space-x-1 z-10" onClick={e => e.stopPropagation()}>
          <a href={result.imageUrl} download={`AIConcept-result-${result.id}.png`} className="p-2 text-white hover:bg-white/20 rounded-md" title="Tải về" onClick={(e) => e.stopPropagation()}>
              <DownloadIcon className="w-5 h-5" />
          </a>
          <button onClick={handleEditClick} className="p-2 text-white hover:bg-white/20 rounded-md" title="Chỉnh sửa">
              <IconEdit className="w-5 h-5" />
          </button>
          <button onClick={handleNoteClick} className="p-2 text-white hover:bg-white/20 rounded-md" title="Ghi chú">
            <IconNote className="w-5 h-5" />
          </button>
          <button 
              onClick={handleCompareClick} 
              className="p-2 text-white hover:bg-white/20 rounded-md disabled:opacity-50 disabled:cursor-not-allowed" 
              title="So sánh Trước/Sau"
              disabled={!result.sourceImageUrl}
          >
            <IconCompare className="w-5 h-5" />
          </button>
          <div className="w-px h-5 bg-white/20 mx-1"></div>
          <button onClick={() => zoomWithButtons('out')} className="p-2 text-white hover:bg-white/20 rounded-md" title="Thu nhỏ"><IconZoomOut className="w-5 h-5" /></button>
          <button onClick={resetZoom} className="px-3 py-1 text-sm text-white font-semibold hover:bg-white/20 rounded-md" title="Reset Zoom">{Math.round(scale * 100)}%</button>
          <button onClick={() => zoomWithButtons('in')} className="p-2 text-white hover:bg-white/20 rounded-md" title="Phóng to"><IconZoomIn className="w-5 h-5" /></button>
      </div>
    </div>
      {isComparing && result.sourceImageUrl && (
          <ImageComparator
            beforeImage={result.sourceImageUrl}
            afterImage={result.imageUrl}
            onClose={() => setIsComparing(false)}
          />
      )}
    </>
  );
};

export default Lightbox;