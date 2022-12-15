import run from 'aocrunner';

import { getTestInput } from '../utils/index.js';

const DAY = 8;
const PART_1_EXPECTED = 21;
const PART_2_EXPECTED = 8;

const parseInput = (rawInput: string) => rawInput.split('\n');

const checkVertical = (
  grid: string[],
  x: number,
  y: number,
  height: number,
) => {
  let isVisible = true;
  for (let r = 0; r < y; r += 1) {
    const row = grid[r];

    if (height <= Number(row[x])) {
      isVisible = false;
      break;
    }
  }
  if (isVisible) {
    return true;
  }
  isVisible = true;
  for (let r = grid.length - 1; r > y; r -= 1) {
    const row = grid[r];

    if (height <= Number(row[x])) {
      isVisible = false;
      break;
    }
  }

  return isVisible;
};

const checkHorizontal = (
  grid: string[],
  x: number,
  y: number,
  height: number,
) => {
  const row = grid[y];

  let isVisible = true;
  for (let c = 0; c < x; c += 1) {
    if (height <= Number(row[c])) {
      isVisible = false;
      break;
    }
  }
  if (isVisible) {
    return true;
  }
  isVisible = true;
  for (let c = row.length - 1; c > x; c -= 1) {
    if (height <= Number(row[c])) {
      isVisible = false;
      break;
    }
  }

  return isVisible;
};

const calcHorizontalScore = (
  grid: string[],
  x: number,
  y: number,
  height: number,
) => {
  const row = grid[y];

  let leftCount = 0;
  for (let c = x - 1; c >= 0; c -= 1) {
    leftCount += 1;
    if (height <= Number(row[c])) {
      break;
    }
  }
  let rightCount = 0;
  for (let c = x + 1; c < row.length; c += 1) {
    rightCount += 1;
    if (height <= Number(row[c])) {
      break;
    }
  }

  return leftCount * rightCount;
};

const calcVerticalScore = (
  grid: string[],
  x: number,
  y: number,
  height: number,
) => {
  let topCount = 0;
  for (let r = y - 1; r >= 0; r -= 1) {
    const row = grid[r];

    topCount += 1;
    if (height <= Number(row[x])) {
      break;
    }
  }
  let bottomCount = 0;
  for (let r = y + 1; r < grid.length; r += 1) {
    const row = grid[r];

    bottomCount += 1;
    if (height <= Number(row[x])) {
      break;
    }
  }

  return topCount * bottomCount;
};

const getEdgeCount = (grid: string[]) =>
  grid.length * grid[0].length - (grid.length - 2) * (grid[0].length - 2);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const edgeCount = getEdgeCount(input);

  let count = 0;
  for (let r = 1; r < input.length - 1; r += 1) {
    const row = input[r];
    for (let c = 1; c < row.length - 1; c += 1) {
      const currHeight = Number(input[r][c]);

      if (checkVertical(input, c, r, currHeight)) {
        count += 1;
        continue;
      }
      if (checkHorizontal(input, c, r, currHeight)) {
        count += 1;
        continue;
      }
    }
  }

  return edgeCount + count;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let maxScore = 0;
  for (let r = 1; r < input.length - 1; r += 1) {
    const row = input[r];
    for (let c = 1; c < row.length - 1; c += 1) {
      const currHeight = Number(input[r][c]);

      const xScore = calcHorizontalScore(input, c, r, currHeight);
      const yScore = calcVerticalScore(input, c, r, currHeight);
      const currScore = xScore * yScore;

      if (currScore > maxScore) {
        maxScore = currScore;
      }
    }
  }

  return maxScore;
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
