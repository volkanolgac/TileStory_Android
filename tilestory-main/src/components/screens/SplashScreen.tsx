import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Play } from 'lucide-react';
import { sound } from '../../services/sound';
import { t } from '../../data/localization';

interface SplashScreenProps {
  onStart: () => void;
  language: 'en' | 'tr';
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart, language }) => {
  return (
    <div
      onClick={() => {
        sound.playTap();
        sound.startAmbientMusic();
        onStart();
      }}
      className="relative w-full h-full flex flex-col items-center justify-between p-6 bg-gradient-to-b from-emerald-100 via-sky-100 to-amber-100 cursor-pointer select-none overflow-hidden"
    >
      {/* Gentle Floating Sky Elements & Nature Atmosphere */}
      <div className="absolute top-8 left-6 text-3xl opacity-75 animate-float-slow">☁️</div>
      <div className="absolute top-16 right-8 text-4xl opacity-70 animate-float-slow" style={{ animationDelay: '1.5s' }}>☁️</div>
      <div className="absolute top-6 right-10 text-5xl animate-pulse-glow">☀️</div>

      {/* Floating Flowers & Butterflies */}
      <motion.div
        animate={{ y: [0, -10, 0], x: [0, 8, 0], rotate: [-4, 4, -4] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className="absolute top-28 left-8 text-2xl filter drop-shadow-md pointer-events-none"
      >
        🌸
      </motion.div>
      <motion.div
        animate={{ y: [0, -14, 0], x: [0, -6, 0], rotate: [4, -4, 4] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 1 }}
        className="absolute top-36 right-8 text-2xl filter drop-shadow-md pointer-events-none"
      >
        🦋
      </motion.div>

      {/* Top Tagline Pill */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mt-6 z-10"
      >
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/90 backdrop-blur-xs border-2 border-emerald-300/80 rounded-full text-emerald-900 text-xs font-bold uppercase tracking-widest shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          <span>{t('gameSubtitle', language)}</span>
        </div>
      </motion.div>

      {/* Center Hero: Game Icon 3D Card Artwork */}
      <div className="flex flex-col items-center text-center max-w-xs z-10 my-auto">
        <motion.div
          initial={{ scale: 0.7, opacity: 0, rotate: -6 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="relative group mb-4"
        >
          {/* Ambient Glow Halo */}
          <div className="absolute -inset-3 bg-gradient-to-r from-emerald-400 via-amber-300 to-teal-400 rounded-3xl blur-md opacity-70 group-hover:opacity-100 animate-pulse-glow" />

          {/* Icon Container with Wooden-styled Bevel Frame */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            className="relative w-48 h-48 sm:w-52 sm:h-52 rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-200/90 ring-4 ring-emerald-600/30 bg-emerald-900"
          >
            <img
              src="./app_icon.jpg"
              alt="TileStory App Icon"
              className="w-full h-full object-cover select-none pointer-events-none filter drop-shadow-sm"
              onError={(e) => {
                // Fallback if image path varies
                (e.target as HTMLImageElement).src = '/app_icon.jpg';
              }}
            />
          </motion.div>

          {/* Decorative Corner Accents */}
          <div className="absolute -bottom-2 -left-2 text-2xl filter drop-shadow">🌱</div>
          <div className="absolute -top-2 -right-2 text-2xl filter drop-shadow">✨</div>
        </motion.div>

        {/* Tagline Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xs sm:text-sm font-semibold text-emerald-950/80 mt-1 px-4 leading-relaxed bg-white/60 backdrop-blur-xs py-1.5 rounded-2xl border border-emerald-200/60 shadow-2xs"
        >
          {t('tagline', language)}
        </motion.p>
      </div>

      {/* Bottom Interactive Play / Tap To Start Button */}
      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        className="w-full max-w-xs mb-6 flex flex-col items-center gap-2.5 z-10"
      >
        <div className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-heading font-extrabold text-lg rounded-2xl shadow-xl border-2 border-emerald-300 flex items-center justify-center gap-2.5 cursor-pointer ring-4 ring-emerald-400/30">
          <Play className="w-5 h-5 fill-white" />
          <span>{t('play', language)}</span>
          <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
        </div>
        <span className="text-xs text-slate-600 font-bold tracking-wide">
          {t('tapToContinue', language)}
        </span>
      </motion.div>
    </div>
  );
};
