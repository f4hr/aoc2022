import run from 'aocrunner';

import { getTestInput } from '../utils/index.js';

const DAY = 12;
const PART_1_EXPECTED = 31;
const PART_2_EXPECTED = 29;

const parseInput = (rawInput: string) => rawInput.split('\n');

type Pos = {
  x: number;
  y: number;
};

type Node = {
  pos: Pos;
  parent: Node | null;
  cost: number;
  val: string;
};

const START_CHAR = 'S';
const END_CHAR = 'E';

const findStartPoints = (grid: string[], includeAll?: boolean): Node[] => {
  const char = includeAll ? 'a' : START_CHAR;
  const nodes: Node[] = [];
  for (let y = 0; y < grid.length; y += 1) {
    const curr = grid[y];
    for (let x = 0; x < curr.length; x += 1) {
      if (curr[x] === char) {
        nodes.push({ pos: { x, y }, cost: 0, parent: null, val: 'a' });
        if (!includeAll) {
          return nodes;
        }
      }
    }
  }

  return nodes;
};

const getPointElevation = (grid: string[], pos: Pos): number => {
  const char = grid[pos.y][pos.x];
  switch (char) {
    case 'S':
      return 'a'.charCodeAt(0);
    case 'E':
      return 'z'.charCodeAt(0);
    default:
      return char.charCodeAt(0);
  }
};

const isValidDest = (grid: string[], source: Pos, dest: Pos): boolean =>
  getPointElevation(grid, dest) - getPointElevation(grid, source) < 2;

const getValidNeighbours = (grid: string[], node: Node): Node[] => {
  const { pos, parent } = node;
  const { x, y } = pos;
  const neighbours: Node[] = [];
  const newNode = {
    parent: node,
    cost: (parent?.cost || 0) + 1,
  };

  // Left
  if (x > 0) {
    const p = { x: x - 1, y };
    if (isValidDest(grid, pos, p)) {
      const n = { ...newNode, pos: p, val: grid[p.y][p.x] };
      neighbours.push(n);
    }
  }
  // Right
  if (x < grid[0].length - 1) {
    const p = { x: x + 1, y };
    if (isValidDest(grid, pos, p)) {
      const n = { ...newNode, pos: p, val: grid[p.y][p.x] };
      neighbours.push(n);
    }
  }
  // Top
  if (y > 0) {
    const p = { x, y: y - 1 };
    if (isValidDest(grid, pos, p)) {
      const n = { ...newNode, pos: p, val: grid[p.y][p.x] };
      neighbours.push(n);
    }
  }
  // Bottom
  if (y < grid.length - 1) {
    const p = { x, y: y + 1 };
    if (isValidDest(grid, pos, p)) {
      const n = { ...newNode, pos: p, val: grid[p.y][p.x] };
      neighbours.push(n);
    }
  }

  return neighbours;
};

const part1 = (rawInput: string) => {
  const grid = parseInput(rawInput);

  const startPoints = findStartPoints(grid);
  const queue: Node[] = startPoints;
  const visited: string[] = [];

  let destNode: Node | null = null;
  while (queue.length > 0) {
    const curr = queue.shift() as Node;
    const { pos, parent } = curr;
    const currKey = `${pos.x}|${pos.y}`;
    if (!visited.includes(currKey)) {
      if (grid[pos.y][pos.x] === END_CHAR) {
        destNode = curr;
        destNode.cost += parent?.cost || 0;
        break;
      } else {
        visited.push(currKey);
        const currNeighbours = getValidNeighbours(grid, curr);

        queue.push(...currNeighbours);
      }
    }
  }

  return destNode?.cost;
};

const part2 = (rawInput: string) => {
  const grid = parseInput(rawInput);

  const startingPoints = findStartPoints(grid, true);
  const queue: Node[] = startingPoints;
  const visited: string[] = [];

  let destNode: Node | null = null;
  let lastLowest: Node | null = null;
  while (queue.length > 0) {
    const curr = queue.shift() as Node;
    const { pos, parent, val } = curr;
    const currKey = `${pos.x}|${pos.y}`;
    if (!visited.includes(currKey)) {
      if (grid[pos.y][pos.x] === END_CHAR) {
        destNode = curr;
        destNode.cost += parent?.cost || 0;
        break;
      } else {
        visited.push(currKey);
        if (val === 'b') {
          lastLowest = curr;
        }
        const currNeighbours = getValidNeighbours(grid, curr);

        queue.push(...currNeighbours);
      }
    }
  }

  return (destNode?.cost || 0) - (lastLowest?.parent?.cost || 0);
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
