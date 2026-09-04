import React from 'react';
import { ChevronLeft, HelpCircle } from 'lucide-react';
import { sound } from '../../services/sound';
import { t } from '../../data/localization';

interface HelpModalProps {
  onBack: () => void;
  language: 'en' | 'tr';
}

export const HelpModal: React.FC<HelpModalProps> = ({ onBack, language }) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none overflow-hidden bg-gradient-to-b from-amber-50 via-emerald-50 to-teal-50 p-4">
      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <button
          id="help-back-btn"
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

        <h2 className="text-base font-bold text-slate-800 font-heading flex items-center gap-1">
          <HelpCircle className="w-4 h-4 text-emerald-700" />
          <span>{t('help', language)}</span>
        </h2>

        <div className="w-10" />
      </div>

      {/* Guide Content */}
      <div className="flex-1 overflow-y-auto py-3 max-w-sm mx-auto w-full flex flex-col gap-3 z-10 no-scrollbar">
        {/* Core Loop */}
        <div className="p-3.5 bg-white/95 rounded-3xl border-2 border-emerald-300 shadow-xs">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 font-heading mb-1">
            🌱 1. {language === 'tr' ? 'Temel Oyun Döngüsü' : 'The Core Loop'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {language === 'tr'
              ? 'Karoları topla, sepetinde birleştir, yeni doğa nesneleri keşfet ve huzurlu dünyanı inşa et!'
              : 'Match collectible tiles into your crafting basket, discover new nature objects, and build your tranquil world!'}
          </p>
        </div>

        {/* The Dock */}
        <div className="p-3.5 bg-white/95 rounded-3xl border-2 border-amber-300 shadow-xs">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-800 font-heading mb-1">
            🧺 2. {language === 'tr' ? 'Üretim Sepeti (5 Yuva)' : 'Crafting Basket (5 Slots)'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {language === 'tr'
              ? 'Sepetinizde en fazla 5 karo bulunabilir. 3 Tohum birleşerek Filiz olur! Sepeti taşırmamaya dikkat edin.'
              : 'Your dock holds up to 5 tiles. 3 Seeds merge into a Sprout! Keep slots open by crafting smart combinations.'}
          </p>
        </div>

        {/* Recipes & Discoveries */}
        <div className="p-3.5 bg-white/95 rounded-3xl border-2 border-sky-300 shadow-xs">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-sky-800 font-heading mb-1">
            ✨ 3. {language === 'tr' ? 'Keşifler & Tarifler' : 'Discoveries & Recipes'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {language === 'tr'
              ? 'Çiçek + Arı birleşince Bal üretilir! Su + Güneş + Filiz büyük bir Ağaç yaratır. Keşif Kitabını doldur!'
              : 'Flower + Bee yields golden Honey! Water + Sun + Sprout grows into a Tree. Fill your Discovery Book!'}
          </p>
        </div>

        {/* Obstacles */}
        <div className="p-3.5 bg-white/95 rounded-3xl border-2 border-slate-300 shadow-xs">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 font-heading mb-1">
            🌿 4. {language === 'tr' ? 'Engeller' : 'Obstacles'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {language === 'tr'
              ? 'Sarmaşıklar, Buzlar ve Taşlar karoları bloke eder. Bahçe Makası ile engelleri kaldırın.'
              : 'Vines, Ice, and Stones lock tiles in place. Use your Garden Shears to prune them away.'}
          </p>
        </div>
      </div>

      <div className="text-center text-[10px] text-slate-500">
        Tile Story – Merge & Discover
      </div>
    </div>
  );
};
