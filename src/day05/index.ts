import run from 'aocrunner';

import { getTestInput } from '../utils/index.js';

const DAY = 5;
const PART_1_EXPECTED = 'CMZ';
const PART_2_EXPECTED = 'MCD';

const parseInput = (rawInput: string) => rawInput.split('\n\n');

const S_WIDTH = 4;

function parseStacks(rawStacks: string[]) {
  const stacks = rawStacks.slice(0, -1).reverse();
  const [stackNum] = rawStacks
    .slice(-1)
    .map((lines) => lines.trim())
    .map((lines) => Number(lines[lines.length - 1]));

  const parsedStacks = [];
  for (let i = 0; i < stacks.length; i += 1) {
    const curr = stacks[i];
    const stack = [];
    for (let j = 0; j < stackNum; j += 1) {
      const start = j * S_WIDTH;
      const item = curr.slice(start, start + S_WIDTH).replace(/\W/g, '');
      stack.push(item);
    }
    parsedStacks.push(stack);
  }
  const normalizedStacks = [];
  for (let i = 0; i < stackNum; i += 1) {
    const stack = [];
    for (let j = 0; j < stacks.length; j += 1) {
      const curr = parsedStacks[j][i];
      if (curr !== '') {
        stack.push(curr);
      } else {
        break;
      }
    }
    normalizedStacks.push(stack);
  }

  return normalizedStacks;
}

function parseOps(rawOps: string[]) {
  const ops = rawOps.map((line) =>
    line
      .replace(/[a-zA-Z]/g, '')
      .trim()
      .split('  ')
      .map((d) => Number(d)),
  );
  return ops;
}

function rearrangeByOne(op: number[], stacks: string[][]) {
  const [n, from, to] = op;

  let count = n;
  while (count > 0) {
    stacks[to - 1].push(stacks[from - 1].pop() || '');
    count -= 1;
  }
}

function rearrangeByStack(op: number[], stacks: string[][]) {
  const [n, from, to] = op;

  stacks[to - 1].push(...stacks[from - 1].slice(-n));
  stacks[from - 1] = stacks[from - 1].slice(0, -n);
}

function getTopItems(stacks: string[][]) {
  return stacks.map((curr) => curr[curr.length - 1]).join('');
}

const part1 = (rawInput: string) => {
  const [rawStacks, rawOps] = parseInput(rawInput);

  const stacks = parseStacks(rawStacks.split('\n'));
  const ops = parseOps(rawOps.split('\n').slice(0, -1));
  ops.forEach((op) => rearrangeByOne(op, stacks));

  return getTopItems(stacks);
};

const part2 = (rawInput: string) => {
  const [rawStacks, rawOps] = parseInput(rawInput);

  const stacks = parseStacks(rawStacks.split('\n'));
  const ops = parseOps(rawOps.split('\n').slice(0, -1));
  ops.forEach((op) => rearrangeByStack(op, stacks));

  return getTopItems(stacks);
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
  trimTestInputs: false,
  onlyTests: false,
});
