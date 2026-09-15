import React from 'react';

interface MobileContainerProps {
  children: React.ReactNode;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden select-none bg-gradient-to-b from-amber-50 via-emerald-50/40 to-teal-50 flex flex-col">
      {/* Content Area */}
      <div className="relative flex-1 flex flex-col w-full h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
};

