import React, { useState } from 'react';

import {
  MaterialCategory,
  MaterialCombination,
} from '../../types';

interface PanelMaterialsProps {
    materialCategories: MaterialCategory[];
    selectedCombination: MaterialCombination | null;
    onCombinationSelect: (combination: MaterialCombination | null) => void;
    hasReferenceImage?: boolean;
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

export const PanelMaterials: React.FC<PanelMaterialsProps> = ({
    materialCategories,
    selectedCombination,
    onCombinationSelect,
    hasReferenceImage = false
}) => {
    const [openCategory, setOpenCategory] = useState<string | null>(materialCategories[0]?.category || null);

    const handleSelect = (combo: MaterialCombination) => {
        if (selectedCombination?.name === combo.name) {
            onCombinationSelect(null); // Deselect if clicked again
        } else {
            onCombinationSelect(combo);
        }
    };

    return (
        <div className="space-y-6 flex flex-col h-full">
            <h2 className='text-xl font-bold text-gray-800 dark:text-gray-100 border-b pb-3 border-gray-200 dark:border-gray-600 flex-shrink-0'>Vật liệu</h2>
            
            {hasReferenceImage && (
                <div className="flex-shrink-0 p-3 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 dark:border-yellow-600 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        ⚠️ Vật liệu đang được ưu tiên theo "Hình ảnh tham khảo".
                    </p>
                </div>
            )}
            
            <div className={`flex-grow overflow-y-auto pr-2 transition-opacity duration-300 ${hasReferenceImage ? 'opacity-40 pointer-events-none' : ''}`}>
                {materialCategories.map(group => (
                    <AccordionItem
                        key={group.category}
                        title={group.category}
                        isOpen={openCategory === group.category}
                        onClick={() => setOpenCategory(openCategory === group.category ? null : group.category)}
                    >
                        <div className="space-y-2">
                            {group.combinations.map(combo => (
                                <button
                                    key={combo.name}
                                    onClick={() => handleSelect(combo)}
                                    className={`w-full p-3 text-left rounded-lg border-2 transition-all ${selectedCombination?.name === combo.name ? 'bg-indigo-50 dark:bg-indigo-900/40 border-indigo-500' : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'}`}
                                >
                                    <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{combo.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{combo.description}</p>
                                </button>
                            ))}
                        </div>
                    </AccordionItem>
                ))}
            </div>
        </div>
    );
};
