import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { ChevronLeft, RotateCcw, Sparkles, Check, AlertCircle, HelpCircle } from 'lucide-react';
import { LEVELS, BOARD_PATTERNS, getBoardCoordinatesForLevel, computeCoveredTiles } from '../../data/levels';
import { TILES } from '../../data/tiles';
import { findMatchingRecipe } from '../../data/recipes';
import { sound } from '../../services/sound';
import { t } from '../../data/localization';
import { BoardTile, BoosterType, LevelObjective, PlayerProfile, LevelConfig } from '../../types/game';
import { TileView } from '../TileView';
import { MergeDock } from '../MergeDock';

interface GameScreenProps {
  levelId: number;
  profile: PlayerProfile;
  onLevelComplete: (levelId: number, coinsEarned: number, starsEarned: number) => void;
  onBack: () => void;
  onUpdateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
  language: 'en' | 'tr';
}

// Robust Fisher-Yates shuffle
function shuffleArray<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function generateLevelTiles(levelConfig: LevelConfig, levelId: number): BoardTile[] {
  // 1. Gather all individual tile items (flatten every triplet so identical tiles are not grouped)
  const allItems: { tileId: string; obstacle: 'none' | 'vine' | 'ice' | 'stone' }[] = [];

  levelConfig.tiles.forEach((tGroup) => {
    const tripletCount = Math.floor(tGroup.count / 3);
    for (let i = 0; i < tripletCount * 3; i++) {
      allItems.push({
        tileId: tGroup.tileId,
        obstacle: tGroup.obstacle || 'none'
      });
    }
  });

  // 2. Perform double Fisher-Yates full shuffle of all items
  let shuffledItems = shuffleArray(allItems);
  shuffledItems = shuffleArray(shuffledItems);

  // 3. Get multi-layer Mahjong tower coordinates
  const coords = getBoardCoordinatesForLevel(levelConfig.boardShape, allItems.length);

  // 4. Anti-clustering dispersion: ensure identical figures are not placed side-by-side or adjacent
  for (let pass = 0; pass < 50; pass++) {
    let hasConflict = false;
    for (let i = 0; i < coords.length; i++) {
      const c1 = coords[i];
      const item1 = shuffledItems[i];
      if (!item1) continue;

      for (let j = i + 1; j < coords.length; j++) {
        const c2 = coords[j];
        const item2 = shuffledItems[j];
        if (!item2) continue;

        // If touching/adjacent in the same layer
        const isTouching =
          c1.l === c2.l &&
          Math.abs(c1.r - c2.r) <= 1.05 &&
          Math.abs(c1.c - c2.c) <= 1.05;

        if (isTouching && item1.tileId === item2.tileId) {
          hasConflict = true;
          // Find a swap candidate with a different tileId not adjacent to c1
          let swapIdx = Math.floor(Math.random() * coords.length);
          for (let attempts = 0; attempts < 25; attempts++) {
            const candidateCoord = coords[swapIdx];
            const candidateItem = shuffledItems[swapIdx];
            if (
              candidateItem &&
              candidateItem.tileId !== item1.tileId &&
              (candidateCoord.l !== c1.l ||
                Math.abs(candidateCoord.r - c1.r) > 1.2 ||
                Math.abs(candidateCoord.c - c1.c) > 1.2)
            ) {
              break;
            }
            swapIdx = (swapIdx + 7) % coords.length;
          }

          const temp = shuffledItems[i];
          shuffledItems[i] = shuffledItems[swapIdx];
          shuffledItems[swapIdx] = temp;
          break;
        }
      }
    }
    if (!hasConflict) break;
  }

  // 5. Construct BoardTile instances with unique keys
  const rawTiles: BoardTile[] = coords.map((coord, index) => {
    const item = shuffledItems[index] || { tileId: 'leaf', obstacle: 'none' };
    return {
      instanceId: `tile-${levelId}-${index}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      tileId: item.tileId,
      row: coord.r,
      col: coord.c,
      layer: coord.l,
      obstacle: item.obstacle
    };
  });

  return computeCoveredTiles(rawTiles);
}

export const GameScreen: React.FC<GameScreenProps> = ({
  levelId,
  profile,
  onLevelComplete,
  onBack,
  onUpdateProfile,
  language
}) => {
  const levelConfig = LEVELS.find((l) => l.id === levelId) || LEVELS[0];

  // Game State - lazily initialized so boardTiles is never [] on first render
  const [boardTiles, setBoardTiles] = useState<BoardTile[]>(() => generateLevelTiles(levelConfig, levelId));
  const [dockTiles, setDockTiles] = useState<BoardTile[]>([]);
  const [movesLeft, setMovesLeft] = useState<number>(levelConfig.moves);
  const [objectives, setObjectives] = useState<LevelObjective[]>(
    levelConfig.objectives.map((o) => ({ ...o, currentCount: 0 }))
  );
  const [isMerging, setIsMerging] = useState<boolean>(false);
  const [discoveryToast, setDiscoveryToast] = useState<{ name: string; icon: string } | null>(null);
  const [activeBooster, setActiveBooster] = useState<BoosterType | null>(null);
  const [hintedTileIds, setHintedTileIds] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isVictory, setIsVictory] = useState<boolean>(false);
  const [showTutorial, setShowTutorial] = useState<boolean>(Boolean(levelConfig.tutorialHint));
  const [craftedCollection, setCraftedCollection] = useState<Record<string, number>>({});
  const [hasPlayedMove, setHasPlayedMove] = useState<boolean>(false);
  const [matchingTileIds, setMatchingTileIds] = useState<string[]>([]);
  const mergeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (mergeTimerRef.current) {
        clearTimeout(mergeTimerRef.current);
        mergeTimerRef.current = null;
      }
    };
  }, []);

  // Mahjong Layer State & Interactive Feedback
  const [shakingTileId, setShakingTileId] = useState<string | null>(null);
  const [newlyUncoveredIds, setNewlyUncoveredIds] = useState<string[]>([]);
  const [blockedNotice, setBlockedNotice] = useState<string | null>(null);
  const boardContainerRef = useRef<HTMLDivElement>(null);
  const [boardDim, setBoardDim] = useState({ width: 340, height: 330 });

  // Responsive board sizing
  useEffect(() => {
    if (!boardContainerRef.current) return;
    const updateDim = () => {
      if (boardContainerRef.current) {
        const { clientWidth, clientHeight } = boardContainerRef.current;
        setBoardDim({
          width: Math.max(280, clientWidth),
          height: Math.max(260, clientHeight)
        });
      }
    };
    updateDim();
    const ro = new ResizeObserver(updateDim);
    ro.observe(boardContainerRef.current);
    return () => ro.disconnect();
  }, []);

  // Initialize Board Tiles when level changes
  useEffect(() => {
    if (mergeTimerRef.current) {
      clearTimeout(mergeTimerRef.current);
      mergeTimerRef.current = null;
    }
    const initialTiles = generateLevelTiles(levelConfig, levelId);
    setBoardTiles(initialTiles);
    setDockTiles([]);
    setCraftedCollection({});
    setMovesLeft(levelConfig.moves);
    setObjectives(levelConfig.objectives.map((o) => ({ ...o, currentCount: 0 })));
    setIsGameOver(false);
    setIsVictory(false);
    setIsMerging(false);
    setMatchingTileIds([]);
    setActiveBooster(null);
    setHintedTileIds([]);
    setNewlyUncoveredIds([]);
    setBlockedNotice(null);
    setHasPlayedMove(false);
  }, [levelId, levelConfig]);

  // Auto-Match: Detect 3 identical figures in dock and automatically clear them!
  useEffect(() => {
    if (dockTiles.length < 3 || isMerging) return;

    // Count occurrences of each tileId in dock
    const counts: Record<string, BoardTile[]> = {};
    for (const t of dockTiles) {
      if (!counts[t.tileId]) counts[t.tileId] = [];
      counts[t.tileId].push(t);
    }

    const matchedEntry = Object.entries(counts).find(([_, tiles]) => tiles.length >= 3);

    if (matchedEntry) {
      const [matchedTileId, matchingInstances] = matchedEntry;
      const tripletInstances = matchingInstances.slice(0, 3);
      const tripletIds = tripletInstances.map((t) => t.instanceId);

      setIsMerging(true);
      setMatchingTileIds(tripletIds);
      sound.playMerge();
      sound.triggerHaptic();

      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.85 }
      });

      if (mergeTimerRef.current) {
        clearTimeout(mergeTimerRef.current);
      }

      mergeTimerRef.current = setTimeout(() => {
        // "3 tane birikince tahtadan kalksın"
        // Remove ONLY the 3 matching figures from the dock so they lift off!
        setDockTiles((prev) => prev.filter((t) => !tripletIds.includes(t.instanceId)));
        setMatchingTileIds([]);
        setIsMerging(false);
        mergeTimerRef.current = null;

        // Update player coins & objectives
        onUpdateProfile((prev) => ({
          ...prev,
          coins: prev.coins + 15
        }));
        setObjectives((prev) =>
          prev.map((obj) => ({
            ...obj,
            currentCount: Math.min(obj.targetCount, obj.currentCount + 3)
          }))
        );
      }, 280);
    }
  }, [dockTiles, isMerging, language, onUpdateProfile]);

  // Check Win / Loss Condition
  useEffect(() => {
    if (isVictory || isGameOver || isMerging) return;

    // Victory can ONLY occur if the player has actively made moves and either cleared all objectives or all tiles
    const allObjectivesMet =
      hasPlayedMove &&
      objectives.length > 0 &&
      objectives.every((o) => o.targetCount > 0 && o.currentCount >= o.targetCount);

    const isBoardCleared =
      hasPlayedMove &&
      boardTiles.length === 0 &&
      dockTiles.length === 0;

    if (allObjectivesMet || isBoardCleared) {
      setIsVictory(true);
      sound.playLevelComplete();
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 }
      });

      setTimeout(() => {
        onLevelComplete(
          levelId,
          levelConfig.rewards.coins,
          levelConfig.rewards.stars
        );
      }, 1200);
    } else if (hasPlayedMove && movesLeft <= 0 && dockTiles.length === 0) {
      setIsGameOver(true);
      sound.playError();
    } else if (dockTiles.length >= 6 && !isMerging) {
      // Game over ONLY if all 6 tray slots are full AND there is no triplet match
      const counts: Record<string, number> = {};
      dockTiles.forEach((t) => {
        counts[t.tileId] = (counts[t.tileId] || 0) + 1;
      });
      const hasMatch = Object.values(counts).some((c) => c >= 3);
      if (!hasMatch) {
        setIsGameOver(true);
        sound.playError();
      }
    }
  }, [
    objectives,
    movesLeft,
    isVictory,
    isGameOver,
    isMerging,
    levelId,
    levelConfig,
    onLevelComplete,
    boardTiles.length,
    dockTiles,
    hasPlayedMove
  ]);

  // Action triggered when player clicks on a covered/blocked tile
  const handleBlockedTileClick = (instanceId: string) => {
    sound.playBlocked();
    sound.triggerHaptic();
    setShakingTileId(instanceId);
    setTimeout(() => setShakingTileId(null), 350);

    setBlockedNotice(
      language === 'tr'
        ? 'Önce üstündeki ögeyi almalısın!'
        : 'Take the item on top first!'
    );
    setTimeout(() => setBlockedNotice(null), 1800);
  };

  // Tile Selection Handler (Mahjong Layer aware - clicking enabled ONLY if not obscured)
  const handleTileClick = (instanceId: string) => {
    if (isMerging || isGameOver || isVictory) return;

    const targetTile = boardTiles.find((t) => t.instanceId === instanceId);
    if (!targetTile) return;

    // Strict check: if tile is covered by upper Mahjong layer and no magic hand, block selection
    if (targetTile.isCovered && activeBooster !== 'magic_hand') {
      handleBlockedTileClick(instanceId);
      return;
    }

    // Handle Active Booster: Garden Shears
    if (activeBooster === 'shears') {
      if (targetTile.obstacle !== 'none') {
        sound.playObstacleClear();
        setBoardTiles((prev) =>
          computeCoveredTiles(
            prev.map((t) => (t.instanceId === instanceId ? { ...t, obstacle: 'none' } : t))
          )
        );
        setObjectives((prev) =>
          prev.map((obj) =>
            obj.type === 'clear_obstacle'
              ? { ...obj, currentCount: obj.currentCount + 1 }
              : obj
          )
        );
        onUpdateProfile((prev) => ({
          ...prev,
          boosters: { ...prev.boosters, shears: Math.max(0, prev.boosters.shears - 1) }
        }));
        setActiveBooster(null);
        return;
      }
    }

    // If blocked by obstacle, alert player
    if (targetTile.obstacle !== 'none' && activeBooster !== 'magic_hand') {
      sound.playError();
      return;
    }

    // Check Dock capacity (strictly 6 slots)
    if (dockTiles.length >= 6) {
      sound.playError();
      sound.triggerHaptic();
      setBlockedNotice(
        language === 'tr'
          ? 'Tahta dolu! 3 aynı figürü biriktir veya taşa basıp geri yolla.'
          : 'Tray full! Match 3 identical items or tap a tile to return it.'
      );
      setTimeout(() => setBlockedNotice(null), 1800);
      return;
    }

    // Consume Magic Hand if active
    if (activeBooster === 'magic_hand') {
      onUpdateProfile((prev) => ({
        ...prev,
        boosters: { ...prev.boosters, magic_hand: Math.max(0, prev.boosters.magic_hand - 1) }
      }));
      setActiveBooster(null);
    }

    // Normal pick: transfer from board to dock
    sound.playSelect();
    sound.triggerHaptic();

    // Remove tile and recompute Mahjong coverage on remaining tiles
    const remaining = boardTiles.filter((t) => t.instanceId !== instanceId);
    const updatedBoard = computeCoveredTiles(remaining);

    // Detect newly uncovered tiles (liberated beneath this tile!)
    const newlyUncovered = updatedBoard.filter((tile) => {
      const prev = boardTiles.find((t) => t.instanceId === tile.instanceId);
      return prev && prev.isCovered && !tile.isCovered;
    });

    if (newlyUncovered.length > 0) {
      sound.playUncovered();
      const ids = newlyUncovered.map((t) => t.instanceId);
      setNewlyUncoveredIds(ids);
      setTimeout(() => setNewlyUncoveredIds([]), 800);
    }

    setBoardTiles(updatedBoard);
    // Group identical tiles adjacent to each other in dock
    setDockTiles((prev) => {
      const sameIdx = prev.findIndex((t) => t.tileId === targetTile.tileId);
      if (sameIdx !== -1) {
        let insertPos = sameIdx;
        while (insertPos < prev.length && prev[insertPos].tileId === targetTile.tileId) {
          insertPos++;
        }
        const next = [...prev];
        next.splice(insertPos, 0, { ...targetTile, obstacle: 'none' });
        return next;
      }
      return [...prev, { ...targetTile, obstacle: 'none' }];
    });
    setMovesLeft((prev) => Math.max(0, prev - 1));
    setHintedTileIds([]);
    setBlockedNotice(null);
    setHasPlayedMove(true);
  };

  // Dock Tile click: Return single tile back to board
  const handleDockTileClick = (instanceId: string) => {
    if (isMerging) return;
    const tileToReturn = dockTiles.find((t) => t.instanceId === instanceId);
    if (!tileToReturn) return;

    sound.playTap();
    setDockTiles((prev) => prev.filter((t) => t.instanceId !== instanceId));
    setBoardTiles((prev) => computeCoveredTiles([...prev, tileToReturn]));
  };

  // Quick Undo the last tile in dock back to board
  const handleUndoLastTile = () => {
    if (isMerging || dockTiles.length === 0) return;
    const lastTile = dockTiles[dockTiles.length - 1];
    handleDockTileClick(lastTile.instanceId);
  };

  // Clear all dock tiles back to board at once
  const handleClearAllDockTiles = () => {
    if (isMerging || dockTiles.length === 0) return;
    sound.playTap();
    setBoardTiles((prev) => computeCoveredTiles([...prev, ...dockTiles]));
    setDockTiles([]);
  };

  // Booster Activation
  const handleUseBooster = (type: BoosterType) => {
    if ((profile.boosters[type] || 0) <= 0) {
      sound.playError();
      return;
    }

    sound.playBooster();

    if (type === 'hint') {
      // Find 2 or 3 UNCOVERED tiles on board that share the same tileId
      const counts: Record<string, string[]> = {};
      boardTiles.forEach((t) => {
        if (t.obstacle === 'none' && !t.isCovered) {
          counts[t.tileId] = counts[t.tileId] || [];
          counts[t.tileId].push(t.instanceId);
        }
      });
      let matchable = Object.values(counts).find((arr) => arr.length >= 2);
      if (!matchable) {
        // Fallback to any uncovered playable tile
        const openTiles = boardTiles.filter((t) => !t.isCovered && t.obstacle === 'none');
        if (openTiles.length > 0) {
          matchable = [openTiles[0].instanceId];
        }
      }
      if (matchable) {
        setHintedTileIds(matchable.slice(0, 3));
      }
      onUpdateProfile((prev) => ({
        ...prev,
        boosters: { ...prev.boosters, hint: Math.max(0, prev.boosters.hint - 1) }
      }));
    } else if (type === 'rainbow_seed') {
      // Spawn wildcard seed in dock
      if (dockTiles.length < 6) {
        const wildcardTile: BoardTile = {
          instanceId: `wildcard-${Date.now()}`,
          tileId: 'seed',
          row: 0,
          col: 0,
          obstacle: 'none'
        };
        setDockTiles((prev) => [...prev, wildcardTile]);
        onUpdateProfile((prev) => ({
          ...prev,
          boosters: { ...prev.boosters, rainbow_seed: Math.max(0, prev.boosters.rainbow_seed - 1) }
        }));
      }
    } else {
      setActiveBooster(activeBooster === type ? null : type);
    }
  };

  // Calculate Mahjong Pyramid Layout Dimensions
  const minR = Math.min(...boardTiles.map((t) => t.row), 0);
  const maxR = Math.max(...boardTiles.map((t) => t.row), 5);
  const minC = Math.min(...boardTiles.map((t) => t.col), 0);
  const maxC = Math.max(...boardTiles.map((t) => t.col), 7);

  const spanCols = Math.max(1, maxC - minC);
  const spanRows = Math.max(1, maxR - minR);

  // Tower layer statistics & groupings
  const currentMaxLayer = Math.max(...boardTiles.map((t) => t.layer ?? 0), 0);
  const totalTilesCount = boardTiles.length + dockTiles.length;

  // Gentle 2px vertical lift per layer so upper layers naturally pop without horizontal drifting
  const layerElevationY = 2.0;

  // Generous 3D tile dimensions optimized for central visibility
  const availW = Math.max(280, boardDim.width - 24);
  const availH = Math.max(260, boardDim.height - 24);

  const stepX = Math.max(34, Math.min(52, availW / (spanCols + 1.2)));
  const stepY = Math.max(40, Math.min(60, availH / (spanRows + 1.3)));

  const tileWidth = Math.round(stepX * 1.05);
  const tileHeight = Math.round(stepY * 1.18);
  const tileSize = stepX < 40 ? 'sm' : 'md';

  const totalW = spanCols * stepX + tileWidth;
  const totalH = spanRows * stepY + tileHeight;

  // Mathematically centered in the board area
  const startX = Math.max(6, (boardDim.width - totalW) / 2);
  const startY = Math.max(8, (boardDim.height - totalH) / 2);

  // Sorted tiles for rendering: lower layers first in DOM, upper layers later in DOM
  const sortedBoardTiles = React.useMemo(() => {
    return [...boardTiles].sort((a, b) => {
      const lA = a.layer ?? 0;
      const lB = b.layer ?? 0;
      if (lA !== lB) return lA - lB;
      return a.row - b.row;
    });
  }, [boardTiles]);

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-sky-200 via-emerald-100 to-amber-100">
      
      {/* Top Header Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between z-20 bg-white/70 backdrop-blur-xs border-b border-amber-200 shadow-xs">
        {/* Back button */}
        <button
          id="game-back-btn"
          type="button"
          onClick={() => {
            sound.playTap();
            onBack();
          }}
          className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-xs active:scale-95 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Level Name & Difficulty Grade */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 font-heading">
              {t('level', language)} {levelId}
            </span>
            {levelConfig.difficultyGrade && (
              <span
                className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border shadow-2xs flex items-center gap-0.5 ${
                  levelConfig.difficultyGrade >= 7
                    ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white border-rose-300 animate-pulse'
                    : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                }`}
              >
                <span>{levelConfig.difficultyGrade >= 7 ? '🔥' : '🌱'}</span>
                <span>{t('difficultyGrade', language)} {levelConfig.difficultyGrade}</span>
              </span>
            )}
          </div>
          <span className="text-xs font-semibold text-slate-600">
            {levelConfig.name[language]}
          </span>
        </div>

        {/* Moves Left Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl shadow-xs border border-amber-300">
          <span className="text-xs font-bold text-amber-950 font-heading leading-none">
            {movesLeft}
          </span>
          <span className="text-[10px] font-extrabold text-amber-900 uppercase">
            {t('moves', language)}
          </span>
        </div>
      </div>

      {/* Objectives Strip */}
      <div className="px-3 py-1.5 z-10 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
        {objectives.map((obj, idx) => {
          const targetDef = obj.targetTileId ? TILES[obj.targetTileId] : null;
          const isDone = obj.currentCount >= obj.targetCount;

          return (
            <div
              key={idx}
              className={`flex items-center gap-2 px-3 py-1 rounded-2xl border-2 shadow-xs transition-all ${
                isDone
                  ? 'bg-emerald-100/90 border-emerald-400 text-emerald-900'
                  : 'bg-white/85 border-amber-300 text-slate-800'
              }`}
            >
              <span className="text-base">
                {targetDef ? targetDef.symbol : obj.obstacleType === 'ice' ? '❄️' : '🎯'}
              </span>
              <span className="text-xs font-bold font-heading">
                {obj.label[language]}: {obj.currentCount} / {obj.targetCount}
              </span>
              {isDone && (
                <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                  ✓
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Remaining Figures Counter & Progress */}
      <div className="w-full px-4 py-1 z-10">
        <div className="max-w-md mx-auto bg-white/90 backdrop-blur-xs border border-amber-200/90 rounded-2xl px-3 py-1.5 shadow-2xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950 font-heading shrink-0">
            <span>✨</span>
            <span>{language === 'tr' ? 'Kalan Figür' : 'Remaining Figures'}:</span>
            <span className="text-amber-800 font-extrabold text-sm bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
              {totalTilesCount} / 96
            </span>
          </div>

          <div className="flex-1 h-2.5 bg-amber-100 rounded-full overflow-hidden border border-amber-300 relative">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-300"
              style={{
                width: `${Math.max(0, Math.min(100, ((96 - totalTilesCount) / 96) * 100))}%`
              }}
            />
          </div>

          <span className="text-[10px] font-extrabold text-emerald-800 font-heading shrink-0">
            {Math.round(((96 - totalTilesCount) / 96) * 100)}%
          </span>
        </div>
      </div>

      {/* Tutorial Hint Notification */}
      <AnimatePresence>
        {showTutorial && levelConfig.tutorialHint && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-4 my-1 p-2.5 bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 rounded-2xl shadow-sm flex items-start justify-between gap-2 z-20"
          >
            <div className="flex items-start gap-2">
              <span className="text-xl">💡</span>
              <p className="text-xs font-medium text-amber-950 leading-snug">
                {levelConfig.tutorialHint[language]}
              </p>
            </div>
            <button
              id="game-dismiss-tutorial-btn"
              type="button"
              onClick={() => setShowTutorial(false)}
              className="text-amber-800 font-bold text-xs p-1 hover:bg-amber-200/50 rounded-lg"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Booster Notification */}
      {activeBooster && (
        <div className="mx-4 py-1 px-3 bg-amber-500 text-amber-950 text-xs font-bold rounded-xl text-center shadow-md animate-pulse">
          {activeBooster === 'shears'
            ? language === 'tr'
              ? '✂️ Bahçe Makası: Panodaki 1 engelli karoya dokun!'
              : '✂️ Garden Shears: Tap any blocked tile on the board!'
            : language === 'tr'
            ? '✋ Sihirli El: İstediğin alt veya üst karoya dokun!'
            : '✋ Magic Hand: Tap any tile anywhere in the tower!'}
        </div>
      )}

      {/* Ephemeral Covered Tile Notice */}
      <AnimatePresence>
        {blockedNotice && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            className="mx-4 py-1 px-3 bg-slate-900/90 backdrop-blur-xs text-amber-300 text-xs font-semibold rounded-xl text-center shadow-lg border border-amber-400/40 z-30"
          >
            {blockedNotice}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main 3D Mahjong Tower Board Canvas */}
      <div
        ref={boardContainerRef}
        className={`flex-1 w-full flex items-center justify-center p-1 relative overflow-hidden isolate z-0 transition-opacity duration-300 ${
          isGameOver || isVictory ? 'opacity-80 pointer-events-none' : ''
        }`}
      >
        {/* 3D Garden Altar / Stage Pedestal Shadows for physical depth grounding */}
        <div className="w-80 h-36 rounded-[100%] bg-emerald-900/12 blur-xl absolute pointer-events-none translate-y-12" />
        <div className="w-64 h-28 rounded-[100%] bg-amber-500/15 blur-lg absolute pointer-events-none translate-y-8" />
        <div className="w-48 h-48 rounded-full bg-emerald-300/25 blur-2xl absolute pointer-events-none" />

        {/* 3D Layered Tiles Layout Stage */}
        <div className="relative w-full h-full">
          {sortedBoardTiles.map((tile) => {
            const currentLayer = tile.layer ?? 0;
            const isHinted = Array.isArray(hintedTileIds) && hintedTileIds.includes(tile.instanceId);
            const isNewlyUncovered = Array.isArray(newlyUncoveredIds) && newlyUncoveredIds.includes(tile.instanceId);
            const isShaking = shakingTileId === tile.instanceId;

            // Obscured check: tile is covered by another tile on top of it
            const isObscured = Boolean(tile.isCovered);
            // Clicking is strictly enabled only if not obscured (or magic hand booster is active)
            const isClickEnabled = !isObscured || activeBooster === 'magic_hand';

            // Clean centered position with vertical lift per layer
            const leftPos = startX + (tile.col - minC) * stepX;
            const topPos = startY + (tile.row - minR) * stepY - currentLayer * layerElevationY;
            // Higher layers are strictly on top for clicking and display (within isolated board container)
            const tileZIndex = isShaking ? 50 : currentLayer * 10 + Math.round(tile.row);

            return (
              <div
                key={tile.instanceId}
                id={`board-tile-wrapper-${tile.instanceId}`}
                style={{
                  position: 'absolute',
                  left: `${leftPos}px`,
                  top: `${topPos}px`,
                  zIndex: tileZIndex
                }}
                className={`transition-all duration-300 ease-out ${
                  !isClickEnabled ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                onClick={
                  !isClickEnabled
                    ? (e) => {
                        e.stopPropagation();
                        handleBlockedTileClick(tile.instanceId);
                      }
                    : undefined
                }
              >
                <TileView
                  id={`board-tile-${tile.instanceId}`}
                  tileId={tile.tileId}
                  obstacle={tile.obstacle}
                  isCovered={isObscured}
                  canPickCovered={activeBooster === 'magic_hand'}
                  isNewlyUncovered={isNewlyUncovered}
                  isShaking={isShaking}
                  layer={currentLayer}
                  layerDepth={currentMaxLayer - currentLayer}
                  isHinted={isHinted}
                  disabled={!isClickEnabled}
                  onClick={
                    isClickEnabled
                      ? () => handleTileClick(tile.instanceId)
                      : undefined
                  }
                  size={tileSize}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Dedicated Bottom Merge Dock (Only the gameplay matching area - No bottom buttons) */}
      <div className={`relative z-10 shrink-0 w-full bg-white/95 backdrop-blur-md border-t border-amber-200 shadow-md flex flex-col pt-1 pb-2 transition-opacity duration-300 ${
        isGameOver || isVictory ? 'opacity-80 pointer-events-none' : ''
      }`}>
        <MergeDock
          dockTiles={dockTiles}
          onTileClick={handleDockTileClick}
          onClearDock={handleUndoLastTile}
          maxSlots={6}
          matchingTileIds={matchingTileIds}
          isMerging={isMerging}
          language={language}
        />
      </div>

      {/* Game Over Dialog Modal - Elevated to absolute front (z-[100]) while board and dock remain visible in the background */}
      <AnimatePresence>
        {isGameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-6 select-none"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-sm bg-white rounded-3xl p-6 border-4 border-rose-400 shadow-2xl flex flex-col items-center text-center relative z-10"
            >
              <div className="w-16 h-16 rounded-2xl bg-rose-100 border-2 border-rose-300 flex items-center justify-center text-3xl mb-3 shadow-inner">
                🥀
              </div>
              <h2 className="text-2xl font-black text-rose-950 font-heading">
                {t('levelFailed', language)}
              </h2>
              <p className="text-xs text-slate-600 mt-1.5 mb-6 font-medium leading-relaxed">
                {dockTiles.length >= 6
                  ? language === 'tr'
                    ? 'Toplama sepeti doldu! Eşleşecek 3 aynı figür bulunamadı. Tekrar dene!'
                    : 'Tray is completely full! No 3 matching figures could be made. Try again!'
                  : language === 'tr'
                  ? 'Hamlelerin tükendi! Tekrar deneyerek kuleyi temizle.'
                  : 'Out of moves! Try again to clear the tower.'}
              </p>

              <div className="flex gap-3 w-full">
                <button
                  id="game-over-retry-btn"
                  type="button"
                  onClick={() => {
                    sound.playTap();
                    if (mergeTimerRef.current) {
                      clearTimeout(mergeTimerRef.current);
                      mergeTimerRef.current = null;
                    }
                    setMovesLeft(levelConfig.moves);
                    setObjectives(levelConfig.objectives.map((o) => ({ ...o, currentCount: 0 })));
                    setDockTiles([]);
                    setIsGameOver(false);
                    setIsMerging(false);
                    setMatchingTileIds([]);
                    setBoardTiles(generateLevelTiles(levelConfig, levelId));
                  }}
                  className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 font-bold text-amber-950 text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  {t('retryLevel', language)}
                </button>
                <button
                  id="game-over-quit-btn"
                  type="button"
                  onClick={() => {
                    sound.playTap();
                    onBack();
                  }}
                  className="py-3 px-4 rounded-2xl bg-slate-100 border border-slate-300 font-bold text-slate-700 text-sm active:scale-95 transition-all"
                >
                  {language === 'tr' ? 'Harita' : 'Map'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Victory Celebration Modal - Elevated to absolute front (z-[100]) */}
      <AnimatePresence>
        {isVictory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-6 select-none"
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-sm bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-2xl flex flex-col items-center text-center relative z-10"
            >
              <span className="text-5xl animate-bounce">🏆</span>
              <h2 className="text-2xl font-black text-amber-950 font-heading mt-2">
                {t('victory', language)}
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                {language === 'tr' ? 'Harika bir birleştirme performansı!' : 'Splendid merging performance!'}
              </p>

              {/* Rewards Summary */}
              <div className="flex gap-4 my-4 p-3 bg-amber-50 rounded-2xl border border-amber-200 w-full justify-center">
                <div className="flex items-center gap-1.5 font-extrabold text-amber-900 text-sm">
                  <span>🪙</span>
                  <span>+{levelConfig.rewards.coins}</span>
                </div>
                <div className="flex items-center gap-1.5 font-extrabold text-amber-900 text-sm">
                  <span>⭐</span>
                  <span>+{levelConfig.rewards.stars}</span>
                </div>
              </div>

              <button
                id="victory-continue-btn"
                type="button"
                onClick={() => {
                  sound.playTap();
                  onBack();
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 font-bold text-white text-base shadow-lg active:scale-95 transition-all"
              >
                {t('nextLevel', language)}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
