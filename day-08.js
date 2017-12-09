const R = require("ramda");
const parseInput = input => input.split(/\n/);

const pattern = /([a-z]+) (inc|dec) ([-0-9]+) if ([a-z]+) (<|>|>=|==|<=|!=) ([-0-9]+)$/;

const INSTRUCTIONS = {
  inc: (cur, amount) => cur + amount,
  dec: (cur, amount) => cur - amount
};

const CHECKS = {
  "<": (amount, check) => amount < check,
  ">": (amount, check) => amount > check,
  "<=": (amount, check) => amount <= check,
  ">=": (amount, check) => amount >= check,
  "==": (amount, check) => amount === check,
  "!=": (amount, check) => amount !== check
};

const parseInstruction = input => {
  const result = pattern.exec(input);
  if (result) {
    return {
      register: result[1],
      instruction: result[2],
      amount: parseInt(result[3]),
      checkRegister: result[4],
      check: result[5],
      checkAmount: parseInt(result[6])
    };
  } else {
    throw new Error("Unable to process instruction: " + input);
  }
};

const processInstructions = R.reduce(
  (acc, data) => {
    const newState = Object.assign({}, acc);
    const {
      register,
      instruction,
      amount,
      checkRegister,
      check,
      checkAmount
    } = data;

    if (!newState.hasOwnProperty(checkRegister)) {
      newState[checkRegister] = 0;
    }

    if (!newState.hasOwnProperty(register)) {
      newState[register] = 0;
    }

    if (CHECKS[check].call(null, newState[checkRegister], checkAmount)) {
      newState[register] = INSTRUCTIONS[instruction].call(
        null,
        newState[register],
        amount
      );

      if (newState[register] > newState._highest) {
        newState._highest = newState[register];
      }
    }

    return newState;
  },
  {
    _highest: -Infinity
  }
);

const parseInputIntoInstructions = R.pipe(parseInput, R.map(parseInstruction));

const parseAndProcessInstructions = R.pipe(
  parseInputIntoInstructions,
  processInstructions
);

module.exports = {
  parseInput,
  parseInstruction,
  parseInputIntoInstructions,
  parseAndProcessInstructions
};
