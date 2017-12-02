const R = require("ramda");

const toNumber = R.compose(R.map(Number), R.split(" "));

const parseInput = input => R.map(toNumber, R.split("\n", input));

const rowMaximum = R.reduce(R.max, -Infinity);
const rowMinimum = R.reduce(R.min, Infinity);

const calculateRowChecksum = R.compose(
  R.apply(R.subtract),
  R.applySpec([rowMaximum, rowMinimum])
);

const calculateSheetChecksum = R.compose(
  R.sum,
  R.map(calculateRowChecksum),
  parseInput
);

module.exports = {
  rowMaximum,
  rowMinimum,
  parseInput,
  calculateRowChecksum,
  calculateSheetChecksum
};
