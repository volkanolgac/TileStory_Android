import React from 'react';
import { motion } from 'motion/react';
import { Play, BookOpen, Gift, Compass, Globe, User, HelpCircle } from 'lucide-react';
import { sound } from '../../services/sound';
import { t } from '../../data/localization';
import { ScreenType, PlayerProfile } from '../../types/game';

interface MainMenuScreenProps {
  profile: PlayerProfile;
  onNavigate: (screen: ScreenType) => void;
  language: 'en' | 'tr';
}

export const MainMenuScreen: React.FC<MainMenuScreenProps> = ({
  profile,
  onNavigate,
  language
}) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden select-none pb-4">
      {/* Animated Garden Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-emerald-100 to-amber-100 pointer-events-none">
        {/* Sun and Clouds */}
        <div className="absolute top-4 right-8 text-4xl animate-pulse-glow">☀️</div>
        <div className="absolute top-8 left-6 text-3xl opacity-80 animate-float-slow">☁️</div>

        {/* Garden Elements in mid/bottom background */}
        <div className="absolute bottom-16 inset-x-0 h-72 bg-gradient-to-t from-emerald-500/20 via-emerald-300/30 to-transparent rounded-t-[60px]" />
        
        {/* Animated Garden Cottage preview */}
        <div className="absolute bottom-28 left-8 text-6xl filter drop-shadow-md">🏡</div>
        {/* Animated Trees preview */}
        <div className="absolute bottom-36 right-6 text-5xl filter drop-shadow">🌳</div>
        <div className="absolute bottom-24 right-16 text-4xl filter drop-shadow">🌲</div>
        {/* Pond preview */}
        <div className="absolute bottom-20 left-32 text-4xl opacity-90">🏝️</div>
        {/* Fluttering Butterflies */}
        <motion.div
          animate={{ x: [0, 40, 20, 0], y: [0, -25, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          className="absolute bottom-44 left-24 text-2xl filter drop-shadow"
        >
          🦋
        </motion.div>
        <motion.div
          animate={{ x: [0, -30, -10, 0], y: [0, -20, -35, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          className="absolute bottom-52 right-24 text-xl filter drop-shadow"
        >
          🐝
        </motion.div>
      </div>

      {/* Top Banner with Title */}
      <div className="relative z-10 flex flex-col items-center pt-8 px-4 text-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center"
        >
          <div className="px-3 py-1 bg-white/80 backdrop-blur-xs border border-amber-300 rounded-full text-amber-900 text-[11px] font-bold uppercase tracking-widest mb-1 shadow-xs">
            🌱 {t('gameSubtitle', language)}
          </div>
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight font-heading drop-shadow-sm">
            Tile Story
          </h1>
          <div className="text-xs font-semibold text-emerald-800/80 mt-0.5">
            {t('level', language)} {profile.currentLevel} • {Object.keys(profile.discoveries).length} {t('discoveryBook', language)}
          </div>
        </motion.div>
      </div>

      {/* Main Big Play Button & Level indicator */}
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 my-auto">
        <motion.button
          id="main-menu-play-btn"
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            sound.playTap();
            onNavigate('game');
          }}
          className="w-full max-w-[280px] py-4 px-6 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-amber-950 font-heading font-extrabold text-2xl rounded-3xl shadow-xl border-4 border-amber-200 flex items-center justify-center gap-3 transition-all cursor-pointer ring-4 ring-amber-500/20"
        >
          <Play className="w-8 h-8 fill-amber-950 text-amber-950" />
          <span>{t('play', language)}</span>
        </motion.button>

        {/* Secondary Map Navigation pill */}
        <button
          id="main-menu-level-map-btn"
          type="button"
          onClick={() => {
            sound.playTap();
            onNavigate('level_map');
          }}
          className="flex items-center gap-2 px-4 py-1.5 bg-white/90 backdrop-blur-xs border-2 border-emerald-300 rounded-full text-emerald-900 text-xs font-bold shadow-xs hover:bg-white active:scale-95 transition-all"
        >
          <span>🗺️</span>
          <span>{t('levelMap', language)}</span>
        </button>
      </div>

      {/* Secondary Menu Buttons: 3 Equal Small Buttons (Koleksiyon, Günün Keşfi, Günlük Ödül) */}
      <div className="relative z-10 px-4 flex flex-col gap-2.5">
        {/* Quick Access Row: 3 Equal-Sized Compact Buttons */}
        <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto w-full">
          {/* Koleksiyon Button (Equal small size) */}
          <button
            id="main-menu-discovery-btn"
            type="button"
            onClick={() => {
              sound.playTap();
              onNavigate('discovery_book');
            }}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white/90 backdrop-blur-xs border-2 border-amber-300/80 shadow-md hover:bg-amber-50/80 active:scale-95 transition-all text-center cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-lg shadow-xs mb-1">
              📖
            </div>
            <div className="text-xs font-bold text-slate-800 font-heading leading-tight truncate w-full">
              {t('discoveryBook', language)}
            </div>
            <div className="text-[10px] text-amber-700 font-bold mt-0.5">
              {Object.keys(profile.discoveries).length} / 22
            </div>
          </button>

          {/* Günün Keşfi Button */}
          <button
            id="main-menu-daily-puz-btn"
            type="button"
            onClick={() => {
              sound.playTap();
              onNavigate('daily_discovery');
            }}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white/90 backdrop-blur-xs border-2 border-sky-300/80 shadow-md hover:bg-sky-50/80 active:scale-95 transition-all text-center cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-sky-100 flex items-center justify-center text-lg shadow-xs mb-1">
              🧩
            </div>
            <div className="text-xs font-bold text-slate-800 font-heading leading-tight truncate w-full">
              {t('dailyDiscovery', language)}
            </div>
            <div className="text-[10px] text-sky-700 font-semibold mt-0.5">
              {language === 'tr' ? 'Özel Ödül' : 'Special'}
            </div>
          </button>

          {/* Günlük Ödüller Button */}
          <button
            id="main-menu-daily-rewards-btn"
            type="button"
            onClick={() => {
              sound.playTap();
              onNavigate('daily_rewards');
            }}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white/90 backdrop-blur-xs border-2 border-rose-300/80 shadow-md hover:bg-rose-50/80 active:scale-95 transition-all text-center cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-lg shadow-xs mb-1">
              🎁
            </div>
            <div className="text-xs font-bold text-slate-800 font-heading leading-tight truncate w-full">
              {t('dailyRewards', language)}
            </div>
            <div className="text-[10px] text-rose-700 font-semibold mt-0.5">
              {profile.dailyStreak} {t('days', language)} 🔥
            </div>
          </button>
        </div>

        {/* Small Bottom Utility Bar (Profile, Help) */}
        <div className="flex items-center justify-center gap-4 mt-1">
          <button
            id="main-menu-profile-btn"
            type="button"
            onClick={() => {
              sound.playTap();
              onNavigate('profile');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 hover:bg-white text-slate-700 text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <User className="w-3.5 h-3.5" />
            <span>{t('profile', language)}</span>
          </button>

          <button
            id="main-menu-help-btn"
            type="button"
            onClick={() => {
              sound.playTap();
              onNavigate('help');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 hover:bg-white text-slate-700 text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t('help', language)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
