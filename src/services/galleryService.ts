import JSZip from 'jszip';

import { RenovationResult } from '../types';
import {
  getDirectoryName,
  isFileSystemSupported,
  listFilesInDirectory,
  readImageFromLocalDirectory,
  saveImageToLocalDirectory,
} from './fileSystemService';

const GALLERY_STORAGE_KEY = 'phong_nam_gallery';
const MAX_IMAGES = 100;

// Chỉ lưu metadata, KHÔNG lưu imageUrl (sẽ load từ file system)
export interface GalleryImage {
  id: string;
  filename: string; // Tên file trong thư mục local
  prompt?: string;
  description?: string;
  sourceImageUrl?: string;
  width: number;
  height: number;
  createdAt: number;
  tags?: string[];
  favorite?: boolean;
  category?: string;
}

// Interface khi load xong (có imageUrl)
export interface LoadedGalleryImage extends GalleryImage {
  imageUrl: string;
}

/**
 * Lấy metadata từ localStorage
 */
const getGalleryMetadata = (): GalleryImage[] => {
  try {
    const stored = localStorage.getItem(GALLERY_STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading gallery metadata:', error);
    return [];
  }
};

/**
 * Lưu metadata vào localStorage
 */
const saveGalleryMetadata = (gallery: GalleryImage[]): boolean => {
  try {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(gallery));
    return true;
  } catch (error) {
    console.error('Error saving gallery metadata:', error);
    return false;
  }
};

/**
 * Lấy tất cả ảnh (load TẤT CẢ từ file system, không chỉ metadata)
 */
export const getGalleryImages = async (): Promise<LoadedGalleryImage[]> => {
  try {
    // Kiểm tra có thư mục local không
    if (!isFileSystemSupported() || !getDirectoryName()) {
      console.warn('⚠️ No local directory selected.');
      return [];
    }
    
    console.log('📂 Loading ALL images from local directory...');
    
    // 1. Lấy TẤT CẢ file ảnh trong thư mục
    const allFiles = await listFilesInDirectory();
    
    if (allFiles.length === 0) {
      console.log('📭 No image files found in directory');
      return [];
    }
    
    console.log(`Found ${allFiles.length} image files in directory`);
    
    // 2. Lấy metadata hiện có
    const metadata = getGalleryMetadata();
    const metadataMap = new Map(metadata.map(m => [m.filename, m]));
    
    // 3. Load tất cả ảnh
    const loadedImages = await Promise.all(
      allFiles.map(async (filename) => {
        const imageUrl = await readImageFromLocalDirectory(filename);
        if (!imageUrl) return null;
        
        // Nếu có metadata, dùng metadata. Nếu không, tạo metadata cơ bản
        const existingMetadata = metadataMap.get(filename);
        
        if (existingMetadata) {
          return { ...existingMetadata, imageUrl } as LoadedGalleryImage;
        } else {
          // Tạo metadata tự động cho ảnh không có metadata
          const id = filename.replace(/\.(png|jpg|jpeg)$/i, '');
          const timestamp = parseInt(id.split('_').pop() || Date.now().toString());
          
          return {
            id,
            filename,
            imageUrl,
            prompt: 'Unknown - loaded from directory',
            description: '',
            width: 1024,
            height: 1024,
            createdAt: timestamp || Date.now(),
            favorite: false,
          } as LoadedGalleryImage;
        }
      })
    );
    
    const successfullyLoaded = loadedImages
      .filter((img): img is LoadedGalleryImage => img !== null)
      .sort((a, b) => b.createdAt - a.createdAt); // Sort by newest first
    
    console.log(`✅ Successfully loaded ${successfullyLoaded.length}/${allFiles.length} images`);
    
    // 4. Sync metadata - thêm các ảnh mới vào metadata
    const newMetadata = successfullyLoaded.map(img => ({
      id: img.id,
      filename: img.filename,
      prompt: img.prompt,
      description: img.description,
      sourceImageUrl: img.sourceImageUrl,
      width: img.width,
      height: img.height,
      createdAt: img.createdAt,
      favorite: img.favorite,
      tags: img.tags,
      category: img.category,
    }));
    
    if (newMetadata.length !== metadata.length) {
      saveGalleryMetadata(newMetadata);
      console.log('📝 Synced metadata with directory files');
    }
    
    return successfullyLoaded;
    
  } catch (error) {
    console.error('❌ Error loading gallery images:', error);
    return [];
  }
};

/**
 * Lưu ảnh vào gallery
 */
export const saveToGallery = async (result: RenovationResult): Promise<boolean> => {
  console.log('🔵 saveToGallery called with ID:', result.id);
  
  try {
    // 1. Kiểm tra có thư mục local không
    if (!isFileSystemSupported() || !getDirectoryName()) {
      alert('⚠️ CHƯA CHỌN THƯ MỤC LƯU TRỮ!\n\n' +
            'Vui lòng:\n' +
            '1. Vào tab "Thư viện Ảnh"\n' +
            '2. Nhấn nút "Chọn thư mục"\n' +
            '3. Chọn thư mục để lưu ảnh\n\n' +
            'Ảnh sẽ được lưu vào thư mục đó, KHÔNG giới hạn dung lượng!');
      return false;
    }
    
    // 2. Tạo tên file
    const timestamp = Date.now();
    const filename = `phongnam_${result.id}_${timestamp}.png`;
    
    // 3. Lưu ảnh vào thư mục local
    const saved = await saveImageToLocalDirectory(result.imageUrl, filename);
    if (!saved) {
      console.error('Failed to save image to local directory');
      alert('❌ LỖI LƯU ẢNH!\n\nKhông thể lưu ảnh vào thư mục.\nVui lòng:\n1. Kiểm tra quyền truy cập\n2. Chọn lại thư mục\n3. Thử lại');
      return false;
    }
    
    console.log('💾 Image saved to local directory:', filename);
    
    // 4. Lưu metadata vào localStorage
    const gallery = getGalleryMetadata();
    const existingIndex = gallery.findIndex(img => img.id === result.id);
    
    const metadata: GalleryImage = {
      id: result.id,
      filename,
      prompt: result.prompt,
      description: result.description,
      sourceImageUrl: result.sourceImageUrl,
      width: result.width,
      height: result.height,
      createdAt: existingIndex !== -1 ? gallery[existingIndex].createdAt : timestamp,
      favorite: existingIndex !== -1 ? gallery[existingIndex].favorite : false,
    };
    
    if (existingIndex !== -1) {
      gallery[existingIndex] = metadata;
      console.log('🔄 Updated metadata');
    } else {
      gallery.unshift(metadata); // Add to beginning
      console.log('➕ Added new metadata');
    }
    
    // 5. Cleanup: giữ tối đa MAX_IMAGES
    if (gallery.length > MAX_IMAGES) {
      const favorites = gallery.filter(img => img.favorite);
      const nonFavorites = gallery.filter(img => !img.favorite).slice(0, MAX_IMAGES - favorites.length);
      const cleaned = [...favorites, ...nonFavorites].sort((a, b) => b.createdAt - a.createdAt);
      saveGalleryMetadata(cleaned);
      console.log(`🧹 Cleaned up: kept ${cleaned.length} items`);
    } else {
      saveGalleryMetadata(gallery);
    }
    
    console.log(`✅ Saved successfully. Total: ${gallery.length} images`);
    return true;
    
  } catch (error) {
    console.error('❌ Error saving to gallery:', error);
    return false;
  }
};

/**
 * Xóa ảnh khỏi gallery
 */
export const deleteFromGallery = async (id: string): Promise<boolean> => {
  try {
    const gallery = getGalleryMetadata();
    const image = gallery.find(img => img.id === id);
    
    if (image) {
      // Xóa metadata
      const filtered = gallery.filter(img => img.id !== id);
      saveGalleryMetadata(filtered);
      
      // Note: Không xóa file vật lý để tránh mất dữ liệu
      // User có thể tự xóa file trong thư mục nếu muốn
      
      console.log('🗑️ Deleted metadata:', id);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting:', error);
    return false;
  }
};

/**
 * Toggle favorite
 */
export const toggleFavorite = (id: string): boolean => {
  try {
    const gallery = getGalleryMetadata();
    const image = gallery.find(img => img.id === id);
    if (image) {
      image.favorite = !image.favorite;
      saveGalleryMetadata(gallery);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return false;
  }
};

/**
 * Cập nhật metadata
 */
export const updateImageMetadata = (
  id: string,
  updates: Partial<Pick<GalleryImage, 'tags' | 'category' | 'prompt' | 'description'>>
): boolean => {
  try {
    const gallery = getGalleryMetadata();
    const image = gallery.find(img => img.id === id);
    if (image) {
      Object.assign(image, updates);
      saveGalleryMetadata(gallery);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating metadata:', error);
    return false;
  }
};

/**
 * Tải tất cả ảnh xuống dưới dạng ZIP
 */
export const downloadAllImagesAsZip = async (gallery: LoadedGalleryImage[]): Promise<void> => {
  try {
    if (gallery.length === 0) {
      alert('Thư viện trống!');
      return;
    }

    const zip = new JSZip();
    const folder = zip.folder('PhongNam_Gallery');
    if (!folder) throw new Error('Cannot create ZIP folder');

    for (const img of gallery) {
      try {
        const base64Data = img.imageUrl.split(',')[1];
        const binaryData = atob(base64Data);
        const bytes = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          bytes[i] = binaryData.charCodeAt(i);
        }
        
        const date = new Date(img.createdAt);
        const dateStr = date.toISOString().replace(/[:.]/g, '-').slice(0, 19);
        const filename = `${dateStr}_${img.id}.png`;
        
        folder.file(filename, bytes, { binary: true });
      } catch (imgError) {
        console.error(`Error adding image ${img.id}:`, imgError);
      }
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PhongNam_Gallery_${Date.now()}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log(`✅ Downloaded ${gallery.length} images as ZIP`);
  } catch (error) {
    console.error('Error creating ZIP:', error);
    alert('Lỗi tạo file ZIP: ' + (error as Error).message);
  }
};

/**
 * Lấy thông tin dung lượng
 */
export const getStorageInfo = async (): Promise<{ used: number; max: number; percentage: number; count: number }> => {
  try {
    const gallery = getGalleryMetadata();
    const count = gallery.length;
    
    // Metadata size (very small)
    const stored = localStorage.getItem(GALLERY_STORAGE_KEY);
    const metadataSize = stored ? stored.length * 2 : 0; // bytes
    
    // Estimate total size from local directory
    let totalSize = metadataSize;
    if (isFileSystemSupported() && getDirectoryName()) {
      const files = await listFilesInDirectory();
      // Ước tính ~3MB/ảnh (có thể không chính xác)
      totalSize = files.length * 3 * 1024 * 1024;
    }
    
    return {
      used: totalSize,
      max: Number.MAX_SAFE_INTEGER, // Không giới hạn với file system
      percentage: 0, // Luôn = 0 vì không giới hạn
      count,
    };
  } catch (error) {
    console.error('Error getting storage info:', error);
    return { used: 0, max: Number.MAX_SAFE_INTEGER, percentage: 0, count: 0 };
  }
};

/**
 * Xóa toàn bộ gallery (chỉ xóa metadata, không xóa file)
 */
export const clearGallery = (): boolean => {
  try {
    localStorage.removeItem(GALLERY_STORAGE_KEY);
    console.log('🗑️ Gallery metadata cleared');
    alert('✅ Đã xóa thư viện!\n\n💡 Lưu ý: Các file ảnh vẫn còn trong thư mục local.\nBạn có thể xóa chúng thủ công nếu muốn.');
    return true;
  } catch (error) {
    console.error('Error clearing gallery:', error);
    return false;
  }
};

export const exportGallery = (): string => {
  const gallery = getGalleryMetadata();
  return JSON.stringify(gallery, null, 2);
};

export const importGallery = (jsonString: string): boolean => {
  try {
    const imported = JSON.parse(jsonString) as GalleryImage[];
    if (!Array.isArray(imported)) throw new Error('Invalid format');
    saveGalleryMetadata(imported);
    return true;
  } catch (error) {
    console.error('Error importing:', error);
    return false;
  }
};
