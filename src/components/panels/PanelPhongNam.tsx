import React, { useState } from 'react';

import { PHONG_NAM_CONTEXT } from '../../constants/phongNamContext';

interface PanelPhongNamProps {
  darkMode: boolean;
}

type TabType = 'overview' | 'history' | 'architecture' | 'culture' | 'challenges';

export const PanelPhongNam: React.FC<PanelPhongNamProps> = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'overview', label: 'Tổng quan', icon: '🏘️' },
    { id: 'history', label: 'Lịch sử', icon: '📜' },
    { id: 'architecture', label: 'Kiến trúc', icon: '🏛️' },
    { id: 'culture', label: 'Văn hóa', icon: '🎭' },
    { id: 'challenges', label: 'Thách thức', icon: '⚠️' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
              <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">
                {PHONG_NAM_CONTEXT.overview.name}
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Vị trí:</span>
                  <p className="text-gray-600 dark:text-gray-400">{PHONG_NAM_CONTEXT.overview.location}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Diện tích:</span>
                  <p className="text-gray-600 dark:text-gray-400">{PHONG_NAM_CONTEXT.overview.area}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Dân số:</span>
                  <p className="text-gray-600 dark:text-gray-400">{PHONG_NAM_CONTEXT.overview.population}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Thành lập:</span>
                  <p className="text-gray-600 dark:text-gray-400">{PHONG_NAM_CONTEXT.overview.established}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Mục tiêu Trại sáng tác
              </h4>
              <p className="text-sm italic text-blue-700 dark:text-blue-300 mb-2">
                "{PHONG_NAM_CONTEXT.workshopObjectives.title}"
              </p>
              <div className="space-y-2">
                {PHONG_NAM_CONTEXT.workshopObjectives.goals.map((goal, idx) => (
                  <div key={idx} className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                    <p className="font-medium text-sm text-gray-900 dark:text-gray-100 mb-1">
                      {goal.objective}
                    </p>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-0.5 ml-4">
                      {goal.tasks.slice(0, 3).map((task, i) => (
                        <li key={i}>• {task}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Lịch sử hình thành
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {PHONG_NAM_CONTEXT.history.content}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Các mốc lịch sử quan trọng
              </h4>
              <div className="space-y-2">
                {PHONG_NAM_CONTEXT.history.keyDates.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded min-w-[60px] text-center">
                      {item.year}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                      {item.event}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'architecture':
        return (
          <div className="space-y-4">
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-700">
              <p className="text-sm text-amber-900 dark:text-amber-100">
                <span className="font-semibold">Di sản kiến trúc:</span> {PHONG_NAM_CONTEXT.architecturalHeritage.monuments.length} công trình tiêu biểu
              </p>
            </div>

            {PHONG_NAM_CONTEXT.architecturalHeritage.monuments.map((monument, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">
                    {monument.name}
                  </h4>
                  {monument.type && (
                    <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 rounded">
                      Di tích cấp TP
                    </span>
                  )}
                </div>
                
                {monument.built && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    🏗️ {monument.built}
                  </p>
                )}
                
                {monument.style && (
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                    <span className="font-medium">Kiểu:</span> {monument.style}
                  </p>
                )}

                {monument.features && monument.features.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Đặc điểm:
                    </p>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-0.5 ml-3">
                      {monument.features.map((feature, i) => (
                        <li key={i}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {monument.significance && (
                  <p className="text-xs italic text-green-700 dark:text-green-300 mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                    💡 {monument.significance}
                  </p>
                )}
              </div>
            ))}
          </div>
        );

      case 'culture':
        return (
          <div className="space-y-4">
            {/* Làng nghề */}
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
              <h4 className="font-bold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                <span>🏺</span> Làng nghề truyền thống
              </h4>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {PHONG_NAM_CONTEXT.traditionalCrafts.crafts.map((craft, idx) => (
                  <div key={idx} className="bg-white dark:bg-gray-800 p-2 rounded text-sm">
                    <p className="font-medium text-gray-900 dark:text-gray-100">{craft.name}</p>
                    {craft.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">{craft.description}</p>
                    )}
                    {craft.households && (
                      <p className="text-xs text-green-600 dark:text-green-400">{craft.households}</p>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">Chợ quê:</span> {PHONG_NAM_CONTEXT.traditionalCrafts.market}
              </p>
            </div>

            {/* Lễ hội */}
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-700">
              <h4 className="font-bold text-red-900 dark:text-red-100 mb-2 flex items-center gap-2">
                <span>🎭</span> {PHONG_NAM_CONTEXT.festivals.title}
              </h4>
              
              <div className="space-y-2 text-sm">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Chu kỳ:</span> {PHONG_NAM_CONTEXT.festivals.schedule}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Thời gian:</span> {PHONG_NAM_CONTEXT.festivals.date} ({PHONG_NAM_CONTEXT.festivals.duration})
                </p>
              </div>

              <div className="mt-3 space-y-2">
                {PHONG_NAM_CONTEXT.festivals.activities.map((activity, idx) => (
                  <div key={idx} className="bg-white dark:bg-gray-800 p-2 rounded">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {activity.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {activity.description}
                    </p>
                    {activity.games && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {activity.games.slice(0, 4).map((game, i) => (
                          <span key={i} className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded">
                            {game}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-xs italic text-red-700 dark:text-red-300 mt-3 pt-2 border-t border-red-200 dark:border-red-700">
                ⚠️ {PHONG_NAM_CONTEXT.festivals.history}
              </p>
            </div>

            {/* Cảnh quan */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
              <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                <span>🌾</span> Cảnh quan đặc trưng
              </h4>
              <div className="space-y-2">
                {PHONG_NAM_CONTEXT.landscape.features.map((feature, idx) => (
                  <div key={idx} className="text-sm">
                    <p className="font-medium text-gray-900 dark:text-gray-100">{feature.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'challenges':
        return (
          <div className="space-y-4">
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-700">
              <h4 className="font-bold text-orange-900 dark:text-orange-100 mb-3 flex items-center gap-2">
                <span>⚠️</span> Thách thức bảo tồn
              </h4>
              <ul className="space-y-2">
                {PHONG_NAM_CONTEXT.challenges.issues.map((issue, idx) => (
                  <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">●</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Giải pháp tôn tạo và phát triển
              </h4>
              <div className="space-y-2">
                {PHONG_NAM_CONTEXT.solutions.strategies.map((strategy, idx) => (
                  <details key={idx} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <summary className="cursor-pointer p-3 font-medium text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                      {strategy.category}
                    </summary>
                    <ul className="px-3 pb-3 space-y-1">
                      {strategy.actions.map((action, i) => (
                        <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          Làng cổ Phong Nam
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Neo kiến trúc cảnh quan - Bất biến giữa dòng đời vạn biến
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <span className="mr-1">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};
