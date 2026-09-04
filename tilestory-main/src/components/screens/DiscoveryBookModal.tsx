import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Lock, BookOpen } from 'lucide-react';
import { TILES } from '../../data/tiles';
import { RECIPES } from '../../data/recipes';
import { sound } from '../../services/sound';
import { t } from '../../data/localization';
import { PlayerProfile } from '../../types/game';

interface DiscoveryBookModalProps {
  profile: PlayerProfile;
  onBack: () => void;
  language: 'en' | 'tr';
}

export const DiscoveryBookModal: React.FC<DiscoveryBookModalProps> = ({
  profile,
  onBack,
  language
}) => {
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [activeTileId, setActiveTileId] = useState<string | null>(null);

  const allTilesList = Object.values(TILES);
  const filteredTiles = selectedTier
    ? allTilesList.filter((tile) => tile.tier === selectedTier)
    : allTilesList;

  const totalDiscovered = Object.keys(profile.discoveries).length;

  const activeTile = activeTileId ? TILES[activeTileId] : null;
  const activeDiscovery = activeTileId ? profile.discoveries[activeTileId] : null;

  // Find recipe for how this tile is created
  const relatedRecipe = activeTileId ? RECIPES.find((r) => r.output === activeTileId) : null;

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none overflow-hidden bg-gradient-to-b from-amber-50 via-emerald-50 to-teal-50">
      
      {/* Top Header */}
      <div className="px-4 py-3 flex items-center justify-between z-20 bg-white/80 backdrop-blur-xs border-b border-amber-200 shadow-xs">
        <button
          id="discovery-book-back-btn"
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
          <h2 className="text-base font-bold text-slate-800 font-heading flex items-center gap-1.5">
            <span>📖</span>
            <span>{t('discoveryBook', language)}</span>
          </h2>
          <span className="text-[10px] font-bold text-amber-800">
            {totalDiscovered} / {allTilesList.length} {language === 'tr' ? 'Keşfedildi' : 'Discovered'}
          </span>
        </div>

        <div className="w-9" />
      </div>

      {/* Tier Filter Tabs (All, Tier 1, 2, 3, 4, 5) */}
      <div className="px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar z-10">
        <button
          id="tier-filter-all"
          type="button"
          onClick={() => {
            sound.playTap();
            setSelectedTier(null);
          }}
          className={`px-3 py-1 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            selectedTier === null
              ? 'bg-amber-500 text-white shadow-xs'
              : 'bg-white/80 text-slate-600 hover:bg-white'
          }`}
        >
          {language === 'tr' ? 'Tümü' : 'All'}
        </button>

        {[1, 2, 3, 4, 5].map((tier) => (
          <button
            key={tier}
            id={`tier-filter-${tier}`}
            type="button"
            onClick={() => {
              sound.playTap();
              setSelectedTier(tier);
            }}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 ${
              selectedTier === tier
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-white/80 text-slate-600 hover:bg-white'
            }`}
          >
            <span>⭐</span>
            <span>Tier {tier}</span>
          </button>
        ))}
      </div>

      {/* Tiles Grid Showcase */}
      <div className="flex-1 overflow-y-auto p-4 z-10 no-scrollbar">
        <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto">
          {filteredTiles.map((tile) => {
            const isDiscovered = Boolean(profile.discoveries[tile.id]);

            return (
              <motion.button
                id={`discovery-tile-${tile.id}`}
                key={tile.id}
                type="button"
                whileHover={isDiscovered ? { scale: 1.05 } : {}}
                whileTap={isDiscovered ? { scale: 0.95 } : {}}
                onClick={() => {
                  sound.playTap();
                  if (isDiscovered) {
                    setActiveTileId(tile.id);
                  }
                }}
                className={`relative aspect-square rounded-2xl border-2 flex flex-col items-center justify-center p-1 transition-all ${
                  isDiscovered
                    ? `${tile.colorBg} ${tile.colorBorder} shadow-sm hover:shadow-md cursor-pointer`
                    : 'bg-slate-200/70 border-slate-300 shadow-inner cursor-default opacity-60'
                }`}
              >
                {isDiscovered ? (
                  <>
                    <span className="text-2xl filter drop-shadow leading-none">
                      {tile.symbol}
                    </span>
                    <span className="text-[10px] font-bold text-slate-700 truncate w-full text-center mt-1">
                      {tile.name[language]}
                    </span>
                    <span className="text-[8px] font-extrabold text-amber-700">
                      T{tile.tier}
                    </span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 text-slate-400 mb-0.5" />
                    <span className="text-[10px] font-extrabold text-slate-400">
                      {t('undiscoveredTitle', language)}
                    </span>
                  </>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Discovery Detail Modal Popup */}
      {activeTile && activeDiscovery && (
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-6 z-50">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-xs bg-white rounded-3xl p-6 shadow-2xl border-4 border-amber-300 flex flex-col items-center text-center relative"
          >
            <button
              id="discovery-detail-close-btn"
              type="button"
              onClick={() => setActiveTileId(null)}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs hover:bg-slate-200"
            >
              ✕
            </button>

            {/* Big Icon */}
            <div className={`w-20 h-20 rounded-3xl ${activeTile.colorBg} border-2 ${activeTile.colorBorder} flex items-center justify-center text-4xl shadow-md mb-2`}>
              {activeTile.symbol}
            </div>

            <div className="flex gap-1 mb-1">
              {Array.from({ length: activeTile.tier }).map((_, i) => (
                <span key={i} className="text-amber-500 text-xs">⭐</span>
              ))}
            </div>

            <h3 className="text-xl font-extrabold text-slate-800 font-heading">
              {activeTile.name[language]}
            </h3>
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide mb-3">
              {activeTile.category}
            </span>

            <p className="text-xs text-slate-600 leading-relaxed mb-4 px-2">
              {activeTile.description[language]}
            </p>

            {/* Recipe Record */}
            {relatedRecipe && (
              <div className="w-full p-2.5 bg-amber-50 rounded-2xl border border-amber-200 text-left mb-3">
                <span className="text-[10px] font-extrabold text-amber-900 uppercase block mb-1">
                  {t('howCreated', language)}
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {relatedRecipe.inputs.map((inId, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-white rounded-lg border border-amber-300 text-xs font-bold text-amber-950 flex items-center gap-1"
                    >
                      {TILES[inId]?.symbol} {TILES[inId]?.name[language]}
                    </span>
                  ))}
                  <span className="text-xs font-extrabold text-amber-700">→</span>
                  <span className="px-2 py-0.5 bg-amber-200 rounded-lg text-xs font-bold text-amber-950 flex items-center gap-1">
                    {activeTile.symbol}
                  </span>
                </div>
              </div>
            )}

            <span className="text-[10px] text-slate-400">
              {language === 'tr' ? 'Keşif Tarihi: ' : 'Discovered: '}
              {new Date(activeDiscovery.discoveredAt).toLocaleDateString()}
            </span>
          </motion.div>
        </div>
      )}
    </div>
  );
};
