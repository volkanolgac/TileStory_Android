import { TileDefinition } from '../types/game';

export const TILES: Record<string, TileDefinition> = {
  // Tier 1
  seed: {
    id: 'seed',
    name: { en: 'Seed', tr: 'Tohum' },
    tier: 1,
    category: 'nature',
    description: {
      en: 'A tiny dormant seed packed with lively potential.',
      tr: 'Canlı bir potansiyele sahip küçük bir tohum.'
    },
    iconName: 'seed',
    colorBg: 'bg-amber-100',
    colorBorder: 'border-amber-300',
    colorGlow: '#fef3c7',
    symbol: '🌰'
  },
  water_drop: {
    id: 'water_drop',
    name: { en: 'Water Drop', tr: 'Su Damlası' },
    tier: 1,
    category: 'water',
    description: {
      en: 'A crystal-clear dew drop that quenches plant thirst.',
      tr: 'Bitkileri canlandıran berrak bir su damlası.'
    },
    iconName: 'water_drop',
    colorBg: 'bg-cyan-100',
    colorBorder: 'border-cyan-300',
    colorGlow: '#cffafe',
    symbol: '💧'
  },
  sun: {
    id: 'sun',
    name: { en: 'Sun', tr: 'Güneş' },
    tier: 1,
    category: 'sun',
    description: {
      en: 'Warm golden rays giving life and energy to the garden.',
      tr: 'Bahçeye hayat ve sıcaklık veren altın güneş ışınları.'
    },
    iconName: 'sun',
    colorBg: 'bg-yellow-100',
    colorBorder: 'border-yellow-300',
    colorGlow: '#fef08a',
    symbol: '☀️'
  },
  bee: {
    id: 'bee',
    name: { en: 'Bee', tr: 'Arı' },
    tier: 1,
    category: 'creature',
    description: {
      en: 'A cheerful busy pollinator searching for sweet blossoms.',
      tr: 'Tatlı çiçekler arayan neşeli ve çalışkan bir arı.'
    },
    iconName: 'bee',
    colorBg: 'bg-amber-100',
    colorBorder: 'border-amber-400',
    colorGlow: '#fde68a',
    symbol: '🐝'
  },
  leaf: {
    id: 'leaf',
    name: { en: 'Leaf', tr: 'Yaprak' },
    tier: 1,
    category: 'nature',
    description: {
      en: 'A crisp green leaf fluttering in the garden breeze.',
      tr: 'Bahçe esintisinde hafifçe sallanan taze yeşil yaprak.'
    },
    iconName: 'leaf',
    colorBg: 'bg-emerald-100',
    colorBorder: 'border-emerald-300',
    colorGlow: '#d1fae5',
    symbol: '🍃'
  },
  stone: {
    id: 'stone',
    name: { en: 'Stone', tr: 'Taş' },
    tier: 1,
    category: 'earth',
    description: {
      en: 'A smooth garden pebble rounded by gentle mountain waters.',
      tr: 'Dağ suları tarafından pürüzsüzleştirilmiş bahçe taşı.'
    },
    iconName: 'stone',
    colorBg: 'bg-slate-100',
    colorBorder: 'border-slate-300',
    colorGlow: '#f1f5f9',
    symbol: '🪨'
  },
  cloud: {
    id: 'cloud',
    name: { en: 'Cloud', tr: 'Bulut' },
    tier: 1,
    category: 'water',
    description: {
      en: 'A fluffy white cloud drifting lazily across the sky.',
      tr: 'Gökyüzünde tembelce süzülen yumuşacık beyaz bir bulut.'
    },
    iconName: 'cloud',
    colorBg: 'bg-sky-100',
    colorBorder: 'border-sky-300',
    colorGlow: '#e0f2fe',
    symbol: '☁️'
  },

  // Tier 2
  sprout: {
    id: 'sprout',
    name: { en: 'Sprout', tr: 'Filiz' },
    tier: 2,
    category: 'nature',
    description: {
      en: 'A gentle green seedling breaking through fertile soil.',
      tr: 'Verimli topraktan filizlenen neşeli yeşil bir fide.'
    },
    iconName: 'sprout',
    colorBg: 'bg-green-100',
    colorBorder: 'border-green-400',
    colorGlow: '#bbf7d0',
    symbol: '🌱'
  },
  puddle: {
    id: 'puddle',
    name: { en: 'Puddle', tr: 'Su Birikintisi' },
    tier: 2,
    category: 'water',
    description: {
      en: 'A peaceful little pool reflecting the sky.',
      tr: 'Gökyüzünü yansıtan huzurlu küçük bir su birikintisi.'
    },
    iconName: 'puddle',
    colorBg: 'bg-blue-100',
    colorBorder: 'border-blue-400',
    colorGlow: '#bfdbfe',
    symbol: '🌊'
  },
  sunbeam: {
    id: 'sunbeam',
    name: { en: 'Sunbeam', tr: 'Güneş Işığı' },
    tier: 2,
    category: 'sun',
    description: {
      en: 'Bright warm shafts of light sparking growth everywhere.',
      tr: 'Her yere canlılık saçan parlak güneş ışığı.'
    },
    iconName: 'sunbeam',
    colorBg: 'bg-orange-100',
    colorBorder: 'border-orange-300',
    colorGlow: '#fed7aa',
    symbol: '✨'
  },
  flower_bud: {
    id: 'flower_bud',
    name: { en: 'Flower Bud', tr: 'Gonca' },
    tier: 2,
    category: 'nature',
    description: {
      en: 'A tightly curled bud on the verge of blooming.',
      tr: 'Açmak üzere olan taptaze bir çiçek goncası.'
    },
    iconName: 'flower_bud',
    colorBg: 'bg-rose-100',
    colorBorder: 'border-rose-300',
    colorGlow: '#fecdd3',
    symbol: '🌷'
  },
  small_rock: {
    id: 'small_rock',
    name: { en: 'Small Rock', tr: 'Küçük Kaya' },
    tier: 2,
    category: 'earth',
    description: {
      en: 'A sturdy rock forming the border of cozy garden paths.',
      tr: 'Bahçe patikalarını süsleyen sağlam bir kaya parçası.'
    },
    iconName: 'small_rock',
    colorBg: 'bg-stone-100',
    colorBorder: 'border-stone-400',
    colorGlow: '#e7e5e4',
    symbol: '⛰️'
  },
  rain_cloud: {
    id: 'rain_cloud',
    name: { en: 'Rain Cloud', tr: 'Yağmur Bulutu' },
    tier: 2,
    category: 'water',
    description: {
      en: 'A soothing cloud nurturing garden soil with soft showers.',
      tr: 'Bahçeyi hafif yağmurlarla sulayan huzurlu bir bulut.'
    },
    iconName: 'rain_cloud',
    colorBg: 'bg-indigo-100',
    colorBorder: 'border-indigo-300',
    colorGlow: '#c7d2fe',
    symbol: '🌧️'
  },

  // Tier 3
  flower: {
    id: 'flower',
    name: { en: 'Flower', tr: 'Çiçek' },
    tier: 3,
    category: 'nature',
    description: {
      en: 'A vibrant blossom that radiates joy and fragrant scent.',
      tr: 'Etrafına neşe ve mis kokular saçan rengarenk bir çiçek.'
    },
    iconName: 'flower',
    colorBg: 'bg-pink-100',
    colorBorder: 'border-pink-400',
    colorGlow: '#fbcfe8',
    symbol: '🌸'
  },
  pond: {
    id: 'pond',
    name: { en: 'Pond', tr: 'Gölet' },
    tier: 3,
    category: 'water',
    description: {
      en: 'A serene garden pond where lilies float in harmony.',
      tr: 'Nilüferlerin yüzdüğü huzur dolu berrak bir bahçe göleti.'
    },
    iconName: 'pond',
    colorBg: 'bg-teal-100',
    colorBorder: 'border-teal-400',
    colorGlow: '#99f6e4',
    symbol: '🏝️'
  },
  tree: {
    id: 'tree',
    name: { en: 'Tree', tr: 'Ağaç' },
    tier: 3,
    category: 'nature',
    description: {
      en: 'A healthy sapling grown strong with sunlight and water.',
      tr: 'Güneş ve suyla büyümüş güçlü, taze bir ağaç.'
    },
    iconName: 'tree',
    colorBg: 'bg-emerald-100',
    colorBorder: 'border-emerald-500',
    colorGlow: '#a7f3d0',
    symbol: '🌳'
  },
  beehive: {
    id: 'beehive',
    name: { en: 'Beehive', tr: 'Arı Kovanı' },
    tier: 3,
    category: 'creature',
    description: {
      en: 'A sweet-smelling honeycomb buzzing with happy bees.',
      tr: 'Mutlu arıların vızıldadığı tatlı bir bal kovanı.'
    },
    iconName: 'beehive',
    colorBg: 'bg-amber-100',
    colorBorder: 'border-amber-500',
    colorGlow: '#fcd34d',
    symbol: '🛖'
  },
  bush: {
    id: 'bush',
    name: { en: 'Bush', tr: 'Çalı' },
    tier: 3,
    category: 'nature',
    description: {
      en: 'A lush green bush dotted with wild forest berries.',
      tr: 'Yabani meyvelerle dolu gür yeşil bir çalı.'
    },
    iconName: 'bush',
    colorBg: 'bg-lime-100',
    colorBorder: 'border-lime-400',
    colorGlow: '#d9f99d',
    symbol: '🌿'
  },
  honey: {
    id: 'honey',
    name: { en: 'Honey', tr: 'Bal' },
    tier: 3,
    category: 'creature',
    description: {
      en: 'Golden nectar created when cheerful bees visit flowers.',
      tr: 'Çiçekleri ziyaret eden arıların ürettiği altın nektar.'
    },
    iconName: 'honey',
    colorBg: 'bg-amber-100',
    colorBorder: 'border-amber-400',
    colorGlow: '#fde68a',
    symbol: '🍯'
  },

  // Tier 4
  large_flower: {
    id: 'large_flower',
    name: { en: 'Large Flower', tr: 'Büyük Çiçek' },
    tier: 4,
    category: 'nature',
    description: {
      en: 'A majestic radiant flower admired by all garden visitors.',
      tr: 'Tüm bahçe ziyaretçilerini büyüleyen görkemli bir çiçek.'
    },
    iconName: 'large_flower',
    colorBg: 'bg-fuchsia-100',
    colorBorder: 'border-fuchsia-400',
    colorGlow: '#f5d0fe',
    symbol: '🌺'
  },
  large_tree: {
    id: 'large_tree',
    name: { en: 'Large Tree', tr: 'Ulu Ağaç' },
    tier: 4,
    category: 'nature',
    description: {
      en: 'An ancient protective oak with broad leafy branches.',
      tr: 'Geniş yapraklı dallarıyla bahçeyi koruyan ulu bir meşe.'
    },
    iconName: 'large_tree',
    colorBg: 'bg-green-100',
    colorBorder: 'border-green-600',
    colorGlow: '#86efac',
    symbol: '🌲'
  },
  garden_pond: {
    id: 'garden_pond',
    name: { en: 'Garden Pond', tr: 'Büyük Bahçe Göleti' },
    tier: 4,
    category: 'water',
    description: {
      en: 'An expansive picturesque pond inhabited by playful koi fish.',
      tr: 'İçinde sevimli koi balıklarının yüzdüğü harika bir gölet.'
    },
    iconName: 'garden_pond',
    colorBg: 'bg-cyan-100',
    colorBorder: 'border-cyan-500',
    colorGlow: '#a5f3fc',
    symbol: '⛲'
  },
  fruit_tree: {
    id: 'fruit_tree',
    name: { en: 'Fruit Tree', tr: 'Meyve Ağacı' },
    tier: 4,
    category: 'nature',
    description: {
      en: 'Heavy branches bursting with sweet ruby red apples.',
      tr: 'Tatlı kırmızı elmalarla dolu verimli bir meyve ağacı.'
    },
    iconName: 'fruit_tree',
    colorBg: 'bg-red-100',
    colorBorder: 'border-red-400',
    colorGlow: '#fecaca',
    symbol: '🍎'
  },
  butterfly_garden: {
    id: 'butterfly_garden',
    name: { en: 'Butterfly Garden', tr: 'Kelebek Bahçesi' },
    tier: 4,
    category: 'creature',
    description: {
      en: 'A sanctuary of fragrant blossoms filled with fluttering wings.',
      tr: 'Rengarenk kanatların uçuştuğu büyüleyici bir kelebek cenneti.'
    },
    iconName: 'butterfly_garden',
    colorBg: 'bg-violet-100',
    colorBorder: 'border-violet-400',
    colorGlow: '#ddd6fe',
    symbol: '🦋'
  },

  // Tier 5
  magical_tree: {
    id: 'magical_tree',
    name: { en: 'Magical Tree', tr: 'Sihirli Ağaç' },
    tier: 5,
    category: 'magic',
    description: {
      en: 'A legendary cosmic tree that glimmers with starlight sap.',
      tr: 'Yıldız tozuyla parıldayan efsanevi sihirli bir ağaç.'
    },
    iconName: 'magical_tree',
    colorBg: 'bg-purple-100',
    colorBorder: 'border-purple-500',
    colorGlow: '#e9d5ff',
    symbol: '🌟'
  },
  flower_house: {
    id: 'flower_house',
    name: { en: 'Flower House', tr: 'Çiçek Evi' },
    tier: 5,
    category: 'magic',
    description: {
      en: 'A fairytale cottage woven from living vines and petals.',
      tr: 'Canlı sarmaşıklar ve çiçek yapraklarından örülmüş masal evi.'
    },
    iconName: 'flower_house',
    colorBg: 'bg-rose-100',
    colorBorder: 'border-rose-500',
    colorGlow: '#fecdd3',
    symbol: '🏡'
  },
  fairy_garden: {
    id: 'fairy_garden',
    name: { en: 'Fairy Garden', tr: 'Peri Bahçesi' },
    tier: 5,
    category: 'magic',
    description: {
      en: 'A magical haven where friendly spirits celebrate nature.',
      tr: 'Peri ruhlarının doğayı kutladığı büyüleyici bir bahçe.'
    },
    iconName: 'fairy_garden',
    colorBg: 'bg-emerald-100',
    colorBorder: 'border-emerald-500',
    colorGlow: '#a7f3d0',
    symbol: '🧚'
  },

  // Additional Nature & Creatures (Used in Levels & Recipes)
  ladybug: {
    id: 'ladybug',
    name: { en: 'Ladybug', tr: 'Uğur Böceği' },
    tier: 1,
    category: 'creature',
    description: {
      en: 'A bright red spotted ladybug bringing good fortune.',
      tr: 'Bahçeye şans getiren benekli sevimli bir uğur böceği.'
    },
    iconName: 'ladybug',
    colorBg: 'bg-red-100',
    colorBorder: 'border-red-400',
    colorGlow: '#fecaca',
    symbol: '🐞'
  },
  mushroom: {
    id: 'mushroom',
    name: { en: 'Mushroom', tr: 'Mantar' },
    tier: 1,
    category: 'nature',
    description: {
      en: 'A cheerful spotted mushroom growing in the shade.',
      tr: 'Gölgeli ormanda yetişen neşeli kırmızı şapkalı bir mantar.'
    },
    iconName: 'mushroom',
    colorBg: 'bg-rose-100',
    colorBorder: 'border-rose-400',
    colorGlow: '#ffe4e6',
    symbol: '🍄'
  },
  butterfly: {
    id: 'butterfly',
    name: { en: 'Butterfly', tr: 'Kelebek' },
    tier: 2,
    category: 'creature',
    description: {
      en: 'A graceful butterfly fluttering with colorful wings.',
      tr: 'Zarif kanatlarıyla bahçede süzülen renkli bir kelebek.'
    },
    iconName: 'butterfly',
    colorBg: 'bg-violet-100',
    colorBorder: 'border-violet-400',
    colorGlow: '#ddd6fe',
    symbol: '🦋'
  },
  crystal: {
    id: 'crystal',
    name: { en: 'Crystal', tr: 'Kristal' },
    tier: 2,
    category: 'magic',
    description: {
      en: 'A dazzling crystal glittering with pure light.',
      tr: 'Göz alıcı ışıltısıyla parıldayan saf bir bahçe kristali.'
    },
    iconName: 'crystal',
    colorBg: 'bg-cyan-100',
    colorBorder: 'border-cyan-400',
    colorGlow: '#cffafe',
    symbol: '💎'
  },
  rainbow: {
    id: 'rainbow',
    name: { en: 'Rainbow', tr: 'Gökkuşağı' },
    tier: 3,
    category: 'magic',
    description: {
      en: 'A vibrant rainbow arching across clear blue skies.',
      tr: 'Mavi gökyüzünde parlayan yedi renkli büyüleyici bir gökkuşağı.'
    },
    iconName: 'rainbow',
    colorBg: 'bg-indigo-100',
    colorBorder: 'border-indigo-400',
    colorGlow: '#c7d2fe',
    symbol: '🌈'
  },
  caterpillar: {
    id: 'caterpillar',
    name: { en: 'Caterpillar', tr: 'Tırtıl' },
    tier: 1,
    category: 'creature',
    description: {
      en: 'A cute green caterpillar nibbling fresh leaves.',
      tr: 'Taze yaprakları kemiren sevimli yeşil bir tırtıl.'
    },
    iconName: 'caterpillar',
    colorBg: 'bg-lime-100',
    colorBorder: 'border-lime-400',
    colorGlow: '#d9f99d',
    symbol: '🐛'
  },
  cocoon: {
    id: 'cocoon',
    name: { en: 'Cocoon', tr: 'Koza' },
    tier: 2,
    category: 'creature',
    description: {
      en: 'A delicate chrysalis waiting to transform.',
      tr: 'İçinde kelebek saklayan ipeksi bir koza.'
    },
    iconName: 'cocoon',
    colorBg: 'bg-amber-100',
    colorBorder: 'border-amber-300',
    colorGlow: '#fef3c7',
    symbol: '🧶'
  },
  berry: {
    id: 'berry',
    name: { en: 'Berry', tr: 'Böğürtlen' },
    tier: 1,
    category: 'nature',
    description: {
      en: 'A ripe delicious berry straight from wild garden bushes.',
      tr: 'Bahçe çalılarından taze toplanmış leziz böğürtlen.'
    },
    iconName: 'berry',
    colorBg: 'bg-purple-100',
    colorBorder: 'border-purple-400',
    colorGlow: '#f3e8ff',
    symbol: '🫐'
  },
  jam: {
    id: 'jam',
    name: { en: 'Jam', tr: 'Reçel' },
    tier: 2,
    category: 'nature',
    description: {
      en: 'A sweet glass jar of fresh homemade fruit preserve.',
      tr: 'Taze meyvelerden yapılmış nefis bir kavanoz reçel.'
    },
    iconName: 'jam',
    colorBg: 'bg-rose-100',
    colorBorder: 'border-rose-400',
    colorGlow: '#ffe4e6',
    symbol: '🫙'
  },
  apple: {
    id: 'apple',
    name: { en: 'Apple', tr: 'Elma' },
    tier: 1,
    category: 'nature',
    description: {
      en: 'A crunchy sweet red apple picked from the fruit tree.',
      tr: 'Meyve ağacından toplanmış sulu ve tatlı kırmızı bir elma.'
    },
    iconName: 'apple',
    colorBg: 'bg-red-100',
    colorBorder: 'border-red-400',
    colorGlow: '#fecaca',
    symbol: '🍎'
  },
  apple_pie: {
    id: 'apple_pie',
    name: { en: 'Apple Pie', tr: 'Elmalı Turta' },
    tier: 2,
    category: 'nature',
    description: {
      en: 'A fresh baked golden apple pie with comforting cinnamon.',
      tr: 'Tarçın kokulu taze fırınlanmış sıcacık elmalı turta.'
    },
    iconName: 'apple_pie',
    colorBg: 'bg-amber-100',
    colorBorder: 'border-amber-400',
    colorGlow: '#fef08a',
    symbol: '🥧'
  },
  fairy_ring: {
    id: 'fairy_ring',
    name: { en: 'Fairy Ring', tr: 'Peri Halkası' },
    tier: 2,
    category: 'magic',
    description: {
      en: 'A mysterious fairy mushroom circle glowing with enchantment.',
      tr: 'Gizemli perilerin dans ettiği sihirli bir peri halkası.'
    },
    iconName: 'fairy_ring',
    colorBg: 'bg-emerald-100',
    colorBorder: 'border-emerald-400',
    colorGlow: '#d1fae5',
    symbol: '🍄‍🟫'
  },
  honeycomb: {
    id: 'honeycomb',
    name: { en: 'Honeycomb', tr: 'Bal Peteği' },
    tier: 2,
    category: 'creature',
    description: {
      en: 'A golden hexagonal wax comb dripping with pure nectar.',
      tr: 'Saf nektarla dolu altın rengi doğal bir petek.'
    },
    iconName: 'honeycomb',
    colorBg: 'bg-amber-100',
    colorBorder: 'border-amber-400',
    colorGlow: '#fef08a',
    symbol: '🧇'
  },

  // World 3: Sunny Island
  seashell: {
    id: 'seashell',
    name: { en: 'Seashell', tr: 'Deniz Kabuğu' },
    tier: 1,
    category: 'water',
    description: {
      en: 'A spiral ocean shell washed ashore with gentle waves.',
      tr: 'Huzurlu dalgalarla kıyıya vuran sarmal bir deniz kabuğu.'
    },
    iconName: 'seashell',
    colorBg: 'bg-orange-100',
    colorBorder: 'border-orange-300',
    colorGlow: '#ffedd5',
    symbol: '🐚'
  },
  coral: {
    id: 'coral',
    name: { en: 'Coral', tr: 'Mercan' },
    tier: 2,
    category: 'water',
    description: {
      en: 'A colorful living reef branch teeming with sea life.',
      tr: 'Deniz yaşamıyla dolu rengarenk canlı bir mercan dalı.'
    },
    iconName: 'coral',
    colorBg: 'bg-rose-100',
    colorBorder: 'border-rose-400',
    colorGlow: '#ffe4e6',
    symbol: '🪸'
  },
  pearl: {
    id: 'pearl',
    name: { en: 'Pearl', tr: 'İnci' },
    tier: 3,
    category: 'water',
    description: {
      en: 'A lustrous white pearl glistening with ocean treasure.',
      tr: 'Okyanus derinliklerinden gelen parlak, göz alıcı bir inci.'
    },
    iconName: 'pearl',
    colorBg: 'bg-slate-100',
    colorBorder: 'border-slate-300',
    colorGlow: '#f8fafc',
    symbol: '🦪'
  },
  coconut: {
    id: 'coconut',
    name: { en: 'Coconut', tr: 'Hindistan Cevizi' },
    tier: 1,
    category: 'nature',
    description: {
      en: 'A fresh tropical coconut fallen from the sunny palm tree.',
      tr: 'Güneşli palmiyeden düşmüş taze bir tropik hindistan cevizi.'
    },
    iconName: 'coconut',
    colorBg: 'bg-amber-100',
    colorBorder: 'border-amber-500',
    colorGlow: '#fef3c7',
    symbol: '🥥'
  },
  tropical_fish: {
    id: 'tropical_fish',
    name: { en: 'Tropical Fish', tr: 'Tropik Balık' },
    tier: 2,
    category: 'creature',
    description: {
      en: 'A playful colorful fish swimming through turquoise waves.',
      tr: 'Turkuaz sularda neşeyle yüzen sevimli tropikal bir balık.'
    },
    iconName: 'tropical_fish',
    colorBg: 'bg-cyan-100',
    colorBorder: 'border-cyan-400',
    colorGlow: '#cffafe',
    symbol: '🐠'
  },

  // World 4: Peaceful Village
  wheat: {
    id: 'wheat',
    name: { en: 'Golden Wheat', tr: 'Altın Buğday' },
    tier: 1,
    category: 'earth',
    description: {
      en: 'Sun-ripened ears of wheat harvested from village fields.',
      tr: 'Köy tarlalarından hasat edilmiş altın sarısı başaklar.'
    },
    iconName: 'wheat',
    colorBg: 'bg-amber-100',
    colorBorder: 'border-amber-300',
    colorGlow: '#fef9c3',
    symbol: '🌾'
  },
  bread: {
    id: 'bread',
    name: { en: 'Fresh Bread', tr: 'Taze Ekmek' },
    tier: 2,
    category: 'earth',
    description: {
      en: 'A warm crusty loaf baked in the village stone oven.',
      tr: 'Köy fırınında taş üzerinde pişmiş sıcacık taze ekmek.'
    },
    iconName: 'bread',
    colorBg: 'bg-yellow-100',
    colorBorder: 'border-yellow-400',
    colorGlow: '#fef08a',
    symbol: '🍞'
  },
  windmill: {
    id: 'windmill',
    name: { en: 'Windmill', tr: 'Yel Değirmeni' },
    tier: 3,
    category: 'earth',
    description: {
      en: 'A rustic wooden windmill turning gently in the meadow breeze.',
      tr: 'Çayır esintisinde aheste aheste dönen ahşap yel değirmeni.'
    },
    iconName: 'windmill',
    colorBg: 'bg-blue-100',
    colorBorder: 'border-blue-400',
    colorGlow: '#dbeafe',
    symbol: '💨'
  },
  wooden_cart: {
    id: 'wooden_cart',
    name: { en: 'Harvest Cart', tr: 'Hasat Arabası' },
    tier: 2,
    category: 'earth',
    description: {
      en: 'A hand-crafted wooden cart brimming with garden goods.',
      tr: 'Bahçe mahsulleriyle dolu el yapımı ahşap bir araba.'
    },
    iconName: 'wooden_cart',
    colorBg: 'bg-amber-100',
    colorBorder: 'border-amber-600',
    colorGlow: '#fde68a',
    symbol: '🪵'
  },
  lantern: {
    id: 'lantern',
    name: { en: 'Village Lantern', tr: 'Köy Feneri' },
    tier: 1,
    category: 'sun',
    description: {
      en: 'A warm lantern casting welcoming golden light on stone paths.',
      tr: 'Taş yolları aydınlatan sıcacık sarı ışıklı köy feneri.'
    },
    iconName: 'lantern',
    colorBg: 'bg-orange-100',
    colorBorder: 'border-orange-400',
    colorGlow: '#fed7aa',
    symbol: '🏮'
  },

  // World 5: Magic Valley
  magic_potion: {
    id: 'magic_potion',
    name: { en: 'Elixir of Light', tr: 'Işık İksiri' },
    tier: 2,
    category: 'magic',
    description: {
      en: 'A shimmering vial filled with glowing botanical essence.',
      tr: 'Parıldayan bitki özleriyle dolu sihirli bir iksir şişesi.'
    },
    iconName: 'magic_potion',
    colorBg: 'bg-fuchsia-100',
    colorBorder: 'border-fuchsia-400',
    colorGlow: '#fae8ff',
    symbol: '🧪'
  },
  magic_wand: {
    id: 'magic_wand',
    name: { en: 'Enchanted Wand', tr: 'Büyülü Asa' },
    tier: 3,
    category: 'magic',
    description: {
      en: 'A wooden wand tipped with a gleaming fairy star.',
      tr: 'Ucu peri yıldızıyla parıldayan sihirli bir doğa asası.'
    },
    iconName: 'magic_wand',
    colorBg: 'bg-purple-100',
    colorBorder: 'border-purple-400',
    colorGlow: '#f3e8ff',
    symbol: '🪄'
  },
  sparkle_orb: {
    id: 'sparkle_orb',
    name: { en: 'Mystic Orb', tr: 'Mistik Küre' },
    tier: 2,
    category: 'magic',
    description: {
      en: 'A translucent crystal orb swirling with twilight mist.',
      tr: 'İçinde alacakaranlık sisi dönen gizemli bir kristal küre.'
    },
    iconName: 'sparkle_orb',
    colorBg: 'bg-indigo-100',
    colorBorder: 'border-indigo-400',
    colorGlow: '#e0e7ff',
    symbol: '🔮'
  },
  enchanted_lotus: {
    id: 'enchanted_lotus',
    name: { en: 'Enchanted Lotus', tr: 'Büyülü Nilüfer' },
    tier: 3,
    category: 'magic',
    description: {
      en: 'A luminous magical blossom floating over starlit waters.',
      tr: 'Yıldız ışıklı suların üzerinde yüzen parlak sihirli nilüfer.'
    },
    iconName: 'enchanted_lotus',
    colorBg: 'bg-pink-100',
    colorBorder: 'border-pink-400',
    colorGlow: '#fce7f3',
    symbol: '🪷'
  },

  // World 6: Frozen Valley
  snowflake: {
    id: 'snowflake',
    name: { en: 'Snowflake', tr: 'Kar Tanesi' },
    tier: 1,
    category: 'water',
    description: {
      en: 'A perfectly symmetrical ice crystal dancing from the clouds.',
      tr: 'Gökyüzünden süzülen kusursuz altıgen bir kar tanesi.'
    },
    iconName: 'snowflake',
    colorBg: 'bg-sky-100',
    colorBorder: 'border-sky-300',
    colorGlow: '#e0f2fe',
    symbol: '❄️'
  },
  ice_crystal: {
    id: 'ice_crystal',
    name: { en: 'Ice Crystal', tr: 'Buz Kristali' },
    tier: 2,
    category: 'water',
    description: {
      en: 'A sharp, glittering prism carved from glacier ice.',
      tr: 'Buzul buzundan yontulmuş keskin ve ışıltılı bir prizma.'
    },
    iconName: 'ice_crystal',
    colorBg: 'bg-cyan-100',
    colorBorder: 'border-cyan-400',
    colorGlow: '#cffafe',
    symbol: '🧊'
  },
  snow_pine: {
    id: 'snow_pine',
    name: { en: 'Frost Pine', tr: 'Karlı Çam' },
    tier: 2,
    category: 'nature',
    description: {
      en: 'An evergreen pine tree dusted with sparkling fresh snow.',
      tr: 'Üzerine taze kar yağmış görkemli ve dirençli bir çam ağacı.'
    },
    iconName: 'snow_pine',
    colorBg: 'bg-teal-100',
    colorBorder: 'border-teal-400',
    colorGlow: '#ccfbf1',
    symbol: '🎄'
  },
  hot_spring: {
    id: 'hot_spring',
    name: { en: 'Hot Spring', tr: 'Kaplıca' },
    tier: 3,
    category: 'water',
    description: {
      en: 'A soothing thermal pool surrounded by snowy rocks.',
      tr: 'Karlı kayalar arasında buharı tüten şifalı sıcak su kaynağı.'
    },
    iconName: 'hot_spring',
    colorBg: 'bg-rose-100',
    colorBorder: 'border-rose-300',
    colorGlow: '#ffe4e6',
    symbol: '♨️'
  },
  snowman: {
    id: 'snowman',
    name: { en: 'Snowman', tr: 'Kardan Adam' },
    tier: 2,
    category: 'creature',
    description: {
      en: 'A cheerful frosty companion with a bright carrot nose.',
      tr: 'Havuç burunlu neşeli ve sevimli bir kardan adam.'
    },
    iconName: 'snowman',
    colorBg: 'bg-blue-100',
    colorBorder: 'border-blue-300',
    colorGlow: '#dbeafe',
    symbol: '⛄'
  },

  // World 7: Sky Islands
  feather: {
    id: 'feather',
    name: { en: 'Sky Feather', tr: 'Gökyüzü Tüyü' },
    tier: 1,
    category: 'creature',
    description: {
      en: 'A weightless iridescent feather carried by high wind currents.',
      tr: 'Yüksek rüzgarlarla süzülen hafif ve parlak bir kuş tüyü.'
    },
    iconName: 'feather',
    colorBg: 'bg-violet-100',
    colorBorder: 'border-violet-300',
    colorGlow: '#ede9fe',
    symbol: '🪶'
  },
  starlight: {
    id: 'starlight',
    name: { en: 'Starlight', tr: 'Yıldız Işığı' },
    tier: 2,
    category: 'sun',
    description: {
      en: 'A pure beacon of celestial starlight gathered from high peaks.',
      tr: 'Zirvelerden toplanmış saf ve berrak bir yıldız ışığı.'
    },
    iconName: 'starlight',
    colorBg: 'bg-amber-100',
    colorBorder: 'border-amber-300',
    colorGlow: '#fef3c7',
    symbol: '⭐'
  },
  sun_crystal: {
    id: 'sun_crystal',
    name: { en: 'Solar Prism', tr: 'Güneş Prizması' },
    tier: 3,
    category: 'sun',
    description: {
      en: 'A sky crystal that focuses bright sunshine into warm life energy.',
      tr: 'Güneş ışığını hayat enerjisine dönüştüren gökyüzü prizması.'
    },
    iconName: 'sun_crystal',
    colorBg: 'bg-yellow-100',
    colorBorder: 'border-yellow-400',
    colorGlow: '#fef08a',
    symbol: '☀️'
  },
  wind_chime: {
    id: 'wind_chime',
    name: { en: 'Wind Chime', tr: 'Rüzgar Çanı' },
    tier: 2,
    category: 'magic',
    description: {
      en: 'A glass chime that sings sweet melodies when breezes pass.',
      tr: 'Esintiyle birlikte tatlı melodiler çalan zarif cam çan.'
    },
    iconName: 'wind_chime',
    colorBg: 'bg-cyan-100',
    colorBorder: 'border-cyan-300',
    colorGlow: '#e0f2fe',
    symbol: '🎐'
  },

  // World 8: Cosmic Garden
  planet: {
    id: 'planet',
    name: { en: 'Mini Planet', tr: 'Küçük Gezegen' },
    tier: 2,
    category: 'magic',
    description: {
      en: 'A miniature celestial world with orbiting golden rings.',
      tr: 'Etrafında altın halkalar dönen küçük sevimli bir gezegen.'
    },
    iconName: 'planet',
    colorBg: 'bg-purple-100',
    colorBorder: 'border-purple-400',
    colorGlow: '#f3e8ff',
    symbol: '🪐'
  },
  meteor_star: {
    id: 'meteor_star',
    name: { en: 'Shooting Star', tr: 'Kayan Yıldız' },
    tier: 2,
    category: 'sun',
    description: {
      en: 'A brilliant flash of cosmic wonder granting garden wishes.',
      tr: 'Dilekleri gerçeğe dönüştüren göz kamaştırıcı kayan yıldız.'
    },
    iconName: 'meteor_star',
    colorBg: 'bg-indigo-100',
    colorBorder: 'border-indigo-400',
    colorGlow: '#e0e7ff',
    symbol: '🌠'
  },
  cosmic_flower: {
    id: 'cosmic_flower',
    name: { en: 'Cosmic Bloom', tr: 'Kozmik Çiçek' },
    tier: 3,
    category: 'magic',
    description: {
      en: 'An otherworldly flower that blooms only under starlight.',
      tr: 'Sadece yıldızların altında açan büyüleyici evrensel çiçek.'
    },
    iconName: 'cosmic_flower',
    colorBg: 'bg-fuchsia-100',
    colorBorder: 'border-fuchsia-400',
    colorGlow: '#fae8ff',
    symbol: '🌌'
  },
  moon_crescent: {
    id: 'moon_crescent',
    name: { en: 'Crescent Moon', tr: 'Hilal' },
    tier: 1,
    category: 'sun',
    description: {
      en: 'A glowing sliver of moonlight soothing the night garden.',
      tr: 'Gece bahçesini aydınlatan huzur verici hilal ışığı.'
    },
    iconName: 'moon_crescent',
    colorBg: 'bg-slate-100',
    colorBorder: 'border-slate-400',
    colorGlow: '#f1f5f9',
    symbol: '🌙'
  },
  nebula_orb: {
    id: 'nebula_orb',
    name: { en: 'Nebula Orb', tr: 'Bulutsu Küresi' },
    tier: 3,
    category: 'magic',
    description: {
      en: 'A swirling galaxy trapped inside a protective aura.',
      tr: 'Koruyucu bir hale içinde dönen rengarenk minyatür galaksi.'
    },
    iconName: 'nebula_orb',
    colorBg: 'bg-pink-100',
    colorBorder: 'border-pink-500',
    colorGlow: '#fce7f3',
    symbol: '💫'
  },

  // World 9: Hidden Realm
  ancient_relic: {
    id: 'ancient_relic',
    name: { en: 'Ancient Relic', tr: 'Antik Kalıntı' },
    tier: 2,
    category: 'earth',
    description: {
      en: 'A mysterious urn inscribed with ancient garden wisdom.',
      tr: 'Üzerinde kadim bahçe bilgeliği yazılı antik bir kap.'
    },
    iconName: 'ancient_relic',
    colorBg: 'bg-amber-100',
    colorBorder: 'border-amber-600',
    colorGlow: '#fef3c7',
    symbol: '🏺'
  },
  mystic_scroll: {
    id: 'mystic_scroll',
    name: { en: 'Mystic Scroll', tr: 'Gizemli Parşömen' },
    tier: 2,
    category: 'magic',
    description: {
      en: 'A sacred scroll containing lost botanical recipes.',
      tr: 'Kayıp doğa tariflerini barındıran kutsal bir parşömen.'
    },
    iconName: 'mystic_scroll',
    colorBg: 'bg-yellow-100',
    colorBorder: 'border-yellow-500',
    colorGlow: '#fef9c3',
    symbol: '📜'
  },
  golden_key: {
    id: 'golden_key',
    name: { en: 'Golden Key', tr: 'Altın Anahtar' },
    tier: 3,
    category: 'magic',
    description: {
      en: 'An ornate key that unlocks the deepest sanctuary gates.',
      tr: 'En gizli mabet kapılarını açan işlemeli altın anahtar.'
    },
    iconName: 'golden_key',
    colorBg: 'bg-amber-100',
    colorBorder: 'border-amber-500',
    colorGlow: '#fde68a',
    symbol: '🗝️'
  },
  spirit_lantern: {
    id: 'spirit_lantern',
    name: { en: 'Spirit Lantern', tr: 'Ruh Feneri' },
    tier: 2,
    category: 'magic',
    description: {
      en: 'A soft candle flame that guides travelers through the mist.',
      tr: 'Siste yolculara rehberlik eden huzurlu bir ruh mumu.'
    },
    iconName: 'spirit_lantern',
    colorBg: 'bg-orange-100',
    colorBorder: 'border-orange-400',
    colorGlow: '#fed7aa',
    symbol: '🕯️'
  },
  elder_rune: {
    id: 'elder_rune',
    name: { en: 'Elder Rune', tr: 'Kadim Rün' },
    tier: 3,
    category: 'magic',
    description: {
      en: 'An ancient stone totem humming with eternal nature power.',
      tr: 'Sonsuz doğa gücüyle titreşen kadim bir rün taşı.'
    },
    iconName: 'elder_rune',
    colorBg: 'bg-stone-100',
    colorBorder: 'border-stone-500',
    colorGlow: '#e7e5e4',
    symbol: '🗿'
  },

  // World 10: Master Garden
  master_lotus: {
    id: 'master_lotus',
    name: { en: 'Master Lotus', tr: 'Usta Nilüferi' },
    tier: 4,
    category: 'magic',
    description: {
      en: 'A supreme blossom that represents pure harmonic perfection.',
      tr: 'Saf uyum ve kusursuzluğu simgeleyen yüce bir nilüfer çiçeği.'
    },
    iconName: 'master_lotus',
    colorBg: 'bg-pink-100',
    colorBorder: 'border-pink-500',
    colorGlow: '#fbcfe8',
    symbol: '🪷'
  },
  golden_clover: {
    id: 'golden_clover',
    name: { en: 'Golden Clover', tr: 'Altın Dört Yaprak' },
    tier: 4,
    category: 'nature',
    description: {
      en: 'A legendary four-leaf clover blessed with ultimate fortune.',
      tr: 'Nihai şansla kutsanmış efsanevi dört yapraklı altın yonca.'
    },
    iconName: 'golden_clover',
    colorBg: 'bg-emerald-100',
    colorBorder: 'border-emerald-500',
    colorGlow: '#a7f3d0',
    symbol: '🍀'
  },
  phoenix_bloom: {
    id: 'phoenix_bloom',
    name: { en: 'Phoenix Bloom', tr: 'Anka Çiçeği' },
    tier: 4,
    category: 'magic',
    description: {
      en: 'A fiery blossom that re-emerges more glorious every dawn.',
      tr: 'Her şafakta daha görkemli doğan alev renkli anka çiçeği.'
    },
    iconName: 'phoenix_bloom',
    colorBg: 'bg-red-100',
    colorBorder: 'border-red-500',
    colorGlow: '#fecaca',
    symbol: '🔥'
  },
  celestial_crown: {
    id: 'celestial_crown',
    name: { en: 'Master Crown', tr: 'Şampiyon Tacı' },
    tier: 5,
    category: 'magic',
    description: {
      en: 'The coveted crown awarded only to the grand master of Tile Story.',
      tr: 'Yalnızca Tile Story büyük ustasına verilen şampiyonluk tacı.'
    },
    iconName: 'celestial_crown',
    colorBg: 'bg-amber-100',
    colorBorder: 'border-amber-500',
    colorGlow: '#fef08a',
    symbol: '👑'
  },
  eternity_seed: {
    id: 'eternity_seed',
    name: { en: 'Eternity Seed', tr: 'Sonsuzluk Tohumu' },
    tier: 5,
    category: 'nature',
    description: {
      en: 'The mythical seed of creation from which all gardens blossom.',
      tr: 'Tüm bahçelerin doğduğu efsanevi evrensel sonsuzluk tohumu.'
    },
    iconName: 'eternity_seed',
    colorBg: 'bg-yellow-100',
    colorBorder: 'border-yellow-500',
    colorGlow: '#fef9c3',
    symbol: '✨'
  }
};
