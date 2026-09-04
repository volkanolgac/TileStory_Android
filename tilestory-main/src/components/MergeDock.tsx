import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { TileView } from './TileView';
import { BoardTile } from '../types/game';

interface MergeDockProps {
  dockTiles: BoardTile[];
  onTileClick: (instanceId: string) => void;
  onClearDock?: () => void;
  maxSlots?: number;
  language: 'en' | 'tr';
  isMerging?: boolean;
  matchingTileIds?: string[];
}

export const MergeDock: React.FC<MergeDockProps> = ({
  dockTiles,
  onTileClick,
  onClearDock,
  maxSlots = 6,
  language,
  isMerging = false,
  matchingTileIds = []
}) => {
  const isFull = dockTiles.length >= maxSlots;

  return (
    <div className="w-full px-2 py-1 flex justify-center items-center select-none">
      <div
        className={`relative max-w-md w-full mx-auto px-3 py-1.5 rounded-2xl border-2 transition-all duration-300 shadow-md flex items-center justify-between gap-2 ${
          isMerging
            ? 'bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-100 border-amber-500 ring-2 ring-amber-400 shadow-amber-300/50'
            : isFull
            ? 'bg-gradient-to-r from-rose-50 to-amber-50 border-rose-400 ring-2 ring-rose-300'
            : 'bg-white/95 backdrop-blur-xs border-amber-300/90 shadow-sm'
        }`}
      >
        {/* Left Side: Compact Basket Indicator */}
        <div className="flex flex-col items-start gap-0.5 shrink-0">
          <div className="flex items-center gap-1">
            <span className="text-sm">🧺</span>
            <span
              className={`text-[10px] font-black px-1.5 py-0.2 rounded-full transition-colors font-heading ${
                isFull
                  ? 'text-white bg-rose-500 shadow-2xs animate-pulse'
                  : 'text-amber-900 bg-amber-100 border border-amber-300/60'
              }`}
            >
              {dockTiles.length}/{maxSlots}
            </span>
          </div>
          <span className="text-[9px] font-bold text-amber-800/60 font-heading">
            {language === 'tr' ? 'Sepet' : 'Tray'}
          </span>
        </div>

        {/* Center: Exactly 6 Collection Slots - Clearly spaced and never cramped */}
        <div className="flex items-center justify-center gap-1.5 py-0.5 flex-1">
          {Array.from({ length: maxSlots }).map((_, index) => {
            const tile = dockTiles[index];
            const isThisTileMatching = tile && matchingTileIds.includes(tile.instanceId);

            return (
              <div
                key={index}
                id={`dock-slot-${index}`}
                className={`relative w-10 h-13 sm:w-11 sm:h-14 rounded-xl border-2 flex items-center justify-center transition-all shrink-0 ${
                  tile
                    ? 'border-amber-300 bg-amber-50/60 shadow-xs'
                    : 'border-dashed border-amber-300/70 bg-amber-50/30'
                }`}
              >
                <AnimatePresence mode="wait">
                  {tile ? (
                    <motion.div
                      key={tile.instanceId}
                      initial={{ scale: 0.3, y: -20, opacity: 0 }}
                      animate={
                        isThisTileMatching
                          ? {
                              scale: [1, 1.25, 0.9, 1.2],
                              rotate: [0, -8, 8, 0],
                              filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)']
                            }
                          : { scale: 1, y: 0, opacity: 1 }
                      }
                      exit={{ scale: 0, opacity: 0 }}
                      transition={
                        isThisTileMatching
                          ? { duration: 0.35, ease: 'easeInOut' }
                          : { type: 'spring', stiffness: 500, damping: 26 }
                      }
                      className="w-full h-full flex items-center justify-center cursor-pointer"
                      title={language === 'tr' ? 'Geri göndermek için tıkla' : 'Click to return'}
                    >
                      <TileView
                        id={`dock-tile-${tile.instanceId}`}
                        tileId={tile.tileId}
                        size="sm"
                        className="scale-95"
                        onClick={() => onTileClick(tile.instanceId)}
                      />
                    </motion.div>
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-300/40 select-none" />
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Right Side: Status Message */}
        <div className="text-[9px] font-bold text-right leading-tight min-w-[58px] shrink-0 font-heading">
          {isMerging ? (
            <div className="flex items-center justify-end gap-0.5 text-emerald-700 animate-bounce">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>{language === 'tr' ? 'Kalktı! ✨' : 'Cleared! ✨'}</span>
            </div>
          ) : isFull ? (
            <span className="text-rose-600 font-extrabold">
              {language === 'tr' ? 'Tahta Dolu!' : 'Full!'}
            </span>
          ) : (
            <span className="text-amber-900/80">
              {language === 'tr' ? '3 tane birikince kalkar' : 'Match 3'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
