import React from 'react';
import { motion } from 'motion/react';
import { Star, ArrowRight, Map } from 'lucide-react';
import { sound } from '../../services/sound';
import { t } from '../../data/localization';

interface LevelCompleteModalProps {
  levelId: number;
  coinsEarned: number;
  starsEarned: number;
  onNextLevel: () => void;
  onGoToMap: () => void;
  language: 'en' | 'tr';
}

export const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({
  levelId,
  coinsEarned,
  starsEarned,
  onNextLevel,
  onGoToMap,
  language
}) => {
  return (
    <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-6 z-[100] select-none">
      <motion.div
        initial={{ scale: 0.6, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="w-full max-w-xs bg-gradient-to-b from-amber-50 to-emerald-50 rounded-[36px] p-6 shadow-2xl border-4 border-amber-300 flex flex-col items-center text-center relative overflow-hidden"
      >
        {/* Top Sunburst Rays background */}
        <div className="absolute -top-12 inset-x-0 h-32 bg-gradient-to-b from-amber-300/40 to-transparent pointer-events-none rounded-full" />

        {/* 3 Golden Stars */}
        <div className="flex items-center justify-center gap-2 mb-2 z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15 }}
          >
            <Star className="w-8 h-8 fill-amber-400 text-amber-500 filter drop-shadow" />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1.2 }}
            transition={{ delay: 0.3 }}
          >
            <Star className="w-10 h-10 fill-amber-400 text-amber-500 filter drop-shadow -mt-2" />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.45 }}
          >
            <Star className="w-8 h-8 fill-amber-400 text-amber-500 filter drop-shadow" />
          </motion.div>
        </div>

        <h2 className="text-2xl font-extrabold text-slate-800 font-heading tracking-wide mb-1 z-10">
          {t('victory', language)}
        </h2>
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-4 z-10">
          {t('level', language)} {levelId} {language === 'tr' ? 'Tamamlandı' : 'Cleared'}
        </span>

        {/* Rewards Pills */}
        <div className="flex items-center justify-center gap-3 w-full mb-6 z-10">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100/90 border-2 border-amber-300 rounded-2xl shadow-xs text-amber-900 font-bold text-xs">
            <span className="text-base">🪙</span>
            <span>+{coinsEarned}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-100/90 border-2 border-sky-300 rounded-2xl shadow-xs text-sky-900 font-bold text-xs">
            <span className="text-base">⭐</span>
            <span>+{starsEarned}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5 w-full z-10">
          {/* Next Level Button */}
          <button
            id="level-complete-next-btn"
            type="button"
            onClick={() => {
              sound.playTap();
              onNextLevel();
            }}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-heading font-extrabold text-base rounded-2xl shadow-lg border-2 border-emerald-300 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <span>{t('nextLevel', language)}</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Map Button */}
          <button
            id="level-complete-map-btn"
            type="button"
            onClick={() => {
              sound.playTap();
              onGoToMap();
            }}
            className="w-full py-2.5 bg-white/80 hover:bg-white text-emerald-900 font-heading font-bold text-xs rounded-xl border border-emerald-300/80 flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
          >
            <Map className="w-4 h-4 text-emerald-700" />
            <span>{t('levelMap', language)}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
