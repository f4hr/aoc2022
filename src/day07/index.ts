import run from 'aocrunner';

import { getTestInput } from '../utils/index.js';

const DAY = 7;
const PART_1_EXPECTED = 95437;
const PART_2_EXPECTED = 24933642;

const parseInput = (rawInput: string) => rawInput.split('\n');

type Node = {
  name: string;
  type: 'dir' | 'file';
  size: number;
  parent: Node | null;
  children?: Node[];
};

const parseLine = (line: string, parent: Node): Node => {
  const [meta, name] = line.split(' ');
  const node = {} as Node;

  node.name = name;
  node.parent = parent;
  node.type = meta === 'dir' ? 'dir' : 'file';
  if (node.type === 'dir') {
    node.children = [];
    node.size = 0;
  } else {
    node.size = Number(meta);
    parent.size += node.size;
  }

  return node;
};

const calcNodeSize = (
  node: Node,
  dirList: { name: string; size: number }[],
): [number, { name: string; size: number }[]] => {
  if (node.type === 'file') {
    return [node.size || 0, dirList];
  }

  const size =
    node.children?.reduce(
      (total, curr) => total + calcNodeSize(curr, dirList)[0],
      0,
    ) || 0;
  dirList.push({ name: node.name, size });

  return [size, dirList];
};

const changeDir = (node: Node, dir: string): Node | null => {
  if (dir === '..') {
    return node.parent;
  }
  if (node.name === dir) {
    return node;
  }

  return node.children?.find((n) => n.type === 'dir' && n.name === dir) || null;
};

const generateFileTree = (input: string[]): Node => {
  const tree: Node = {
    name: '/',
    type: 'dir',
    children: [],
    parent: null,
    size: 0,
  };

  let currNode = tree;
  input.forEach((line) => {
    if (line[0] === '$') {
      const [, command, param] = line.split(' ');

      if (command === 'cd') {
        currNode = changeDir(currNode, param) || currNode;
      }
    } else {
      const node = parseLine(line, currNode);
      currNode.children?.push(node);
    }
  });

  return tree;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const sizeLimit = 100000;

  const tree = generateFileTree(input);

  const [_usedSpace, dirs] = calcNodeSize(tree, []);

  return dirs
    .filter((n) => n.size <= sizeLimit)
    .reduce((t, c) => t + c.size, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const totalSpace = 70000000;
  const requiredSpace = 30000000;

  const tree = generateFileTree(input);

  const [usedSpace, dirs] = calcNodeSize(tree, []);
  const targetSpace = requiredSpace - (totalSpace - usedSpace);

  let delta = usedSpace;
  let optimalDirSize = usedSpace;
  dirs.forEach((dir) => {
    const currDelta = dir.size - targetSpace;

    if (currDelta >= 0 && currDelta < delta) {
      delta = currDelta;
      optimalDirSize = dir.size;
    }
  });

  return optimalDirSize;
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
