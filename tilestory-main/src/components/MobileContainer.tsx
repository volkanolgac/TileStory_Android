import React from 'react';

interface MobileContainerProps {
  children: React.ReactNode;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden select-none">
      {/* Phone Mockup Frame on Desktop / Direct Fullscreen on Mobile */}
      <div className="relative w-full h-[100dvh] sm:h-[880px] sm:max-w-[430px] bg-gradient-to-b from-amber-50 via-emerald-50/40 to-teal-50 sm:rounded-[44px] shadow-2xl sm:ring-8 sm:ring-slate-800/80 sm:border-4 sm:border-slate-700/50 flex flex-col overflow-hidden">
        
        {/* Subtle decorative phone speaker / camera notch on desktop */}
        <div className="hidden sm:flex absolute top-2 inset-x-0 justify-center z-50 pointer-events-none">
          <div className="w-24 h-4 bg-slate-800/90 rounded-full flex items-center justify-center gap-2 px-3">
            <div className="w-2 h-2 rounded-full bg-slate-900 ring-1 ring-slate-700" />
            <div className="w-8 h-1 rounded-full bg-slate-700" />
          </div>
        </div>

        {/* Content Area */}
        <div className="relative flex-1 flex flex-col w-full h-full overflow-hidden sm:pt-4">
          {children}
        </div>

        {/* Bottom Home Indicator on desktop */}
        <div className="hidden sm:flex h-5 w-full items-center justify-center pointer-events-none pb-1">
          <div className="w-28 h-1 bg-slate-400/40 rounded-full" />
        </div>
      </div>
    </div>
  );
};
