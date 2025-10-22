import React, { useState } from 'react';
import { LightingOption, EnvironmentOption, LightingCategory, EnvironmentCategory } from '../../types';

interface PanelEnvironmentProps {
  lightingCategories: LightingCategory[];
  environmentCategories: EnvironmentCategory[];
  selectedLighting: LightingOption;
  onLightingChange: (option: LightingOption) => void;
  selectedEnvironment: EnvironmentOption;
  onEnvironmentChange: (option: EnvironmentOption) => void;
}

export const PanelEnvironment: React.FC<PanelEnvironmentProps> = ({
  lightingCategories,
  environmentCategories,
  selectedLighting,
  onLightingChange,
  selectedEnvironment,
  onEnvironmentChange,
}) => {
  const [lightingType, setLightingType] = useState<'exterior' | 'interior'>('exterior');

  // Robust logic based on array order, assuming Exterior is first and Interior is second.
  const exteriorLighting = (lightingCategories && lightingCategories.length > 0) ? lightingCategories[0].options : [];
  const interiorLighting = (lightingCategories && lightingCategories.length > 1) ? lightingCategories[1].options : [];

  const lightingOptionsToShow = lightingType === 'exterior' ? exteriorLighting : interiorLighting;
  
  return (
    <div className="space-y-6 flex flex-col h-full">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 border-b pb-3 border-gray-200 dark:border-gray-600 flex-shrink-0">
        Ánh sáng & Môi trường
      </h2>

      <div className="flex-grow overflow-y-auto pr-2 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Tùy chọn ánh sáng
          </label>
          <div className="flex p-1 bg-gray-100 dark:bg-gray-700 rounded-lg mb-3">
              <button onClick={() => setLightingType('exterior')} className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors ${lightingType === 'exterior' ? 'bg-white dark:bg-gray-800 shadow text-indigo-700 dark:text-indigo-300' : 'text-gray-600 dark:text-gray-400'}`}>Ngoại thất</button>
              <button onClick={() => setLightingType('interior')} className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors ${lightingType === 'interior' ? 'bg-white dark:bg-gray-800 shadow text-indigo-700 dark:text-indigo-300' : 'text-gray-600 dark:text-gray-400'}`}>Nội thất</button>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {lightingOptionsToShow.map((option) => (
              <button
                key={option.id}
                onClick={() => onLightingChange(option)}
                className={`p-3 text-left rounded-lg border-2 transition-all ${
                  selectedLighting.id === option.id
                    ? 'bg-indigo-50 dark:bg-indigo-900/40 border-indigo-500'
                    : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{option.name}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Môi trường & Thời tiết
          </label>
          <div className="grid grid-cols-1 gap-2">
            {environmentCategories[0]?.options.map((option) => (
              <button
                key={option.id}
                onClick={() => onEnvironmentChange(option)}
                className={`p-3 text-left rounded-lg border-2 transition-all ${
                  selectedEnvironment.id === option.id
                    ? 'bg-indigo-50 dark:bg-indigo-900/40 border-indigo-500'
                    : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{option.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
