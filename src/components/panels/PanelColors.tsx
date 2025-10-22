import React, { useState, useEffect, useMemo } from 'react';
import { ColorSelection, ColorTheme, ColorThemeCategory } from '../../types';

interface PanelColorsProps {
    architecturalThemes: ColorThemeCategory[];
    interiorThemes: ColorThemeCategory[];
    selectedColorOption: ColorSelection | undefined;
    onColorOptionSelect: (selection: ColorSelection | undefined) => void;
    onOpenColorPicker: () => void;
    hasReferenceImage: boolean;
    suggestedThemes: ColorTheme[];
    selectedStyle: string;
}

const AccordionItem: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onClick: () => void; }> = ({ title, children, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left py-3 px-1"
            >
                <span className="font-semibold text-gray-700 dark:text-gray-300">{title}</span>
                <svg className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && <div className="pb-3 px-1">{children}</div>}
        </div>
    );
};

const ColorThemeButton: React.FC<{ theme: ColorTheme; isSelected: boolean; onSelect: (theme: ColorTheme) => void; }> = ({ theme, isSelected, onSelect }) => (
    <button
        onClick={() => onSelect(theme)}
        className={`w-full text-left p-3 rounded-lg border-2 transition-all ${isSelected ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/40' : 'border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'}`}
    >
        <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-2">{theme.name}</p>
        <div className="flex space-x-1 h-6">
            {(theme.colors || []).map((color, index) => (
                <div key={index} className="w-full rounded" style={{ backgroundColor: color }} />
            ))}
        </div>
    </button>
);

export const PanelColors: React.FC<PanelColorsProps> = ({ 
    architecturalThemes, 
    interiorThemes, 
    selectedColorOption, 
    onColorOptionSelect, 
    onOpenColorPicker, 
    hasReferenceImage,
    suggestedThemes,
    selectedStyle,
}) => {
    const [type, setType] = useState<'architecture' | 'interior'>('architecture');
    const themesToShow = type === 'architecture' ? architecturalThemes : interiorThemes;
    const [openCategory, setOpenCategory] = useState<string | null>(null);

    useEffect(() => {
        if (themesToShow.length > 0) {
            setOpenCategory(themesToShow[0].category);
        }
    }, [type, themesToShow]);

    const handleSelectTheme = (theme: ColorTheme) => {
        if (selectedColorOption?.name === theme.name) {
            onColorOptionSelect(undefined);
        } else {
            onColorOptionSelect(theme);
        }
    };

    const themesInCurrentType = useMemo(() => {
        const allThemes = themesToShow.flatMap(c => c.themes);
        return new Set(allThemes.map(t => t.name));
    }, [themesToShow]);

    const filteredSuggestedThemes = useMemo(() => {
        return suggestedThemes.filter(theme => themesInCurrentType.has(theme.name));
    }, [suggestedThemes, themesInCurrentType]);
    
    const isCustomPaletteSelected = selectedColorOption?.name === 'Tùy chỉnh' && 'colors' in selectedColorOption;
    const coreStyleName = selectedStyle.split('–')[0].trim();

    return (
        <div className="space-y-6 flex flex-col h-full">
            <h2 className='text-xl font-bold text-gray-800 dark:text-gray-100 border-b pb-3 border-gray-200 dark:border-gray-600 flex-shrink-0'>Màu sắc</h2>
            
            <div className={`relative space-y-4 flex flex-col flex-grow min-h-0 transition-opacity duration-300 ${hasReferenceImage ? 'opacity-40 pointer-events-none' : ''}`}>
                <div className='flex-shrink-0'>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Tùy chỉnh</h3>
                    <button
                        onClick={onOpenColorPicker}
                        className={`w-full p-3 rounded-lg border-2 transition-all text-left ${isCustomPaletteSelected ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/40' : 'border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'}`}
                    >
                        <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-sm">Tạo bảng màu tùy chỉnh</p>
                        <div className="flex space-x-2 h-8">
                            {isCustomPaletteSelected ? (
                                selectedColorOption.colors.map(color => (
                                    <div key={color} className="w-full h-full rounded" style={{ backgroundColor: color }} />
                                ))
                            ) : (
                                <div className="w-full h-full rounded bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                </div>
                            )}
                        </div>
                    </button>
                </div>
                
                <div className="flex p-1 bg-gray-100 dark:bg-gray-700 rounded-lg flex-shrink-0">
                    <button onClick={() => setType('architecture')} className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors ${type === 'architecture' ? 'bg-white dark:bg-gray-800 shadow text-indigo-700 dark:text-indigo-300' : 'text-gray-600 dark:text-gray-400'}`}>Kiến trúc</button>
                    <button onClick={() => setType('interior')} className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors ${type === 'interior' ? 'bg-white dark:bg-gray-800 shadow text-indigo-700 dark:text-indigo-300' : 'text-gray-600 dark:text-gray-400'}`}>Nội thất</button>
                </div>

                <div className="flex-grow overflow-y-auto pr-2">
                    {filteredSuggestedThemes.length > 0 && (
                        <div className='mb-4 bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded-lg'>
                           <AccordionItem 
                                title={`Gợi ý theo phong cách "${coreStyleName}"`}
                                isOpen={true}
                                onClick={() => {}}
                            >
                                <div className="space-y-2">
                                    {filteredSuggestedThemes.map(theme => (
                                        <ColorThemeButton key={theme.name} theme={theme} isSelected={selectedColorOption?.name === theme.name} onSelect={handleSelectTheme} />
                                    ))}
                                </div>
                            </AccordionItem>
                        </div>
                    )}

                    {themesToShow.map(group => (
                        <AccordionItem 
                            key={group.category} 
                            title={group.category}
                            isOpen={openCategory === group.category}
                            onClick={() => setOpenCategory(openCategory === group.category ? null : group.category)}
                        >
                            <div className="space-y-2">
                                {group.themes.map(theme => (
                                    <ColorThemeButton key={theme.name} theme={theme} isSelected={selectedColorOption?.name === theme.name} onSelect={handleSelectTheme} />
                                ))}
                            </div>
                        </AccordionItem>
                    ))}
                </div>
            </div>

            {hasReferenceImage && (
                <div className="text-center text-sm text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg -mt-2 flex-shrink-0">
                    Màu sắc đang được ưu tiên theo "Hình ảnh tham khảo".
                </div>
            )}
        </div>
    );
};
