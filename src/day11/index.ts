import run from 'aocrunner';

import { getTestInput } from '../utils/index.js';

const DAY = 11;
const PART_1_EXPECTED = 10605;
const PART_2_EXPECTED = 2713310158;

const parseInput = (rawInput: string) => rawInput.split('\n\n');

interface Monkey {
  items: number[];
  operation: string[];
  test: {
    cond: number;
    ifTrue: number;
    ifFalse: number;
  };
  inspectCount: 0;
}

const parseItems = (line: string) => {
  return line
    .split(':')[1]
    .split(',')
    .map((n) => Number(n));
};

const parseOperation = (line: string) => {
  return line.trim().split(' ').slice(4);
};

const parseTest = (lines: string[]) => {
  const [condRaw, ifTrueRaw, ifFalseRaw] = lines;

  const cond = condRaw.split(' ').at(-1);
  const ifTrue = ifTrueRaw.split(' ').at(-1);
  const ifFalse = ifFalseRaw.split(' ').at(-1);

  return {
    cond: Number(cond),
    ifTrue: Number(ifTrue),
    ifFalse: Number(ifFalse),
  };
};

const parseMonkeys = (input: string[]): Monkey[] => {
  return input.map((line) => {
    const [_name, startItemsRaw, operationRaw, ...testRaw] = line.split('\n');

    const startItems = parseItems(startItemsRaw);
    const operation = parseOperation(operationRaw);
    const test = parseTest(testRaw);

    return {
      items: startItems,
      operation,
      test,
      inspectCount: 0,
    };
  });
};

const evalOperation = (operation: string[], operand: number) => {
  const [op, numRaw] = operation;

  if (numRaw === 'old') {
    return operand * operand;
  }

  const num = Number(numRaw);
  switch (op) {
    case '+':
      return operand + num;
    case '*':
      return operand * num;
    default:
      return operand;
  }
};

const getTwoMostActive = (monkeys: Monkey[]) =>
  monkeys
    .map((m) => m.inspectCount)
    .sort((a, b) => b - a)
    .slice(0, 2);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const monkeys = parseMonkeys(input);

  let rounds = 20;
  while (rounds > 0) {
    for (let i = 0; i < monkeys.length; i += 1) {
      const curr = monkeys[i];
      const { items, operation, test } = curr;

      while (items.length > 0) {
        const item = items.shift() || 0;
        const worryLevel = Math.floor(evalOperation(operation, item) / 3);

        if (worryLevel % test.cond === 0) {
          monkeys[test.ifTrue].items.push(worryLevel);
        } else {
          monkeys[test.ifFalse].items.push(worryLevel);
        }

        curr.inspectCount += 1;
      }
    }
    rounds -= 1;
  }

  const mostActive = getTwoMostActive(monkeys);

  return mostActive.reduce((t, c) => t * c, 1);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const monkeys = parseMonkeys(input);

  const magicNumber = monkeys.reduce((t, m) => t * m.test.cond, 1);

  let rounds = 10000;
  while (rounds > 0) {
    for (let i = 0; i < monkeys.length; i += 1) {
      const curr = monkeys[i];
      const { items, operation, test } = curr;

      while (items.length > 0) {
        const item = items.shift() || 0;
        const worryLevel = evalOperation(operation, item) % magicNumber;

        if (worryLevel % test.cond === 0) {
          monkeys[test.ifTrue].items.push(worryLevel);
        } else {
          monkeys[test.ifFalse].items.push(worryLevel);
        }

        curr.inspectCount += 1;
      }
    }
    rounds -= 1;
  }

  const mostActive = getTwoMostActive(monkeys);

  return mostActive.reduce((t, c) => t * c, 1);
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
