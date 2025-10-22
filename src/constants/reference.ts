import { ReferenceStrengthLevel } from '../types';

export const REFERENCE_STRENGTH_LEVELS: ReferenceStrengthLevel[] = [
  { id: 1, name: 'Hơi có nét giống', prompt: 'Subtly inspired by the reference image, mainly borrowing the general mood and color temperature. The original design should remain dominant.' },
  { id: 2, name: 'Ảnh hưởng nhẹ', prompt: 'Borrowing some stylistic elements and the primary color palette from the reference image, but the main shapes and layout of the original image are preserved.' },
  { id: 3, name: 'Tương tự (Mặc định)', prompt: 'Closely follow the reference image in terms of style, color palette, and material choices. Apply these elements to the main structure of the original input image.' },
  { id: 4, name: 'Ảnh hưởng mạnh', prompt: 'Strongly adhere to the reference image. The style, colors, materials, and even the shapes of smaller details should be replicated from the reference, while only keeping the main spatial composition of the original input.' },
  { id: 5, name: 'Gần như giống hệt', prompt: 'Almost completely transform the input image to match the reference image\'s style. Re-imagine the input structure with the shapes, details, materials, and lighting of the reference. Only the core spatial volume and aspect ratio should be similar to the input.' },
];