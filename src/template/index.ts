import run from 'aocrunner';

import { getTestInput } from '../utils/index.js';

const DAY = 0;
const PART_1_EXPECTED = 0;
const PART_2_EXPECTED = 0;

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: getTestInput(DAY) || '',
      //   expected: PART_1_EXPECTED,
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: getTestInput(DAY) || '',
      //   expected: PART_2_EXPECTED,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
