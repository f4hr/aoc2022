import run from 'aocrunner';

import { getTestInput } from '../utils/index.js';

const DAY = 2;
const PART_1_EXPECTED = 15;
const PART_2_EXPECTED = 12;

const parseInput = (rawInput: string) => rawInput.split('\n');

const shapeMap: { [key: string]: number } = {
  A: 1, // Rock
  B: 2, // Paper
  C: 3, // Scissors
  X: 1, // Lose
  Y: 2, // Draw
  Z: 3, // Win
};
const getShapeValue = (shape: string) => shapeMap[shape];
const getWinShapeVal = (shape: string) => {
  switch (shape) {
    case 'C':
      return shapeMap['A'];
    default:
      return shapeMap[shape] + 1;
  }
};
const getLoseShapeVal = (shape: string) => {
  switch (shape) {
    case 'A':
      return shapeMap['C'];
    default:
      return shapeMap[shape] - 1;
  }
};
const outcomeMap: { [key: string]: number } = {
  X: 0, // Lose
  Y: 3, // Draw
  Z: 6, // Win
};
const getOutcomeValue = (outcome: string) => outcomeMap[outcome];

function calcScoreForPair([shape1, shape2]: string[]) {
  const shape1Val = getShapeValue(shape1);
  const shape2Val = getShapeValue(shape2);

  const diff = shape2Val - shape1Val;
  // Draw
  if (diff === 0) {
    return 3 + shape2Val;
  }
  switch (shape2Val) {
    case 1:
      return diff !== -1 ? shape2Val + 6 : shape2Val;
    default:
      return diff === 1 ? shape2Val + 6 : shape2Val;
  }
}

function calcOutcomeForPair([shape, outcome]: string[]) {
  const shapeVal = getShapeValue(shape);
  const outcomeVal = getOutcomeValue(outcome);

  switch (outcome) {
    case 'Y': // Draw
      return outcomeVal + shapeVal;
    case 'X': // Lose
      return outcomeVal + getLoseShapeVal(shape);
    default:
      return outcomeVal + getWinShapeVal(shape);
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const pairs = input.map((line) => line.split(' '));

  return pairs
    .map((pair) => calcScoreForPair(pair))
    .reduce((total, curr) => total + curr, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const pairs = input.map((line) => line.split(' '));

  return pairs
    .map((pair) => calcOutcomeForPair(pair))
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
