import React, { useState } from 'react';

interface AngleSelectorProps {
  angleOptions: string[];
  onGenerateAngle: (prompt: string) => void;
  isLoading: boolean;
}

const AngleSelector: React.FC<AngleSelectorProps> = ({ angleOptions, onGenerateAngle, isLoading }) => {
  const [selectedAngle, setSelectedAngle] = useState(angleOptions[0] || '');

  // Update selected angle if options change (e.g., switching from interior to exterior)
  React.useEffect(() => {
    setSelectedAngle(angleOptions[0] || '');
  }, [angleOptions]);

  const handleGenerate = () => {
    if (selectedAngle) {
      onGenerateAngle(selectedAngle);
    }
  };

  return (
    <div className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
      <h3 className="text-base font-bold text-gray-800 dark:text-gray-100">
        Tạo góc nhìn khác
      </h3>
      <div>
        <label htmlFor="angle-select" className="block text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mb-1">
          Chọn góc nhìn
        </label>
        <select
          id="angle-select"
          value={selectedAngle}
          onChange={(e) => setSelectedAngle(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm focus:ring-2 focus:ring-indigo-500"
        >
          {angleOptions.map((prompt, index) => (
            <option key={index} value={prompt}>
              {prompt.split(',')[0]}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className="w-full py-2 text-center text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Đang tạo...' : 'Tạo góc nhìn'}
      </button>
    </div>
  );
};

export default AngleSelector;
