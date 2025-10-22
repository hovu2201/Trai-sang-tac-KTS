import { ImageFile } from '../types';

const MAX_DIMENSION = 1536; 

/**
 * Processes an image by resizing it to fit within MAX_DIMENSION while maintaining its aspect ratio.
 * This is used for initial processing of base and reference images.
 * @param file The input image file.
 * @returns A promise that resolves to an ImageFile object.
 */
export const processBaseImage = (file: File): Promise<ImageFile> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) {
        return reject(new Error('FileReader failed to read file.'));
      }
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          return reject(new Error('Could not create canvas context'));
        }

        // Resize if necessary, maintaining aspect ratio
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          if (width > height) {
            height = Math.round((height * MAX_DIMENSION) / width);
            width = MAX_DIMENSION;
          } else {
            width = Math.round((width * MAX_DIMENSION) / height);
            height = MAX_DIMENSION;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const base64 = canvas.toDataURL(file.type);
        const originalUrl = URL.createObjectURL(file);

        canvas.toBlob(blob => {
          if (!blob) {
            return reject(new Error('Failed to create blob from canvas'));
          }
          const processedFile = new File([blob], file.name, { type: file.type });
          
          resolve({
            file: processedFile,
            url: originalUrl,
            base64,
            width: width,
            height: height,
          });
        }, file.type);
      };
      img.onerror = (err) => reject(new Error(`Image load error: ${err}`));
      img.src = event.target.result as string;
    };
    reader.onerror = (err) => reject(new Error(`FileReader error: ${err}`));
    reader.readAsDataURL(file);
  });
};

/**
 * Processes an image by cropping it from the center to a target aspect ratio, then resizing it to fit within MAX_DIMENSION.
 * This is used to standardize inputs when a fixed aspect ratio is chosen.
 * @param file The input image file.
 * @param targetAspectRatio The desired aspect ratio (width / height).
 * @returns A promise that resolves to an ImageFile object.
 */
export const processImageToAspectRatio = (file: File, targetAspectRatio: number): Promise<ImageFile> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) {
        return reject(new Error('FileReader failed to read file.'));
      }
      
      const img = new Image();
      img.onload = () => {
        const { width: originalWidth, height: originalHeight } = img;
        const originalAspectRatio = originalWidth / originalHeight;

        let cropWidth = originalWidth;
        let cropHeight = originalHeight;
        let cropX = 0;
        let cropY = 0;

        if (originalAspectRatio > targetAspectRatio) { // Image is wider than target, crop sides
          cropWidth = originalHeight * targetAspectRatio;
          cropX = (originalWidth - cropWidth) / 2;
        } else if (originalAspectRatio < targetAspectRatio) { // Image is taller than target, crop top/bottom
          cropHeight = originalWidth / targetAspectRatio;
          cropY = (originalHeight - cropHeight) / 2;
        }

        let finalWidth = cropWidth;
        let finalHeight = cropHeight;

        // Resize if the cropped dimension is still too large
        if (finalWidth > MAX_DIMENSION || finalHeight > MAX_DIMENSION) {
          if (finalWidth > finalHeight) {
            finalHeight = Math.round((finalHeight * MAX_DIMENSION) / finalWidth);
            finalWidth = MAX_DIMENSION;
          } else {
            finalWidth = Math.round((finalWidth * MAX_DIMENSION) / finalHeight);
            finalHeight = MAX_DIMENSION;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = finalWidth;
        canvas.height = finalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return reject(new Error('Could not create canvas context'));
        }

        ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, finalWidth, finalHeight);

        const base64 = canvas.toDataURL(file.type);
        const url = URL.createObjectURL(file); // Keep original URL for preview consistency

        canvas.toBlob(blob => {
          if (!blob) {
            return reject(new Error('Failed to create blob from canvas'));
          }
          const processedFile = new File([blob], file.name, { type: file.type });
          resolve({
            file: processedFile,
            url,
            base64,
            width: finalWidth,
            height: finalHeight,
          });
        }, file.type);
      };
      img.onerror = (err) => reject(new Error(`Image load error: ${err}`));
      img.src = event.target.result as string;
    };
    reader.onerror = (err) => reject(new Error(`FileReader error: ${err}`));
    reader.readAsDataURL(file);
  });
};

/**
 * Converts a data URL string to an ImageFile object.
 * @param dataUrl The data URL of the image.
 * @param fileName A name for the resulting file.
 * @returns A promise that resolves to an ImageFile object.
 */
export const dataUrlToImageFile = async (dataUrl: string, fileName: string = 'image.png'): Promise<ImageFile> => {
  try {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const file = new File([blob], fileName, { type: blob.type });
    // Reuse existing processing logic to get all necessary properties
    return processBaseImage(file);
  } catch (error) {
    console.error("Error converting data URL to ImageFile:", error);
    throw new Error("Could not convert data URL to a processable image file.");
  }
};