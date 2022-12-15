import run from 'aocrunner';

import { getTestInput } from '../utils/index.js';

const DAY = 6;
const PART_1_EXPECTED = 7;
const PART_2_EXPECTED = 19;

const parseInput = (rawInput: string) => rawInput;

const getMarkerStartIndex = (stream: string, ml: number) => {
  let markerIndex = 0;

  for (let i = 0; i < stream.length - ml; i += 1) {
    const first = stream[i];
    const marker = [first];
    for (let j = 1; j < ml; j += 1) {
      const curr = stream[i + j];
      if (marker.includes(curr)) {
        break;
      }
      marker.push(curr);
    }
    if (marker.length === ml) {
      markerIndex = i;
      break;
    }
  }

  return markerIndex;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return getMarkerStartIndex(input, 4) + 4;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return getMarkerStartIndex(input, 14) + 14;
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
