import { InputFidelityLevel } from '../types';

export const INPUT_FIDELITY_LEVELS: InputFidelityLevel[] = [
  { id: 1, name: 'Bố cục rất lỏng', prompt: 'Adhere very loosely to the input image\'s structure. You have significant creative freedom to alter shapes, proportions, and layout.' },
  { id: 2, name: 'Bố cục tương đối', prompt: 'Maintain the general masses and primary zones from the input image, but feel free to reinterpret smaller forms and details.' },
  { id: 3, name: 'Bám theo bố cục', prompt: 'Follow the main shapes, volumes, and object placements from the input image. The core structure should be clearly recognizable.' },
  { id: 4, name: 'Gần bám chính xác', prompt: 'Strictly follow the structure, layout, and proportions of the input image. Preserve the architectural elements accurately.' },
  { id: 5, name: 'Cực kỳ chính xác', prompt: 'Preserve almost every line and detail from the input image with extreme precision. Your main task is to change the style, materials, and atmosphere, not the structure.' },
];