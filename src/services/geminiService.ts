// FIX: Per coding guidelines, explicitly import GoogleGenAI.
import {
  GoogleGenAI,
  Modality,
  Part,
} from '@google/genai';

// Initialize the Google Gemini AI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
const model = 'gemini-2.5-flash-image';

// Utility to convert file to base64
const fileToGenerativePart = async (file: File): Promise<Part> => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: {
      data: await base64EncodedDataPromise,
      mimeType: file.type,
    },
  };
};

// Utility to convert data URL to base64 string
const dataUrlToBase64 = (dataUrl: string): string => {
    return dataUrl.split(',')[1];
};


export const generateImage = async (
    prompt: string, 
    baseImage: File, 
    referenceImage?: File
): Promise<{ base64Image: string, description: string }> => {
    try {
        const imagePart = await fileToGenerativePart(baseImage);
        const textPart = { text: prompt };
        
        const parts: Part[] = [textPart, imagePart];
        
        // Add reference image if provided
        if (referenceImage) {
            const referencePart = await fileToGenerativePart(referenceImage);
            parts.push(referencePart);
        }

        // FIX: Per coding guidelines, use ai.models.generateContent
        const response = await ai.models.generateContent({
            model: model,
            contents: { parts },
            config: {
                // FIX: Per coding guidelines, responseModalities must be an array with a single Modality.IMAGE element.
                responseModalities: [Modality.IMAGE],
            },
        });
        
        let base64Image = '';
        let description = '';

        // FIX: Per coding guidelines, extract response from candidates array
        if (response.candidates && response.candidates.length > 0) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    base64Image = part.inlineData.data;
                } else if (part.text) {
                    description = part.text;
                }
            }
        }
        
        if (!base64Image) {
            throw new Error("API did not return an image.");
        }
        
        return { base64Image, description };
    } catch (error) {
        console.error("Error generating image:", error);
        throw new Error("Failed to generate image. Please check the console for more details.");
    }
};


export const editImage = async (
    prompt: string,
    baseImage: File,
    maskImage: string // mask is a dataURL from canvas
): Promise<{ base64Image: string, description: string }> => {
    try {
        const baseImagePart = await fileToGenerativePart(baseImage);
        
        const maskImagePart = {
            inlineData: {
                data: dataUrlToBase64(maskImage),
                mimeType: 'image/png'
            }
        };

        const textPart = { text: prompt };
        
        // FIX: Per coding guidelines, use ai.models.generateContent
        const response = await ai.models.generateContent({
            model: model,
            contents: { parts: [textPart, baseImagePart, maskImagePart] },
            config: {
                // FIX: Per coding guidelines, responseModalities must be an array with a single Modality.IMAGE element.
                responseModalities: [Modality.IMAGE],
            },
        });

        let base64Image = '';
        let description = '';

        // FIX: Per coding guidelines, extract response from candidates array
        if (response.candidates && response.candidates.length > 0) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    base64Image = part.inlineData.data;
                } else if (part.text) {
                    description = part.text;
                }
            }
        }

        if (!base64Image) {
            throw new Error("API did not return an edited image.");
        }
        
        return { base64Image, description };

    } catch (error) {
        console.error("Error editing image:", error);
        throw new Error("Failed to edit image. Please check the console for more details.");
    }
};
