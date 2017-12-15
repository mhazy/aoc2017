const R = require("ramda");
const { KnotHasher } = require("./day-10");

const parseIntFlipped = R.flip(parseInt);

const leftPad = (n, char, str) =>
  Array(Math.max(n - str.length, 0))
    .fill(char)
    .concat([str])
    .join("");

const _leftPad = R.curry(leftPad);

const charToBinary = R.pipe(
  R.call(parseIntFlipped, 16),
  R.invoker(1, "toString")(2),
  _leftPad(4, "0"),
  R.split(""),
  R.map(Number)
);

const stringToBinary = R.pipe(R.split(""), R.map(charToBinary), R.flatten);

const generateHash = input => {
  const hasher = new KnotHasher();
  const hash = hasher.hash(input);
  return hash;
};

const generateInputs = input =>
  R.map(num => `${input}-${num}`, R.range(0, 128));

const hashToBinary = R.pipe(generateHash, stringToBinary);

const generateHashes = R.pipe(generateInputs, R.map(hashToBinary), R.flatten);

const usedSquares = R.pipe(generateHashes, R.filter(R.equals(1)), R.length);

const indexToCoords = i => {
  const x = i % 128;
  const y = Math.floor(i / 128);
  return [x, y];
};

const coordsToIndex = (x, y) => {
  return x + y * 128;
};

const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

const checkIndices = (index, grid) => {
  const [x, y] = indexToCoords(index);
  return directions
    .map(([cx, cy]) => [cx + x, cy + y])
    .filter(([cx, cy]) => cx >= 0 && cx < 128 && cy >= 0 && cy < 128)
    .map(([cx, cy]) => coordsToIndex(cx, cy))
    .filter(i => grid[i] === 1);
};

// This is a bit loopy, but, hey.. it works :D
const regionCounter = grid => {
  const gridCopy = grid.concat();
  let i = 0;
  let len = gridCopy.length;
  let groups = 0;
  while (i < len) {
    if (gridCopy[i] === 1) {
      let queue = [i];
      let j = 0;
      let checkLen = 1;
      while (j < queue.length) {
        let k = j;
        const neighbours = checkIndices(queue[j], gridCopy);
        queue = queue.concat(neighbours);
        checkLen = queue.length;
        while (k < checkLen) {
          gridCopy[queue[k]] = 0;
          k = k + 1;
        }
        j = j + 1;
      }
      groups = groups + 1;
    }
    i = i + 1;
  }
  return groups;
};

const countRegions = R.pipe(generateHashes, regionCounter);

module.exports = {
  hashToBinary,
  generateHash,
  generateHashes,
  usedSquares,
  countRegions
};
