import run from 'aocrunner';

import { getTestInput } from '../utils/index.js';

const DAY = 9;
const PART_1_EXPECTED = 13;
const PART_2_EXPECTED = 1;

const parseInput = (rawInput: string) => rawInput.split('\n');

const moveKnot = (hX: number, hY: number, tX: number, tY: number) => {
  const dX = hX - tX;
  const dY = hY - tY;
  let tPos = [tX, tY];

  // N-E
  if (dX > 1 && dY > 1) {
    return [hX - 1, hY - 1];
  }
  // S-E
  if (dX > 1 && dY < -1) {
    return [hX - 1, hY + 1];
  }
  // S-W
  if (dX < -1 && dY < -1) {
    return [hX + 1, hY + 1];
  }
  // N-W
  if (dX < -1 && dY > 1) {
    return [hX + 1, hY - 1];
  }
  // E
  if (dX > 1) {
    tPos[0] = hX - 1;
    tPos[1] = hY;
  }
  // W
  if (dX < -1) {
    tPos[0] = hX + 1;
    tPos[1] = hY;
  }
  // S
  if (dY > 1) {
    tPos[1] = hY - 1;
    tPos[0] = hX;
  }
  // N
  if (dY < -1) {
    tPos[1] = hY + 1;
    tPos[0] = hX;
  }
  return tPos;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const tailMap = new Map();

  let [hX, hY] = [0, 0];
  let [tX, tY] = [0, 0];
  input.forEach((motion) => {
    const [dir, stepsRaw] = motion.split(' ');
    const steps = Number(stepsRaw);

    for (let i = 0; i < steps; i += 1) {
      switch (dir) {
        case 'R':
          hX += 1;
          break;
        case 'L':
          hX -= 1;
          break;
        case 'U':
          hY += 1;
          break;
        case 'D':
          hY -= 1;
          break;
        default:
          break;
      }

      [tX, tY] = moveKnot(hX, hY, tX, tY);

      tailMap.set(`${tX}|${tY}`, 1);
    }
  });

  return tailMap.size;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const tailMap = new Map();

  const pos = [0, 0];
  const knots: number[][] = new Array(10).fill([...pos]);

  input.forEach((motion) => {
    const [dir, stepsRaw] = motion.split(' ');
    const steps = Number(stepsRaw);

    for (let i = 0; i < steps; i += 1) {
      switch (dir) {
        case 'R':
          knots[0][0] += 1;
          break;
        case 'L':
          knots[0][0] -= 1;
          break;
        case 'U':
          knots[0][1] += 1;
          break;
        case 'D':
          knots[0][1] -= 1;
          break;
        default:
          break;
      }

      for (let k = 1; k < knots.length; k += 1) {
        const [pX, pY] = knots[k - 1];
        let [cX, cY] = knots[k];
        const newPos = moveKnot(pX, pY, cX, cY);
        knots[k] = newPos;
      }

      const [tX, tY] = knots[knots.length - 1];
      tailMap.set(`${tX}|${tY}`, 1);
    }
  });

  return tailMap.size;
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
