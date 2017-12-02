const R = require("ramda");

const toNumber = R.compose(R.map(Number), R.split(/\s+/));

const parseInput = input => R.map(toNumber, R.split(/\n/, input));

const rowMaximum = R.reduce(R.max, -Infinity);
const rowMinimum = R.reduce(R.min, Infinity);

const calculateRowChecksum = R.compose(
  R.apply(R.subtract),
  R.applySpec([rowMaximum, rowMinimum])
);

const createChecksumFn = fn => R.compose(R.sum, R.map(fn), parseInput);
const isInteger = num => num === parseInt(num);

const findDivisibles = row => {
  const sorted = R.sort((a, b) => b - a, row);
  const len = sorted.length;
  for (let i = 0; i < len; i++) {
    for (let j = len - 1; j >= 0; j--) {
      const divided = sorted[i] / sorted[j];
      if (i !== j && isInteger(divided)) {
        return [sorted[i], sorted[j]];
      }
    }
  }

  return false;
};

const calculateDivisibleRowChecksum = R.compose(
  R.apply(R.divide),
  findDivisibles
);

const calculateSheetChecksum = createChecksumFn(calculateRowChecksum);

const calculateDivisibleSheetChecksum = createChecksumFn(
  calculateDivisibleRowChecksum
);

module.exports = {
  findDivisibles,
  calculateDivisibleRowChecksum,
  calculateDivisibleSheetChecksum,
  isInteger,
  rowMaximum,
  rowMinimum,
  parseInput,
  calculateRowChecksum,
  calculateSheetChecksum
};
