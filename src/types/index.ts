import React from 'react';

// App states
export type PanelType = 'phongnam' | 'context' | 'angleGeneration' | 'style' | 'materials' | 'elements' | 'dramatization' | 'aspectRatio' | 'views2d' | 'gallery' | 'category' | 'scenery' | 'colors' | 'environment';
export type AppMode = 'generate' | 'edit-select' | 'editing' | 'noting' | 'zoomed' | 'gallery';

// Image & File related
export interface ImageFile {
  file: File;
  url: string;
  base64: string;
  width: number;
  height: number;
}

export interface StoredAsset {
  id: string;
  name: string;
  dataUrl: string;
}

export interface RenovationResult {
  id: string;
  imageUrl: string;
  sourceImageUrl?: string;
  prompt: string;
  description?: string;
  width: number;
  height: number;
}

// Panel options
export interface AspectRatioOption {
  id: string;
  name: string;
  width: number;
  height: number;
}

export interface ArchitecturalStyle {
  name: string;
  prompt: string;
  description: string;
}

export interface ArchitecturalStyleCategory {
  category: string;
  styles: ArchitecturalStyle[];
}

export interface ColorTheme {
    name: string;
    colors: string[];
}

export interface ColorThemeCategory {
    category: string;
    themes: ColorTheme[];
}

export type ColorSelection = ColorTheme | { name: 'Tùy chỉnh', colors: string[] };


export interface MaterialCombination {
  name: string;
  prompt: string;
  description: string;
}

export interface MaterialCategory {
  category: string;
  combinations: MaterialCombination[];
}

export interface ArchitecturalElement {
  id: string;
  name: string;
  prompt: string;
  description: string;
}

export interface ArchitecturalElementCategory {
  category: string;
  options: ArchitecturalElement[];
}

export interface DramatizationOption {
    id: string;
    name: string;
    prompt: string;
}

export interface DramatizationCategory {
    category: string;
    options: DramatizationOption[];
}

export interface SceneryOption {
  id: string;
  name: string;
  prompt: string;
}

export interface SceneryCategory {
  category: string;
  options: SceneryOption[];
}

export interface LightingOption {
  id: string;
  name: string;
  prompt: string;
}

export interface LightingCategory {
  category: string;
  options: LightingOption[];
}

export interface EnvironmentOption {
  id: string;
  name: string;
  prompt: string;
}

export interface EnvironmentCategory {
  category: string;
  options: EnvironmentOption[];
}

export interface InputFidelityLevel {
  id: number;
  name: string;
  prompt: string;
}

export interface ReferenceStrengthLevel {
    id: number;
    name: string;
    prompt: string;
}

export interface AngleOption {
    id: string;
    name: string;
    prompt: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface ConversionOption {
    id: string;
    name: string;
    description: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export type SuggestionMap = {
    [stylePrompt: string]: string[]; // Mapping style prompt to an array of color theme names
};


// Editing
export type EditTool = 'brush' | 'rectangle' | 'ellipse' | 'polygon';

// Note Editor
export type NoteTool = 'select' | 'marker' | 'text' | 'crop';
export type NumberingStyle = '123' | 'ABC' | 'roman';
export type MarkerShape = 'circle' | 'square';

export interface MarkerStyle {
    shape: MarkerShape;
    backgroundColor: string;
    backgroundOpacity: number;
    borderColor: string;
    borderWidth: number;
    textColor: string;
    fontFamily: string;
    fontSize: number; // in vh
    fontWeight: 'normal' | 'bold';
    fontStyle: 'normal' | 'italic';
}

export interface TextStyle {
    fontFamily: string;
    fontSize: number; // in vh
    fontWeight: 'normal' | 'bold';
    fontStyle: 'normal' | 'italic';
    textAlign: 'left' | 'center' | 'right' | 'justify';
    color: string;
    backgroundColor: string;
    backgroundOpacity: number;
    borderRadius: number; // in px
    borderColor: string;
    borderWidth: number; // in px
    padding?: number; // in px
}

export interface LegendStyle {
    title: string;
    backgroundColor: string;
    backgroundOpacity: number;
    borderColor: string;
    borderWidth: number;
    borderRadius: number;
    textColor: string;
    fontFamily: string;
    fontSize: number; // in vh for items
    titleFontSize: number; // in vh for title
    fontWeight: 'normal' | 'bold';
    fontStyle: 'normal' | 'italic';
    textAlign: 'left' | 'center' | 'right' | 'justify';
    showDividers: boolean;

    // Advanced block styling
    titleBackgroundColor?: string;
    titleTextColor?: string;
    itemBackgroundColor?: string | 'marker' | 'gradient';
    itemTextColor?: string;
    itemSpacing?: number;
    itemPadding?: number;
    itemBorderRadius?: number;
    titlePadding?: number;
}

export interface NoteMarker {
    id: string;
    x: number; // percentage
    y: number; // percentage
    label: string;
    description: string;
    style: MarkerStyle;
}

export interface TextBox {
    id: string;
    x: number; // percentage
    y: number; // percentage
    width: number; // percentage
    height: number | 'auto'; // percentage or 'auto'
    content: string;
    style: TextStyle;
}

export interface LegendBox {
    id: string;
    x: number; // percentage
    y: number; // percentage
    width: number; // percentage
    height: number; // percentage
    style: LegendStyle;
}

export interface NoteImageState {
    url: string;
    originalUrl: string; // To keep track of original after crop
    width: number;
    height: number;
}

export interface NoteState {
    markers: NoteMarker[];
    textBoxes: TextBox[];
    legendBox: LegendBox | null;
    image: NoteImageState | null;
}