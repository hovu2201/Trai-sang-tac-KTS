import React, { useState } from 'react';

interface Option {
  id: string;
  name: string;
  description?: string;
  icon?: React.ReactNode;
}

interface OptionGroup {
  category: string;
  options: Option[];
}

interface MobileSelectionProps {
  title: string;
  options: Option[] | OptionGroup[];
  selectedId: string;
  onSelect: (option: Option) => void;
  searchPlaceholder?: string;
  showSearch?: boolean;
  renderOption?: (option: Option, isSelected: boolean) => React.ReactNode;
}

const isOptionGroup = (options: any[]): options is OptionGroup[] => {
  return options.length > 0 && 'category' in options[0];
};

export const MobileSelection: React.FC<MobileSelectionProps> = ({
  title,
  options,
  selectedId,
  onSelect,
  searchPlaceholder = 'Tìm kiếm...',
  showSearch = true,
  renderOption,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const filterOptions = (opts: Option[]): Option[] => {
    if (!searchTerm) return opts;
    const term = searchTerm.toLowerCase();
    return opts.filter(
      (opt) =>
        opt.name.toLowerCase().includes(term) ||
        opt.description?.toLowerCase().includes(term)
    );
  };

  const defaultRenderOption = (option: Option, isSelected: boolean) => (
    <button
      key={option.id}
      onClick={() => onSelect(option)}
      className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
      }`}
    >
      <div className="flex items-start gap-3">
        {option.icon && <div className="flex-shrink-0 mt-0.5">{option.icon}</div>}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 dark:text-gray-100">{option.name}</p>
          {option.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{option.description}</p>
          )}
        </div>
        {isSelected && (
          <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    </button>
  );

  const renderFn = renderOption || defaultRenderOption;

  return (
    <div className="flex flex-col h-full">
      {/* Header with Search */}
      {showSearch && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Options List */}
      <div className="flex-1 overflow-y-auto p-4">
        {isOptionGroup(options) ? (
          // Grouped Options with Accordion
          <div className="space-y-2">
            {options.map((group) => {
              const filteredGroupOptions = filterOptions(group.options);
              if (filteredGroupOptions.length === 0 && searchTerm) return null;

              const isExpanded = expandedCategory === group.category || searchTerm !== '';

              return (
                <div key={group.category} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedCategory(isExpanded ? null : group.category)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{group.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {filteredGroupOptions.length} tùy chọn
                      </span>
                      <svg
                        className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-3 space-y-2 bg-white dark:bg-gray-900">
                      {filteredGroupOptions.map((option) =>
                        renderFn(option, option.id === selectedId)
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          // Flat Options List
          <div className="space-y-2">
            {filterOptions(options as Option[]).map((option) =>
              renderFn(option, option.id === selectedId)
            )}
          </div>
        )}

        {/* No Results */}
        {searchTerm && (
          isOptionGroup(options)
            ? options.every((g) => filterOptions(g.options).length === 0)
            : filterOptions(options as Option[]).length === 0
        ) && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="font-medium">Không tìm thấy kết quả</p>
            <p className="text-sm mt-1">Thử tìm kiếm với từ khóa khác</p>
          </div>
        )}
      </div>
    </div>
  );
};
