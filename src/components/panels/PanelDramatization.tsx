import React, { useState } from 'react';

import {
  DramatizationCategory,
  DramatizationOption,
} from '../../types';

interface PanelDramatizationProps {
    dramatizationCategories: DramatizationCategory[];
    selectedOptions: DramatizationOption[];
    onSelectionChange: (options: DramatizationOption[]) => void;
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

export const PanelDramatization: React.FC<PanelDramatizationProps> = ({
    dramatizationCategories,
    selectedOptions,
    onSelectionChange,
    hasReferenceImage = false
}) => {
    const [openCategory, setOpenCategory] = useState<string | null>(dramatizationCategories[0]?.category || null);

    const handleSelect = (option: DramatizationOption) => {
        const isSelected = selectedOptions.some(o => o.id === option.id);
        if (isSelected) {
            onSelectionChange(selectedOptions.filter(o => o.id !== option.id));
        } else {
            onSelectionChange([...selectedOptions, option]);
        }
    };

    return (
        <div className="space-y-6 flex flex-col h-full">
            <h2 className='text-xl font-bold text-gray-800 dark:text-gray-100 border-b pb-3 border-gray-200 dark:border-gray-600 flex-shrink-0'>Diễn họa</h2>
            
            {hasReferenceImage && (
                <div className="flex-shrink-0 p-3 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 dark:border-yellow-600 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        ⚠️ Diễn họa (ánh sáng, thời tiết) đang được ưu tiên theo "Hình ảnh tham khảo".
                    </p>
                </div>
            )}
            
            <div className={`flex-grow overflow-y-auto pr-2 transition-opacity duration-300 ${hasReferenceImage ? 'opacity-40 pointer-events-none' : ''}`}>
                {dramatizationCategories.map(group => (
                    <AccordionItem
                        key={group.category}
                        title={group.category}
                        isOpen={openCategory === group.category}
                        onClick={() => setOpenCategory(openCategory === group.category ? null : group.category)}
                    >
                        <div className="space-y-2">
                            {group.options.map(option => {
                                const isSelected = selectedOptions.some(o => o.id === option.id);
                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => handleSelect(option)}
                                        className={`w-full p-3 text-left rounded-lg border-2 transition-all flex items-center justify-between ${isSelected ? 'bg-indigo-50 dark:bg-indigo-900/40 border-indigo-500' : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'}`}
                                    >
                                        <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{option.name}</span>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 dark:border-gray-500'}`}>
                                            {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </AccordionItem>
                ))}
            </div>
        </div>
    );
};
