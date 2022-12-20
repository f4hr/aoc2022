import run from 'aocrunner';

import { getTestInput } from '../utils/index.js';

const DAY = 14;
const PART_1_EXPECTED = 24;
const PART_2_EXPECTED = 93;

const parseInput = (rawInput: string) => rawInput.split('\n');

type SandUnit = {
  pos: {
    x: number;
    y: number;
  };
  isStatic: boolean;
  isOutOfBounds: boolean;
};

type Screen = {
  minWidth: number;
  maxWidth: number;
  maxHeight: number;
  screen: string[][];
};

const AIR = '.';
const WALL = '#';
const SAND = 'o';

const START_X = 500;
const START_Y = 0;

const parsePath = (path: string) =>
  path.split(' -> ').map((c) => c.split(',').map(Number));

const buildScreen = (paths: number[][][], withFloor?: boolean) => {
  const sX = 500;
  const sY = 0;

  let minWidth = Infinity;
  let maxWidth = 0;
  let minHeight = Infinity;
  let maxHeight = 0;

  const screen: string[][] = [];

  paths.forEach((p) => {
    p.forEach(([x, y]) => {
      if (x < minWidth) {
        minWidth = x;
      }
      if (x > maxWidth) {
        maxWidth = x;
      }
      if (y < minHeight) {
        minHeight = y;
      }
      if (y > maxHeight) {
        maxHeight = y;
      }
    });
  });

  let width = maxWidth - minWidth;
  let height = minHeight + maxHeight;

  if (withFloor) {
    let sXLeftOffset = height - (sX - minWidth);
    minWidth -= sXLeftOffset - 1;
    maxWidth += sXLeftOffset + 1;
    width = height * 2;
  }

  for (let i = 0; i <= maxHeight; i += 1) {
    screen.push(new Array(width + 1).fill(AIR));
  }
  if (withFloor) {
    screen.push(new Array(width + 1).fill(AIR));
    screen.push(new Array(width + 1).fill(WALL));
  }

  screen[sY][sX - minWidth] = '+';

  paths.forEach((path) => {
    for (let i = 1; i < path.length; i += 1) {
      const [pX, pY] = path[i - 1];
      const [cX, cY] = path[i];

      let dX = Math.abs(cX - pX);
      let dY = Math.abs(cY - pY);

      if (dX > 0) {
        const sX = cX > pX ? pX : cX;
        while (dX >= 0) {
          screen[pY][sX - minWidth + dX] = WALL;
          dX -= 1;
        }
      }
      if (dY > 0) {
        const sY = cY > pY ? pY : cY;
        while (dY >= 0) {
          screen[sY + dY][pX - minWidth] = WALL;
          dY -= 1;
        }
      }
    }
  });

  return {
    minWidth,
    maxWidth,
    maxHeight,
    screen,
  };
};

const update = (screen: Screen, sandUnit: SandUnit) => {
  const { screen: s, minWidth, maxWidth } = screen;
  let {
    pos: { x, y },
  } = sandUnit;

  // Bottom
  if (s[y + 1] == null) {
    sandUnit.isOutOfBounds = true;
    return;
  }
  const b = s[y + 1][x - minWidth];
  if (b === WALL || b === SAND) {
    // Bottom left
    const bottomL = s[y + 1][x - minWidth - 1];
    const bottomR = s[y + 1][x - minWidth + 1];
    if (bottomL === AIR) {
      s[y][x - minWidth] = AIR;
      sandUnit.pos.x -= 1;
      return;
    }
    // Bottom right
    if (bottomR === AIR) {
      s[y][x - minWidth] = AIR;
      sandUnit.pos.x += 1;
      return;
    }
    if (
      sandUnit.pos.y + 1 > screen.maxHeight + 2 ||
      sandUnit.pos.x - 1 < minWidth ||
      sandUnit.pos.x + 1 > maxWidth
    ) {
      sandUnit.isOutOfBounds = true;
      return;
    }
    sandUnit.isStatic = true;
    return;
  }
  if (s[y][x - minWidth] !== WALL) {
    s[y][x - minWidth] = AIR;
  }
  s[y + 1][x - minWidth] = SAND;
  sandUnit.pos.y += 1;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const paths = input.map(parsePath);
  const screen = buildScreen(paths);

  const sandUnit: SandUnit = {
    pos: { x: START_X, y: START_Y },
    isStatic: false,
    isOutOfBounds: false,
  };

  let count = 0;

  while (true) {
    update(screen, sandUnit);

    if (sandUnit.isOutOfBounds) {
      break;
    }

    if (sandUnit.isStatic) {
      if (screen.screen[START_Y + 1][START_X] === SAND) {
        break;
      }
      sandUnit.pos.x = START_X;
      sandUnit.pos.y = START_Y;
      sandUnit.isStatic = false;
      count += 1;
    }
  }

  return count;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const paths = input.map(parsePath);
  const screen = buildScreen(paths, true);

  const sandUnit: SandUnit = {
    pos: { x: START_X, y: START_Y },
    isStatic: false,
    isOutOfBounds: false,
  };

  let count = 0;

  while (true) {
    update(screen, sandUnit);

    if (sandUnit.isOutOfBounds) {
      break;
    }

    if (sandUnit.isStatic) {
      count += 1;
      if (sandUnit.pos.x === START_X && sandUnit.pos.y === START_Y) {
        screen.screen[START_Y][START_X - screen.minWidth] = SAND;
        break;
      }
      sandUnit.pos.x = START_X;
      sandUnit.pos.y = START_Y;
      sandUnit.isStatic = false;
    }
  }

  return count;
};

run({
  part1: {
    tests: [
      {
        input: getTestInput(DAY) || '',
        expected: PART_1_EXPECTED,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: getTestInput(DAY) || '',
        expected: PART_2_EXPECTED,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
