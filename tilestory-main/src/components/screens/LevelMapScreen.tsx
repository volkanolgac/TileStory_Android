import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Lock, Star, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { LEVELS } from '../../data/levels';
import { WORLD_AREAS } from '../../data/world';
import { sound } from '../../services/sound';
import { t } from '../../data/localization';
import { PlayerProfile } from '../../types/game';

interface LevelMapScreenProps {
  profile: PlayerProfile;
  onSelectLevel: (levelId: number) => void;
  onBack: () => void;
  language: 'en' | 'tr';
}

export const LevelMapScreen: React.FC<LevelMapScreenProps> = ({
  profile,
  onSelectLevel,
  onBack,
  language
}) => {
  // Determine current world from currentLevel
  const initialWorldId = Math.min(
    10,
    Math.max(1, Math.ceil((profile.currentLevel || 1) / 10))
  );
  const [selectedWorldId, setSelectedWorldId] = useState<number>(initialWorldId);
  const worldScrollRef = useRef<HTMLDivElement>(null);
  const levelScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the world tabs into view
  useEffect(() => {
    if (worldScrollRef.current) {
      const activeTab = worldScrollRef.current.querySelector(`#world-tab-${selectedWorldId}`);
      if (activeTab) {
        activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedWorldId]);

  const worldIcons: Record<number, string[]> = {
    1: ['🌱', '🌸', '🌿', '💧', '☀️', '🌳', '🐝', '🛖', '🍯', '🏡'],
    2: ['🌲', '🍀', '🍃', '🌰', '💧', '✨', '🌳', '🌿', '💚', '⛩️'],
    3: ['🏖️', '🐚', '🌴', '🪸', '🌊', '🦪', '🥥', '🐠', '💖', '🏝️'],
    4: ['🏘️', '🌾', '🍞', '🪵', '🏮', '🌿', '🪨', '🍎', '💨', '🏛️'],
    5: ['🔮', '🧪', '🪄', '🪷', '✨', '🌫️', '🌀', '♨️', '💜', '⛲'],
    6: ['❄️', '🌲', '🧊', '⛄', '🏔️', '🌨️', '💙', '🌌', '🍀', '♨️'],
    7: ['☁️', '🪶', '🏝️', '⭐', '🎐', '☀️', '🌉', '🌸', '🤍', '🏯'],
    8: ['🌌', '🪐', '🌠', '💫', '🏝️', '🍀', '💥', '🌳', '🌀', '🗿'],
    9: ['🏺', '📜', '🗝️', '🕯️', '🗿', '🏛️', '🧡', '🏝️', '✨', '🚪'],
    10: ['👑', '🪷', '🌳', '💖', '🏝️', '☁️', '🔥', '🌀', '🏰', '✨']
  };

  const currentWorld = WORLD_AREAS.find((w) => w.id === selectedWorldId) || WORLD_AREAS[0];
  const worldLevels = LEVELS.filter(
    (lvl) => lvl.id >= (selectedWorldId - 1) * 10 + 1 && lvl.id <= selectedWorldId * 10
  );

  const isWorldUnlocked = profile.highestCompletedLevel + 1 >= currentWorld.minLevel;

  return (
    <div className="relative w-full h-full flex flex-col select-none overflow-hidden bg-gradient-to-b from-sky-200 via-emerald-100 to-amber-50">
      {/* Top Header */}
      <div className="px-4 py-2.5 flex items-center justify-between z-20 bg-white/80 backdrop-blur-xs border-b border-emerald-200 shadow-xs">
        <button
          id="level-map-back-btn"
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

        <div className="flex flex-col items-center">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 font-heading">
            {language === 'tr' ? `DÜNYA ${selectedWorldId}/10` : `WORLD ${selectedWorldId}/10`}
          </span>
          <h2 className="text-sm font-bold text-slate-800 font-heading leading-tight">
            {currentWorld.name[language]}
          </h2>
        </div>

        <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-100 border border-amber-300 rounded-xl text-amber-900 text-xs font-bold">
          <span>⭐</span>
          <span>{profile.stars}</span>
        </div>
      </div>

      {/* World Navigation Carousel Strip */}
      <div
        ref={worldScrollRef}
        className="px-3 py-2 z-10 flex items-center gap-2 overflow-x-auto no-scrollbar bg-white/40 border-b border-emerald-100/80 shadow-2xs shrink-0"
      >
        {WORLD_AREAS.map((world) => {
          const isSelected = world.id === selectedWorldId;
          const isUnlocked = profile.highestCompletedLevel + 1 >= world.minLevel;
          const worldCompleted = profile.highestCompletedLevel >= world.id * 10;

          return (
            <button
              key={world.id}
              id={`world-tab-${world.id}`}
              type="button"
              onClick={() => {
                sound.playTap();
                setSelectedWorldId(world.id);
                if (levelScrollRef.current) {
                  levelScrollRef.current.scrollTop = 0;
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border-2 shrink-0 transition-all text-xs font-bold font-heading active:scale-95 ${
                isSelected
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-400 shadow-md ring-2 ring-emerald-300/60'
                  : isUnlocked
                  ? 'bg-white/90 text-slate-700 border-emerald-200 shadow-2xs hover:bg-emerald-50'
                  : 'bg-slate-100 text-slate-400 border-slate-300 opacity-60'
              }`}
            >
              <span className="text-base">{world.previewIcon}</span>
              <span>{world.name[language]}</span>
              {worldCompleted && (
                <span className="text-amber-300 text-[10px]">★</span>
              )}
              {!isUnlocked && (
                <Lock className="w-3 h-3 text-slate-400 ml-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* World Banner Info */}
      <div className="px-4 py-1.5 z-10 bg-emerald-800/10 border-b border-emerald-200/50 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-emerald-900 line-clamp-1">
          {currentWorld.description[language]}
        </span>
        <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-200/70 px-2 py-0.5 rounded-full shrink-0 ml-2">
          {language === 'tr'
            ? `Bölüm ${(selectedWorldId - 1) * 10 + 1}-${selectedWorldId * 10}`
            : `Levels ${(selectedWorldId - 1) * 10 + 1}-${selectedWorldId * 10}`}
        </span>
      </div>

      {/* Winding Garden Road Scrollable Area for Selected World */}
      <div ref={levelScrollRef} className="flex-1 overflow-y-auto p-4 relative no-scrollbar">
        {/* Subtle Path Guide Line */}
        <div className="flex flex-col items-center gap-8 py-6 max-w-xs mx-auto relative">
          {worldLevels.map((level, index) => {
            const isCompleted = profile.highestCompletedLevel >= level.id;
            const isCurrent = profile.currentLevel === level.id;
            const isLocked = level.id > profile.highestCompletedLevel + 1;
            const starsEarned = profile.levelStars[level.id] || (isCompleted ? 3 : 0);

            const worldIconList = worldIcons[selectedWorldId] || worldIcons[1];
            const icon = worldIconList[(level.id - 1) % 10] || '🌱';

            // Winding zigzag x offset calculation
            const xOffset = Math.sin((index * Math.PI) / 2.5) * 55;

            return (
              <div
                key={level.id}
                className="relative flex flex-col items-center"
                style={{ transform: `translateX(${xOffset}px)` }}
              >
                {/* Connecting Stepping Stones between levels */}
                {index < worldLevels.length - 1 && (
                  <div className="absolute top-16 -bottom-6 w-1 flex flex-col items-center justify-around pointer-events-none opacity-40">
                    <div className="w-2 h-2 rounded-full bg-emerald-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-700" />
                    <div className="w-2 h-2 rounded-full bg-emerald-700" />
                  </div>
                )}

                {/* Level Node Button */}
                <motion.button
                  id={`level-node-${level.id}`}
                  type="button"
                  whileHover={!isLocked ? { scale: 1.1 } : {}}
                  whileTap={!isLocked ? { scale: 0.95 } : {}}
                  animate={
                    isCurrent
                      ? {
                          scale: [1, 1.08, 1],
                          boxShadow: [
                            '0 0 0 0 rgba(245, 158, 11, 0.4)',
                            '0 0 0 12px rgba(245, 158, 11, 0)',
                            '0 0 0 0 rgba(245, 158, 11, 0.4)'
                          ]
                        }
                      : {}
                  }
                  transition={
                    isCurrent
                      ? { repeat: Infinity, duration: 1.8, ease: 'easeInOut' }
                      : { type: 'spring', stiffness: 400, damping: 25 }
                  }
                  onClick={() => {
                    if (isLocked) {
                      sound.playError();
                      return;
                    }
                    sound.playTap();
                    onSelectLevel(level.id);
                  }}
                  disabled={isLocked}
                  className={`relative w-16 h-16 rounded-3xl flex flex-col items-center justify-center border-3 transition-all ${
                    isCurrent
                      ? 'bg-gradient-to-b from-amber-300 to-amber-500 border-amber-200 text-amber-950 shadow-lg ring-4 ring-amber-400/50 cursor-pointer'
                      : isCompleted
                      ? 'bg-gradient-to-b from-emerald-400 to-teal-500 border-emerald-200 text-white shadow-md cursor-pointer'
                      : 'bg-slate-200/80 border-slate-300 text-slate-400 opacity-70 cursor-not-allowed shadow-inner'
                  }`}
                >
                  {/* Icon & Level Number */}
                  <span className="text-xl filter drop-shadow-xs leading-none">
                    {icon}
                  </span>
                  <span className="text-xs font-extrabold font-heading mt-0.5">
                    {level.id}
                  </span>

                  {/* Locked indicator overlay */}
                  {isLocked && (
                    <div className="absolute inset-0 bg-slate-900/30 rounded-3xl flex items-center justify-center">
                      <Lock className="w-5 h-5 text-white/90 filter drop-shadow" />
                    </div>
                  )}

                  {/* Milestone Badge for Level 5 and Level 10 of each world */}
                  {(level.id % 10 === 0 || level.id % 5 === 0) && (
                    <div className="absolute -top-2 -right-2 bg-rose-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow-xs border border-white">
                      {level.id % 10 === 0 ? '👑' : '⭐'}
                    </div>
                  )}
                </motion.button>

                {/* Level Title, Difficulty Grade, and Star Rating */}
                <div className="mt-1.5 flex flex-col items-center text-center max-w-[130px]">
                  <span className="text-[11px] font-bold text-slate-800 font-heading line-clamp-1">
                    {level.name[language]}
                  </span>
                  {level.difficultyGrade && (
                    <span
                      className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full border shadow-2xs mt-0.5 flex items-center gap-0.5 ${
                        level.difficultyGrade >= 15
                          ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white border-rose-300'
                          : level.difficultyGrade >= 7
                          ? 'bg-rose-100 text-rose-800 border-rose-300'
                          : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      }`}
                    >
                      <span>{level.difficultyGrade >= 15 ? '👑' : level.difficultyGrade >= 7 ? '🔥' : '🌱'}</span>
                      <span>{t('difficultyGrade', language)} {level.difficultyGrade}</span>
                    </span>
                  )}
                  {isCompleted && (
                    <div className="flex gap-0.5 items-center mt-0.5">
                      {Array.from({ length: 3 }).map((_, sIdx) => (
                        <Star
                          key={sIdx}
                          className={`w-3 h-3 ${
                            sIdx < starsEarned
                              ? 'fill-amber-400 text-amber-500'
                              : 'fill-slate-300 text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Quick World Transition Buttons at bottom of map */}
          <div className="w-full flex items-center justify-between gap-3 pt-6 pb-4">
            {selectedWorldId > 1 && (
              <button
                type="button"
                onClick={() => {
                  sound.playTap();
                  setSelectedWorldId((prev) => Math.max(1, prev - 1));
                  if (levelScrollRef.current) levelScrollRef.current.scrollTop = 0;
                }}
                className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-white/90 border border-emerald-300 text-emerald-900 text-xs font-bold shadow-xs active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{language === 'tr' ? 'Önceki Dünya' : 'Prev World'}</span>
              </button>
            )}
            <div className="flex-1" />
            {selectedWorldId < 10 && (
              <button
                type="button"
                onClick={() => {
                  sound.playTap();
                  setSelectedWorldId((prev) => Math.min(10, prev + 1));
                  if (levelScrollRef.current) levelScrollRef.current.scrollTop = 0;
                }}
                className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-sm active:scale-95 ml-auto"
              >
                <span>{language === 'tr' ? 'Sonraki Dünya' : 'Next World'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
