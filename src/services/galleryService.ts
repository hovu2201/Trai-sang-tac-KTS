import JSZip from 'jszip';

import { RenovationResult } from '../types';
import {
  getDirectoryName,
  isFileSystemSupported,
  saveImageToLocalDirectory,
} from './fileSystemService';

const GALLERY_STORAGE_KEY = 'phong_nam_gallery';
const MAX_STORAGE_SIZE = 50 * 1024 * 1024; // 50MB limit - much more generous
const MAX_IMAGES = 200; // Maximum number of images to keep

export interface GalleryImage extends RenovationResult {
  createdAt: number;
  tags?: string[];
  favorite?: boolean;
  category?: string;
}

/**
 * Get all images from gallery
 */
export const getGalleryImages = (): GalleryImage[] => {
  try {
    const stored = localStorage.getItem(GALLERY_STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading gallery:', error);
    return [];
  }
};

/**
 * Save a new image to gallery
 */
export const saveToGallery = async (result: RenovationResult): Promise<boolean> => {
  try {
    const gallery = getGalleryImages();
    
    // Check if already exists
    const exists = gallery.some(img => img.id === result.id);
    if (exists) {
      console.log('Image already in gallery');
      return true;
    }

    const newImage: GalleryImage = {
      ...result,
      createdAt: Date.now(),
      favorite: false,
    };

    // Try to save to local directory first (if configured)
    if (isFileSystemSupported() && getDirectoryName()) {
      const filename = `phongnam_${newImage.id}_${Date.now()}.png`;
      const savedToLocal = await saveImageToLocalDirectory(result.imageUrl, filename);
      if (savedToLocal) {
        console.log('Image saved to local directory');
      }
    }

    // Add to beginning of array (newest first)
    gallery.unshift(newImage);

    // Auto-cleanup: Keep only MAX_IMAGES, prioritize favorites
    let cleanedGallery = gallery;
    if (gallery.length > MAX_IMAGES) {
      const favorites = gallery.filter(img => img.favorite);
      const nonFavorites = gallery.filter(img => !img.favorite);
      const keepNonFavorites = nonFavorites.slice(0, Math.max(0, MAX_IMAGES - favorites.length));
      cleanedGallery = [...favorites, ...keepNonFavorites].sort((a, b) => b.createdAt - a.createdAt);
      console.warn(`Gallery limit reached. Keeping ${favorites.length} favorites and ${keepNonFavorites.length} recent images.`);
    }

    // Try to save
    const galleryString = JSON.stringify(cleanedGallery);
    
    try {
      localStorage.setItem(GALLERY_STORAGE_KEY, galleryString);
      return true;
    } catch (storageError) {
      // Only handle actual quota errors silently - auto cleanup
      if (storageError instanceof DOMException && storageError.name === 'QuotaExceededError') {
        console.warn('Storage quota exceeded, performing auto cleanup...');
        
        // Auto cleanup - keep only last 15 images + favorites
        const favorites = cleanedGallery.filter(img => img.favorite);
        const recent = cleanedGallery.filter(img => !img.favorite).slice(0, 15);
        const emergencyGallery = [...favorites, ...recent].sort((a, b) => b.createdAt - a.createdAt);
        
        try {
          localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(emergencyGallery));
          console.log(`Auto cleanup completed. Kept ${favorites.length} favorites + 15 recent images.`);
          return true;
        } catch (finalError) {
          console.error('Failed after auto cleanup:', finalError);
          return false;
        }
      }
      throw storageError;
    }
    
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      // Last resort - silent auto cleanup
      console.error('QuotaExceededError: Attempting emergency save...');
      
      const gallery = getGalleryImages();
      const favorites = gallery.filter(img => img.favorite);
      
      try {
        const emergencyGallery = [
          { ...result, createdAt: Date.now(), favorite: false },
          ...favorites
        ];
        localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(emergencyGallery));
        console.log('Emergency cleanup: saved new image + favorites only');
        return true;
      } catch (finalError) {
        console.error('Failed to save even after emergency cleanup:', finalError);
        return false;
      }
    }
    console.error('Error saving to gallery:', error);
    return false;
  }
};

/**
 * Delete an image from gallery
 */
export const deleteFromGallery = (id: string): boolean => {
  try {
    const gallery = getGalleryImages();
    const filtered = gallery.filter(img => img.id !== id);
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting from gallery:', error);
    return false;
  }
};

/**
 * Toggle favorite status
 */
export const toggleFavorite = (id: string): boolean => {
  try {
    const gallery = getGalleryImages();
    const image = gallery.find(img => img.id === id);
    if (image) {
      image.favorite = !image.favorite;
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(gallery));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return false;
  }
};

/**
 * Update image metadata
 */
export const updateImageMetadata = (
  id: string,
  updates: Partial<Pick<GalleryImage, 'tags' | 'category' | 'prompt' | 'description'>>
): boolean => {
  try {
    const gallery = getGalleryImages();
    const image = gallery.find(img => img.id === id);
    if (image) {
      Object.assign(image, updates);
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(gallery));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating image metadata:', error);
    return false;
  }
};

/**
 * Export gallery as JSON
 */
export const exportGallery = (): string => {
  const gallery = getGalleryImages();
  return JSON.stringify(gallery, null, 2);
};

/**
 * Import gallery from JSON
 */
export const importGallery = (jsonString: string): boolean => {
  try {
    const imported = JSON.parse(jsonString) as GalleryImage[];
    if (!Array.isArray(imported)) {
      throw new Error('Invalid gallery format');
    }
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(imported));
    return true;
  } catch (error) {
    console.error('Error importing gallery:', error);
    return false;
  }
};

/**
 * Download all images as ZIP file
 */
export const downloadAllImagesAsZip = async (gallery: GalleryImage[]): Promise<void> => {
  try {
    if (gallery.length === 0) {
      alert('Thư viện trống!');
      return;
    }

    const zip = new JSZip();
    const folder = zip.folder('PhongNam_Gallery');

    if (!folder) {
      throw new Error('Cannot create ZIP folder');
    }

    // Add each image to ZIP
    for (const img of gallery) {
      try {
        // Convert base64 to blob
        const base64Data = img.imageUrl.split(',')[1];
        const binaryData = atob(base64Data);
        const bytes = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          bytes[i] = binaryData.charCodeAt(i);
        }
        
        // Create filename with timestamp
        const date = new Date(img.createdAt);
        const dateStr = date.toISOString().replace(/[:.]/g, '-').slice(0, 19);
        const filename = `${dateStr}_${img.id}.png`;
        
        folder.file(filename, bytes, { binary: true });
      } catch (imgError) {
        console.error(`Error adding image ${img.id} to ZIP:`, imgError);
      }
    }

    // Generate ZIP and download
    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PhongNam_Gallery_${Date.now()}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log(`Downloaded ${gallery.length} images as ZIP`);
  } catch (error) {
    console.error('Error creating ZIP:', error);
    alert('Lỗi khi tạo file ZIP: ' + (error as Error).message);
  }
};

/**
 * Get storage usage
 */
export const getStorageInfo = (): { used: number; max: number; percentage: number; count: number } => {
  try {
    const stored = localStorage.getItem(GALLERY_STORAGE_KEY);
    const used = stored ? stored.length * 2 : 0; // UTF-16 = 2 bytes per character
    const gallery = stored ? JSON.parse(stored) as GalleryImage[] : [];
    
    return {
      used,
      max: MAX_STORAGE_SIZE,
      percentage: Math.round((used / MAX_STORAGE_SIZE) * 100),
      count: gallery.length,
    };
  } catch (error) {
    console.error('Error getting storage info:', error);
    return { used: 0, max: MAX_STORAGE_SIZE, percentage: 0, count: 0 };
  }
};

/**
 * Clear entire gallery
 */
export const clearGallery = (): boolean => {
  try {
    localStorage.removeItem(GALLERY_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing gallery:', error);
    return false;
  }
};
