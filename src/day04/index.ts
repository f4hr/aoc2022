import run from 'aocrunner';

import { getTestInput } from '../utils/index.js';

const DAY = 4;
const PART_1_EXPECTED = 2;
const PART_2_EXPECTED = 4;

const parseInput = (rawInput: string) => rawInput.split('\n');

function getPair(line: string) {
  return line.split(',').map((p) => p.split('-').map((n) => Number(n)));
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((total, line) => {
    const [[aMin, aMax], [bMin, bMax]] = getPair(line);

    if (aMin <= bMin && aMax >= bMax) {
      return total + 1;
    }
    if (bMin <= aMin && bMax >= aMax) {
      return total + 1;
    }

    return total;
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((total, line) => {
    const [[aMin, aMax], [bMin, bMax]] = getPair(line);

    if (aMin <= bMin && aMax >= bMin) {
      return total + 1;
    }
    if (bMin <= aMin && bMax >= aMin) {
      return total + 1;
    }

    return total;
  }, 0);
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
