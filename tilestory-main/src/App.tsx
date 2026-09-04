import React, { useState, useEffect } from 'react';
import { MobileContainer } from './components/MobileContainer';
import { HeaderBar } from './components/HeaderBar';
import { SplashScreen } from './components/screens/SplashScreen';
import { MainMenuScreen } from './components/screens/MainMenuScreen';
import { LevelMapScreen } from './components/screens/LevelMapScreen';
import { GameScreen } from './components/screens/GameScreen';
import { DiscoveryBookModal } from './components/screens/DiscoveryBookModal';
import { DailyDiscoveryModal } from './components/screens/DailyDiscoveryModal';
import { DailyRewardsModal } from './components/screens/DailyRewardsModal';
import { ProfileModal } from './components/screens/ProfileModal';
import { SettingsModal } from './components/screens/SettingsModal';
import { BoosterShopModal } from './components/screens/BoosterShopModal';
import { HelpModal } from './components/screens/HelpModal';
import { LevelCompleteModal } from './components/screens/LevelCompleteModal';
import { storage } from './services/storage';
import { sound } from './services/sound';
import { BoosterType, PlayerProfile, ScreenType } from './types/game';
import { LEVELS } from './data/levels';

export default function App() {
  const [profile, setProfile] = useState<PlayerProfile>(() => storage.getProfile());
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [activeLevelId, setActiveLevelId] = useState<number>(profile.currentLevel || 1);
  const [lastCompletedLevelData, setLastCompletedLevelData] = useState<{
    levelId: number;
    coins: number;
    stars: number;
  } | null>(null);

  // Sync profile to localStorage on updates
  useEffect(() => {
    storage.saveProfile(profile);
  }, [profile]);

  // Sync audio preferences with sound service
  useEffect(() => {
    sound.soundEnabled = profile.settings.soundEnabled;
    sound.musicEnabled = profile.settings.musicEnabled;
    sound.vibrationEnabled = profile.settings.vibrationEnabled;
  }, [profile.settings]);

  // Handle Android Back button navigation
  useEffect(() => {
    const handleAndroidBack = () => {
      if (lastCompletedLevelData) {
        setLastCompletedLevelData(null);
        return;
      }
      if (currentScreen === 'game') {
        setCurrentScreen('level_map');
      } else if (currentScreen !== 'main_menu' && currentScreen !== 'splash') {
        setCurrentScreen('main_menu');
      } else if (currentScreen === 'main_menu') {
        const android = (window as unknown as { Android?: { closeApp?: () => void } }).Android;
        if (android?.closeApp) {
          android.closeApp();
        }
      }
    };
    window.addEventListener('androidback', handleAndroidBack);
    return () => window.removeEventListener('androidback', handleAndroidBack);
  }, [currentScreen, lastCompletedLevelData]);

  // Handle Level Completion
  const handleLevelComplete = (
    levelId: number,
    coinsEarned: number,
    starsEarned: number
  ) => {
    setLastCompletedLevelData({
      levelId,
      coins: coinsEarned,
      stars: starsEarned
    });

    setProfile((prev) => {
      const newHighest = Math.max(prev.highestCompletedLevel, levelId);
      const nextLvl = Math.min(LEVELS.length, levelId + 1);

      return {
        ...prev,
        coins: prev.coins + coinsEarned,
        stars: prev.stars + starsEarned,
        highestCompletedLevel: newHighest,
        currentLevel: nextLvl,
        levelStars: {
          ...prev.levelStars,
          [levelId]: 3
        }
      };
    });
  };

  // Next level action from completion modal
  const handleNextLevel = () => {
    if (!lastCompletedLevelData) return;
    const nextLevel = Math.min(LEVELS.length, lastCompletedLevelData.levelId + 1);
    setActiveLevelId(nextLevel);
    setLastCompletedLevelData(null);
    setCurrentScreen('game');
  };

  // Claim Daily Reward
  const handleClaimDailyReward = (day: number) => {
    const todayStr = new Date().toDateString();
    setProfile((prev) => {
      const bonusCoins = day === 1 ? 100 : day === 4 ? 250 : day === 7 ? 500 : 50;
      const bonusStars = day === 3 ? 5 : 0;
      const updatedBoosters = { ...prev.boosters };

      if (day === 2) updatedBoosters.magic_hand = (updatedBoosters.magic_hand || 0) + 1;
      if (day === 5) updatedBoosters.rainbow_seed = (updatedBoosters.rainbow_seed || 0) + 1;
      if (day === 6) {
        updatedBoosters.shears = (updatedBoosters.shears || 0) + 1;
        updatedBoosters.hint = (updatedBoosters.hint || 0) + 1;
      }
      if (day === 7) {
        updatedBoosters.magic_hand = (updatedBoosters.magic_hand || 0) + 1;
        updatedBoosters.shears = (updatedBoosters.shears || 0) + 1;
        updatedBoosters.rainbow_seed = (updatedBoosters.rainbow_seed || 0) + 1;
      }

      return {
        ...prev,
        coins: prev.coins + bonusCoins,
        stars: prev.stars + bonusStars,
        boosters: updatedBoosters,
        dailyStreak: prev.dailyStreak + 1,
        lastDailyClaimDate: todayStr
      };
    });
  };

  // Booster purchase in Shop
  const handleBuyBooster = (type: BoosterType, cost: number) => {
    setProfile((prev) => {
      if (prev.coins < cost) return prev;
      return {
        ...prev,
        coins: prev.coins - cost,
        boosters: {
          ...prev.boosters,
          [type]: (prev.boosters[type] || 0) + 1
        }
      };
    });
  };

  // Rewarded Video Ad simulation
  const handleRewardedAd = (rewardType: 'coins' | 'booster', booster?: BoosterType) => {
    setProfile((prev) => {
      if (rewardType === 'coins') {
        return { ...prev, coins: prev.coins + 100 };
      }
      if (booster) {
        return {
          ...prev,
          boosters: { ...prev.boosters, [booster]: (prev.boosters[booster] || 0) + 1 }
        };
      }
      return prev;
    });
  };

  // Reset Progress Handler
  const handleResetProgress = () => {
    storage.resetProgress();
    setProfile(storage.getProfile());
    setActiveLevelId(1);
    setCurrentScreen('main_menu');
  };

  const currentLang = profile.settings.language;

  return (
    <MobileContainer>
      {/* Top Header Bar (hidden on Splash and active Game screen to preserve board focus) */}
      {currentScreen !== 'splash' && currentScreen !== 'game' && (
        <HeaderBar
          coins={profile.coins}
          stars={profile.stars}
          currentLevel={profile.currentLevel}
          onOpenSettings={() => setCurrentScreen('settings')}
          onOpenShop={() => setCurrentScreen('shop')}
          soundEnabled={profile.settings.soundEnabled}
          onToggleSound={() => {
            const nextVal = !profile.settings.soundEnabled;
            sound.soundEnabled = nextVal;
            if (nextVal) sound.playTap();
            setProfile((prev) => ({
              ...prev,
              settings: { ...prev.settings, soundEnabled: nextVal }
            }));
          }}
          showBack={currentScreen !== 'main_menu'}
          onBack={() => setCurrentScreen('main_menu')}
        />
      )}

      {/* Screen Router */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        {currentScreen === 'splash' && (
          <SplashScreen
            onStart={() => setCurrentScreen('main_menu')}
            language={currentLang}
          />
        )}

        {currentScreen === 'main_menu' && (
          <MainMenuScreen
            profile={profile}
            onNavigate={(screen) => setCurrentScreen(screen)}
            language={currentLang}
          />
        )}

        {currentScreen === 'level_map' && (
          <LevelMapScreen
            profile={profile}
            onSelectLevel={(lvlId) => {
              setActiveLevelId(lvlId);
              setCurrentScreen('game');
            }}
            onBack={() => setCurrentScreen('main_menu')}
            language={currentLang}
          />
        )}

        {currentScreen === 'game' && (
          <GameScreen
            levelId={activeLevelId}
            profile={profile}
            onLevelComplete={handleLevelComplete}
            onBack={() => setCurrentScreen('level_map')}
            onUpdateProfile={setProfile}
            language={currentLang}
          />
        )}

        {currentScreen === 'discovery_book' && (
          <DiscoveryBookModal
            profile={profile}
            onBack={() => setCurrentScreen('main_menu')}
            language={currentLang}
          />
        )}

        {currentScreen === 'daily_discovery' && (
          <DailyDiscoveryModal
            profile={profile}
            onPlayDaily={() => {
              setActiveLevelId(2);
              setCurrentScreen('game');
            }}
            onBack={() => setCurrentScreen('main_menu')}
            language={currentLang}
          />
        )}

        {currentScreen === 'daily_rewards' && (
          <DailyRewardsModal
            profile={profile}
            onClaimReward={handleClaimDailyReward}
            onBack={() => setCurrentScreen('main_menu')}
            language={currentLang}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileModal
            profile={profile}
            onBack={() => setCurrentScreen('main_menu')}
            language={currentLang}
          />
        )}

        {currentScreen === 'settings' && (
          <SettingsModal
            profile={profile}
            onUpdateSettings={(newSettings) =>
              setProfile((prev) => ({
                ...prev,
                settings: { ...prev.settings, ...newSettings }
              }))
            }
            onResetProgress={handleResetProgress}
            onBack={() => setCurrentScreen('main_menu')}
            language={currentLang}
          />
        )}

        {currentScreen === 'shop' && (
          <BoosterShopModal
            profile={profile}
            onBuyBooster={handleBuyBooster}
            onRewardedAd={handleRewardedAd}
            onBack={() => setCurrentScreen('main_menu')}
            language={currentLang}
          />
        )}

        {currentScreen === 'help' && (
          <HelpModal
            onBack={() => setCurrentScreen('main_menu')}
            language={currentLang}
          />
        )}

        {/* Victory Celebration Modal */}
        {lastCompletedLevelData && (
          <LevelCompleteModal
            levelId={lastCompletedLevelData.levelId}
            coinsEarned={lastCompletedLevelData.coins}
            starsEarned={lastCompletedLevelData.stars}
            onNextLevel={handleNextLevel}
            onGoToMap={() => {
              setLastCompletedLevelData(null);
              setCurrentScreen('level_map');
            }}
            language={currentLang}
          />
        )}
      </div>
    </MobileContainer>
  );
}
