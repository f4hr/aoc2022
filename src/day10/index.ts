import run from 'aocrunner';

import { getTestInput, log } from '../utils/index.js';

const DAY = 10;
const PART_1_EXPECTED = 13140;
const PART_2_EXPECTED = `##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`;

const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const cycles: { [key: string]: number } = {
    '20': 20,
    '60': 60,
    '100': 100,
    '140': 140,
    '180': 180,
    '220': 220,
  };

  let cycle = 0;
  let val = 1;
  const incCycle = () => {
    cycle += 1;

    if (Object.keys(cycles).includes(String(cycle))) {
      cycles[cycle] *= val;
    }
  };

  input.forEach((line) => {
    const [instr, param] = line.split(' ');

    if (instr === 'noop') {
      incCycle();
    } else {
      incCycle();
      incCycle();
      val += Number(param);
    }
  });

  return Object.values(cycles).reduce((t, v) => t + v, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const rows = 6;
  const cols = 40;

  const image = new Array(rows * cols).fill('.');

  let val = 1;

  let rowShift = 0;
  let cycle = 0;
  const incCycle = () => {
    if (Math.abs(cycle - rowShift * cols - val) < 2) {
      image[cycle] = '#';
    }
    if ((cycle + 1) % cols === 0) {
      rowShift += 1;
    }
    cycle += 1;
  };

  input.forEach((line) => {
    const [instr, param] = line.split(' ');

    if (instr === 'noop') {
      incCycle();
    } else {
      incCycle();
      incCycle();
      val += Number(param);
    }
  });

  // Draw image on screen
  const screen: string[] = [];
  for (let i = 0; i < rows; i += 1) {
    const row = [];

    let colCount = 0;
    while (colCount < cols) {
      row.push(image[cols * i + colCount]);
      colCount += 1;
    }
    colCount = 0;
    screen.push(row.join(''));
  }

  // TODO: parse letters from image
  //   return 'RZEKEFHA';

  // For tests
  return screen.join('\n');
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
