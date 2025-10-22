import React, { useState } from 'react';

import {
  ArchitecturalElement,
  ArchitecturalElementCategory,
} from '../../types';

interface PanelDetailsProps {
    exteriorCategories: ArchitecturalElementCategory[];
    interiorCategories: ArchitecturalElementCategory[];
    selectedElements: ArchitecturalElement[];
    onSelectionChange: (elements: ArchitecturalElement[]) => void;
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

export const PanelDetails: React.FC<PanelDetailsProps> = ({
    exteriorCategories,
    interiorCategories,
    selectedElements,
    onSelectionChange,
    hasReferenceImage = false
}) => {
    const [tab, setTab] = useState<'exterior' | 'interior'>('exterior');
    const categoriesToShow = tab === 'exterior' ? exteriorCategories : interiorCategories;
    const [openCategory, setOpenCategory] = useState<string | null>(categoriesToShow[0]?.category || null);

    const handleSelect = (element: ArchitecturalElement) => {
        const isSelected = selectedElements.some(e => e.id === element.id);
        if (isSelected) {
            onSelectionChange(selectedElements.filter(e => e.id !== element.id));
        } else {
            onSelectionChange([...selectedElements, element]);
        }
    };
    
    React.useEffect(() => {
        setOpenCategory(categoriesToShow[0]?.category || null);
    }, [tab, categoriesToShow]);

    return (
        <div className="space-y-4 flex flex-col h-full">
            <h2 className='text-xl font-bold text-gray-800 dark:text-gray-100 border-b pb-3 border-gray-200 dark:border-gray-600 flex-shrink-0'>Yếu tố Kiến trúc</h2>

            {hasReferenceImage && (
                <div className="flex-shrink-0 p-3 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 dark:border-yellow-600 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        ⚠️ Chi tiết kiến trúc đang được ưu tiên theo "Hình ảnh tham khảo".
                    </p>
                </div>
            )}

            <div className="flex p-1 bg-gray-100 dark:bg-gray-700 rounded-lg flex-shrink-0">
                <button onClick={() => setTab('exterior')} className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors ${tab === 'exterior' ? 'bg-white dark:bg-gray-800 shadow text-indigo-700 dark:text-indigo-300' : 'text-gray-600 dark:text-gray-400'}`}>Ngoại thất</button>
                <button onClick={() => setTab('interior')} className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors ${tab === 'interior' ? 'bg-white dark:bg-gray-800 shadow text-indigo-700 dark:text-indigo-300' : 'text-gray-600 dark:text-gray-400'}`}>Nội thất</button>
            </div>

            <div className={`flex-grow overflow-y-auto pr-2 transition-opacity duration-300 ${hasReferenceImage ? 'opacity-40 pointer-events-none' : ''}`}>
                {categoriesToShow.map(group => (
                    <AccordionItem
                        key={group.category}
                        title={group.category}
                        isOpen={openCategory === group.category}
                        onClick={() => setOpenCategory(openCategory === group.category ? null : group.category)}
                    >
                        <div className="space-y-2">
                            {group.options.map(element => {
                                const isSelected = selectedElements.some(e => e.id === element.id);
                                return (
                                    <button
                                        key={element.id}
                                        onClick={() => handleSelect(element)}
                                        className={`w-full p-3 text-left rounded-lg border-2 transition-all flex items-center justify-between ${isSelected ? 'bg-indigo-50 dark:bg-indigo-900/40 border-indigo-500' : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'}`}
                                    >
                                        <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{element.name}</span>
                                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${isSelected ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 dark:border-gray-500'}`}>
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
