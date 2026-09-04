import { WorldArea, WorldItem } from '../types/game';

export const WORLD_AREAS: WorldArea[] = [
  {
    id: 1,
    name: { en: 'Cozy Garden', tr: 'Huzurlu Bahçe' },
    themeColor: 'from-emerald-400 to-teal-600',
    minLevel: 1,
    description: {
      en: 'A sunny, blossoming sanctuary filled with friendly bees and gentle flora.',
      tr: 'Güneşli, taze çiçekler ve neşeli arılarla dolu sakin bir bahçe cenneti.'
    },
    isUnlocked: true,
    previewIcon: '🌻'
  },
  {
    id: 2,
    name: { en: 'Enchanted Forest', tr: 'Büyülü Orman' },
    themeColor: 'from-green-600 to-emerald-900',
    minLevel: 11,
    description: {
      en: 'Ancient towering trees that whisper secrets beneath the moonlight canopy.',
      tr: 'Ay ışığı altında kadim sırları fısıldayan ulu ağaçların masalsı ormanı.'
    },
    isUnlocked: false,
    previewIcon: '🌲'
  },
  {
    id: 3,
    name: { en: 'Sunny Beach', tr: 'Güneşli Sahil' },
    themeColor: 'from-amber-300 to-cyan-500',
    minLevel: 21,
    description: {
      en: 'Warm golden sands, gentle rolling waves, and tropical shell treasures.',
      tr: 'Sıcak altın kumlar, huzurlu dalgalar ve tropik deniz kabukları.'
    },
    isUnlocked: false,
    previewIcon: '🏖️'
  },
  {
    id: 4,
    name: { en: 'Peaceful Village', tr: 'Huzurlu Köy' },
    themeColor: 'from-orange-400 to-amber-700',
    minLevel: 31,
    description: {
      en: 'A welcoming hillside hamlet with stone chimneys and cheerful market stalls.',
      tr: 'Taş bacaları ve neşeli pazar tezgahlarıyla sıcacık bir tepe köyü.'
    },
    isUnlocked: false,
    previewIcon: '🏘️'
  },
  {
    id: 5,
    name: { en: 'Magical Grove', tr: 'Sihirli Vadi' },
    themeColor: 'from-purple-500 to-indigo-800',
    minLevel: 41,
    description: {
      en: 'Luminous crystal blooms and sparkling fairy streams that glow in twilight.',
      tr: 'Alacakaranlıkta parıldayan kristal çiçekler ve peri dereleri.'
    },
    isUnlocked: false,
    previewIcon: '🔮'
  },
  {
    id: 6,
    name: { en: 'Snowy Valley', tr: 'Karlı Vadi' },
    themeColor: 'from-sky-300 to-blue-600',
    minLevel: 51,
    description: {
      en: 'Pristine crystalline snowdrifts around steaming hot springs and cozy pines.',
      tr: 'Buhar tüten sıcak kaplıcalar ve karlı çam ağaçlarının dingin vadisi.'
    },
    isUnlocked: false,
    previewIcon: '❄️'
  },
  {
    id: 7,
    name: { en: 'Sky Islands', tr: 'Gökyüzü Adaları' },
    themeColor: 'from-cyan-400 to-violet-600',
    minLevel: 61,
    description: {
      en: 'Floating cloud sanctuaries soaring high above the mundane clouds.',
      tr: 'Bulutların üzerinde süzülen rüzgarlı ve mistik gökyüzü adaları.'
    },
    isUnlocked: false,
    previewIcon: '☁️'
  },
  {
    id: 8,
    name: { en: 'Cosmic Garden', tr: 'Kozmik Bahçe' },
    themeColor: 'from-purple-600 to-pink-600',
    minLevel: 71,
    description: {
      en: 'The starry garden where nebula dust and galaxies nourish celestial flowers.',
      tr: 'Yıldız ışıkları ve galaksilerin semavi çiçekleri beslediği kozmik bahçe.'
    },
    isUnlocked: false,
    previewIcon: '🌌'
  },
  {
    id: 9,
    name: { en: 'Hidden Realm', tr: 'Gizli Mabet' },
    themeColor: 'from-amber-600 to-yellow-800',
    minLevel: 81,
    description: {
      en: 'An ancient sanctuary of mythical relics and sacred botanical secrets.',
      tr: 'Kadim kalıntılar ve kutsal bitki sırlarıyla dolu gizemli bir mabet.'
    },
    isUnlocked: false,
    previewIcon: '🏺'
  },
  {
    id: 10,
    name: { en: 'Master Garden', tr: 'Usta Bahçesi' },
    themeColor: 'from-amber-400 via-rose-500 to-purple-700',
    minLevel: 91,
    description: {
      en: 'The pinnacle paradise of infinite blossoms, reserved for the true grandmaster.',
      tr: 'Yalnızca gerçek büyük ustaya adanmış sonsuz çiçekler cenneti.'
    },
    isUnlocked: false,
    previewIcon: '👑'
  }
];

export const INITIAL_GARDEN_ITEMS: WorldItem[] = [
  {
    id: 'patch_of_grass',
    tileId: 'sprout',
    name: { en: 'Lush Lawn', tr: 'Taze Çimenlik' },
    requiredLevel: 1,
    x: 50,
    y: 65,
    size: 90,
    unlocked: true,
    category: 'plant'
  },
  {
    id: 'flower_pot_1',
    tileId: 'flower_bud',
    name: { en: 'Blooming Planters', tr: 'Çiçek Saksıları' },
    requiredLevel: 2,
    x: 25,
    y: 72,
    size: 40,
    unlocked: false,
    category: 'decor'
  },
  {
    id: 'blooming_rose',
    tileId: 'flower',
    name: { en: 'Vibrant Flowerbed', tr: 'Rengarenk Çiçek Tarhı' },
    requiredLevel: 3,
    x: 75,
    y: 70,
    size: 48,
    unlocked: false,
    category: 'plant'
  },
  {
    id: 'little_pond',
    tileId: 'pond',
    name: { en: 'Garden Pond & Lilies', tr: 'Nilüferli Bahçe Göleti' },
    requiredLevel: 4,
    x: 70,
    y: 45,
    size: 60,
    unlocked: false,
    category: 'water'
  },
  {
    id: 'sunflower_patch',
    tileId: 'sun',
    name: { en: 'Golden Sunflowers', tr: 'Altın Ayçiçekleri' },
    requiredLevel: 5,
    x: 18,
    y: 52,
    size: 50,
    unlocked: false,
    category: 'plant'
  },
  {
    id: 'young_oak_tree',
    tileId: 'tree',
    name: { en: 'Shady Oak Tree', tr: 'Gölgeli Meşe Ağacı' },
    requiredLevel: 6,
    x: 15,
    y: 30,
    size: 72,
    unlocked: false,
    category: 'plant'
  },
  {
    id: 'bee_hotel',
    tileId: 'bee',
    name: { en: 'Honeybee Sanctuary', tr: 'Bal Arısı Yuvası' },
    requiredLevel: 7,
    x: 82,
    y: 28,
    size: 44,
    unlocked: false,
    category: 'creature'
  },
  {
    id: 'cozy_beehive',
    tileId: 'beehive',
    name: { en: 'Handcrafted Beehive', tr: 'El Yapımı Arı Kovanı' },
    requiredLevel: 8,
    x: 35,
    y: 32,
    size: 46,
    unlocked: false,
    category: 'structure'
  },
  {
    id: 'honey_stand',
    tileId: 'honey',
    name: { en: 'Rustic Honey Stand', tr: 'Köy Bal Tezgahı' },
    requiredLevel: 9,
    x: 55,
    y: 82,
    size: 45,
    unlocked: false,
    category: 'decor'
  },
  {
    id: 'cozy_cottage',
    tileId: 'flower_house',
    name: { en: 'Garden Cottage', tr: 'Bahçıvan Kulübesi' },
    requiredLevel: 10,
    x: 50,
    y: 22,
    size: 95,
    unlocked: false,
    category: 'structure'
  },
  {
    id: 'forest_shrine',
    tileId: 'magical_tree',
    name: { en: 'Ancient Forest Shrine', tr: 'Kadim Orman Mabedi' },
    requiredLevel: 20,
    x: 48,
    y: 18,
    size: 85,
    unlocked: false,
    category: 'structure'
  },
  {
    id: 'coral_arch',
    tileId: 'coral',
    name: { en: 'Sunken Coral Arch', tr: 'Mercan Kemeri' },
    requiredLevel: 30,
    x: 20,
    y: 60,
    size: 65,
    unlocked: false,
    category: 'water'
  },
  {
    id: 'village_windmill',
    tileId: 'windmill',
    name: { en: 'Grand Windmill', tr: 'Büyük Yel Değirmeni' },
    requiredLevel: 40,
    x: 80,
    y: 25,
    size: 78,
    unlocked: false,
    category: 'structure'
  },
  {
    id: 'crystal_fountain',
    tileId: 'enchanted_lotus',
    name: { en: 'Enchanted Lotus Fountain', tr: 'Büyülü Nilüfer Çeşmesi' },
    requiredLevel: 50,
    x: 50,
    y: 50,
    size: 80,
    unlocked: false,
    category: 'magic'
  },
  {
    id: 'ice_palace_spire',
    tileId: 'hot_spring',
    name: { en: 'Glacier Hot Springs', tr: 'Buzul Sıcak Kaplıcası' },
    requiredLevel: 60,
    x: 25,
    y: 40,
    size: 75,
    unlocked: false,
    category: 'water'
  },
  {
    id: 'sky_pagoda',
    tileId: 'sun_crystal',
    name: { en: 'Starlight Sky Pagoda', tr: 'Yıldız Gökyüzü Pagodası' },
    requiredLevel: 70,
    x: 75,
    y: 35,
    size: 82,
    unlocked: false,
    category: 'structure'
  },
  {
    id: 'cosmic_monolith',
    tileId: 'cosmic_flower',
    name: { en: 'Nebula Celestial Monolith', tr: 'Bulutsu Kozmik Dikilitaşı' },
    requiredLevel: 80,
    x: 50,
    y: 25,
    size: 88,
    unlocked: false,
    category: 'magic'
  },
  {
    id: 'ancient_sanctuary_gate',
    tileId: 'elder_rune',
    name: { en: 'Elder Rune Gateway', tr: 'Kadim Rün Kapısı' },
    requiredLevel: 90,
    x: 48,
    y: 20,
    size: 90,
    unlocked: false,
    category: 'structure'
  },
  {
    id: 'celestial_master_throne',
    tileId: 'celestial_crown',
    name: { en: 'Grand Master Celestial Crown', tr: 'Büyük Usta Şampiyon Tacı' },
    requiredLevel: 100,
    x: 50,
    y: 15,
    size: 100,
    unlocked: false,
    category: 'structure'
  }
];
