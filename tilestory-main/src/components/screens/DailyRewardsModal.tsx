import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Gift, Check, Sparkles } from 'lucide-react';
import { sound } from '../../services/sound';
import { t } from '../../data/localization';
import { PlayerProfile } from '../../types/game';

interface DailyRewardsModalProps {
  profile: PlayerProfile;
  onClaimReward: (day: number) => void;
  onBack: () => void;
  language: 'en' | 'tr';
}

export const DailyRewardsModal: React.FC<DailyRewardsModalProps> = ({
  profile,
  onClaimReward,
  onBack,
  language
}) => {
  const todayStr = new Date().toDateString();
  const alreadyClaimedToday = profile.lastDailyClaimDate === todayStr;
  const currentStreakDay = ((profile.dailyStreak - 1) % 7) + 1;

  const rewardsSchedule = [
    { day: 1, rewardText: '100 Coins', icon: '🪙', type: 'coins' },
    { day: 2, rewardText: '+1 Magic Hand', icon: '✋', type: 'booster' },
    { day: 3, rewardText: '+5 Stars', icon: '⭐', type: 'stars' },
    { day: 4, rewardText: '250 Coins', icon: '🪙', type: 'coins' },
    { day: 5, rewardText: '+1 Rainbow Seed', icon: '🌈', type: 'booster' },
    { day: 6, rewardText: 'Booster Pack', icon: '✂️', type: 'bundle' },
    { day: 7, rewardText: 'Jackpot & Decor', icon: '🎁', type: 'jackpot' }
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none overflow-hidden bg-gradient-to-b from-amber-50 via-emerald-50 to-teal-50 p-4">
      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <button
          id="daily-rewards-back-btn"
          type="button"
          onClick={() => {
            sound.playTap();
            onBack();
          }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-xs active:scale-95 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t('back', language)}</span>
        </button>

        <h2 className="text-base font-bold text-slate-800 font-heading flex items-center gap-1.5">
          <span>🎁</span>
          <span>{t('dailyRewards', language)}</span>
        </h2>

        <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-100 border border-amber-300 rounded-xl text-amber-900 text-xs font-bold">
          <span>🔥</span>
          <span>{profile.dailyStreak} {t('days', language)}</span>
        </div>
      </div>

      {/* 7-Day Calendar Grid */}
      <div className="flex-1 overflow-y-auto py-4 z-10 no-scrollbar">
        <div className="grid grid-cols-3 gap-2.5 max-w-xs mx-auto">
          {rewardsSchedule.slice(0, 6).map((item) => {
            const isClaimed = item.day < currentStreakDay || (item.day === currentStreakDay && alreadyClaimedToday);
            const isToday = item.day === currentStreakDay && !alreadyClaimedToday;

            return (
              <div
                key={item.day}
                className={`relative aspect-square rounded-2xl border-2 p-2 flex flex-col items-center justify-between text-center transition-all ${
                  isToday
                    ? 'bg-gradient-to-b from-amber-200 to-amber-300 border-amber-400 shadow-md ring-3 ring-amber-400/50'
                    : isClaimed
                    ? 'bg-emerald-100/70 border-emerald-300 opacity-85'
                    : 'bg-white/80 border-slate-200 opacity-65'
                }`}
              >
                <span className="text-[10px] font-bold text-slate-600 uppercase">
                  {t('day', language)} {item.day}
                </span>

                <span className="text-2xl my-auto filter drop-shadow leading-none">
                  {item.icon}
                </span>

                <span className="text-[9px] font-bold text-slate-800 leading-tight">
                  {item.rewardText}
                </span>

                {isClaimed && (
                  <div className="absolute inset-0 bg-emerald-700/20 rounded-2xl flex items-center justify-center backdrop-blur-[0.5px]">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                      ✓
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Day 7 Big Card spanning across */}
          {(() => {
            const day7 = rewardsSchedule[6];
            const isClaimed = day7.day < currentStreakDay || (day7.day === currentStreakDay && alreadyClaimedToday);
            const isToday = day7.day === currentStreakDay && !alreadyClaimedToday;

            return (
              <div
                className={`col-span-3 rounded-2xl border-2 p-3 flex items-center justify-between transition-all ${
                  isToday
                    ? 'bg-gradient-to-r from-amber-300 to-yellow-400 border-amber-500 shadow-lg ring-3 ring-amber-400/50'
                    : isClaimed
                    ? 'bg-emerald-100/70 border-emerald-300 opacity-85'
                    : 'bg-white/80 border-slate-200 opacity-65'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl filter drop-shadow">🎁</span>
                  <div className="text-left">
                    <span className="text-[10px] font-extrabold text-amber-900 uppercase block">
                      {t('day', language)} 7 – Grand Jackpot
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      500 Coins + 3 Boosters + Special Decor
                    </span>
                  </div>
                </div>

                {isClaimed && (
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    ✓
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </div>

      {/* Claim Button */}
      <div className="w-full max-w-xs mx-auto z-10 pb-2">
        {alreadyClaimedToday ? (
          <div className="w-full py-3.5 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-sm text-center flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            <span>{t('claimed', language)} ({language === 'tr' ? 'Yarın Tekrar Gel' : 'Come Back Tomorrow'})</span>
          </div>
        ) : (
          <button
            id="claim-daily-reward-btn"
            type="button"
            onClick={() => {
              sound.playTap();
              sound.playCoin();
              onClaimReward(currentStreakDay);
            }}
            className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-amber-950 font-heading font-extrabold text-base rounded-2xl shadow-lg border-2 border-amber-200 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t('claimReward', language)}</span>
          </button>
        )}
      </div>
    </div>
  );
};
