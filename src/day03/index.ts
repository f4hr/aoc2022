import run from 'aocrunner';

import { getTestInput } from '../utils/index.js';

const DAY = 3;
const PART_1_EXPECTED = 157;
const PART_2_EXPECTED = 70;

const parseInput = (rawInput: string) => rawInput.split('\n');

const lowerCaseShift = 96;
const upperCaseShift = 38;

function getCharCode(char: string) {
  let charCode = char.charCodeAt(0);
  charCode -= char === char.toUpperCase() ? upperCaseShift : lowerCaseShift;
  return charCode;
}

function findSharedItem(lines: string[][]): [string, number] {
  const [firstLine, ...rest] = lines;

  const sharedItem =
    firstLine.find((item) => {
      let hasSharedItem = true;

      for (let i = 0; i < rest.length; i += 1) {
        if (!rest[i].includes(item)) {
          hasSharedItem = false;
          break;
        }
      }

      return hasSharedItem;
    }) || '';

  return [sharedItem, getCharCode(sharedItem)];
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const normalize = (line: string) => [
    Array.from(line.slice(0, line.length / 2)),
    Array.from(line.slice(line.length / 2)),
  ];
  const map = input.map((line) => findSharedItem(normalize(line)));

  return map.reduce((total, [_k, v]) => total + v, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const normalize = (lines: string[]) => {
    const chunks = [];
    for (let i = 0; i < lines.length; i += 3) {
      chunks.push(lines.slice(i, i + 3).map((l) => Array.from(l)));
    }
    return chunks;
  };
  const map = normalize(input).map((ls) => findSharedItem(ls));

  return map.reduce((total, [_k, v]) => total + v, 0);
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
