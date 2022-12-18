import run from 'aocrunner';

import { getTestInput } from '../utils/index.js';

const DAY = 13;
const PART_1_EXPECTED = 13;
const PART_2_EXPECTED = 140;

const parseInput = (rawInput: string) => rawInput;

const parsePackets = (packets: string[]) => packets.map((p) => JSON.parse(p));

const comparePackets = (
  l: number[] | number,
  r: number[] | number,
): boolean | null => {
  if (!Array.isArray(l)) {
    return comparePackets([l], r);
  }
  if (!Array.isArray(r)) {
    return comparePackets(l, [r]);
  }
  if (l.length === 0 && r.length > 0) {
    return true;
  }

  const len = l.length > r.length ? l.length : r.length;

  for (let i = 0; i < len; i += 1) {
    const lItem = l[i];
    const rItem = r[i];

    if (lItem === undefined) {
      return true;
    }
    if (rItem === undefined) {
      return false;
    }

    if (Array.isArray(lItem) || Array.isArray(rItem)) {
      const nested = comparePackets(lItem, rItem);
      if (nested === null) {
        continue;
      } else {
        return nested;
      }
    }
    if (lItem === rItem) {
      continue;
    }
    return lItem < rItem;
  }

  return null;
};

const part1 = (rawInput: string) => {
  const pairs = parseInput(rawInput).split('\n\n');

  let count = 0;
  pairs.forEach((pair, idx) => {
    const [l, r] = parsePackets(pair.split('\n'));
    const isValid = comparePackets(l, r);
    if (isValid) {
      count += idx + 1;
    }
  });

  return count;
};

const part2 = (rawInput: string) => {
  const packets = parseInput(rawInput).replace(/\n\n/g, '\n').split('\n');

  const ordered = [];
  const queue = parsePackets(packets);
  while (queue.length > 0) {
    const l = queue.shift();

    let isInRightOrder = true;
    for (let i = 0; i < queue.length; i += 1) {
      const r = queue[i];
      if (!comparePackets(l, r)) {
        queue.push(l);
        isInRightOrder = false;
        break;
      }
    }

    if (isInRightOrder) {
      ordered.push(l);
    }
  }

  queue.push([[2]], [[6]]);
  let key = 1;
  let shift = 1;
  while (queue.length > 0) {
    const curr = queue.shift();

    key *= ordered.findIndex((p) => comparePackets(curr, p)) + shift;
    shift += 1;
  }

  return key;
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
