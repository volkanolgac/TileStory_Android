import { PlayerProfile, BoosterType } from '../types/game';

const STORAGE_KEY = 'tile_story_save_v1';

export const DEFAULT_PROFILE: PlayerProfile = {
  coins: 150,
  stars: 0,
  currentLevel: 1,
  highestCompletedLevel: 0,
  levelStars: {},
  discoveries: {
    seed: { tileId: 'seed', discoveredAt: Date.now(), timesMerged: 0 },
    leaf: { tileId: 'leaf', discoveredAt: Date.now(), timesMerged: 0 }
  },
  boosters: {
    magic_hand: 2,
    shears: 2,
    rainbow_seed: 1,
    hint: 3
  },
  worldItems: ['seed_sprout', 'stone_path'],
  gardenProgressPercent: 10,
  dailyStreak: 1,
  lastDailyClaimDate: '',
  dailyDiscoveryCompletedDate: '',
  settings: {
    musicEnabled: true,
    soundEnabled: true,
    vibrationEnabled: true,
    language: 'en'
  },
  firstTimeUser: true
};

export class StorageService {
  public static load(): PlayerProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return { ...DEFAULT_PROFILE };
      const parsed = JSON.parse(data);
      return {
        ...DEFAULT_PROFILE,
        ...parsed,
        worldItems: Array.isArray(parsed?.worldItems) ? parsed.worldItems : [...DEFAULT_PROFILE.worldItems],
        levelStars: parsed?.levelStars || {},
        discoveries: parsed?.discoveries || DEFAULT_PROFILE.discoveries,
        boosters: {
          ...DEFAULT_PROFILE.boosters,
          ...(parsed?.boosters || {})
        },
        settings: {
          ...DEFAULT_PROFILE.settings,
          ...(parsed?.settings || {})
        }
      };
    } catch {
      return { ...DEFAULT_PROFILE };
    }
  }

  public static save(profile: PlayerProfile): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // quota or local storage restriction
    }
  }

  public static reset(): PlayerProfile {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    return { ...DEFAULT_PROFILE, firstTimeUser: false };
  }
}

export const storage = {
  getProfile: () => StorageService.load(),
  saveProfile: (profile: PlayerProfile) => StorageService.save(profile),
  resetProgress: () => StorageService.reset()
};
