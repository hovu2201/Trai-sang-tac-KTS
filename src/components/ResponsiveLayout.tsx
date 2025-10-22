import React, { useState } from 'react';

interface ResponsiveLayoutProps {
  leftPanel: React.ReactNode;
  centerPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  mobileHeader: React.ReactNode;
  desktopHeader: React.ReactNode;
  controlBar?: React.ReactNode;
  isLoading?: boolean;
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  leftPanel,
  centerPanel,
  rightPanel,
  mobileHeader,
  desktopHeader,
  controlBar,
  isLoading = false,
}) => {
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);

  return (
    <>
      {/* Desktop Layout (lg and above) */}
      <div className="hidden lg:flex h-screen w-screen flex-col">
        {/* Desktop Header */}
        {desktopHeader}

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Collapsible */}
          {!isLeftPanelCollapsed && (
            <div className="w-80 xl:w-96 flex-shrink-0 border-r border-gray-200 dark:border-gray-700 overflow-y-auto bg-white dark:bg-gray-800">
              {leftPanel}
            </div>
          )}
          
          {/* Collapse Button - Left */}
          <button
            onClick={() => setIsLeftPanelCollapsed(!isLeftPanelCollapsed)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-r-lg p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            style={{ marginLeft: isLeftPanelCollapsed ? '0' : '20rem' }}
          >
            {isLeftPanelCollapsed ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            )}
          </button>

          {/* Center Content */}
          <div className="flex-1 overflow-auto p-4">
            {centerPanel}
          </div>

          {/* Collapse Button - Right */}
          <button
            onClick={() => setIsRightPanelCollapsed(!isRightPanelCollapsed)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-l-lg p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            style={{ marginRight: isRightPanelCollapsed ? '0' : '24rem' }}
          >
            {isRightPanelCollapsed ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>

          {/* Right Panel - Collapsible */}
          {!isRightPanelCollapsed && (
            <div className="w-96 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 overflow-y-auto bg-white dark:bg-gray-800">
              {rightPanel}
            </div>
          )}
        </div>
      </div>

      {/* Mobile & Tablet Layout (below lg) */}
      <div className="lg:hidden flex flex-col h-screen w-screen overflow-hidden">
        {/* Mobile Header */}
        <div className="flex-shrink-0">
          {mobileHeader}
        </div>

        {/* Main Content - Full height with safe area */}
        <div className="flex-1 overflow-auto pb-20">
          {centerPanel}
        </div>

        {/* Bottom Control Bar - Fixed */}
        {controlBar && (
          <div className="fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg pb-safe">
            {controlBar}
          </div>
        )}

        {/* Left Drawer - Slide from left */}
        {isLeftDrawerOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
              onClick={() => setIsLeftDrawerOpen(false)}
            />
            
            {/* Drawer */}
            <div className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-gray-800 z-50 overflow-y-auto shadow-2xl animate-slide-in-left">
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between z-10">
                <h2 className="text-lg font-semibold">Bảng điều khiển</h2>
                <button
                  onClick={() => setIsLeftDrawerOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                {leftPanel}
              </div>
            </div>
          </>
        )}

        {/* Right Drawer - Slide from right */}
        {isRightDrawerOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
              onClick={() => setIsRightDrawerOpen(false)}
            />
            
            {/* Drawer */}
            <div className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-gray-800 z-50 overflow-y-auto shadow-2xl animate-slide-in-right">
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between z-10">
                <h2 className="text-lg font-semibold">Thông tin</h2>
                <button
                  onClick={() => setIsRightDrawerOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                {rightPanel}
              </div>
            </div>
          </>
        )}

        {/* Floating Action Buttons - Mobile */}
        <div className="fixed bottom-24 right-4 z-30 flex flex-col gap-2">
          {/* Open Left Panel */}
          <button
            onClick={() => setIsLeftDrawerOpen(true)}
            className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all transform hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Open Right Panel */}
          <button
            onClick={() => setIsRightDrawerOpen(true)}
            className="w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all transform hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-in-left {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.3s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        
        .pb-safe {
          padding-bottom: max(1rem, env(safe-area-inset-bottom));
        }
      `}</style>
    </>
  );
};
