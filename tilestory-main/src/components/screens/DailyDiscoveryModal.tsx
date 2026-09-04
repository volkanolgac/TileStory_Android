import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Sparkles, Trophy, Play } from 'lucide-react';
import { sound } from '../../services/sound';
import { t } from '../../data/localization';
import { PlayerProfile } from '../../types/game';

interface DailyDiscoveryModalProps {
  profile: PlayerProfile;
  onPlayDaily: () => void;
  onBack: () => void;
  language: 'en' | 'tr';
}

export const DailyDiscoveryModal: React.FC<DailyDiscoveryModalProps> = ({
  profile,
  onPlayDaily,
  onBack,
  language
}) => {
  const todayStr = new Date().toDateString();
  const alreadyCompleted = profile.dailyDiscoveryCompletedDate === todayStr;

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none overflow-hidden bg-gradient-to-b from-sky-200 via-emerald-100 to-amber-100 p-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between z-10">
        <button
          id="daily-discovery-back-btn"
          type="button"
          onClick={() => {
            sound.playTap();
            onBack();
          }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/90 border border-slate-200 text-slate-700 text-xs font-bold shadow-xs active:scale-95 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t('back', language)}</span>
        </button>

        <h2 className="text-base font-bold text-slate-800 font-heading">
          {t('dailyDiscovery', language)}
        </h2>

        <div className="w-10" />
      </div>

      {/* Main Content Card */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-xs mx-auto text-center my-auto">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-300 to-yellow-400 border-4 border-white shadow-xl flex items-center justify-center text-5xl mb-4"
        >
          🧩
        </motion.div>

        <h3 className="text-2xl font-extrabold text-slate-800 font-heading tracking-wide">
          {t('dailyPuzTitle', language)}
        </h3>

        <p className="text-xs text-emerald-950/80 leading-relaxed mt-2 mb-6 px-3">
          {t('dailyPuzDesc', language)}
        </p>

        {/* Rewards Box */}
        <div className="w-full p-3 bg-white/90 rounded-2xl border-2 border-amber-300 shadow-xs flex items-center justify-around mb-6">
          <div className="flex items-center gap-1.5 font-bold text-amber-900 text-xs">
            <span className="text-lg">🪙</span>
            <span>+150 Coins</span>
          </div>
          <div className="w-px h-6 bg-amber-200" />
          <div className="flex items-center gap-1.5 font-bold text-sky-900 text-xs">
            <span className="text-lg">⭐</span>
            <span>+5 Stars</span>
          </div>
        </div>

        {alreadyCompleted ? (
          <div className="w-full py-3 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-sm flex items-center justify-center gap-2">
            <span>✓</span>
            <span>{language === 'tr' ? 'Bugün Tamamlandı!' : 'Completed Today!'}</span>
          </div>
        ) : (
          <button
            id="start-daily-puzzle-btn"
            type="button"
            onClick={() => {
              sound.playTap();
              onPlayDaily();
            }}
            className="w-full py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-amber-950 font-heading font-extrabold text-lg rounded-2xl shadow-lg border-2 border-amber-200 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <Play className="w-5 h-5 fill-amber-950 text-amber-950" />
            <span>{language === 'tr' ? 'GÜNÜN BULMACASINI ÇÖZ' : 'START DAILY PUZZLE'}</span>
          </button>
        )}
      </div>

      <div className="text-center text-[11px] text-slate-500 font-medium">
        {language === 'tr' ? 'Her gün yeni bir özel tarif yayınlanır!' : 'A special puzzle awaits you every day!'}
      </div>
    </div>
  );
};
