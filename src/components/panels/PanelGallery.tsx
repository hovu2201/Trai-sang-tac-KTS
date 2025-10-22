import React, {
  useEffect,
  useState,
} from 'react';

import {
  getDirectoryName,
  isFileSystemSupported,
  openLocalDirectory,
  requestDirectoryAccess,
} from '../../services/fileSystemService';
import {
  deleteFromGallery,
  downloadAllImagesAsZip,
  GalleryImage,
  getGalleryImages,
  getStorageInfo,
  toggleFavorite,
} from '../../services/galleryService';
import { RenovationResult } from '../../types';

interface PanelGalleryProps {
  onSelectImage: (image: RenovationResult) => void;
  onEditImage: (image: RenovationResult) => void;
  onViewImage: (image: RenovationResult) => void;
  onGenerateFromImage: (image: RenovationResult) => void;
  onNoteImage: (image: RenovationResult) => void;
  onGenerateAngle: (image: RenovationResult) => void;
  onGenerate2D: (image: RenovationResult) => void;
}

type SortOption = 'newest' | 'oldest' | 'favorites';
type ViewMode = 'grid' | 'list';

export const PanelGallery: React.FC<PanelGalleryProps> = ({
  onSelectImage,
  onEditImage,
  onViewImage,
  onGenerateFromImage,
  onNoteImage,
  onGenerateAngle,
  onGenerate2D,
}) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [localDirectory, setLocalDirectory] = useState<string | null>(null);
  const [storageInfo, setStorageInfo] = useState({ used: 0, max: 0, percentage: 0, count: 0 });

  // Load images and storage info
  useEffect(() => {
    loadImages();
    updateStorageInfo();
    setLocalDirectory(getDirectoryName());
  }, []);

  const updateStorageInfo = () => {
    const info = getStorageInfo();
    setStorageInfo(info);
  };

  // Filter and sort images
  useEffect(() => {
    let filtered = [...images];

    // Filter by favorites
    if (showFavoritesOnly) {
      filtered = filtered.filter(img => img.favorite);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        img =>
          img.prompt?.toLowerCase().includes(term) ||
          img.description?.toLowerCase().includes(term) ||
          img.tags?.some(tag => tag.toLowerCase().includes(term))
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case 'oldest':
        filtered.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case 'favorites':
        filtered.sort((a, b) => {
          if (a.favorite && !b.favorite) return -1;
          if (!a.favorite && b.favorite) return 1;
          return b.createdAt - a.createdAt;
        });
        break;
    }

    setFilteredImages(filtered);
  }, [images, sortBy, showFavoritesOnly, searchTerm]);

  const loadImages = () => {
    const loaded = getGalleryImages();
    setImages(loaded);
    updateStorageInfo();
  };

  const handleSelectDirectory = async () => {
    const success = await requestDirectoryAccess();
    if (success) {
      setLocalDirectory(getDirectoryName());
      alert('Đã chọn thư mục lưu trữ thành công!\n\nCác ảnh mới sẽ được lưu vào thư mục này.');
    }
  };

  const handleOpenDirectory = async () => {
    await openLocalDirectory();
  };

  const handleDownloadZip = async () => {
    if (images.length === 0) {
      alert('Thư viện trống!');
      return;
    }
    
    const confirmed = window.confirm(
      `Tải về ${images.length} ảnh dưới dạng file ZIP?\n\nQuá trình này có thể mất vài giây.`
    );
    
    if (confirmed) {
      await downloadAllImagesAsZip(images);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Bạn có chắc muốn xóa ảnh này khỏi thư viện?')) {
      deleteFromGallery(id);
      loadImages();
    }
  };

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(id);
    loadImages();
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-3 lg:mb-4 px-3 lg:px-0">
        <div className="flex items-start justify-between gap-2 lg:gap-3 mb-2 lg:mb-3">
          <div>
            <h2 className="text-lg lg:text-2xl font-bold mb-0.5 lg:mb-1 text-gray-900 dark:text-gray-100">
              Thư viện Ảnh
            </h2>
            <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
              {images.length} ảnh • {images.filter(img => img.favorite).length} yêu thích
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-1.5 lg:gap-2">
            {isFileSystemSupported() && (
              <>
                <button
                  onClick={handleSelectDirectory}
                  className="px-2 lg:px-3 py-1.5 lg:py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-[10px] lg:text-xs font-medium transition-colors flex items-center gap-1"
                  title="Chọn thư mục lưu trữ trên máy"
                >
                  <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  <span className="hidden lg:inline">Chọn thư mục</span>
                </button>
                
                {localDirectory && (
                  <button
                    onClick={handleOpenDirectory}
                    className="px-2 lg:px-3 py-1.5 lg:py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-[10px] lg:text-xs font-medium transition-colors flex items-center gap-1"
                    title="Xem thông tin thư mục đã lưu"
                  >
                    <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                    </svg>
                    <span className="hidden lg:inline">Mở</span>
                  </button>
                )}
              </>
            )}
            
            <button
              onClick={handleDownloadZip}
              disabled={images.length === 0}
              className="px-2 lg:px-3 py-1.5 lg:py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg text-[10px] lg:text-xs font-medium transition-colors flex items-center gap-1"
              title="Tải tất cả ảnh về máy (ZIP)"
            >
              <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>ZIP</span>
            </button>
          </div>
        </div>

        {/* Storage Info */}
        <div className="space-y-1.5 lg:space-y-2">
          {/* Local Directory Info */}
          {localDirectory && (
            <div className="flex items-center gap-1.5 lg:gap-2 p-1.5 lg:p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-[10px] lg:text-xs text-blue-700 dark:text-blue-300">
              <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="truncate">Lưu vào: {localDirectory}</span>
            </div>
          )}

          {/* Storage Usage Bar */}
          <div>
            <div className="flex items-center justify-between text-[10px] lg:text-xs text-gray-600 dark:text-gray-400 mb-0.5 lg:mb-1">
              <span>Bộ nhớ trình duyệt: {storageInfo.count} ảnh</span>
              <span className={storageInfo.percentage > 80 ? 'text-red-600 dark:text-red-400 font-semibold' : ''}>
                {storageInfo.percentage}%
              </span>
            </div>
            <div className="h-1.5 lg:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  storageInfo.percentage > 90
                    ? 'bg-red-500'
                    : storageInfo.percentage > 70
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(storageInfo.percentage, 100)}%` }}
              />
            </div>
            {storageInfo.percentage > 80 && (
              <p className="text-[10px] lg:text-xs text-red-600 dark:text-red-400 mt-0.5 lg:mt-1">
                ⚠️ Gần đầy! Hãy tải ảnh về máy hoặc chọn thư mục lưu trữ.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-3 lg:mb-4 space-y-2 lg:space-y-3 px-3 lg:px-0">
        {/* Search */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm theo mô tả, từ khóa..."
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        {/* Filter & Sort Row */}
        <div className="flex gap-2 items-center flex-wrap">
          {/* Favorites Filter */}
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              showFavoritesOnly
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            ⭐ Yêu thích
          </button>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="favorites">Yêu thích trước</option>
          </select>

          {/* View Mode */}
          <div className="flex gap-1 ml-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${
                viewMode === 'grid'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              title="Lưới"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${
                viewMode === 'list'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              title="Danh sách"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Images Display */}
      <div className="flex-1 overflow-y-auto">
        {filteredImages.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            {searchTerm || showFavoritesOnly
              ? 'Không tìm thấy ảnh nào'
              : 'Thư viện trống. Hãy tạo ảnh đầu tiên!'}
          </div>
        ) : viewMode === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-2 gap-3">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="relative group cursor-pointer rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all bg-white dark:bg-gray-800"
                onClick={() => onSelectImage(image)}
              >
                {/* Image */}
                <div className="aspect-square relative bg-gray-100 dark:bg-gray-700">
                  <img
                    src={image.imageUrl}
                    alt={image.prompt}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Favorite Badge */}
                  {image.favorite && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white rounded-full p-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={(e) => handleToggleFavorite(image.id, e)}
                      className="bg-white dark:bg-gray-800 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      title={image.favorite ? 'Bỏ yêu thích' : 'Yêu thích'}
                    >
                      <svg className={`w-5 h-5 ${image.favorite ? 'text-yellow-500' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNoteImage(image);
                      }}
                      className="bg-white dark:bg-gray-800 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      title="Ghi chú"
                    >
                      <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onGenerateAngle(image);
                      }}
                      className="bg-white dark:bg-gray-800 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      title="Tạo góc nhìn khác"
                    >
                      <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onGenerate2D(image);
                      }}
                      className="bg-white dark:bg-gray-800 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      title="Tạo bản vẽ 2D"
                    >
                      <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditImage(image);
                      }}
                      className="bg-white dark:bg-gray-800 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      title="Chỉnh sửa"
                    >
                      <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={(e) => handleDelete(image.id, e)}
                      className="bg-white dark:bg-gray-800 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900"
                      title="Xóa"
                    >
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-2">
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {image.prompt}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {formatDate(image.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="space-y-2">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="flex gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer transition-all bg-white dark:bg-gray-800"
                onClick={() => onSelectImage(image)}
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img
                    src={image.imageUrl}
                    alt={image.prompt}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                      {image.prompt}
                    </p>
                    {image.favorite && (
                      <svg className="w-5 h-5 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formatDate(image.createdAt)} • {image.width}×{image.height}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onGenerateFromImage(image);
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    title="Tạo góc nhìn mới"
                  >
                    <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => handleDelete(image.id, e)}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                    title="Xóa"
                  >
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
