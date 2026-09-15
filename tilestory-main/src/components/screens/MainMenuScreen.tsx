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
        <div className="absolute bottom-12 inset-x-0 h-80 bg-gradient-to-t from-emerald-600/25 via-emerald-400/20 to-transparent rounded-t-[70px]" />
        
        {/* Rolling garden grass hill layer */}
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-emerald-500/30 to-transparent" />

        {/* Houses and Village Buildings */}
        <div className="absolute bottom-28 left-4 sm:left-10 text-6xl filter drop-shadow-md hover:scale-105 transition-transform">🏡</div>
        <div className="absolute bottom-36 left-1 text-3xl opacity-85 filter drop-shadow-xs">🏠</div>

        {/* Trees, Pines & Foliage on right (lowered to align horizontally with the house on the left) */}
        <div className="absolute bottom-28 right-4 sm:right-10 text-5xl filter drop-shadow">🌳</div>
        <div className="absolute bottom-35 right-1 sm:right-6 text-4xl opacity-85 filter drop-shadow-xs">🌳</div>
        <div className="absolute bottom-24 right-14 sm:right-24 text-4xl filter drop-shadow">🌲</div>

        {/* Ponds, Fountains & Island */}
        <div className="absolute bottom-20 left-28 sm:left-36 text-4xl opacity-95 filter drop-shadow-xs">🏝️</div>
        <div className="absolute bottom-16 right-36 text-3xl opacity-85">⛲</div>

        {/* Rich Flowers, Garden Plants, Mushrooms & Nature Elements */}
        <div className="absolute bottom-24 left-20 text-2xl animate-bounce-gentle">🌻</div>
        <div className="absolute bottom-28 left-24 text-xl">🌷</div>
        <div className="absolute bottom-20 left-12 text-2xl">🌸</div>
        <div className="absolute bottom-16 left-6 text-xl">🪴</div>
        <div className="absolute bottom-14 left-24 text-lg">🍄</div>
        <div className="absolute bottom-22 left-44 text-xl">🌾</div>
        <div className="absolute bottom-16 left-48 text-2xl">🌺</div>

        {/* Right side garden vegetation (Pine tree moved to previous apple position) */}
        <div className="absolute bottom-18 right-6 text-2xl">🌻</div>
        <div className="absolute bottom-28 right-20 text-xl">🌷</div>
        <div className="absolute bottom-14 right-20 text-2xl">🪵</div>
        <div className="absolute bottom-16 right-28 text-lg">🍄</div>
        <div className="absolute bottom-30 right-34 text-3xl filter drop-shadow-xs">🌲</div>
        <div className="absolute bottom-22 right-44 text-xl">🌿</div>
        <div className="absolute bottom-14 right-48 text-2xl">🍀</div>

        {/* Fluttering Butterfly & Buzzing Bee (kept strictly without adding other flying animals) */}
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
      <div className="relative z-10 flex flex-col items-center pt-8 px-4 text-center mt-[20px]">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center"
        >
          <div className="px-4 py-1.5 bg-white/85 backdrop-blur-xs border border-amber-300 rounded-full text-amber-900 text-[13px] font-bold uppercase tracking-widest mb-1.5 shadow-xs">
            🌱 {t('gameSubtitle', language)}
          </div>
          <h1 className="text-5xl font-extrabold text-slate-800 tracking-tight font-heading drop-shadow-sm">
            Tile Story
          </h1>
          <div className="text-sm font-bold text-emerald-900/90 mt-1">
            {t('level', language)} {profile.currentLevel} • {Object.keys(profile.discoveries).length} {t('discoveryBook', language)}
          </div>
        </motion.div>
      </div>

      {/* Main Center Action Block: Play, Level Map, and directly underneath: Collection, Daily Discovery, Daily Rewards */}
      <div className="relative z-10 flex flex-col items-center gap-3 px-4 my-auto w-full max-w-md mx-auto">
        {/* Play Button */}
        <motion.button
          id="main-menu-play-btn"
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            sound.playTap();
            onNavigate('game');
          }}
          className="w-full max-w-[280px] py-4 px-6 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-amber-950 font-heading font-extrabold text-2xl rounded-3xl shadow-xl border-4 border-amber-200 flex items-center justify-center gap-3 transition-all cursor-pointer ring-4 ring-amber-500/20"
        >
          <Play className="w-8 h-8 fill-amber-950 text-amber-950" />
          <span>{t('play', language)}</span>
        </motion.button>

        {/* Level Map Button */}
        <button
          id="main-menu-level-map-btn"
          type="button"
          onClick={() => {
            sound.playTap();
            onNavigate('level_map');
          }}
          className="flex items-center gap-2 px-5 py-2 bg-white/95 backdrop-blur-xs border-2 border-emerald-300 rounded-full text-emerald-900 text-xs font-bold shadow-xs hover:bg-white active:scale-95 transition-all cursor-pointer"
        >
          <span>🗺️</span>
          <span>{t('levelMap', language)}</span>
        </button>

        {/* 3 Equal Buttons Directly Under Level Map: Collection, Daily Discovery, Daily Rewards */}
        <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto w-full mt-1">
          {/* Collection Button */}
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

          {/* Daily Discovery Button */}
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

          {/* Daily Rewards Button */}
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
      </div>

      {/* Bottom Utility Bar (Profile, Help) - Enlarged by 90% */}
      <div className="relative z-10 px-4 flex items-center justify-center gap-4 sm:gap-6 mt-1 mb-2">
        <button
          id="main-menu-profile-btn"
          type="button"
          onClick={() => {
            sound.playTap();
            onNavigate('profile');
          }}
          className="flex-1 max-w-[170px] flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-white/90 hover:bg-white text-slate-800 text-sm sm:text-base font-extrabold border-2 border-slate-200/90 shadow-md active:scale-95 transition-all cursor-pointer"
        >
          <User className="w-5 h-5 text-indigo-600" />
          <span>{t('profile', language)}</span>
        </button>

        <button
          id="main-menu-help-btn"
          type="button"
          onClick={() => {
            sound.playTap();
            onNavigate('help');
          }}
          className="flex-1 max-w-[170px] flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-white/90 hover:bg-white text-slate-800 text-sm sm:text-base font-extrabold border-2 border-slate-200/90 shadow-md active:scale-95 transition-all cursor-pointer"
        >
          <HelpCircle className="w-5 h-5 text-emerald-600" />
          <span>{t('help', language)}</span>
        </button>
      </div>
    </div>
  );
};
