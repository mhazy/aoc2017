const R = require("ramda");

const parseInput = input => input.split(/\s+/).map(Number);

const processStep = allocations => {
  const newAllocations = [...allocations];
  const total = allocations.length;
  let max = -Infinity;
  let index = -1;
  for (let i = 0; i < total; i++) {
    // If it's larger, store it and update index
    if (allocations[i] > max) {
      index = i;
      max = allocations[i];
    }
  }

  newAllocations[index] = 0;
  let toDistrubute = max;
  while (toDistrubute > 0) {
    index = index + 1;
    toDistrubute = toDistrubute - 1;
    newAllocations[index % total] = newAllocations[index % total] + 1;
  }

  return newAllocations;
};

const redistributeUntilRepeated = allocations => {
  let steps = 0;
  const redistributionsSeen = {};
  let previousAllocations = [...allocations];
  while (true) {
    steps = steps + 1;
    // Have we seen the current?
    let newAllocations = processStep(previousAllocations);
    const allocationsKey = newAllocations.join(",");
    if (redistributionsSeen.hasOwnProperty(allocationsKey)) {
      return [steps, steps - redistributionsSeen[allocationsKey]];
    }

    redistributionsSeen[allocationsKey] = steps;
    previousAllocations = newAllocations;
  }
};

const parseAndRedistribute = R.compose(redistributeUntilRepeated, parseInput);

module.exports = {
  processStep,
  parseInput,
  redistributeUntilRepeated,
  parseAndRedistribute
};
