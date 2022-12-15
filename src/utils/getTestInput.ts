import fs from 'fs';

export function getTestInput(day: number) {
  const formattedDay = day < 10 ? `0${day}` : String(day);

  try {
    return fs.readFileSync(`src/day${formattedDay}/test.txt`, 'utf-8');
  } catch (err) {
    console.warn(err);
  }
}
