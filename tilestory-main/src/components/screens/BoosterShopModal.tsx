import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Sparkles, Video, Check } from 'lucide-react';
import { sound } from '../../services/sound';
import { t } from '../../data/localization';
import { BoosterType, PlayerProfile } from '../../types/game';

interface BoosterShopModalProps {
  profile: PlayerProfile;
  onBuyBooster: (type: BoosterType, cost: number) => void;
  onRewardedAd: (rewardType: 'coins' | 'booster', boosterType?: BoosterType) => void;
  onBack: () => void;
  language: 'en' | 'tr';
}

export const BoosterShopModal: React.FC<BoosterShopModalProps> = ({
  profile,
  onBuyBooster,
  onRewardedAd,
  onBack,
  language
}) => {
  const [adSimulating, setAdSimulating] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const boosterProducts: { type: BoosterType; nameKey: string; descKey: string; icon: string; cost: number }[] = [
    {
      type: 'magic_hand',
      nameKey: 'boosterMagicHand',
      descKey: 'boosterMagicHandDesc',
      icon: '✋',
      cost: 100
    },
    {
      type: 'shears',
      nameKey: 'boosterShears',
      descKey: 'boosterShearsDesc',
      icon: '✂️',
      cost: 100
    },
    {
      type: 'rainbow_seed',
      nameKey: 'boosterRainbowSeed',
      descKey: 'boosterRainbowSeedDesc',
      icon: '🌈',
      cost: 150
    },
    {
      type: 'hint',
      nameKey: 'boosterHint',
      descKey: 'boosterHintDesc',
      icon: '💡',
      cost: 60
    }
  ];

  const handlePurchase = (type: BoosterType, cost: number) => {
    if (profile.coins < cost) {
      sound.playError();
      setToastMessage(t('insufficientCoins', language));
      setTimeout(() => setToastMessage(null), 2000);
      return;
    }
    sound.playCoin();
    onBuyBooster(type, cost);
    setToastMessage(language === 'tr' ? 'Satın Alındı! +1' : 'Purchased! +1');
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleWatchAd = (type: 'coins' | 'booster', booster?: BoosterType) => {
    setAdSimulating(true);
    sound.playBooster();

    setTimeout(() => {
      setAdSimulating(false);
      sound.playCoin();
      onRewardedAd(type, booster);
      setToastMessage(language === 'tr' ? 'Ödül Alındı!' : 'Reward Claimed!');
      setTimeout(() => setToastMessage(null), 2000);
    }, 1500);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none overflow-hidden bg-gradient-to-b from-amber-50 via-emerald-50 to-teal-50 p-4">
      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <button
          id="shop-back-btn"
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

        <h2 className="text-base font-bold text-slate-800 font-heading">
          {t('boosters', language)} & {language === 'tr' ? 'Dükkan' : 'Shop'}
        </h2>

        {/* Coins indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 border border-amber-300 rounded-xl text-amber-900 font-bold text-xs">
          <span>🪙</span>
          <span>{profile.coins}</span>
        </div>
      </div>

      {/* Toast message */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-14 inset-x-8 z-50 bg-amber-400 text-amber-950 font-bold text-xs py-1.5 px-4 rounded-xl shadow-md text-center"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Boosters List */}
      <div className="flex-1 overflow-y-auto py-3 max-w-sm mx-auto w-full flex flex-col gap-2.5 z-10 no-scrollbar">
        {/* Rewarded Ad Card */}
        <div className="p-3 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-3xl border-2 border-emerald-300 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-xl shadow-xs">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-emerald-950 font-heading">
                {language === 'tr' ? 'Ücretsiz Altın Bonusu' : 'Free Reward Video'}
              </div>
              <div className="text-[10px] text-emerald-800 font-semibold">
                +100 Coins / +1 Booster
              </div>
            </div>
          </div>

          <button
            id="watch-rewarded-ad-btn"
            type="button"
            disabled={adSimulating}
            onClick={() => handleWatchAd('coins')}
            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all"
          >
            {adSimulating ? '...' : language === 'tr' ? 'İzle' : 'Watch'}
          </button>
        </div>

        {/* Boosters for Coins */}
        {boosterProducts.map((prod) => (
          <div
            key={prod.type}
            className="p-3 bg-white/95 rounded-3xl border-2 border-slate-200 shadow-xs flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl shadow-xs">
                {prod.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-slate-800 font-heading">
                    {t(prod.nameKey as unknown as keyof typeof t, language)}
                  </span>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded-full">
                    x{profile.boosters[prod.type] || 0}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 line-clamp-1">
                  {t(prod.descKey as unknown as keyof typeof t, language)}
                </div>
              </div>
            </div>

            <button
              id={`buy-booster-${prod.type}`}
              type="button"
              onClick={() => handlePurchase(prod.type, prod.cost)}
              className="px-3 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 rounded-xl text-xs font-extrabold shadow-xs active:scale-95 transition-all flex items-center gap-1 shrink-0"
            >
              <span>🪙</span>
              <span>{prod.cost}</span>
            </button>
          </div>
        ))}
      </div>

      <div className="text-center text-[10px] text-slate-500">
        {language === 'tr'
          ? 'Tüm güçlendiriciler oyun içinde kazanılan altınlarla alınabilir.'
          : 'All boosters can be acquired through normal gameplay!'}
      </div>
    </div>
  );
};
