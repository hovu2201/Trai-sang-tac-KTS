/**
 * File System Service - Lưu ảnh vào thư mục local của người dùng
 */

const DB_NAME = 'phong_nam_fs';
const DB_VERSION = 1;
const STORE_NAME = 'directory_handle';

let directoryHandle: FileSystemDirectoryHandle | null = null;

/**
 * Initialize IndexedDB for storing directory handle
 */
const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
};

/**
 * Save directory handle to IndexedDB
 */
const saveDirectoryHandle = async (handle: FileSystemDirectoryHandle): Promise<void> => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    await new Promise<void>((resolve, reject) => {
      const request = store.put(handle, 'directory');
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
    db.close();
  } catch (error) {
    console.error('Failed to save directory handle:', error);
  }
};

/**
 * Load directory handle from IndexedDB
 */
const loadDirectoryHandle = async (): Promise<FileSystemDirectoryHandle | null> => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const handle = await new Promise<FileSystemDirectoryHandle | undefined>((resolve, reject) => {
      const request = store.get('directory');
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    db.close();
    return handle || null;
  } catch (error) {
    console.error('Failed to load directory handle:', error);
    return null;
  }
};

/**
 * Kiểm tra trình duyệt có hỗ trợ File System Access API không
 */
export const isFileSystemSupported = (): boolean => {
  return 'showDirectoryPicker' in window;
};

/**
 * Ensure directory handle is loaded
 */
const ensureDirectoryHandle = async (): Promise<boolean> => {
  if (directoryHandle) {
    // Verify existing handle is still valid
    try {
      await verifyDirectoryPermission();
      return true;
    } catch (error) {
      console.warn('Existing handle invalid, clearing...', error);
      directoryHandle = null;
    }
  }
  
  // Try to load from IndexedDB
  try {
    directoryHandle = await loadDirectoryHandle();
    
    if (directoryHandle) {
      // Verify permission still valid
      try {
        const hasPermission = await verifyDirectoryPermission();
        if (hasPermission) {
          console.log('✅ Directory handle restored from IndexedDB:', directoryHandle.name);
          return true;
        } else {
          console.warn('⚠️ Directory handle exists but permission denied');
          // Clear invalid handle
          directoryHandle = null;
          await clearDirectoryAccess();
          return false;
        }
      } catch (error) {
        console.error('Error verifying permission:', error);
        directoryHandle = null;
        await clearDirectoryAccess();
        return false;
      }
    }
  } catch (error) {
    console.error('Error loading handle from IndexedDB:', error);
  }
  
  return false;
};

/**
 * Yêu cầu người dùng chọn thư mục để lưu ảnh
 */
export const requestDirectoryAccess = async (): Promise<boolean> => {
  try {
    if (!isFileSystemSupported()) {
      console.warn('File System Access API not supported');
      alert('⚠️ Trình duyệt không hỗ trợ!\n\nVui lòng sử dụng Chrome hoặc Edge phiên bản mới nhất.');
      return false;
    }

    // @ts-ignore - File System Access API
    directoryHandle = await window.showDirectoryPicker({
      mode: 'readwrite',
      startIn: 'pictures',
    });

    if (directoryHandle) {
      // Save to IndexedDB
      await saveDirectoryHandle(directoryHandle);
      
      // Save name to localStorage for display
      localStorage.setItem('phong_nam_directory_name', directoryHandle.name);
      
      console.log('✅ Directory selected and saved:', directoryHandle.name);
      return true;
    }
    return false;
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      console.log('User cancelled directory selection');
    } else {
      console.error('Error accessing directory:', error);
    }
    return false;
  }
};

/**
 * Lấy tên thư mục đã chọn
 */
export const getDirectoryName = (): string | null => {
  return localStorage.getItem('phong_nam_directory_name');
};

/**
 * Kiểm tra quyền truy cập thư mục
 */
export const verifyDirectoryPermission = async (): Promise<boolean> => {
  if (!directoryHandle) return false;

  // Chrome/Edge specific API - check if available
  if ('queryPermission' in directoryHandle && 'requestPermission' in directoryHandle) {
    const permission = await (directoryHandle as any).queryPermission({ mode: 'readwrite' });
    if (permission === 'granted') {
      return true;
    }

    // Yêu cầu quyền lại nếu chưa có
    const newPermission = await (directoryHandle as any).requestPermission({ mode: 'readwrite' });
    return newPermission === 'granted';
  }
  
  // Fallback: assume permission granted if we got the handle
  return true;
};

/**
 * Lưu ảnh vào thư mục local
 */
export const saveImageToLocalDirectory = async (
  imageDataUrl: string,
  filename: string
): Promise<boolean> => {
  try {
    // Ensure directory handle is loaded
    const hasHandle = await ensureDirectoryHandle();
    if (!hasHandle) {
      console.warn('No directory selected or permission denied');
      return false;
    }

    // Kiểm tra quyền
    const hasPermission = await verifyDirectoryPermission();
    if (!hasPermission) {
      console.warn('No permission to write to directory');
      return false;
    }

    // Chuyển đổi data URL sang Blob
    const response = await fetch(imageDataUrl);
    const blob = await response.blob();

    // Tạo file trong thư mục
    const fileHandle = await directoryHandle.getFileHandle(filename, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(blob);
    await writable.close();

    console.log(`Saved image to local directory: ${filename}`);
    return true;
  } catch (error) {
    console.error('Error saving image to local directory:', error);
    return false;
  }
};

/**
 * Mở thư mục đã chọn trong File Explorer
 * Note: Browser không cho phép mở folder trực tiếp, nhưng có thể request lại quyền truy cập
 */
export const openLocalDirectory = async (): Promise<boolean> => {
  try {
    if (!isFileSystemSupported()) {
      alert('Trình duyệt không hỗ trợ chức năng này.\n\nVui lòng sử dụng Chrome hoặc Edge phiên bản mới nhất.');
      return false;
    }

    if (!directoryHandle) {
      const dirName = getDirectoryName();
      if (dirName) {
        alert(`Thư mục đã chọn: ${dirName}\n\nĐể xem ảnh, hãy mở File Explorer và tìm thư mục này.\n\nHoặc nhấn nút "Chọn thư mục" để chọn lại và cấp quyền truy cập.`);
      } else {
        alert('Chưa chọn thư mục lưu trữ.\n\nHãy nhấn nút "Chọn thư mục" để chọn thư mục.');
      }
      return false;
    }

    // Kiểm tra và yêu cầu quyền lại
    const hasPermission = await verifyDirectoryPermission();
    if (hasPermission) {
      // Show directory info with file count
      const files = await listFilesInDirectory();
      alert(
        `📁 Thư mục: ${directoryHandle.name}\n\n` +
        `Số ảnh đã lưu: ${files.length} file\n\n` +
        `Để xem ảnh, mở File Explorer và tìm thư mục "${directoryHandle.name}".\n\n` +
        `💡 Mẹo: Tìm trong thư mục Pictures/Documents hoặc dùng tính năng tìm kiếm của Windows.`
      );
      return true;
    } else {
      alert('Không có quyền truy cập thư mục.\n\nHãy nhấn nút "Chọn thư mục" để cấp quyền lại.');
      return false;
    }
  } catch (error) {
    console.error('Error opening directory:', error);
    alert('Không thể truy cập thư mục.\n\nHãy chọn lại thư mục để cấp quyền.');
    return false;
  }
};

/**
 * Xóa quyền truy cập thư mục
 */
export const clearDirectoryAccess = async () => {
  directoryHandle = null;
  localStorage.removeItem('phong_nam_directory_name');
  
  // Clear from IndexedDB
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    await new Promise<void>((resolve, reject) => {
      const request = store.delete('directory');
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
    db.close();
    console.log('🗑️ Directory access cleared');
  } catch (error) {
    console.error('Error clearing directory access:', error);
  }
};

/**
 * Lấy danh sách file trong thư mục
 */
export const listFilesInDirectory = async (): Promise<string[]> => {
  try {
    const hasHandle = await ensureDirectoryHandle();
    if (!hasHandle) return [];

    const hasPermission = await verifyDirectoryPermission();
    if (!hasPermission) return [];

    const files: string[] = [];
    // @ts-ignore
    for await (const entry of directoryHandle.values()) {
      if (entry.kind === 'file' && entry.name.match(/\.(png|jpg|jpeg)$/i)) {
        files.push(entry.name);
      }
    }
    return files;
  } catch (error) {
    console.error('Error listing files:', error);
    return [];
  }
};

/**
 * Đọc ảnh từ thư mục local
 */
export const readImageFromLocalDirectory = async (filename: string): Promise<string | null> => {
  try {
    const hasHandle = await ensureDirectoryHandle();
    if (!hasHandle) {
      console.warn('No directory handle available for reading:', filename);
      return null;
    }

    const hasPermission = await verifyDirectoryPermission();
    if (!hasPermission) {
      console.warn('No permission to read from directory');
      return null;
    }

    if (!directoryHandle) {
      console.error('Directory handle is null after ensure');
      return null;
    }

    // Try to get the file
    const fileHandle = await directoryHandle.getFileHandle(filename).catch(error => {
      if (error.name === 'NotFoundError') {
        console.warn(`File not found: ${filename}`);
      } else {
        console.error(`Error getting file handle for ${filename}:`, error);
      }
      return null;
    });
    
    if (!fileHandle) return null;
    
    const file = await fileHandle.getFile();
    
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        console.log(`✅ Read image: ${filename} (${(result.length / 1024).toFixed(0)}KB)`);
        resolve(result);
      };
      reader.onerror = (error) => {
        console.error('FileReader error:', error);
        resolve(null);
      };
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error('Error reading image:', filename, error);
    return null;
  }
};
