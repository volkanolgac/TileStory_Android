import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Volume2, Music, Smartphone, Globe, Trash2 } from 'lucide-react';
import { sound } from '../../services/sound';
import { t } from '../../data/localization';
import { PlayerProfile } from '../../types/game';

interface SettingsModalProps {
  profile: PlayerProfile;
  onUpdateSettings: (newSettings: Partial<PlayerProfile['settings']>) => void;
  onResetProgress: () => void;
  onBack: () => void;
  language: 'en' | 'tr';
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  profile,
  onUpdateSettings,
  onResetProgress,
  onBack,
  language
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState<boolean>(false);

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none overflow-hidden bg-gradient-to-b from-amber-50 via-emerald-50 to-teal-50 p-4">
      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <button
          id="settings-back-btn"
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
          {t('settings', language)}
        </h2>

        <div className="w-10" />
      </div>

      {/* Settings List */}
      <div className="flex-1 overflow-y-auto py-4 max-w-xs mx-auto w-full flex flex-col gap-3 z-10 no-scrollbar">
        {/* Sound Effects Toggle */}
        <div className="p-3 bg-white/90 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Volume2 className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-800">
              {t('soundEffects', language)}
            </span>
          </div>
          <button
            id="settings-toggle-sound"
            type="button"
            onClick={() => {
              const newVal = !profile.settings.soundEnabled;
              sound.soundEnabled = newVal;
              if (newVal) sound.playTap();
              onUpdateSettings({ soundEnabled: newVal });
            }}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              profile.settings.soundEnabled ? 'bg-emerald-500' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                profile.settings.soundEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Music Toggle */}
        <div className="p-3 bg-white/90 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
              <Music className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-800">
              {t('music', language)}
            </span>
          </div>
          <button
            id="settings-toggle-music"
            type="button"
            onClick={() => {
              sound.playTap();
              const newVal = !profile.settings.musicEnabled;
              sound.musicEnabled = newVal;
              if (newVal) {
                sound.startAmbientMusic();
              } else {
                sound.stopAmbientMusic();
              }
              onUpdateSettings({ musicEnabled: newVal });
            }}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              profile.settings.musicEnabled ? 'bg-emerald-500' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                profile.settings.musicEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Vibration Toggle */}
        <div className="p-3 bg-white/90 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700">
              <Smartphone className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-800">
              {t('vibration', language)}
            </span>
          </div>
          <button
            id="settings-toggle-vibration"
            type="button"
            onClick={() => {
              sound.playTap();
              const newVal = !profile.settings.vibrationEnabled;
              if (newVal) sound.triggerHaptic();
              onUpdateSettings({ vibrationEnabled: newVal });
            }}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              profile.settings.vibrationEnabled ? 'bg-emerald-500' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                profile.settings.vibrationEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Language Selection */}
        <div className="p-3 bg-white/90 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700">
              <Globe className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-800">
              {t('language', language)}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl">
            <button
              id="lang-en-btn"
              type="button"
              onClick={() => {
                sound.playTap();
                onUpdateSettings({ language: 'en' });
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                language === 'en' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'
              }`}
            >
              EN
            </button>
            <button
              id="lang-tr-btn"
              type="button"
              onClick={() => {
                sound.playTap();
                onUpdateSettings({ language: 'tr' });
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                language === 'tr' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'
              }`}
            >
              TR
            </button>
          </div>
        </div>

        {/* Reset Progress Button */}
        <div className="mt-4">
          <button
            id="settings-reset-progress-btn"
            type="button"
            onClick={() => {
              sound.playTap();
              setShowConfirmReset(true);
            }}
            className="w-full py-2.5 px-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs font-bold flex items-center justify-center gap-2 hover:bg-rose-100 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>{t('resetProgress', language)}</span>
          </button>
        </div>
      </div>

      {/* Confirmation Dialog for Reset */}
      {showConfirmReset && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-6 z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-xs bg-white rounded-3xl p-5 shadow-2xl border-2 border-rose-300 flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-xl mb-2">
              ⚠️
            </div>

            <h3 className="text-base font-extrabold text-slate-800 font-heading">
              {t('resetConfirmTitle', language)}
            </h3>

            <p className="text-xs text-slate-600 my-3 leading-relaxed">
              {t('resetConfirmDesc', language)}
            </p>

            <div className="flex items-center gap-2 w-full mt-2">
              <button
                id="reset-cancel-btn"
                type="button"
                onClick={() => setShowConfirmReset(false)}
                className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
              >
                {t('cancel', language)}
              </button>
              <button
                id="reset-confirm-btn"
                type="button"
                onClick={() => {
                  sound.playTap();
                  setShowConfirmReset(false);
                  onResetProgress();
                }}
                className="flex-1 py-2 rounded-xl bg-rose-500 text-white text-xs font-bold shadow-xs hover:bg-rose-600"
              >
                {t('confirm', language)}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="text-center text-[10px] text-slate-400">
        Google AI Studio Casual Mobile Build
      </div>
    </div>
  );
};
