import React from 'react';
import { Settings, Volume2, VolumeX, Sparkles, Star } from 'lucide-react';
import { sound } from '../services/sound';

interface HeaderBarProps {
  coins: number;
  stars: number;
  currentLevel?: number;
  onOpenSettings: () => void;
  onOpenShop?: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  coins,
  stars,
  currentLevel,
  onOpenSettings,
  onOpenShop,
  soundEnabled,
  onToggleSound,
  title,
  showBack = false,
  onBack
}) => {
  return (
    <header className="w-full px-4 py-2 flex items-center justify-between z-30 select-none bg-gradient-to-b from-slate-900/40 to-transparent">
      {/* Left side: Back or Level Badge */}
      <div className="flex items-center gap-2">
        {showBack ? (
          <button
            id="header-back-btn"
            type="button"
            onClick={() => {
              sound.playTap();
              onBack?.();
            }}
            className="w-10 h-10 rounded-2xl bg-white/90 shadow-md border-2 border-amber-300 flex items-center justify-center text-amber-900 font-bold active:scale-95 transition-transform"
          >
            ←
          </button>
        ) : currentLevel !== undefined ? (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 shadow-md border border-amber-200 text-amber-950 font-bold text-xs font-heading">
            <span>🌱</span>
            <span>LVL {currentLevel}</span>
          </div>
        ) : title ? (
          <h2 className="text-base font-bold text-slate-800 font-heading tracking-wide">
            {title}
          </h2>
        ) : null}
      </div>

      {/* Center: Currencies (Coins & Stars) */}
      <div className="flex items-center gap-2">
        {/* Coins Pill */}
        <button
          id="header-coins-btn"
          type="button"
          onClick={() => {
            sound.playTap();
            onOpenShop?.();
          }}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-100/95 border-2 border-amber-300 rounded-2xl shadow-xs text-amber-900 font-bold text-xs hover:bg-amber-50 transition-colors"
        >
          <span className="text-sm">🪙</span>
          <span>{coins}</span>
          <span className="text-[10px] text-amber-600 bg-amber-200/80 px-1 rounded-full">+</span>
        </button>

        {/* Stars Pill */}
        <div className="flex items-center gap-1 px-2.5 py-1 bg-sky-100/95 border-2 border-sky-300 rounded-2xl shadow-xs text-sky-900 font-bold text-xs">
          <Star className="w-3.5 h-3.5 fill-sky-400 text-sky-500" />
          <span>{stars}</span>
        </div>
      </div>

      {/* Right side: Audio toggle & Settings */}
      <div className="flex items-center gap-2">
        <button
          id="header-sound-toggle-btn"
          type="button"
          onClick={() => {
            onToggleSound();
          }}
          className="w-8 h-8 rounded-xl bg-white/80 border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 hover:bg-white active:scale-95 transition-all"
          title={soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-emerald-600" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-400" />
          )}
        </button>

        <button
          id="header-settings-btn"
          type="button"
          onClick={() => {
            sound.playTap();
            onOpenSettings();
          }}
          className="w-8 h-8 rounded-xl bg-white/80 border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 hover:bg-white active:scale-95 transition-all"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
