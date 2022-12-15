import run from 'aocrunner';

import { getTestInput } from '../utils/index.js';

const DAY = 1;
const PART_1_EXPECTED = 24000;
const PART_2_EXPECTED = 45000;

const parseInput = (rawInput: string) => rawInput.split('\n\n');

const getCaloriesPerElf = (lines: string[]) =>
  lines.map((lines) => lines.split('\n').map((line) => Number(line)));

function calcTotalCaloriesPerElf(elvesWithCalories: number[][]) {
  return elvesWithCalories.map((elf) =>
    elf.reduce((total, curr) => total + curr, 0),
  );
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const caloriesPerElf = getCaloriesPerElf(input);
  const totalCaloriesPerElf = calcTotalCaloriesPerElf(caloriesPerElf);

  return totalCaloriesPerElf.sort((a, b) => b - a)[0];
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const caloriesPerElf = getCaloriesPerElf(input);
  const totalCaloriesPerElf = calcTotalCaloriesPerElf(caloriesPerElf);

  return totalCaloriesPerElf
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((total, curr) => total + curr, 0);
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
