export type TileTier = 1 | 2 | 3 | 4 | 5;

export type TileCategory = 'nature' | 'water' | 'sun' | 'creature' | 'earth' | 'magic';

export type ObstacleType = 'none' | 'vine' | 'ice' | 'stone';

export interface TileDefinition {
  id: string;
  name: {
    en: string;
    tr: string;
  };
  tier: TileTier;
  category: TileCategory;
  description: {
    en: string;
    tr: string;
  };
  iconName: string;
  colorBg: string;
  colorBorder: string;
  colorGlow: string;
  symbol: string;
}

export interface BoardTile {
  instanceId: string;
  tileId: string;
  row: number;
  col: number;
  layer?: number;
  obstacle: ObstacleType;
  isCovered?: boolean;
}

export interface Recipe {
  id: string;
  inputs: string[]; // List of tile IDs required (order agnostic)
  output: string;   // Resulting tile ID
  isSpecialInteraction?: boolean; // e.g. Flower + Bee -> Honey
  name: {
    en: string;
    tr: string;
  };
}

export type ObjectiveType = 'merge_tile' | 'create_specific' | 'clear_obstacle' | 'special_interaction';

export interface LevelObjective {
  type: ObjectiveType;
  targetTileId?: string;
  obstacleType?: ObstacleType;
  targetCount: number;
  currentCount: number;
  label: {
    en: string;
    tr: string;
  };
}

export type BoardShapeType = 'pyramid' | 'flower' | 'clover' | 'tree' | 'cloud' | 'heart' | 'butterfly' | 'island' | 'house' | 'spiral';

export interface LevelConfig {
  id: number;
  name: {
    en: string;
    tr: string;
  };
  boardShape: BoardShapeType;
  moves: number;
  tiles: {
    tileId: string;
    count: number;
    obstacle?: ObstacleType;
  }[];
  objectives: LevelObjective[];
  rewards: {
    coins: number;
    stars: number;
    worldItemUnlock?: string;
    boosterReward?: BoosterType;
  };
  tutorialHint?: {
    en: string;
    tr: string;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  difficultyGrade?: number;
}

export type BoosterType = 'magic_hand' | 'shears' | 'rainbow_seed' | 'hint';

export interface BoosterInfo {
  type: BoosterType;
  name: {
    en: string;
    tr: string;
  };
  description: {
    en: string;
    tr: string;
  };
  icon: string;
  cost: number;
}

export interface DiscoveredItem {
  tileId: string;
  discoveredAt: number; // timestamp
  timesMerged: number;
}

export interface WorldItem {
  id: string;
  tileId: string;
  name: {
    en: string;
    tr: string;
  };
  requiredLevel: number;
  x: number; // % in garden layout (0 - 100)
  y: number; // % in garden layout (0 - 100)
  size: number;
  unlocked: boolean;
  category: 'plant' | 'structure' | 'creature' | 'water' | 'decor';
}

export interface WorldArea {
  id: number;
  name: {
    en: string;
    tr: string;
  };
  themeColor: string;
  minLevel: number;
  description: {
    en: string;
    tr: string;
  };
  isUnlocked: boolean;
  previewIcon: string;
}

export interface PlayerProfile {
  coins: number;
  stars: number;
  currentLevel: number;
  highestCompletedLevel: number;
  levelStars: Record<number, number>; // levelId -> stars (1-3)
  discoveries: Record<string, DiscoveredItem>; // tileId -> info
  boosters: Record<BoosterType, number>;
  worldItems: string[];
  gardenProgressPercent: number;
  dailyStreak: number;
  lastDailyClaimDate: string;
  dailyDiscoveryCompletedDate: string;
  settings: {
    musicEnabled: boolean;
    soundEnabled: boolean;
    vibrationEnabled: boolean;
    language: 'en' | 'tr';
  };
  firstTimeUser: boolean;
}

export type ScreenType =
  | 'splash'
  | 'main_menu'
  | 'level_map'
  | 'game'
  | 'world'
  | 'discovery_book'
  | 'daily_discovery'
  | 'daily_rewards'
  | 'profile'
  | 'settings'
  | 'world_preview'
  | 'booster_shop'
  | 'help';
