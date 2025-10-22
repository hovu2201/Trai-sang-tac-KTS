import { StoredAsset } from '../types';

/**
 * Retrieves an array of assets from localStorage.
 * @param key The key for the localStorage item (e.g., 'sceneryLibrary').
 * @returns An array of StoredAsset objects or an empty array if not found/invalid.
 */
export const getAssets = (key: string): StoredAsset[] => {
    try {
        const storedItems = localStorage.getItem(key);
        if (storedItems) {
            return JSON.parse(storedItems);
        }
    } catch (error) {
        console.error(`Error reading assets from localStorage under key "${key}":`, error);
    }
    return [];
};

/**
 * Saves a new asset (File) to localStorage.
 * Converts the file to a data URL for storage.
 * @param key The key for the localStorage item.
 * @param file The File object to save.
 * @returns The newly created StoredAsset object.
 */
export const saveAsset = async (key: string, file: File): Promise<StoredAsset> => {
    const assets = getAssets(key);
    
    const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });

    const newAsset: StoredAsset = {
        id: new Date().toISOString() + Math.random(),
        name: file.name,
        dataUrl,
    };
    
    const updatedAssets = [newAsset, ...assets];
    localStorage.setItem(key, JSON.stringify(updatedAssets));

    return newAsset;
};

/**
 * Removes an asset from localStorage by its ID.
 * @param key The key for the localStorage item.
 * @param assetId The ID of the asset to remove.
 */
export const removeAsset = (key: string, assetId: string): void => {
    const assets = getAssets(key);
    const updatedAssets = assets.filter(asset => asset.id !== assetId);
    localStorage.setItem(key, JSON.stringify(updatedAssets));
};
