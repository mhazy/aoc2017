const R = require("ramda");

const toNumber = R.compose(R.map(Number), R.split(/\s+/));

const parseInput = input => R.map(toNumber, R.split(/\n/, input));

const getMinMax = R.compose(
  R.applySpec([R.last, R.head]),
  R.sort((a, b) => a - b)
);
const calculateRowChecksum = R.compose(R.apply(R.subtract), getMinMax);

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
  getMinMax,
  parseInput,
  calculateRowChecksum,
  calculateSheetChecksum
};
