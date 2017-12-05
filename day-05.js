const R = require("ramda");

const parseInput = input => input.split(/\s+/).map(Number);

// FIXME: Something more... functional?

const processInstructions = (input, weird = false) => {
  let instructions = parseInput(input);
  let curIndex = 0;
  let willExit = false;
  let steps = 1;

  while (true) {
    // Store the previous index before before we jump
    const prevIndex = curIndex;

    // Jump to the next ("Process the instruction")
    curIndex = curIndex + instructions[curIndex];

    // Increment/decrement our previous position
    if (instructions[prevIndex] >= 3 && weird) {
      instructions[prevIndex] = instructions[prevIndex] - 1;
    } else {
      instructions[prevIndex] = instructions[prevIndex] + 1;
    }

    // Increment steps taken
    steps = steps + 1;

    // Would this instruction put us outside?
    if (curIndex + instructions[curIndex] > instructions.length - 1) {
      return steps;
    }
  }

  return steps;
};

module.exports = {
  parseInput,
  processInstructions
};
