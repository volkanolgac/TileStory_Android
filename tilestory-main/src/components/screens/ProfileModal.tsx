import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Award, Flame, Star, BookOpen, Globe } from 'lucide-react';
import { sound } from '../../services/sound';
import { t } from '../../data/localization';
import { PlayerProfile } from '../../types/game';
import { TILES } from '../../data/tiles';
import { WORLD_AREAS } from '../../data/world';

interface ProfileModalProps {
  profile: PlayerProfile;
  onBack: () => void;
  language: 'en' | 'tr';
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  profile,
  onBack,
  language
}) => {
  const totalTilesCount = Object.keys(TILES).length;
  const discoveredCount = Object.keys(profile.discoveries).length;

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none overflow-hidden bg-gradient-to-b from-sky-200 via-emerald-100 to-amber-100 p-4">
      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <button
          id="profile-back-btn"
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
          {t('profile', language)}
        </h2>

        <div className="w-10" />
      </div>

      {/* Profile Avatar & Level Banner */}
      <div className="flex flex-col items-center max-w-xs mx-auto w-full my-auto z-10">
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 to-emerald-400 p-1 shadow-xl">
            <div className="w-full h-full rounded-[22px] bg-white flex items-center justify-center text-4xl">
              🧑‍🌾
            </div>
          </div>
          <div className="absolute -bottom-2 inset-x-0 mx-auto w-max px-2.5 py-0.5 bg-amber-500 text-amber-950 font-extrabold text-[10px] rounded-full shadow-xs border border-white uppercase">
            Gardener
          </div>
        </div>

        <h3 className="text-xl font-extrabold text-slate-800 font-heading">
          {t('level', language)} {profile.currentLevel}
        </h3>
        <span className="text-xs font-semibold text-emerald-800 mb-6">
          {language === 'tr' ? 'Doğa Ustası' : 'Nature Artisan'}
        </span>

        {/* 2x2 Stats Cards */}
        <div className="grid grid-cols-2 gap-3 w-full">
          {/* Discoveries */}
          <div className="p-3 bg-white/90 rounded-2xl border-2 border-amber-300 shadow-xs flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-lg">
              📖
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase leading-none">
                {t('discoveryBook', language)}
              </div>
              <div className="text-sm font-extrabold text-slate-800 font-heading mt-0.5">
                {discoveredCount} / {totalTilesCount}
              </div>
            </div>
          </div>

          {/* Stars */}
          <div className="p-3 bg-white/90 rounded-2xl border-2 border-sky-300 shadow-xs flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-100 flex items-center justify-center text-lg">
              ⭐
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase leading-none">
                {language === 'tr' ? 'Toplam Yıldız' : 'Total Stars'}
              </div>
              <div className="text-sm font-extrabold text-slate-800 font-heading mt-0.5">
                {profile.stars}
              </div>
            </div>
          </div>

          {/* Current Level */}
          <div className="p-3 bg-white/90 rounded-2xl border-2 border-emerald-300 shadow-xs flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-lg">
              🎯
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase leading-none">
                {language === 'tr' ? 'Mevcut Bölüm' : 'Current Level'}
              </div>
              <div className="text-sm font-extrabold text-slate-800 font-heading mt-0.5">
                {t('level', language)} {profile.currentLevel}
              </div>
            </div>
          </div>

          {/* Daily Streak */}
          <div className="p-3 bg-white/90 rounded-2xl border-2 border-rose-300 shadow-xs flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-lg">
              🔥
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase leading-none">
                {t('dailyStreak', language)}
              </div>
              <div className="text-sm font-extrabold text-slate-800 font-heading mt-0.5">
                {profile.dailyStreak} {t('days', language)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-[11px] text-slate-500">
        Tile Story v1.0 • Offline Ready
      </div>
    </div>
  );
};
