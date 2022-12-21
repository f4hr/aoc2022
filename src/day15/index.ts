import run from 'aocrunner';

import { getTestInput } from '../utils/index.js';

const DAY = 15;
const PART_1_EXPECTED = 26;
const PART_2_EXPECTED = 56000011;

const parseInput = (rawInput: string) => rawInput.split('\n');

type SensorData = {
  sX: number;
  sY: number;
  bX: number;
  bY: number;
  len: number;
};

const parseSendorData = (data: string): SensorData => {
  const [sX, sY, bX, bY] = data
    .replace(/[^\d,:-]/g, '')
    .replace(/[,:]/g, ' ')
    .split(' ')
    .map(Number);
  const dX = Math.abs(bX - sX);
  const dY = Math.abs(bY - sY);

  return { sX, sY, bX, bY, len: dX + dY };
};

const getCoveredRange = (ranges: number[][]) => {
  let min = ranges[0][0];
  let max = ranges[0][1];

  for (let i = 1; i < ranges.length; i += 1) {
    const [l, r] = ranges[i];

    if (l < min) {
      min = l;
    }
    if (r > max) {
      max = r;
    }
  }

  return max - min;
};

const getUncoveredX = (ranges: number[][], minX: number) => {
  let min = minX;

  ranges.sort((a, b) => a[0] - b[0]);

  for (let i = 0; i < ranges.length; i += 1) {
    const [l, r] = ranges[i];

    if (l > min) {
      break;
    }
    if (l <= min && r > min) {
      min = r;
    }
  }

  return min + 1;
};

const getRanges = (sds: SensorData[], y: number): number[][] => {
  const filteredSensors = sds.filter(({ sY, len }) => Math.abs(sY - y) <= len);

  const ranges: number[][] = [];
  for (let i = 0; i < filteredSensors.length; i += 1) {
    const { sX, sY, len } = filteredSensors[i];

    const dY = Math.abs(sY - y);
    const l = sX - (len - dY);
    const r = sX + (len - dY);

    ranges.push([l, r]);
  }

  return ranges;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const level = 10;

  const sensorsData = input.map(parseSendorData);
  const ranges = getRanges(sensorsData, level);
  const totalRange = getCoveredRange(ranges);

  return totalRange;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const n = 4000000;
  const min = 0;
  const max = 4000000;

  const sensorsData = input.map(parseSendorData);

  let uncoveredRange = 0;
  for (let i = min; i < max; i += 1) {
    const ranges = getRanges(sensorsData, i);
    uncoveredRange = getUncoveredX(ranges, min);
    if (uncoveredRange < max) {
      uncoveredRange *= n;
      uncoveredRange += i;
      break;
    }
  }

  return uncoveredRange;
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
