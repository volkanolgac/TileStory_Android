import { Recipe } from '../types/game';

export const RECIPES: Recipe[] = [
  // 3-of-a-kind Basic Progressions
  {
    id: 'r_sprout',
    inputs: ['seed', 'seed', 'seed'],
    output: 'sprout',
    name: { en: '3 Seeds → Sprout', tr: '3 Tohum → Filiz' }
  },
  {
    id: 'r_flower',
    inputs: ['sprout', 'sprout', 'sprout'],
    output: 'flower',
    name: { en: '3 Sprouts → Flower', tr: '3 Filiz → Çiçek' }
  },
  {
    id: 'r_large_flower',
    inputs: ['flower', 'flower', 'flower'],
    output: 'large_flower',
    name: { en: '3 Flowers → Large Flower', tr: '3 Çiçek → Büyük Çiçek' }
  },
  {
    id: 'r_puddle',
    inputs: ['water_drop', 'water_drop', 'water_drop'],
    output: 'puddle',
    name: { en: '3 Water Drops → Puddle', tr: '3 Su Damlası → Su Birikintisi' }
  },
  {
    id: 'r_pond',
    inputs: ['puddle', 'puddle', 'puddle'],
    output: 'pond',
    name: { en: '3 Puddles → Pond', tr: '3 Su Birikintisi → Gölet' }
  },
  {
    id: 'r_garden_pond',
    inputs: ['pond', 'pond', 'pond'],
    output: 'garden_pond',
    name: { en: '3 Ponds → Garden Pond', tr: '3 Gölet → Büyük Bahçe Göleti' }
  },
  {
    id: 'r_sunbeam',
    inputs: ['sun', 'sun', 'sun'],
    output: 'sunbeam',
    name: { en: '3 Sun Rays → Sunbeam', tr: '3 Güneş → Güneş Işığı' }
  },
  {
    id: 'r_bush',
    inputs: ['leaf', 'leaf', 'leaf'],
    output: 'bush',
    name: { en: '3 Leaves → Bush', tr: '3 Yaprak → Çalı' }
  },
  {
    id: 'r_tree_from_bushes',
    inputs: ['bush', 'bush', 'bush'],
    output: 'tree',
    name: { en: '3 Bushes → Tree', tr: '3 Çalı → Ağaç' }
  },
  {
    id: 'r_large_tree',
    inputs: ['tree', 'tree', 'tree'],
    output: 'large_tree',
    name: { en: '3 Trees → Large Tree', tr: '3 Ağaç → Ulu Ağaç' }
  },
  {
    id: 'r_beehive',
    inputs: ['bee', 'bee', 'bee'],
    output: 'beehive',
    name: { en: '3 Bees → Beehive', tr: '3 Arı → Arı Kovanı' }
  },
  {
    id: 'r_small_rock',
    inputs: ['stone', 'stone', 'stone'],
    output: 'small_rock',
    name: { en: '3 Stones → Small Rock', tr: '3 Taş → Küçük Kaya' }
  },
  {
    id: 'r_cloud_rain',
    inputs: ['cloud', 'cloud', 'cloud'],
    output: 'rain_cloud',
    name: { en: '3 Clouds → Rain Cloud', tr: '3 Bulut → Yağmur Bulutu' }
  },
  {
    id: 'r_rain_cloud_rainbow',
    inputs: ['rain_cloud', 'rain_cloud', 'rain_cloud'],
    output: 'rainbow',
    name: { en: '3 Rain Clouds → Rainbow', tr: '3 Yağmur Bulutu → Gökkuşağı' }
  },
  {
    id: 'r_sunbeam_rainbow',
    inputs: ['sunbeam', 'sunbeam', 'sunbeam'],
    output: 'rainbow',
    name: { en: '3 Sunbeams → Rainbow', tr: '3 Güneş Işığı → Gökkuşağı' }
  },
  {
    id: 'r_caterpillar_cocoon',
    inputs: ['caterpillar', 'caterpillar', 'caterpillar'],
    output: 'cocoon',
    name: { en: '3 Caterpillars → Cocoon', tr: '3 Tırtıl → Koza' }
  },
  {
    id: 'r_cocoon_butterfly',
    inputs: ['cocoon', 'cocoon', 'cocoon'],
    output: 'butterfly',
    name: { en: '3 Cocoons → Butterfly', tr: '3 Koza → Kelebek' }
  },
  {
    id: 'r_berry_jam',
    inputs: ['berry', 'berry', 'berry'],
    output: 'jam',
    name: { en: '3 Berries → Berry Jam', tr: '3 Böğürtlen → Reçel' }
  },
  {
    id: 'r_apple_pie',
    inputs: ['apple', 'apple', 'apple'],
    output: 'apple_pie',
    name: { en: '3 Apples → Apple Pie', tr: '3 Elma → Elmalı Turta' }
  },
  {
    id: 'r_mushroom_fairy_ring',
    inputs: ['mushroom', 'mushroom', 'mushroom'],
    output: 'fairy_ring',
    name: { en: '3 Mushrooms → Fairy Ring', tr: '3 Mantar → Peri Halkası' }
  },
  {
    id: 'r_honeycomb_beehive',
    inputs: ['honeycomb', 'honeycomb', 'honeycomb'],
    output: 'beehive',
    name: { en: '3 Honeycombs → Beehive', tr: '3 Petek → Arı Kovanı' }
  },

  // World 3-10 Progressions & Combinations
  {
    id: 'r_seashell_pearl',
    inputs: ['seashell', 'seashell', 'seashell'],
    output: 'pearl',
    name: { en: '3 Seashells → Pearl', tr: '3 Deniz Kabuğu → İnci' }
  },
  {
    id: 'r_wheat_bread',
    inputs: ['wheat', 'wheat', 'wheat'],
    output: 'bread',
    name: { en: '3 Wheat → Fresh Bread', tr: '3 Buğday → Taze Ekmek' }
  },
  {
    id: 'r_magic_potion_wand',
    inputs: ['magic_potion', 'magic_potion', 'magic_potion'],
    output: 'magic_wand',
    name: { en: '3 Potions → Magic Wand', tr: '3 İksir → Sihirli Asa' }
  },
  {
    id: 'r_snowflake_ice_crystal',
    inputs: ['snowflake', 'snowflake', 'snowflake'],
    output: 'ice_crystal',
    name: { en: '3 Snowflakes → Ice Crystal', tr: '3 Kar Tanesi → Buz Kristali' }
  },
  {
    id: 'r_ice_crystal_hot_spring',
    inputs: ['ice_crystal', 'ice_crystal', 'ice_crystal'],
    output: 'hot_spring',
    name: { en: '3 Ice Crystals → Hot Spring', tr: '3 Buz Kristali → Kaplıca' }
  },
  {
    id: 'r_feather_starlight',
    inputs: ['feather', 'feather', 'feather'],
    output: 'starlight',
    name: { en: '3 Sky Feathers → Starlight', tr: '3 Tüy → Yıldız Işığı' }
  },
  {
    id: 'r_starlight_sun_crystal',
    inputs: ['starlight', 'starlight', 'starlight'],
    output: 'sun_crystal',
    name: { en: '3 Starlights → Solar Prism', tr: '3 Yıldız Işığı → Güneş Prizması' }
  },
  {
    id: 'r_planet_nebula',
    inputs: ['planet', 'planet', 'planet'],
    output: 'nebula_orb',
    name: { en: '3 Mini Planets → Nebula Orb', tr: '3 Gezegen → Bulutsu Küresi' }
  },
  {
    id: 'r_scroll_golden_key',
    inputs: ['mystic_scroll', 'mystic_scroll', 'mystic_scroll'],
    output: 'golden_key',
    name: { en: '3 Scrolls → Golden Key', tr: '3 Parşömen → Altın Anahtar' }
  },
  {
    id: 'r_master_lotus_crown',
    inputs: ['master_lotus', 'master_lotus', 'master_lotus'],
    output: 'celestial_crown',
    name: { en: '3 Master Lotuses → Master Crown', tr: '3 Usta Nilüferi → Şampiyon Tacı' }
  },
  {
    id: 'r_golden_clover_eternity',
    inputs: ['golden_clover', 'golden_clover', 'golden_clover'],
    output: 'eternity_seed',
    name: { en: '3 Golden Clovers → Eternity Seed', tr: '3 Altın Yonca → Sonsuzluk Tohumu' }
  },

  // Special Combinations and Cross-Element Interactions!
  {
    id: 'r_honey_interaction',
    inputs: ['flower', 'bee'],
    output: 'honey',
    isSpecialInteraction: true,
    name: { en: 'Flower + Bee → Honey', tr: 'Çiçek + Arı → Bal' }
  },
  {
    id: 'r_nature_trinity_tree',
    inputs: ['seed', 'water_drop', 'sun'],
    output: 'tree',
    isSpecialInteraction: true,
    name: { en: 'Seed + Water + Sun → Tree', tr: 'Tohum + Su + Güneş → Ağaç' }
  },
  {
    id: 'r_fruit_tree',
    inputs: ['tree', 'sunbeam'],
    output: 'fruit_tree',
    isSpecialInteraction: true,
    name: { en: 'Tree + Sunbeam → Fruit Tree', tr: 'Ağaç + Güneş Işığı → Meyve Ağacı' }
  },
  {
    id: 'r_butterfly_garden',
    inputs: ['flower', 'beehive'],
    output: 'butterfly_garden',
    isSpecialInteraction: true,
    name: { en: 'Flower + Beehive → Butterfly Garden', tr: 'Çiçek + Kovan → Kelebek Bahçesi' }
  },
  {
    id: 'r_flower_house',
    inputs: ['large_tree', 'large_flower'],
    output: 'flower_house',
    isSpecialInteraction: true,
    name: { en: 'Large Tree + Large Flower → Flower House', tr: 'Ulu Ağaç + Büyük Çiçek → Çiçek Evi' }
  },
  {
    id: 'r_magical_tree',
    inputs: ['large_tree', 'sunbeam', 'pond'],
    output: 'magical_tree',
    isSpecialInteraction: true,
    name: { en: 'Large Tree + Sunbeam + Pond → Magical Tree', tr: 'Ulu Ağaç + Güneş Işığı + Gölet → Sihirli Ağaç' }
  },
  {
    id: 'r_fairy_garden',
    inputs: ['butterfly_garden', 'flower_house'],
    output: 'fairy_garden',
    isSpecialInteraction: true,
    name: { en: 'Butterfly Garden + Flower House → Fairy Garden', tr: 'Kelebek Bahçesi + Çiçek Evi → Peri Bahçesi' }
  }
];

/**
 * Checks if a collection of tile IDs matches any recipe.
 * Returns the matching recipe if found.
 */
export function findMatchingRecipe(tileIds: string[]): Recipe | null {
  if (tileIds.length < 2) return null;

  const sortedInput = [...tileIds].sort();

  for (const recipe of RECIPES) {
    if (recipe.inputs.length !== sortedInput.length) continue;
    const sortedRecipeInputs = [...recipe.inputs].sort();

    const matches = sortedRecipeInputs.every((val, index) => val === sortedInput[index]);
    if (matches) {
      return recipe;
    }
  }

  // Universal 3-of-a-kind fallback: if 3 identical tiles are selected
  if (sortedInput.length === 3 && sortedInput[0] === sortedInput[1] && sortedInput[1] === sortedInput[2]) {
    const single = sortedInput[0];
    return {
      id: `universal_${single}`,
      inputs: [single, single, single],
      output: single === 'seed' ? 'sprout' : single === 'sprout' ? 'flower' : single === 'flower' ? 'large_flower' : 'golden_flower',
      name: { en: `3 ${single} → Evolved`, tr: `3 ${single} → Gelişmiş Öğe` }
    };
  }

  return null;
}

/**
 * Finds if there is any potential recipe that could be completed with the current dock/board
 */
export function findPotentialRecipe(currentTileIds: string[]): Recipe | null {
  if (currentTileIds.length === 0) return null;

  for (const recipe of RECIPES) {
    // If every item in currentTileIds is part of this recipe
    const needed = [...recipe.inputs];
    let possible = true;
    for (const t of currentTileIds) {
      const idx = needed.indexOf(t);
      if (idx !== -1) {
        needed.splice(idx, 1);
      } else {
        possible = false;
        break;
      }
    }
    if (possible && needed.length > 0) {
      return recipe;
    }
  }
  return null;
}
