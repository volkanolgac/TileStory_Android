import { LevelConfig, BoardShapeType, BoardTile } from '../types/game';

export interface BoardCoord {
  r: number;
  c: number;
  l: number; // Layer: 0 = foundation, 1 = middle tier, 2 = summit tier, 3 = apex
}

// Multi-layer Mahjong Tower Coordinate Patterns (Deep stacking up to 6 layers)
export interface BoardPillar {
  r: number;
  c: number;
  maxL: number;
}

export const SHAPE_PILLARS: Record<BoardShapeType, BoardPillar[]> = {
  pyramid: [],
  clover: [
    { r: 1.5, c: 2.0, maxL: 5 },
    { r: 1.5, c: 3.0, maxL: 5 },
    { r: 2.5, c: 2.0, maxL: 5 },
    { r: 2.5, c: 3.0, maxL: 5 },
    { r: 0.5, c: 2.5, maxL: 3 },
    { r: 3.5, c: 2.5, maxL: 3 },
    { r: 2.0, c: 1.0, maxL: 3 },
    { r: 2.0, c: 4.0, maxL: 3 },
    { r: 0.5, c: 1.5, maxL: 1 },
    { r: 0.5, c: 3.5, maxL: 1 },
    { r: 3.5, c: 1.5, maxL: 1 },
    { r: 3.5, c: 3.5, maxL: 1 },
    { r: 4.5, c: 2.5, maxL: 1 }
  ],
  flower: [
    { r: 2.0, c: 2.5, maxL: 5 },
    { r: 1.5, c: 2.0, maxL: 4 },
    { r: 1.5, c: 3.0, maxL: 4 },
    { r: 2.5, c: 2.0, maxL: 4 },
    { r: 2.5, c: 3.0, maxL: 4 },
    { r: 0.5, c: 2.5, maxL: 2 },
    { r: 2.0, c: 1.0, maxL: 2 },
    { r: 2.0, c: 4.0, maxL: 2 },
    { r: 3.5, c: 2.5, maxL: 2 },
    { r: 1.0, c: 1.0, maxL: 1 },
    { r: 1.0, c: 4.0, maxL: 1 },
    { r: 3.0, c: 1.0, maxL: 1 },
    { r: 3.0, c: 4.0, maxL: 1 },
    { r: 4.5, c: 2.5, maxL: 1 }
  ],
  heart: [
    { r: 2.0, c: 2.5, maxL: 5 },
    { r: 1.5, c: 2.0, maxL: 4 },
    { r: 1.5, c: 3.0, maxL: 4 },
    { r: 2.5, c: 2.5, maxL: 4 },
    { r: 1.0, c: 1.5, maxL: 3 },
    { r: 1.0, c: 3.5, maxL: 3 },
    { r: 3.0, c: 2.5, maxL: 2 },
    { r: 0.5, c: 1.0, maxL: 1 },
    { r: 0.5, c: 4.0, maxL: 1 },
    { r: 2.0, c: 0.5, maxL: 1 },
    { r: 2.0, c: 4.5, maxL: 1 },
    { r: 4.0, c: 2.5, maxL: 1 }
  ],
  island: [
    { r: 2.0, c: 2.5, maxL: 5 },
    { r: 2.0, c: 1.5, maxL: 4 },
    { r: 2.0, c: 3.5, maxL: 4 },
    { r: 1.0, c: 2.0, maxL: 3 },
    { r: 1.0, c: 3.0, maxL: 3 },
    { r: 3.0, c: 2.0, maxL: 2 },
    { r: 3.0, c: 3.0, maxL: 2 },
    { r: 0.5, c: 1.0, maxL: 1 },
    { r: 0.5, c: 4.0, maxL: 1 },
    { r: 3.5, c: 1.0, maxL: 1 },
    { r: 3.5, c: 4.0, maxL: 1 }
  ],
  cloud: [
    { r: 1.5, c: 2.5, maxL: 5 },
    { r: 2.0, c: 2.0, maxL: 4 },
    { r: 2.0, c: 3.0, maxL: 4 },
    { r: 2.0, c: 1.0, maxL: 3 },
    { r: 2.0, c: 4.0, maxL: 3 },
    { r: 1.0, c: 2.0, maxL: 2 },
    { r: 1.0, c: 3.0, maxL: 2 },
    { r: 2.5, c: 1.5, maxL: 1 },
    { r: 2.5, c: 3.5, maxL: 1 },
    { r: 1.5, c: 0.5, maxL: 1 },
    { r: 1.5, c: 4.5, maxL: 1 }
  ],
  tree: [
    { r: 1.5, c: 2.5, maxL: 5 },
    { r: 2.5, c: 2.5, maxL: 5 },
    { r: 1.5, c: 1.5, maxL: 4 },
    { r: 1.5, c: 3.5, maxL: 4 },
    { r: 0.5, c: 2.5, maxL: 3 },
    { r: 2.5, c: 1.5, maxL: 2 },
    { r: 2.5, c: 3.5, maxL: 2 },
    { r: 3.5, c: 2.5, maxL: 1 },
    { r: 4.5, c: 2.5, maxL: 1 },
    { r: 0.5, c: 1.5, maxL: 1 },
    { r: 0.5, c: 3.5, maxL: 1 }
  ],
  butterfly: [
    { r: 2.0, c: 2.5, maxL: 5 },
    { r: 1.0, c: 2.5, maxL: 4 },
    { r: 3.0, c: 2.5, maxL: 4 },
    { r: 1.5, c: 1.5, maxL: 3 },
    { r: 1.5, c: 3.5, maxL: 3 },
    { r: 2.5, c: 1.5, maxL: 3 },
    { r: 2.5, c: 3.5, maxL: 3 },
    { r: 0.5, c: 0.5, maxL: 1 },
    { r: 0.5, c: 4.5, maxL: 1 },
    { r: 3.5, c: 0.5, maxL: 1 },
    { r: 3.5, c: 4.5, maxL: 1 }
  ],
  spiral: [
    { r: 2.0, c: 2.5, maxL: 5 },
    { r: 1.5, c: 2.5, maxL: 4 },
    { r: 2.5, c: 2.5, maxL: 4 },
    { r: 1.5, c: 1.5, maxL: 3 },
    { r: 2.5, c: 3.5, maxL: 3 },
    { r: 3.0, c: 2.0, maxL: 2 },
    { r: 1.0, c: 3.0, maxL: 2 },
    { r: 0.5, c: 1.0, maxL: 1 },
    { r: 3.5, c: 4.0, maxL: 1 },
    { r: 0.5, c: 4.0, maxL: 1 },
    { r: 3.5, c: 1.0, maxL: 1 }
  ],
  house: [
    { r: 1.5, c: 2.5, maxL: 5 },
    { r: 2.5, c: 2.5, maxL: 5 },
    { r: 1.5, c: 1.5, maxL: 4 },
    { r: 1.5, c: 3.5, maxL: 4 },
    { r: 2.5, c: 1.5, maxL: 3 },
    { r: 2.5, c: 3.5, maxL: 3 },
    { r: 0.5, c: 2.5, maxL: 2 },
    { r: 3.5, c: 1.5, maxL: 1 },
    { r: 3.5, c: 2.5, maxL: 1 },
    { r: 3.5, c: 3.5, maxL: 1 }
  ]
};

// Generate full BoardCoord[] flat patterns from SHAPE_PILLARS for compatibility
export const BOARD_PATTERNS: Record<BoardShapeType, BoardCoord[]> = Object.entries(SHAPE_PILLARS).reduce(
  (acc, [shape, pillars]) => {
    const coords: BoardCoord[] = [];
    pillars.forEach((p) => {
      for (let l = 0; l <= p.maxL; l++) {
        coords.push({ r: p.r, c: p.c, l });
      }
    });
    acc[shape as BoardShapeType] = coords;
    return acc;
  },
  {} as Record<BoardShapeType, BoardCoord[]>
);

/**
 * 4-Tier 3D Mahjong Pyramid:
 * - Layer 0 (Base): 48 tiles
 * - Layer 1 (Mid): 27 tiles
 * - Layer 2 (High): 15 tiles
 * - Layer 3 (Apex): 6 tiles
 * Total = 96 figures (exact 32 triplets of 3 matching figures)
 */
export function getPyramidCoordinates(): BoardCoord[] {
  const coords: BoardCoord[] = [];

  // Layer 0: Ground (48 tiles: 6 rows x 8 columns)
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 8; c++) {
      coords.push({ r, c, l: 0 });
    }
  }

  // Layer 1: Over Ground (27 tiles)
  const l1Rows = [
    { r: 0.5, cols: [1.5, 2.5, 3.5, 4.5, 5.5] },
    { r: 1.5, cols: [1.0, 2.0, 3.0, 4.0, 5.0, 6.0] },
    { r: 2.5, cols: [1.5, 2.5, 3.5, 4.5, 5.5] },
    { r: 3.5, cols: [1.0, 2.0, 3.0, 4.0, 5.0, 6.0] },
    { r: 4.5, cols: [1.5, 2.5, 3.5, 4.5, 5.5] }
  ];
  for (const row of l1Rows) {
    for (const c of row.cols) {
      coords.push({ r: row.r, c, l: 1 });
    }
  }

  // Layer 2: Over Layer 1 (15 tiles)
  const l2Rows = [1.5, 2.5, 3.5];
  const l2Cols = [1.5, 2.5, 3.5, 4.5, 5.5];
  for (const r of l2Rows) {
    for (const c of l2Cols) {
      coords.push({ r, c, l: 2 });
    }
  }

  // Layer 3: Top summit (6 tiles)
  const l3Rows = [2.0, 3.0];
  const l3Cols = [2.5, 3.5, 4.5];
  for (const r of l3Rows) {
    for (const c of l3Cols) {
      coords.push({ r, c, l: 3 });
    }
  }

  return coords; // 48 + 27 + 15 + 6 = 96
}

function getFlowerCoordinates(): BoardCoord[] {
  const coords: BoardCoord[] = [];
  // Layer 0: Blossom perimeter (48 tiles)
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 8; c++) {
      if ((r === 0 || r === 5) && (c < 1 || c > 6)) continue;
      coords.push({ r, c, l: 0 });
    }
  }
  while (coords.length < 48) {
    coords.push({ r: 2.5, c: coords.length % 8, l: 0 });
  }
  if (coords.length > 48) coords.length = 48;

  // Layer 1: Inner Petals (27 tiles)
  for (let r = 1; r <= 4; r++) {
    for (let c = 1.5; c <= 5.5; c += 1) {
      coords.push({ r, c, l: 1 });
      if (coords.length === 48 + 27) break;
    }
    if (coords.length === 48 + 27) break;
  }
  while (coords.length < 48 + 27) {
    coords.push({ r: 2.5, c: 2.5 + (coords.length % 3), l: 1 });
  }

  // Layer 2: Floral Crown (15 tiles)
  for (let r = 1.5; r <= 3.5; r += 1) {
    for (let c = 2.0; c <= 4.5; c += 0.8) {
      coords.push({ r: Math.round(r * 10) / 10, c: Math.round(c * 10) / 10, l: 2 });
      if (coords.length === 48 + 27 + 15) break;
    }
    if (coords.length === 48 + 27 + 15) break;
  }
  while (coords.length < 48 + 27 + 15) {
    coords.push({ r: 2.5, c: 3.5, l: 2 });
  }

  // Layer 3: Pistil Core (6 tiles)
  const l3 = [
    { r: 2.0, c: 3.0 }, { r: 2.0, c: 4.0 },
    { r: 2.5, c: 3.5 }, { r: 3.0, c: 3.0 },
    { r: 3.0, c: 4.0 }, { r: 2.5, c: 2.5 }
  ];
  l3.forEach(pt => coords.push({ r: pt.r, c: pt.c, l: 3 }));

  return coords.slice(0, 96);
}

function getCloverCoordinates(): BoardCoord[] {
  const coords: BoardCoord[] = [];
  // Layer 0: 4 Leaf nodes (48 tiles)
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 8; c++) {
      if ((r === 0 || r === 5) && (c === 0 || c === 7 || c === 3 || c === 4)) continue;
      coords.push({ r, c, l: 0 });
    }
  }
  while (coords.length < 48) coords.push({ r: 2.5, c: coords.length % 8, l: 0 });
  coords.length = 48;

  // Layer 1: 4 Inner Clovers (27 tiles)
  for (let r = 1; r <= 4; r++) {
    for (let c = 1.5; c <= 5.5; c += 1) {
      coords.push({ r, c, l: 1 });
      if (coords.length === 48 + 27) break;
    }
    if (coords.length === 48 + 27) break;
  }
  while (coords.length < 48 + 27) coords.push({ r: 2.5, c: 3.5, l: 1 });

  // Layer 2: Core Clover (15 tiles)
  for (let r = 1.5; r <= 3.5; r += 1) {
    for (let c = 2.0; c <= 5.0; c += 1) {
      coords.push({ r, c, l: 2 });
      if (coords.length === 48 + 27 + 15) break;
    }
    if (coords.length === 48 + 27 + 15) break;
  }
  while (coords.length < 48 + 27 + 15) coords.push({ r: 2.5, c: 3.5, l: 2 });

  // Layer 3: Lucky Gem (6 tiles)
  const l3 = [
    { r: 2.0, c: 3.0 }, { r: 2.0, c: 4.0 },
    { r: 2.5, c: 2.5 }, { r: 2.5, c: 4.5 },
    { r: 3.0, c: 3.0 }, { r: 3.0, c: 4.0 }
  ];
  l3.forEach(pt => coords.push({ r: pt.r, c: pt.c, l: 3 }));

  return coords.slice(0, 96);
}

function getHeartCoordinates(): BoardCoord[] {
  const coords: BoardCoord[] = [];
  // Layer 0: Heart contour (48 tiles)
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 8; c++) {
      if (r === 0 && (c === 0 || c === 3 || c === 4 || c === 7)) continue;
      if (r === 4 && (c < 1 || c > 6)) continue;
      if (r === 5 && (c < 2 || c > 5)) continue;
      coords.push({ r, c, l: 0 });
    }
  }
  while (coords.length < 48) coords.push({ r: 2.5, c: coords.length % 8, l: 0 });
  coords.length = 48;

  // Layer 1: Mid Heart (27 tiles)
  for (let r = 1; r <= 4; r++) {
    for (let c = 1.5; c <= 5.5; c += 1) {
      if (r === 4 && (c < 2 || c > 5)) continue;
      coords.push({ r, c, l: 1 });
      if (coords.length === 48 + 27) break;
    }
    if (coords.length === 48 + 27) break;
  }
  while (coords.length < 48 + 27) coords.push({ r: 2.5, c: 3.5, l: 1 });

  // Layer 2: Inner Heart (15 tiles)
  for (let r = 1.5; r <= 3.5; r += 1) {
    for (let c = 2.0; c <= 5.0; c += 1) {
      coords.push({ r, c, l: 2 });
      if (coords.length === 48 + 27 + 15) break;
    }
    if (coords.length === 48 + 27 + 15) break;
  }
  while (coords.length < 48 + 27 + 15) coords.push({ r: 2.5, c: 3.5, l: 2 });

  // Layer 3: Heart Crest (6 tiles)
  const l3 = [
    { r: 1.5, c: 2.5 }, { r: 1.5, c: 4.5 },
    { r: 2.5, c: 3.0 }, { r: 2.5, c: 4.0 },
    { r: 3.0, c: 3.5 }, { r: 2.0, c: 3.5 }
  ];
  l3.forEach(pt => coords.push({ r: pt.r, c: pt.c, l: 3 }));

  return coords.slice(0, 96);
}

function getTreeCoordinates(): BoardCoord[] {
  const coords: BoardCoord[] = [];
  // Layer 0: Canopy (r:0..3, cols:0..7) + Trunk (r:4..5, cols:2..5)
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 8; c++) {
      if (r >= 4 && (c < 2 || c > 5)) continue;
      if (r === 0 && (c === 0 || c === 7)) continue;
      coords.push({ r, c, l: 0 });
    }
  }
  while (coords.length < 48) coords.push({ r: 2.5, c: coords.length % 8, l: 0 });
  coords.length = 48;

  // Layer 1: Mid Canopy & Trunk Core (27 tiles)
  for (let r = 1; r <= 4; r++) {
    for (let c = 1.5; c <= 5.5; c += 1) {
      coords.push({ r, c, l: 1 });
      if (coords.length === 48 + 27) break;
    }
    if (coords.length === 48 + 27) break;
  }
  while (coords.length < 48 + 27) coords.push({ r: 2.5, c: 3.5, l: 1 });

  // Layer 2: Canopy Crown (15 tiles)
  for (let r = 1.0; r <= 3.0; r += 1) {
    for (let c = 2.0; c <= 5.0; c += 1) {
      coords.push({ r, c, l: 2 });
      if (coords.length === 48 + 27 + 15) break;
    }
    if (coords.length === 48 + 27 + 15) break;
  }
  while (coords.length < 48 + 27 + 15) coords.push({ r: 2.0, c: 3.5, l: 2 });

  // Layer 3: Crown Peak (6 tiles)
  const l3 = [
    { r: 1.0, c: 3.5 }, { r: 1.5, c: 3.0 },
    { r: 1.5, c: 4.0 }, { r: 2.0, c: 3.5 },
    { r: 2.5, c: 3.0 }, { r: 2.5, c: 4.0 }
  ];
  l3.forEach(pt => coords.push({ r: pt.r, c: pt.c, l: 3 }));

  return coords.slice(0, 96);
}

function getCloudCoordinates(): BoardCoord[] {
  const coords: BoardCoord[] = [];
  // Layer 0: Billow puffs (48 tiles)
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 8; c++) {
      if (r === 0 && (c < 2 || c > 5)) continue;
      if (r === 5 && (c < 1 || c > 6)) continue;
      coords.push({ r, c, l: 0 });
    }
  }
  while (coords.length < 48) coords.push({ r: 2.5, c: coords.length % 8, l: 0 });
  coords.length = 48;

  // Layer 1: Cloud Body (27 tiles)
  for (let r = 1; r <= 4; r++) {
    for (let c = 1.0; c <= 6.0; c += 1) {
      coords.push({ r, c, l: 1 });
      if (coords.length === 48 + 27) break;
    }
    if (coords.length === 48 + 27) break;
  }
  while (coords.length < 48 + 27) coords.push({ r: 2.5, c: 3.5, l: 1 });

  // Layer 2: Silver Dome (15 tiles)
  for (let r = 1.5; r <= 3.5; r += 1) {
    for (let c = 2.0; c <= 5.0; c += 1) {
      coords.push({ r, c, l: 2 });
      if (coords.length === 48 + 27 + 15) break;
    }
    if (coords.length === 48 + 27 + 15) break;
  }
  while (coords.length < 48 + 27 + 15) coords.push({ r: 2.5, c: 3.5, l: 2 });

  // Layer 3: Sunbeam Crest (6 tiles)
  const l3 = [
    { r: 1.5, c: 2.5 }, { r: 1.5, c: 3.5 }, { r: 1.5, c: 4.5 },
    { r: 2.5, c: 2.5 }, { r: 2.5, c: 3.5 }, { r: 2.5, c: 4.5 }
  ];
  l3.forEach(pt => coords.push({ r: pt.r, c: pt.c, l: 3 }));

  return coords.slice(0, 96);
}

function getButterflyCoordinates(): BoardCoord[] {
  const coords: BoardCoord[] = [];
  // Layer 0: Symmetrical Wings & Spine (48 tiles)
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 8; c++) {
      if ((r === 0 || r === 5) && (c === 3 || c === 4)) continue;
      coords.push({ r, c, l: 0 });
    }
  }
  while (coords.length < 48) coords.push({ r: 2.5, c: coords.length % 8, l: 0 });
  coords.length = 48;

  // Layer 1: Inner Wing Pads (27 tiles)
  for (let r = 1; r <= 4; r++) {
    for (let c = 1.0; c <= 6.0; c += 1) {
      coords.push({ r, c, l: 1 });
      if (coords.length === 48 + 27) break;
    }
    if (coords.length === 48 + 27) break;
  }
  while (coords.length < 48 + 27) coords.push({ r: 2.5, c: 3.5, l: 1 });

  // Layer 2: Thorax & Wing Eyes (15 tiles)
  for (let r = 1.5; r <= 3.5; r += 1) {
    for (let c = 1.5; c <= 5.5; c += 1) {
      coords.push({ r, c, l: 2 });
      if (coords.length === 48 + 27 + 15) break;
    }
    if (coords.length === 48 + 27 + 15) break;
  }
  while (coords.length < 48 + 27 + 15) coords.push({ r: 2.5, c: 3.5, l: 2 });

  // Layer 3: Antennae Spire (6 tiles)
  const l3 = [
    { r: 1.0, c: 2.5 }, { r: 1.0, c: 4.5 },
    { r: 2.0, c: 3.5 }, { r: 3.0, c: 3.5 },
    { r: 2.5, c: 2.0 }, { r: 2.5, c: 5.0 }
  ];
  l3.forEach(pt => coords.push({ r: pt.r, c: pt.c, l: 3 }));

  return coords.slice(0, 96);
}

function getIslandCoordinates(): BoardCoord[] {
  const coords: BoardCoord[] = [];
  // Layer 0: Shoreline (48 tiles)
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 8; c++) {
      if ((r === 0 || r === 5) && (c < 2 || c > 5)) continue;
      coords.push({ r, c, l: 0 });
    }
  }
  while (coords.length < 48) coords.push({ r: 2.5, c: coords.length % 8, l: 0 });
  coords.length = 48;

  // Layer 1: Island Plateau (27 tiles)
  for (let r = 1; r <= 4; r++) {
    for (let c = 1.5; c <= 5.5; c += 1) {
      coords.push({ r, c, l: 1 });
      if (coords.length === 48 + 27) break;
    }
    if (coords.length === 48 + 27) break;
  }
  while (coords.length < 48 + 27) coords.push({ r: 2.5, c: 3.5, l: 1 });

  // Layer 2: Island Mountain Ridge (15 tiles)
  for (let r = 1.5; r <= 3.5; r += 1) {
    for (let c = 2.0; c <= 5.0; c += 1) {
      coords.push({ r, c, l: 2 });
      if (coords.length === 48 + 27 + 15) break;
    }
    if (coords.length === 48 + 27 + 15) break;
  }
  while (coords.length < 48 + 27 + 15) coords.push({ r: 2.5, c: 3.5, l: 2 });

  // Layer 3: Peak Beacon (6 tiles)
  const l3 = [
    { r: 2.0, c: 2.5 }, { r: 2.0, c: 3.5 }, { r: 2.0, c: 4.5 },
    { r: 3.0, c: 2.5 }, { r: 3.0, c: 3.5 }, { r: 3.0, c: 4.5 }
  ];
  l3.forEach(pt => coords.push({ r: pt.r, c: pt.c, l: 3 }));

  return coords.slice(0, 96);
}

function getSpiralCoordinates(): BoardCoord[] {
  const coords: BoardCoord[] = [];
  // Layer 0: Spiral vortex path (48 tiles)
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 8; c++) {
      coords.push({ r, c, l: 0 });
    }
  }
  coords.length = 48;

  // Layer 1: Mid swirl (27 tiles)
  for (let r = 1; r <= 4; r++) {
    for (let c = 1.0; c <= 6.0; c += 1) {
      coords.push({ r, c, l: 1 });
      if (coords.length === 48 + 27) break;
    }
    if (coords.length === 48 + 27) break;
  }
  while (coords.length < 48 + 27) coords.push({ r: 2.5, c: 3.5, l: 1 });

  // Layer 2: Inner vortex (15 tiles)
  for (let r = 1.5; r <= 3.5; r += 1) {
    for (let c = 2.0; c <= 5.0; c += 1) {
      coords.push({ r, c, l: 2 });
      if (coords.length === 48 + 27 + 15) break;
    }
    if (coords.length === 48 + 27 + 15) break;
  }
  while (coords.length < 48 + 27 + 15) coords.push({ r: 2.5, c: 3.5, l: 2 });

  // Layer 3: Galactic Eye (6 tiles)
  const l3 = [
    { r: 1.5, c: 3.0 }, { r: 1.5, c: 4.0 },
    { r: 2.5, c: 3.5 }, { r: 3.5, c: 3.0 },
    { r: 2.5, c: 2.5 }, { r: 2.5, c: 4.5 }
  ];
  l3.forEach(pt => coords.push({ r: pt.r, c: pt.c, l: 3 }));

  return coords.slice(0, 96);
}

function getHouseCoordinates(): BoardCoord[] {
  const coords: BoardCoord[] = [];
  // Layer 0: House pitched roof & facade (48 tiles)
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 8; c++) {
      if (r === 0 && (c < 2 || c > 5)) continue;
      if (r === 1 && (c < 1 || c > 6)) continue;
      coords.push({ r, c, l: 0 });
    }
  }
  while (coords.length < 48) coords.push({ r: 3.5, c: coords.length % 8, l: 0 });
  coords.length = 48;

  // Layer 1: Rooms & Attic (27 tiles)
  for (let r = 1.5; r <= 4.5; r += 1) {
    for (let c = 1.5; c <= 5.5; c += 1) {
      coords.push({ r, c, l: 1 });
      if (coords.length === 48 + 27) break;
    }
    if (coords.length === 48 + 27) break;
  }
  while (coords.length < 48 + 27) coords.push({ r: 3.0, c: 3.5, l: 1 });

  // Layer 2: Roof Gable & Hearth (15 tiles)
  for (let r = 1.0; r <= 3.0; r += 1) {
    for (let c = 2.0; c <= 5.0; c += 1) {
      coords.push({ r, c, l: 2 });
      if (coords.length === 48 + 27 + 15) break;
    }
    if (coords.length === 48 + 27 + 15) break;
  }
  while (coords.length < 48 + 27 + 15) coords.push({ r: 2.0, c: 3.5, l: 2 });

  // Layer 3: Chimney & Spire (6 tiles)
  const l3 = [
    { r: 0.5, c: 4.5 }, { r: 1.0, c: 4.5 },
    { r: 1.5, c: 3.5 }, { r: 2.0, c: 3.5 },
    { r: 2.5, c: 3.0 }, { r: 2.5, c: 4.0 }
  ];
  l3.forEach(pt => coords.push({ r: pt.r, c: pt.c, l: 3 }));

  return coords.slice(0, 96);
}

/**
 * Returns board coordinates for any requested shape
 */
export function getBoardCoordinatesForLevel(shape: BoardShapeType, tileCount: number): BoardCoord[] {
  let coords: BoardCoord[];
  switch (shape) {
    case 'flower':
      coords = getFlowerCoordinates();
      break;
    case 'clover':
      coords = getCloverCoordinates();
      break;
    case 'heart':
      coords = getHeartCoordinates();
      break;
    case 'tree':
      coords = getTreeCoordinates();
      break;
    case 'cloud':
      coords = getCloudCoordinates();
      break;
    case 'butterfly':
      coords = getButterflyCoordinates();
      break;
    case 'island':
      coords = getIslandCoordinates();
      break;
    case 'spiral':
      coords = getSpiralCoordinates();
      break;
    case 'house':
      coords = getHouseCoordinates();
      break;
    case 'pyramid':
    default:
      coords = getPyramidCoordinates();
      break;
  }

  if (tileCount >= coords.length) {
    return coords;
  }
  return coords.slice(0, tileCount);
}

/**
 * Evaluates whether each tile on the board is covered by another tile in a higher layer.
 * A tile is covered if another tile exists with layer > tile.layer and distance < 0.92.
 */
export function computeCoveredTiles(tiles: BoardTile[]): BoardTile[] {
  return tiles.map((tileA) => {
    const layerA = tileA.layer ?? 0;

    const isCovered = tiles.some((tileB) => {
      if (tileB.instanceId === tileA.instanceId) return false;
      const layerB = tileB.layer ?? 0;
      if (layerB <= layerA) return false;

      const dRow = Math.abs(tileB.row - tileA.row);
      const dCol = Math.abs(tileB.col - tileA.col);

      return dRow < 0.92 && dCol < 0.92;
    });

    return {
      ...tileA,
      isCovered
    };
  });
}

function createLevel(
  id: number,
  nameEn: string,
  nameTr: string,
  boardShape: BoardShapeType,
  tileTypes: string[],
  hintEn?: string,
  hintTr?: string,
  worldItemUnlock?: string,
  difficultyGrade?: number,
  movesOverride?: number
): LevelConfig {
  const typeCount = tileTypes.length;
  const tripletsPerType = Math.floor(32 / typeCount);
  const remainderTriplets = 32 % typeCount;

  const tiles = tileTypes.map((tileId, idx) => {
    const triplets = tripletsPerType + (idx < remainderTriplets ? 1 : 0);
    return {
      tileId,
      count: triplets * 3
    };
  });

  const grade = difficultyGrade ?? Math.min(25, Math.floor(id / 4) + 1);
  const moves = movesOverride ?? Math.max(96, 120 - Math.floor((id - 1) * 0.3));

  return {
    id,
    name: { en: nameEn, tr: nameTr },
    boardShape,
    moves,
    difficulty: grade <= 5 ? 'easy' : grade <= 14 ? 'medium' : 'hard',
    difficultyGrade: grade,
    tutorialHint: hintEn && hintTr ? { en: hintEn, tr: hintTr } : undefined,
    tiles,
    objectives: [
      {
        type: 'merge_tile',
        targetTileId: 'all',
        targetCount: 96,
        currentCount: 0,
        label: { en: 'Clear All 96 Figures', tr: '96 Figürün Hepsini Temizle' }
      }
    ],
    rewards: {
      coins: 50 + id * 25,
      stars: 3,
      worldItemUnlock
    }
  };
}

export const LEVELS: LevelConfig[] = [
  // ==========================================
  // WORLD 1: COZY GARDEN (Levels 1 - 10)
  // ==========================================
  createLevel(
    1,
    'Garden Pyramid',
    'Bahçe Piramidi',
    'pyramid',
    ['seed', 'water_drop', 'sun', 'leaf'],
    'Tap 3 matching figures to clear them and reveal the layers below!',
    '3 aynı figürü topla; 3 tane birikince tahtadan kalksın!',
    'patch_of_grass',
    1,
    120
  ),
  createLevel(
    2,
    'Morning Blooms',
    'Sabah Çiçekleri',
    'pyramid',
    ['flower', 'bee', 'leaf', 'sun', 'water_drop'],
    'Match figures in your basket. 3 identical figures vanish automatically!',
    'Aynı figürden 3 tane birikince tahtadan kendiliğinden kalkar!',
    'flower_pot_1',
    2,
    115
  ),
  createLevel(
    3,
    'Forest Whispers',
    'Orman Fısıltısı',
    'pyramid',
    ['tree', 'leaf', 'ladybug', 'seed', 'water_drop', 'sun'],
    'Match upper figures to gradually reveal deeper pyramid layers!',
    'Piramidin derin katmanlarını açmak için üstteki figürleri teker teker eşleştir!',
    'blooming_rose',
    3,
    112
  ),
  createLevel(
    4,
    'Crystal River',
    'Kristal Nehir',
    'pyramid',
    ['crystal', 'water_drop', 'cloud', 'rainbow', 'sun', 'flower', 'butterfly', 'bee', 'mushroom', 'ladybug', 'seed'],
    'Difficulty jumped by 6 grades after level 3! 11 distinct figure types challenge your 6 tray slots.',
    '3. oyundan sonra zorluk 6 derece birden arttı (Derece 9)! 11 farklı figür var, sepeti dikkatle planla!',
    'little_pond',
    9,
    105
  ),
  createLevel(
    5,
    'Sunlight Meadow',
    'Güneşli Çayır',
    'pyramid',
    ['sun', 'flower', 'bee', 'honey', 'sprout', 'leaf', 'seed', 'water_drop', 'crystal', 'butterfly', 'ladybug', 'mushroom'],
    'Grade 9: 12 distinct figure types! Don’t let your tray fill with 5 unmatched items.',
    'Zorluk Derecesi 9: 12 farklı figür! Sepette 5 farklı taş birikip kilitlenmeden 3’lüleri tamamla.',
    'sunflower_patch',
    9,
    102
  ),
  createLevel(
    6,
    'Bramble Grove',
    'Böğürtlen Korusu',
    'pyramid',
    ['seed', 'sprout', 'tree', 'mushroom', 'leaf', 'ladybug', 'water_drop', 'sun', 'berry', 'apple', 'caterpillar', 'flower', 'honey'],
    'Grade 10: 13 distinct types! Work your way through the summit pyramid layers.',
    'Zorluk Derecesi 10: 13 farklı figür! Piramidin zirvesinden başlayarak alt katmanların yolunu aç.',
    'young_oak_tree',
    10,
    100
  ),
  createLevel(
    7,
    'Rainbow Valley',
    'Gökkuşağı Vadisi',
    'pyramid',
    ['rainbow', 'cloud', 'crystal', 'butterfly', 'flower', 'sun', 'water_drop', 'bee', 'mushroom', 'ladybug', 'honeycomb', 'leaf', 'seed', 'tree'],
    'Grade 11: 14 distinct types! Every single tap must contribute to a planned triplet.',
    'Zorluk Derecesi 11: 14 farklı figür! Her dokunuşun planlı bir 3’lü eşleşmeye hizmet etmeli.',
    'bee_hotel',
    11,
    99
  ),
  createLevel(
    8,
    'Honey Sanctuary',
    'Bal Diyarı',
    'pyramid',
    ['honey', 'bee', 'flower', 'sun', 'leaf', 'seed', 'sprout', 'butterfly', 'ladybug', 'mushroom', 'crystal', 'rainbow', 'berry', 'apple', 'honeycomb'],
    'Grade 12: 15 distinct types! Grandmaster level challenge.',
    'Zorluk Derecesi 12: 15 farklı figür! Büyük Usta seviyesinde stratejik derinlik.',
    'cozy_beehive',
    12,
    98
  ),
  createLevel(
    9,
    'Enchanted Glade',
    'Büyülü Açıklık',
    'pyramid',
    ['crystal', 'rainbow', 'butterfly', 'tree', 'flower', 'water_drop', 'sun', 'mushroom', 'ladybug', 'bee', 'honey', 'sprout', 'seed', 'leaf', 'berry', 'apple'],
    'Grade 13: 16 distinct types! Exactly 2 triplets of each figure exist on the board.',
    'Zorluk Derecesi 13: 16 farklı figür! Her figürden yalnızca 2 üçlü bulunur, hata payı minimum.',
    'honey_stand',
    13,
    97
  ),
  createLevel(
    10,
    'Grand Garden Peak',
    'Büyük Bahçe Zirvesi',
    'pyramid',
    ['tree', 'honey', 'crystal', 'rainbow', 'butterfly', 'sun', 'flower', 'ladybug', 'mushroom', 'bee', 'sprout', 'seed', 'water_drop', 'leaf', 'berry', 'honeycomb'],
    'Grade 14: Apex Challenge! Exactly 96 moves for 96 figures. Flawless mastery required!',
    'Zorluk Derecesi 14: Nihai Zirve! 96 taşa karşı tam 96 hamle, sıfır hata ile şampiyonluk!',
    'cozy_cottage',
    14,
    96
  ),

  // ==========================================
  // WORLD 2: ENCHANTED FOREST (Levels 11 - 20)
  // ==========================================
  createLevel(
    11,
    'Whispering Pines',
    'Fısıldayan Çamlar',
    'tree',
    ['tree', 'leaf', 'seed', 'water_drop', 'sprout', 'mushroom'],
    'Welcome to the Enchanted Forest! Towering tree shapes create dense vertical canopies.',
    'Büyülü Ormana hoş geldin! Ulu ağaç dizilimleri katmanlı tahta derinliği sunar.',
    undefined,
    4,
    110
  ),
  createLevel(
    12,
    'Emerald Clover',
    'Zümrüt Yonca',
    'clover',
    ['tree', 'leaf', 'sprout', 'ladybug', 'seed', 'sun', 'butterfly'],
    '4-Leaf Clover structure: focus on clearing the 4 outer leaves before digging into the core!',
    '4 Yapraklı Yonca: Merkez köke inmeden önce dış yaprakları temizlemeye odaklan!',
    undefined,
    5,
    108
  ),
  createLevel(
    13,
    'Mossy Glen',
    'Yosunlu Vadi',
    'flower',
    ['flower', 'leaf', 'sprout', 'mushroom', 'water_drop', 'sun', 'tree', 'bee'],
    undefined,
    undefined,
    undefined,
    5,
    106
  ),
  createLevel(
    14,
    'Acorn Hollow',
    'Meşe Palamudu Kovuğu',
    'tree',
    ['tree', 'leaf', 'berry', 'apple', 'seed', 'mushroom', 'ladybug', 'caterpillar'],
    undefined,
    undefined,
    undefined,
    6,
    105
  ),
  createLevel(
    15,
    'Dewdrop Canopy',
    'Çiğ Damlası Kubbesi',
    'clover',
    ['water_drop', 'leaf', 'crystal', 'rainbow', 'tree', 'flower', 'butterfly', 'sprout', 'sun'],
    undefined,
    undefined,
    undefined,
    6,
    104
  ),
  createLevel(
    16,
    'Firefly Trail',
    'Ateş Böceği Yolu',
    'spiral',
    ['sunbeam', 'ladybug', 'butterfly', 'crystal', 'tree', 'leaf', 'mushroom', 'seed', 'sprout', 'honey'],
    undefined,
    undefined,
    undefined,
    7,
    103
  ),
  createLevel(
    17,
    'Ancient Grove',
    'Kadim Koru',
    'tree',
    ['tree', 'large_tree', 'magical_tree', 'leaf', 'sprout', 'crystal', 'rainbow', 'flower', 'mushroom', 'ladybug'],
    undefined,
    undefined,
    undefined,
    7,
    102
  ),
  createLevel(
    18,
    'Willow Bend',
    'Söğüt Bükümü',
    'flower',
    ['flower', 'large_flower', 'water_drop', 'pond', 'tree', 'leaf', 'butterfly', 'bee', 'honey', 'rainbow', 'crystal'],
    undefined,
    undefined,
    undefined,
    8,
    101
  ),
  createLevel(
    19,
    'Woodland Heart',
    'Orman Kalbi',
    'heart',
    ['butterfly', 'flower', 'crystal', 'rainbow', 'tree', 'ladybug', 'bee', 'honeycomb', 'leaf', 'mushroom', 'apple', 'berry'],
    undefined,
    undefined,
    undefined,
    8,
    100
  ),
  createLevel(
    20,
    'Shrine of the Ancients',
    'Kadimler Mabedi',
    'pyramid',
    ['magical_tree', 'crystal', 'rainbow', 'tree', 'flower', 'honey', 'butterfly', 'ladybug', 'mushroom', 'bee', 'sprout', 'sunbeam', 'leaf'],
    'Forest Milestone! Cleanse the Ancient Shrine to unlock the mythical Forest Sanctuary!',
    'Orman Zirvesi! Kadim Mabedi temizle ve efsanevi Orman Mabedi dekorasyonunu aç!',
    'forest_shrine',
    9,
    98
  ),

  // ==========================================
  // WORLD 3: SUNNY BEACH (Levels 21 - 30)
  // ==========================================
  createLevel(
    21,
    'Golden Sands',
    'Altın Kumlar',
    'island',
    ['seashell', 'water_drop', 'sun', 'coconut', 'sand_sprout', 'tropical_fish'].map(id => id === 'sand_sprout' ? 'sprout' : id),
    'Welcome to Sunny Beach! Island board shapes feature mountain peaks surrounded by coastal slopes.',
    'Güneşli Sahile hoş geldin! Ada şekilli tahtalarda kıyıdan dağ zirvelerine uzanan katmanlar bulunur.',
    undefined,
    7,
    105
  ),
  createLevel(
    22,
    'Seashell Shore',
    'Deniz Kabuğu Kıyısı',
    'flower',
    ['seashell', 'coral', 'water_drop', 'sun', 'coconut', 'pearl', 'tropical_fish'],
    undefined,
    undefined,
    undefined,
    8,
    104
  ),
  createLevel(
    23,
    'Palm Breeze',
    'Palmiye Esintisi',
    'tree',
    ['coconut', 'tree', 'sun', 'water_drop', 'seashell', 'tropical_fish', 'leaf', 'cloud'],
    undefined,
    undefined,
    undefined,
    8,
    103
  ),
  createLevel(
    24,
    'Coral Cove',
    'Mercan Koyu',
    'butterfly',
    ['coral', 'pearl', 'seashell', 'tropical_fish', 'water_drop', 'sun', 'rainbow', 'crystal'],
    undefined,
    undefined,
    undefined,
    9,
    102
  ),
  createLevel(
    25,
    'Turquoise Lagoon',
    'Turkuaz Lagün',
    'island',
    ['tropical_fish', 'coral', 'seashell', 'pearl', 'water_drop', 'pond', 'sun', 'coconut', 'flower'],
    undefined,
    undefined,
    undefined,
    9,
    101
  ),
  createLevel(
    26,
    'Pearl Bay',
    'İnci Körfezi',
    'spiral',
    ['pearl', 'seashell', 'coral', 'crystal', 'water_drop', 'sun', 'rainbow', 'tropical_fish', 'cloud', 'tree'],
    undefined,
    undefined,
    undefined,
    10,
    100
  ),
  createLevel(
    27,
    'Coconut Reef',
    'Hindistan Cevizi Resifi',
    'cloud',
    ['coconut', 'seashell', 'tropical_fish', 'coral', 'sun', 'water_drop', 'leaf', 'tree', 'pearl', 'crystal'],
    undefined,
    undefined,
    undefined,
    10,
    99
  ),
  createLevel(
    28,
    'Starfish Tide',
    'Denizyıldızı Gelgiti',
    'flower',
    ['seashell', 'coral', 'pearl', 'tropical_fish', 'coconut', 'sun', 'water_drop', 'crystal', 'rainbow', 'flower', 'butterfly'],
    undefined,
    undefined,
    undefined,
    11,
    98
  ),
  createLevel(
    29,
    'Ocean Heart',
    'Okyanus Kalbi',
    'heart',
    ['pearl', 'coral', 'seashell', 'tropical_fish', 'coconut', 'water_drop', 'sun', 'crystal', 'rainbow', 'flower', 'butterfly', 'leaf'],
    undefined,
    undefined,
    undefined,
    11,
    98
  ),
  createLevel(
    30,
    'Sunken Coral Arch',
    'Batık Mercan Kemeri',
    'island',
    ['coral', 'pearl', 'seashell', 'tropical_fish', 'coconut', 'crystal', 'rainbow', 'water_drop', 'sun', 'tree', 'flower', 'butterfly', 'pond'],
    'Beach Milestone! Clear the Coral Arch to unlock the Sunken Coral Arch decoration!',
    'Sahil Zirvesi! Mercan Kemerini temizle ve Batık Mercan Kemeri dekorasyonunu kazan!',
    'coral_arch',
    12,
    96
  ),

  // ==========================================
  // WORLD 4: PEACEFUL VILLAGE (Levels 31 - 40)
  // ==========================================
  createLevel(
    31,
    'Harvest Pathway',
    'Hasat Patikası',
    'house',
    ['wheat', 'bread', 'wooden_cart', 'lantern', 'tree', 'sun', 'water_drop'],
    'Welcome to the Village! Cottage board shapes feature roof ridges and chimney spires.',
    'Huzurlu Köye hoş geldin! Kulübe şekilli tahtalarda çatı ve baca kuleleri yer alır.',
    undefined,
    9,
    102
  ),
  createLevel(
    32,
    'Baker\'s Hearth',
    'Fırıncının Ocağı',
    'clover',
    ['bread', 'wheat', 'wooden_cart', 'lantern', 'sun', 'water_drop', 'leaf', 'flower'],
    undefined,
    undefined,
    undefined,
    10,
    101
  ),
  createLevel(
    33,
    'Golden Wheatfields',
    'Altın Buğday Tarlaları',
    'tree',
    ['wheat', 'bread', 'windmill', 'wooden_cart', 'sun', 'leaf', 'flower', 'tree', 'butterfly'],
    undefined,
    undefined,
    undefined,
    10,
    100
  ),
  createLevel(
    34,
    'Rustic Cartyard',
    'Köy Meydanı',
    'house',
    ['wooden_cart', 'wheat', 'bread', 'lantern', 'apple', 'apple_pie', 'sun', 'tree', 'leaf', 'water_drop'],
    undefined,
    undefined,
    undefined,
    11,
    99
  ),
  createLevel(
    35,
    'Lantern Alley',
    'Fenerli Sokak',
    'spiral',
    ['lantern', 'wheat', 'bread', 'wooden_cart', 'windmill', 'sun', 'flower', 'tree', 'honey', 'bee'],
    undefined,
    undefined,
    undefined,
    11,
    98
  ),
  createLevel(
    36,
    'Village Green',
    'Köy Çayırı',
    'flower',
    ['windmill', 'wheat', 'bread', 'wooden_cart', 'lantern', 'flower', 'tree', 'butterfly', 'ladybug', 'sun', 'sprout'],
    undefined,
    undefined,
    undefined,
    12,
    98
  ),
  createLevel(
    37,
    'Cobblestone Cross',
    'Taş Kesişimi',
    'clover',
    ['wooden_cart', 'lantern', 'windmill', 'wheat', 'bread', 'apple_pie', 'honey', 'bee', 'flower', 'tree', 'leaf'],
    undefined,
    undefined,
    undefined,
    12,
    97
  ),
  createLevel(
    38,
    'Sunny Orchard',
    'Güneşli Meyve Bahçesi',
    'tree',
    ['apple', 'apple_pie', 'berry', 'jam', 'wheat', 'bread', 'wooden_cart', 'lantern', 'tree', 'flower', 'sun', 'water_drop'],
    undefined,
    undefined,
    undefined,
    13,
    97
  ),
  createLevel(
    39,
    'Windmill Ridge',
    'Değirmen Sırtı',
    'butterfly',
    ['windmill', 'wheat', 'bread', 'wooden_cart', 'lantern', 'cloud', 'sun', 'tree', 'flower', 'honey', 'bee', 'ladybug'],
    undefined,
    undefined,
    undefined,
    13,
    96
  ),
  createLevel(
    40,
    'Grand Village Windmill',
    'Büyük Köy Değirmeni',
    'house',
    ['windmill', 'wheat', 'bread', 'wooden_cart', 'lantern', 'apple_pie', 'honey', 'flower_house', 'tree', 'flower', 'sun', 'butterfly', 'crystal'],
    'Village Milestone! Master the Grand Windmill to construct it in your world!',
    'Köy Zirvesi! Büyük Değirmeni tamamla ve köy dünyana görkemli değirmeni yerleştir!',
    'village_windmill',
    14,
    96
  ),

  // ==========================================
  // WORLD 5: MAGICAL GROVE (Levels 41 - 50)
  // ==========================================
  createLevel(
    41,
    'Twilight Glen',
    'Alacakaranlık Vadisi',
    'spiral',
    ['magic_potion', 'magic_wand', 'sparkle_orb', 'enchanted_lotus', 'crystal', 'rainbow', 'butterfly'],
    'Welcome to the Magical Grove! Swirling vortex shapes demand strategic center extraction.',
    'Sihirli Vadiye hoş geldin! Girdap sarmalları merkezden dışa doğru planlama gerektirir.',
    undefined,
    11,
    100
  ),
  createLevel(
    42,
    'Potion Laboratory',
    'İksir Laboratuvarı',
    'heart',
    ['magic_potion', 'sparkle_orb', 'crystal', 'water_drop', 'magic_wand', 'flower', 'butterfly', 'rainbow'],
    undefined,
    undefined,
    undefined,
    12,
    99
  ),
  createLevel(
    43,
    'Mystic Orb Sanctuary',
    'Mistik Küre Mabedi',
    'flower',
    ['sparkle_orb', 'magic_wand', 'magic_potion', 'enchanted_lotus', 'crystal', 'rainbow', 'sun', 'flower', 'butterfly'],
    undefined,
    undefined,
    undefined,
    12,
    98
  ),
  createLevel(
    44,
    'Enchanted Blossom',
    'Büyülü Çiçek Açımı',
    'butterfly',
    ['enchanted_lotus', 'magic_potion', 'magic_wand', 'sparkle_orb', 'crystal', 'rainbow', 'butterfly', 'flower', 'magical_tree', 'water_drop'],
    undefined,
    undefined,
    undefined,
    13,
    98
  ),
  createLevel(
    45,
    'Fairy Wand Glade',
    'Peri Asası Açıklığı',
    'tree',
    ['magic_wand', 'enchanted_lotus', 'sparkle_orb', 'magic_potion', 'fairy_ring', 'butterfly', 'flower', 'tree', 'crystal', 'rainbow'],
    undefined,
    undefined,
    undefined,
    13,
    97
  ),
  createLevel(
    46,
    'Shimmering Mist',
    'Işıltılı Sis',
    'cloud',
    ['magic_potion', 'sparkle_orb', 'magic_wand', 'enchanted_lotus', 'cloud', 'crystal', 'rainbow', 'water_drop', 'flower', 'butterfly', 'fairy_ring'],
    undefined,
    undefined,
    undefined,
    14,
    97
  ),
  createLevel(
    47,
    'Rune Spiral',
    'Rün Sarmalı',
    'spiral',
    ['magic_wand', 'sparkle_orb', 'enchanted_lotus', 'magic_potion', 'crystal', 'rainbow', 'magical_tree', 'fairy_ring', 'flower', 'butterfly', 'honey'],
    undefined,
    undefined,
    undefined,
    14,
    96
  ),
  createLevel(
    48,
    'Lotus Springs',
    'Nilüfer Kaplıcaları',
    'island',
    ['enchanted_lotus', 'magic_potion', 'sparkle_orb', 'magic_wand', 'pond', 'water_drop', 'crystal', 'rainbow', 'flower', 'butterfly', 'fairy_ring', 'tree'],
    undefined,
    undefined,
    undefined,
    15,
    96
  ),
  createLevel(
    49,
    'Sorcerer\'s Heart',
    'Büyücünün Kalbi',
    'heart',
    ['magic_potion', 'magic_wand', 'sparkle_orb', 'enchanted_lotus', 'crystal', 'rainbow', 'butterfly', 'flower', 'magical_tree', 'fairy_ring', 'sunbeam', 'leaf'],
    undefined,
    undefined,
    undefined,
    15,
    96
  ),
  createLevel(
    50,
    'Lotus Fountain Shrine',
    'Nilüfer Çeşmesi Mabedi',
    'flower',
    ['enchanted_lotus', 'magic_wand', 'sparkle_orb', 'magic_potion', 'crystal', 'rainbow', 'magical_tree', 'fairy_garden', 'flower', 'butterfly', 'fairy_ring', 'sunbeam', 'water_drop'],
    'Magic Grove Milestone! Awaken the Enchanted Lotus Fountain in your paradise!',
    'Sihirli Vadi Zirvesi! Büyülü Nilüfer Çeşmesini dünyanda inşa et!',
    'crystal_fountain',
    16,
    96
  ),

  // ==========================================
  // WORLD 6: SNOWY VALLEY (Levels 51 - 60)
  // ==========================================
  createLevel(
    51,
    'First Snowfall',
    'İlk Kar Yağışı',
    'cloud',
    ['snowflake', 'ice_crystal', 'snow_pine', 'snowman', 'hot_spring', 'water_drop', 'cloud'],
    'Welcome to Snowy Valley! Frozen crystals and hot springs create stunning winter patterns.',
    'Karlı Vadiye hoş geldin! Buz kristalleri ve sıcak kaplıcalar kış masalı yaratır.',
    undefined,
    13,
    98
  ),
  createLevel(
    52,
    'Frost Pine Hollow',
    'Karlı Çam Kovuğu',
    'tree',
    ['snow_pine', 'snowflake', 'ice_crystal', 'snowman', 'hot_spring', 'tree', 'leaf', 'cloud'],
    undefined,
    undefined,
    undefined,
    14,
    98
  ),
  createLevel(
    53,
    'Ice Crystal Cave',
    'Buz Kristali Mağarası',
    'spiral',
    ['ice_crystal', 'snowflake', 'crystal', 'snow_pine', 'hot_spring', 'water_drop', 'cloud', 'snowman', 'rainbow'],
    undefined,
    undefined,
    undefined,
    14,
    97
  ),
  createLevel(
    54,
    'Snowman\'s Rest',
    'Kardan Adamın Molası',
    'house',
    ['snowman', 'snowflake', 'ice_crystal', 'snow_pine', 'hot_spring', 'cloud', 'sun', 'tree', 'flower', 'crystal'],
    undefined,
    undefined,
    undefined,
    15,
    97
  ),
  createLevel(
    55,
    'Glacier Plateau',
    'Buzul Platosu',
    'island',
    ['ice_crystal', 'snowflake', 'snow_pine', 'hot_spring', 'snowman', 'crystal', 'water_drop', 'cloud', 'rainbow', 'tree'],
    undefined,
    undefined,
    undefined,
    15,
    96
  ),
  createLevel(
    56,
    'Blizzard Peak',
    'Tipi Zirvesi',
    'pyramid',
    ['snowflake', 'ice_crystal', 'snow_pine', 'snowman', 'hot_spring', 'crystal', 'rainbow', 'cloud', 'sun', 'tree', 'flower'],
    undefined,
    undefined,
    undefined,
    16,
    96
  ),
  createLevel(
    57,
    'Frozen Heart',
    'Donmuş Kalp',
    'heart',
    ['ice_crystal', 'snowflake', 'snow_pine', 'hot_spring', 'snowman', 'crystal', 'rainbow', 'cloud', 'water_drop', 'butterfly', 'flower', 'tree'],
    undefined,
    undefined,
    undefined,
    16,
    96
  ),
  createLevel(
    58,
    'Aurora Valley',
    'Kutup Işıkları Vadisi',
    'butterfly',
    ['rainbow', 'crystal', 'snowflake', 'ice_crystal', 'snow_pine', 'hot_spring', 'snowman', 'sunbeam', 'cloud', 'butterfly', 'flower', 'tree'],
    undefined,
    undefined,
    undefined,
    17,
    96
  ),
  createLevel(
    59,
    'Winter Solstice',
    'Kış Gündönümü',
    'clover',
    ['snowflake', 'ice_crystal', 'snow_pine', 'hot_spring', 'snowman', 'crystal', 'rainbow', 'cloud', 'sun', 'tree', 'flower', 'butterfly', 'leaf'],
    undefined,
    undefined,
    undefined,
    17,
    96
  ),
  createLevel(
    60,
    'Glacier Hot Springs',
    'Buzul Sıcak Kaplıcası',
    'island',
    ['hot_spring', 'ice_crystal', 'snowflake', 'snow_pine', 'snowman', 'crystal', 'rainbow', 'cloud', 'water_drop', 'sunbeam', 'flower', 'tree', 'butterfly', 'magical_tree'],
    'Snowy Valley Milestone! Unlock the rejuvenating Glacier Hot Springs for your garden!',
    'Karlı Vadi Zirvesi! Bahçene buharı tüten şifalı Buzul Sıcak Kaplıcasını ekle!',
    'ice_palace_spire',
    18,
    96
  ),

  // ==========================================
  // WORLD 7: SKY ISLANDS (Levels 61 - 70)
  // ==========================================
  createLevel(
    61,
    'Windward Cloud',
    'Rüzgarüstü Bulutu',
    'cloud',
    ['feather', 'starlight', 'sun_crystal', 'wind_chime', 'cloud', 'rainbow', 'sun'],
    'Welcome to the Sky Islands! Floating sanctuaries high in the azure sky.',
    'Gökyüzü Adalarına hoş geldin! Masmavi göklerde süzülen hafif ve rüzgarlı sığınaklar.',
    undefined,
    15,
    98
  ),
  createLevel(
    62,
    'Feathered Roost',
    'Tüylü Yuva',
    'butterfly',
    ['feather', 'starlight', 'sun_crystal', 'wind_chime', 'butterfly', 'cloud', 'rainbow', 'sunbeam'],
    undefined,
    undefined,
    undefined,
    15,
    97
  ),
  createLevel(
    63,
    'Floating Haven',
    'Uçan Cennet',
    'island',
    ['feather', 'starlight', 'sun_crystal', 'wind_chime', 'cloud', 'tree', 'crystal', 'rainbow', 'sun'],
    undefined,
    undefined,
    undefined,
    16,
    97
  ),
  createLevel(
    64,
    'Starlight Terrace',
    'Yıldız Işığı Terası',
    'spiral',
    ['starlight', 'sun_crystal', 'feather', 'wind_chime', 'crystal', 'rainbow', 'cloud', 'sunbeam', 'butterfly', 'flower'],
    undefined,
    undefined,
    undefined,
    16,
    96
  ),
  createLevel(
    65,
    'Wind Chime Bower',
    'Rüzgar Çanı Çardağı',
    'house',
    ['wind_chime', 'feather', 'starlight', 'sun_crystal', 'cloud', 'crystal', 'rainbow', 'tree', 'flower', 'butterfly'],
    undefined,
    undefined,
    undefined,
    17,
    96
  ),
  createLevel(
    66,
    'Solar Prism Tower',
    'Güneş Prizması Kulesi',
    'tree',
    ['sun_crystal', 'starlight', 'feather', 'wind_chime', 'sun', 'sunbeam', 'crystal', 'rainbow', 'cloud', 'flower', 'tree'],
    undefined,
    undefined,
    undefined,
    17,
    96
  ),
  createLevel(
    67,
    'Skybridge Arch',
    'Gök Köprüsü Kemeri',
    'clover',
    ['feather', 'starlight', 'sun_crystal', 'wind_chime', 'cloud', 'rainbow', 'crystal', 'butterfly', 'flower', 'tree', 'sunbeam'],
    undefined,
    undefined,
    undefined,
    18,
    96
  ),
  createLevel(
    68,
    'Celestial Meadow',
    'Semavi Çayır',
    'flower',
    ['starlight', 'sun_crystal', 'feather', 'wind_chime', 'flower', 'butterfly', 'cloud', 'crystal', 'rainbow', 'sun', 'tree', 'ladybug'],
    undefined,
    undefined,
    undefined,
    18,
    96
  ),
  createLevel(
    69,
    'Angelic Heart',
    'Melek Kalbi',
    'heart',
    ['feather', 'starlight', 'sun_crystal', 'wind_chime', 'crystal', 'rainbow', 'cloud', 'flower', 'butterfly', 'tree', 'sunbeam', 'honey'],
    undefined,
    undefined,
    undefined,
    19,
    96
  ),
  createLevel(
    70,
    'Starlight Sky Pagoda',
    'Yıldız Gökyüzü Pagodası',
    'pyramid',
    ['starlight', 'sun_crystal', 'feather', 'wind_chime', 'cloud', 'crystal', 'rainbow', 'sunbeam', 'butterfly', 'flower', 'tree', 'magical_tree', 'fairy_garden'],
    'Sky Islands Milestone! Build the Starlight Sky Pagoda in your garden realm!',
    'Gökyüzü Zirvesi! Bahçene görkemli Yıldız Gökyüzü Pagodasını ekle!',
    'sky_pagoda',
    20,
    96
  ),

  // ==========================================
  // WORLD 8: COSMIC GARDEN (Levels 71 - 80)
  // ==========================================
  createLevel(
    71,
    'Crescent Moonrise',
    'Hilal Doğuşu',
    'spiral',
    ['moon_crescent', 'planet', 'meteor_star', 'cosmic_flower', 'nebula_orb', 'starlight', 'crystal'],
    'Welcome to the Cosmic Garden! Starlight and nebula dust power outer galaxy puzzles.',
    'Kozmik Bahçeye hoş geldin! Yıldız tozları ve nebulalar eşliğinde derin uzay bulmacaları.',
    undefined,
    17,
    96
  ),
  createLevel(
    72,
    'Orbiting Planets',
    'Yörüngedeki Gezegenler',
    'flower',
    ['planet', 'moon_crescent', 'meteor_star', 'cosmic_flower', 'nebula_orb', 'starlight', 'sun_crystal', 'crystal'],
    undefined,
    undefined,
    undefined,
    18,
    96
  ),
  createLevel(
    73,
    'Meteor Shower',
    'Göktaşı Yağmuru',
    'butterfly',
    ['meteor_star', 'planet', 'moon_crescent', 'cosmic_flower', 'nebula_orb', 'starlight', 'rainbow', 'crystal', 'sunbeam'],
    undefined,
    undefined,
    undefined,
    18,
    96
  ),
  createLevel(
    74,
    'Nebula Bloom',
    'Bulutsu Çiçeği',
    'cloud',
    ['cosmic_flower', 'nebula_orb', 'planet', 'moon_crescent', 'meteor_star', 'starlight', 'cloud', 'crystal', 'rainbow', 'flower'],
    undefined,
    undefined,
    undefined,
    19,
    96
  ),
  createLevel(
    75,
    'Stardust Island',
    'Yıldız Tozu Adası',
    'island',
    ['nebula_orb', 'cosmic_flower', 'planet', 'meteor_star', 'moon_crescent', 'starlight', 'crystal', 'rainbow', 'sun_crystal', 'tree'],
    undefined,
    undefined,
    undefined,
    19,
    96
  ),
  createLevel(
    76,
    'Astral Clover',
    'Astral Yonca',
    'clover',
    ['planet', 'meteor_star', 'cosmic_flower', 'nebula_orb', 'moon_crescent', 'starlight', 'crystal', 'rainbow', 'butterfly', 'flower', 'tree'],
    undefined,
    undefined,
    undefined,
    20,
    96
  ),
  createLevel(
    77,
    'Supernova Core',
    'Süpernova Çekirdeği',
    'heart',
    ['meteor_star', 'planet', 'cosmic_flower', 'nebula_orb', 'moon_crescent', 'starlight', 'sun_crystal', 'crystal', 'rainbow', 'butterfly', 'flower', 'tree'],
    undefined,
    undefined,
    undefined,
    20,
    96
  ),
  createLevel(
    78,
    'Galactic Tree of Life',
    'Galaktik Yaşam Ağacı',
    'tree',
    ['cosmic_flower', 'planet', 'meteor_star', 'nebula_orb', 'moon_crescent', 'starlight', 'magical_tree', 'crystal', 'rainbow', 'tree', 'flower', 'butterfly', 'sunbeam'],
    undefined,
    undefined,
    undefined,
    21,
    96
  ),
  createLevel(
    79,
    'Cosmic Vortex',
    'Kozmik Girdap',
    'spiral',
    ['nebula_orb', 'cosmic_flower', 'planet', 'meteor_star', 'moon_crescent', 'starlight', 'sun_crystal', 'crystal', 'rainbow', 'flower', 'butterfly', 'tree', 'fairy_ring', 'honey'],
    undefined,
    undefined,
    undefined,
    21,
    96
  ),
  createLevel(
    80,
    'Nebula Monolith',
    'Bulutsu Dikilitaşı',
    'pyramid',
    ['cosmic_flower', 'nebula_orb', 'planet', 'meteor_star', 'moon_crescent', 'starlight', 'sun_crystal', 'crystal', 'rainbow', 'magical_tree', 'flower', 'butterfly', 'tree', 'sunbeam', 'pearl'],
    'Cosmic Milestone! Claim the glowing Nebula Celestial Monolith for your sanctuary!',
    'Kozmik Zirve! Parıldayan Bulutsu Kozmik Dikilitaşını bahçene yerleştir!',
    'cosmic_monolith',
    22,
    96
  ),

  // ==========================================
  // WORLD 9: HIDDEN REALM (Levels 81 - 90)
  // ==========================================
  createLevel(
    81,
    'Forgotten Gate',
    'Unutulmuş Kapı',
    'house',
    ['ancient_relic', 'mystic_scroll', 'golden_key', 'spirit_lantern', 'elder_rune', 'crystal', 'stone'],
    'Welcome to the Hidden Realm! Sacred botanical secrets guarded by ancient runes.',
    'Gizli Mabede hoş geldin! Kadim rünlerin koruduğu kutsal botanik sırları.',
    undefined,
    19,
    96
  ),
  createLevel(
    82,
    'Relic Chamber',
    'Kalıntı Odası',
    'spiral',
    ['ancient_relic', 'mystic_scroll', 'golden_key', 'spirit_lantern', 'elder_rune', 'crystal', 'golden_flower', 'rainbow'].map(id => id === 'golden_flower' ? 'flower' : id),
    undefined,
    undefined,
    undefined,
    20,
    96
  ),
  createLevel(
    83,
    'Sacred Scrolls',
    'Kutsal Parşömenler',
    'flower',
    ['mystic_scroll', 'ancient_relic', 'golden_key', 'spirit_lantern', 'elder_rune', 'crystal', 'rainbow', 'flower', 'tree'],
    undefined,
    undefined,
    undefined,
    20,
    96
  ),
  createLevel(
    84,
    'Spirit Lantern Walk',
    'Ruh Feneri Yürüyüşü',
    'tree',
    ['spirit_lantern', 'golden_key', 'ancient_relic', 'mystic_scroll', 'elder_rune', 'crystal', 'rainbow', 'sunbeam', 'flower', 'tree'],
    undefined,
    undefined,
    undefined,
    21,
    96
  ),
  createLevel(
    85,
    'Golden Key Crypt',
    'Altın Anahtar Mahzeni',
    'butterfly',
    ['golden_key', 'elder_rune', 'ancient_relic', 'mystic_scroll', 'spirit_lantern', 'crystal', 'rainbow', 'butterfly', 'flower', 'tree', 'pearl'],
    undefined,
    undefined,
    undefined,
    21,
    96
  ),
  createLevel(
    86,
    'Elder Totem',
    'Kadim Totem',
    'pyramid',
    ['elder_rune', 'golden_key', 'ancient_relic', 'mystic_scroll', 'spirit_lantern', 'crystal', 'rainbow', 'tree', 'flower', 'butterfly', 'sun_crystal'],
    undefined,
    undefined,
    undefined,
    22,
    96
  ),
  createLevel(
    87,
    'Sanctuary Heart',
    'Mabet Kalbi',
    'heart',
    ['ancient_relic', 'mystic_scroll', 'golden_key', 'spirit_lantern', 'elder_rune', 'crystal', 'rainbow', 'flower', 'butterfly', 'tree', 'pearl', 'sunbeam'],
    undefined,
    undefined,
    undefined,
    22,
    96
  ),
  createLevel(
    88,
    'Mystic Island Vault',
    'Mistik Ada Kasası',
    'island',
    ['golden_key', 'elder_rune', 'ancient_relic', 'mystic_scroll', 'spirit_lantern', 'crystal', 'rainbow', 'cloud', 'flower', 'tree', 'butterfly', 'magical_tree', 'pearl'],
    undefined,
    undefined,
    undefined,
    23,
    96
  ),
  createLevel(
    89,
    'Eternal Runestone',
    'Sonsuz Rün Taşı',
    'clover',
    ['elder_rune', 'golden_key', 'ancient_relic', 'mystic_scroll', 'spirit_lantern', 'crystal', 'rainbow', 'sun_crystal', 'cosmic_flower', 'flower', 'tree', 'butterfly', 'fairy_garden', 'magical_tree'],
    undefined,
    undefined,
    undefined,
    23,
    96
  ),
  createLevel(
    90,
    'Elder Rune Gateway',
    'Kadim Rün Kapısı',
    'spiral',
    ['elder_rune', 'golden_key', 'ancient_relic', 'mystic_scroll', 'spirit_lantern', 'crystal', 'rainbow', 'cosmic_flower', 'sun_crystal', 'nebula_orb', 'tree', 'flower', 'butterfly', 'pearl', 'magical_tree'],
    'Hidden Realm Milestone! Unlock the Elder Rune Gateway and enter the Master Garden!',
    'Gizli Mabet Zirvesi! Kadim Rün Kapısını aç ve Usta Bahçesine adım at!',
    'ancient_sanctuary_gate',
    24,
    96
  ),

  // ==========================================
  // WORLD 10: MASTER GARDEN (Levels 91 - 100)
  // ==========================================
  createLevel(
    91,
    'The Champion\'s Clover',
    'Şampiyonun Yoncası',
    'clover',
    ['golden_clover', 'master_lotus', 'phoenix_bloom', 'celestial_crown', 'eternity_seed', 'crystal', 'rainbow', 'sun_crystal'],
    'Welcome to the Master Garden! The pinnacle proving ground of Tile Story mastery.',
    'Usta Bahçesine hoş geldin! Tile Story ustalığının en yüksek doruk noktası.',
    undefined,
    21,
    96
  ),
  createLevel(
    92,
    'Lotus of Harmony',
    'Uyum Nilüferi',
    'flower',
    ['master_lotus', 'golden_clover', 'phoenix_bloom', 'celestial_crown', 'eternity_seed', 'crystal', 'rainbow', 'cosmic_flower', 'pearl'],
    undefined,
    undefined,
    undefined,
    22,
    96
  ),
  createLevel(
    93,
    'World Tree of Immortality',
    'Ölümsüzlük Hayat Ağacı',
    'tree',
    ['golden_clover', 'master_lotus', 'phoenix_bloom', 'celestial_crown', 'eternity_seed', 'magical_tree', 'crystal', 'rainbow', 'sun_crystal', 'tree'],
    undefined,
    undefined,
    undefined,
    22,
    96
  ),
  createLevel(
    94,
    'Heart of the Elements',
    'Elementlerin Kalbi',
    'heart',
    ['phoenix_bloom', 'golden_clover', 'master_lotus', 'celestial_crown', 'eternity_seed', 'crystal', 'rainbow', 'cosmic_flower', 'sun_crystal', 'pearl', 'flower'],
    undefined,
    undefined,
    undefined,
    23,
    96
  ),
  createLevel(
    95,
    'Sanctuary of the Gods',
    'Tanrılar Mabedi',
    'island',
    ['celestial_crown', 'eternity_seed', 'golden_clover', 'master_lotus', 'phoenix_bloom', 'elder_rune', 'golden_key', 'crystal', 'rainbow', 'cosmic_flower', 'tree', 'flower'],
    undefined,
    undefined,
    undefined,
    23,
    96
  ),
  createLevel(
    96,
    'Sky Sovereign',
    'Gökyüzü Hükümdarı',
    'cloud',
    ['eternity_seed', 'celestial_crown', 'phoenix_bloom', 'golden_clover', 'master_lotus', 'starlight', 'sun_crystal', 'crystal', 'rainbow', 'cloud', 'flower', 'butterfly', 'tree'],
    undefined,
    undefined,
    undefined,
    24,
    96
  ),
  createLevel(
    97,
    'Phoenix Wings',
    'Anka Kanatları',
    'butterfly',
    ['phoenix_bloom', 'golden_clover', 'master_lotus', 'celestial_crown', 'eternity_seed', 'crystal', 'rainbow', 'cosmic_flower', 'nebula_orb', 'sun_crystal', 'flower', 'butterfly', 'magical_tree', 'pearl'],
    undefined,
    undefined,
    undefined,
    24,
    96
  ),
  createLevel(
    98,
    'Eternity Spiral',
    'Sonsuzluk Sarmalı',
    'spiral',
    ['eternity_seed', 'celestial_crown', 'golden_clover', 'master_lotus', 'phoenix_bloom', 'elder_rune', 'cosmic_flower', 'crystal', 'rainbow', 'sun_crystal', 'nebula_orb', 'flower', 'butterfly', 'tree', 'pearl'],
    undefined,
    undefined,
    undefined,
    25,
    96
  ),
  createLevel(
    99,
    'Grand Citadel',
    'Büyük Hisar',
    'house',
    ['celestial_crown', 'eternity_seed', 'golden_clover', 'master_lotus', 'phoenix_bloom', 'golden_key', 'elder_rune', 'cosmic_flower', 'crystal', 'rainbow', 'sun_crystal', 'nebula_orb', 'tree', 'flower', 'butterfly', 'magical_tree'],
    'The Penultimate Trial! Exactly 16 legendary figures. Match with supreme precision!',
    'Son Prova! Tam 16 efsanevi figür. Kusursuz bir odaklanmayla eşleştir!',
    undefined,
    25,
    96
  ),
  createLevel(
    100,
    'Grand Master Apex',
    'Büyük Usta Nihai Zirvesi',
    'pyramid',
    ['celestial_crown', 'eternity_seed', 'golden_clover', 'master_lotus', 'phoenix_bloom', 'elder_rune', 'golden_key', 'cosmic_flower', 'sun_crystal', 'crystal', 'rainbow', 'nebula_orb', 'magical_tree', 'flower', 'butterfly', 'pearl'],
    'The Final 100th Level of Tile Story! Clear the Master Pyramid to claim the Grand Master Throne!',
    'Tile Story 100. Nihai Bölüm! Büyük Usta Piramidini temizle ve Şampiyonluk Tacını kazan!',
    'celestial_master_throne',
    25,
    96
  )
];
