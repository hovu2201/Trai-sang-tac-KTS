/**
 * File System Service - Lưu ảnh vào thư mục local của người dùng
 */

let directoryHandle: FileSystemDirectoryHandle | null = null;

/**
 * Kiểm tra trình duyệt có hỗ trợ File System Access API không
 */
export const isFileSystemSupported = (): boolean => {
  return 'showDirectoryPicker' in window;
};

/**
 * Yêu cầu người dùng chọn thư mục để lưu ảnh
 */
export const requestDirectoryAccess = async (): Promise<boolean> => {
  try {
    if (!isFileSystemSupported()) {
      console.warn('File System Access API not supported');
      return false;
    }

    // @ts-ignore - File System Access API
    directoryHandle = await window.showDirectoryPicker({
      mode: 'readwrite',
      startIn: 'pictures',
    });

    // Lưu handle vào localStorage (chỉ lưu name để hiển thị)
    if (directoryHandle) {
      localStorage.setItem('phong_nam_directory_name', directoryHandle.name);
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
    if (!directoryHandle) {
      console.warn('No directory selected');
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
export const clearDirectoryAccess = () => {
  directoryHandle = null;
  localStorage.removeItem('phong_nam_directory_name');
};

/**
 * Lấy danh sách file trong thư mục
 */
export const listFilesInDirectory = async (): Promise<string[]> => {
  try {
    if (!directoryHandle) return [];

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
    if (!directoryHandle) return null;

    const hasPermission = await verifyDirectoryPermission();
    if (!hasPermission) return null;

    const fileHandle = await directoryHandle.getFileHandle(filename);
    const file = await fileHandle.getFile();
    
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error('Error reading image:', error);
    return null;
  }
};
