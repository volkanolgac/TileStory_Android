import React from 'react';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';
import { TILES } from '../data/tiles';
import { ObstacleType } from '../types/game';

interface TileViewProps {
  tileId: string;
  obstacle?: ObstacleType;
  isSelected?: boolean;
  isHinted?: boolean;
  isCovered?: boolean;
  canPickCovered?: boolean;
  isNewlyUncovered?: boolean;
  isShaking?: boolean;
  layer?: number;
  layerDepth?: number;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  showTier?: boolean;
  className?: string;
  id?: string;
}

export const TileView: React.FC<TileViewProps> = ({
  tileId,
  obstacle = 'none',
  isSelected = false,
  isHinted = false,
  isCovered = false,
  canPickCovered = false,
  isNewlyUncovered = false,
  isShaking = false,
  layer = 0,
  layerDepth = 0,
  disabled = false,
  size = 'md',
  onClick,
  showTier = true,
  className = '',
  id
}) => {
  const tile = TILES[tileId] || {
    id: tileId,
    name: { en: tileId, tr: tileId },
    tier: 1 as const,
    category: 'nature' as const,
    description: { en: tileId, tr: tileId },
    iconName: tileId,
    colorBg: 'bg-amber-100',
    colorBorder: 'border-amber-300',
    colorGlow: '#fef3c7',
    symbol: '🌸'
  };

  const sizeClasses = {
    sm: 'w-11 h-13 text-xl rounded-xl',
    md: 'w-14 h-18 sm:w-15 sm:h-19 text-2xl sm:text-3xl rounded-2xl',
    lg: 'w-16 h-21 sm:w-18 sm:h-23 text-3xl sm:text-4xl rounded-2xl'
  }[size];

  // Obscured check: tile is obscured by a tile directly on top of it (unless booster can pick covered)
  const isObscured = Boolean(isCovered && !canPickCovered);
  const hasObstacle = obstacle && obstacle !== 'none';
  // Clicking is ONLY enabled if the tile is NOT obscured and free of obstacles
  const isClickEnabled = !disabled && !isObscured && (!hasObstacle || canPickCovered);
  const isInteractive = isClickEnabled;

  // Clear visual distinction: covered tiles remain clearly recognizable so players can strategize!
  const baseTileOpacity = isObscured ? 0.92 : 1;

  // 3D Extrusion thickness and shadow calculation based on layer & state
  const extrusionDepth = isSelected ? 8 : isCovered ? 2 : 6;

  return (
    <motion.button
      id={id}
      type="button"
      whileHover={isInteractive ? { scale: 1.05, y: -3 } : {}}
      whileTap={isInteractive ? { y: 2, scale: 0.96 } : {}}
      animate={
        isShaking
          ? { x: [-6, 6, -4, 4, -2, 2, 0] }
          : isNewlyUncovered
          ? { scale: [0.85, 1.15, 1], y: [0, -6, 0] }
          : isHinted
          ? { scale: [1, 1.08, 1], y: [0, -4, 0] }
          : isSelected
          ? { y: -8, scale: 1.06 }
          : { y: 0, scale: 1 }
      }
      transition={
        isShaking
          ? { duration: 0.3, ease: 'easeInOut' }
          : isNewlyUncovered
          ? { duration: 0.45, ease: 'easeOut' }
          : isHinted
          ? { repeat: Infinity, duration: 1.4, ease: 'easeInOut' }
          : { type: 'spring', stiffness: 500, damping: 28 }
      }
      onClick={!isClickEnabled ? undefined : onClick}
      disabled={!isClickEnabled}
      aria-disabled={!isClickEnabled}
      className={`relative inline-flex flex-col items-center justify-center select-none transition-all duration-200 ${sizeClasses} ${className} ${
        !isClickEnabled ? 'cursor-not-allowed' : 'cursor-pointer active:cursor-grabbing'
      } ${
        disabled && !isObscured ? 'opacity-40 filter grayscale' : ''
      }`}
      style={{
        opacity: baseTileOpacity,
        filter: isObscured ? 'brightness(0.88) saturate(0.85)' : 'none',
        // Realistic 3D Mahjong block extrusion & directional cast shadow
        boxShadow: isSelected
          ? '0 1px 0 rgba(255,255,255,0.9) inset, 0 8px 0 #d97706, 0 16px 24px -2px rgba(251, 191, 36, 0.65), 0 6px 12px rgba(0,0,0,0.2)'
          : isNewlyUncovered
          ? '0 1px 0 rgba(255,255,255,0.9) inset, 0 6px 0 #ca8a04, 0 0 24px 6px rgba(250, 204, 21, 0.9), 0 8px 16px rgba(0,0,0,0.25)'
          : isHinted
          ? '0 1px 0 rgba(255,255,255,0.9) inset, 0 6px 0 #d97706, 0 0 18px 4px rgba(251, 191, 36, 0.85), 0 6px 12px rgba(0,0,0,0.2)'
          : isObscured
          ? '0 1px 0 rgba(255,255,255,0.5) inset, 0 2px 0 #78350f, 0 2px 4px rgba(0,0,0,0.15)'
          : `0 1.5px 0 rgba(255,255,255,0.85) inset, 0 ${extrusionDepth}px 0 #854d0e, 0 ${extrusionDepth + 1}px 0 #451a03, 0 ${6 + layer * 4}px ${10 + layer * 3}px rgba(0, 0, 0, ${0.26 + layer * 0.08}), 0 2px 4px rgba(0, 0, 0, 0.15)`
      }}
    >
      {/* 3D Ivory Face Plate with Polish Reflection */}
      <div
        className={`absolute inset-0 rounded-2xl border-t-[1.5px] border-l-[1.5px] border-white/90 border-b-[2px] border-r-[2px] transition-all duration-200 overflow-hidden ${
          tile.colorBg
        } ${tile.colorBorder} ${
          isSelected
            ? 'ring-3 ring-amber-400 border-amber-500 bg-amber-50'
            : isNewlyUncovered
            ? 'ring-3 ring-yellow-400 border-yellow-400'
            : isHinted
            ? 'ring-2 ring-yellow-400'
            : ''
        }`}
      >
        {/* Glossy top light reflection specular curve */}
        <div className="absolute top-0 inset-x-0 h-2/5 bg-gradient-to-b from-white/80 via-white/40 to-transparent pointer-events-none rounded-t-2xl" />

        {/* 3D Side shadow gradient on the right edge */}
        <div className="absolute inset-y-0 right-0 w-1.5 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
        {/* 3D Bottom shadow gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />

        {/* Tier dots on top left */}
        {showTier && (
          <div className="absolute top-1.5 left-1.5 flex gap-0.5 items-center z-10">
            {Array.from({ length: tile.tier }).map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-amber-600 shadow-2xs ring-0.5 ring-white"
              />
            ))}
          </div>
        )}
      </div>

      {/* Main 3D Tile Symbol with Drop-Shadow - fully clear and recognizable */}
      <span
        className={`relative z-10 select-none transform transition-all duration-200 ${
          isSelected ? 'scale-110' : ''
        } ${
          isObscured
            ? 'opacity-85 scale-95 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]'
            : 'opacity-100 filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]'
        }`}
      >
        {tile.symbol}
      </span>

      {/* Soft translucent shade and lock indicator on covered tiles so they are clearly identifiable yet locked */}
      {isObscured && (
        <>
          <div
            className="absolute inset-0 rounded-2xl bg-amber-950/10 border border-amber-900/20 pointer-events-none transition-all duration-300 z-20"
          />
          <div
            className="absolute bottom-1 right-1 z-25 bg-slate-900/65 backdrop-blur-xs text-amber-300 p-0.5 rounded-md shadow-xs pointer-events-none flex items-center justify-center border border-white/20"
            title="Covered"
          >
            <Lock className="w-2.5 h-2.5 text-amber-200" />
          </div>
        </>
      )}

      {/* Newly Uncovered Flash Ring */}
      {isNewlyUncovered && (
        <motion.div
          initial={{ opacity: 1, scale: 0.8 }}
          animate={{ opacity: 0, scale: 1.3 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 rounded-2xl ring-4 ring-yellow-400 pointer-events-none z-30"
        />
      )}

      {/* Obstacle Layers (Vines, Ice, Stone) */}
      {obstacle === 'vine' && (
        <div
          className="absolute inset-0 rounded-2xl bg-emerald-900/35 backdrop-blur-[0.5px] border-2 border-emerald-600 flex items-center justify-center z-20"
          title="Vine covered tile"
        >
          <span className="text-sm filter drop-shadow">🌿</span>
          <span className="absolute bottom-1 text-[9px] font-bold text-emerald-100 bg-emerald-800/80 px-1 rounded-full uppercase tracking-tighter">
            Vine
          </span>
        </div>
      )}

      {obstacle === 'ice' && (
        <div
          className="absolute inset-0 rounded-2xl bg-cyan-200/45 backdrop-blur-[1px] border-2 border-cyan-400 flex items-center justify-center z-20"
          title="Frozen tile"
        >
          <span className="text-sm filter drop-shadow">❄️</span>
          <span className="absolute bottom-1 text-[9px] font-bold text-cyan-900 bg-cyan-200/90 px-1 rounded-full uppercase tracking-tighter">
            Ice
          </span>
        </div>
      )}

      {obstacle === 'stone' && (
        <div
          className="absolute inset-0 rounded-2xl bg-stone-500/40 backdrop-blur-[1px] border-2 border-stone-600 flex items-center justify-center z-20"
          title="Stone Block"
        >
          <span className="text-sm filter drop-shadow">🪨</span>
          <span className="absolute bottom-1 text-[9px] font-bold text-stone-100 bg-stone-700/80 px-1 rounded-full uppercase tracking-tighter">
            Rock
          </span>
        </div>
      )}
    </motion.button>
  );
};
