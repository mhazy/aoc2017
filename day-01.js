const inputToArray = input => input.split("").map(Number);

const calculateDoorCode = (input, offset = 1) => {
  const parsedInput = inputToArray(input);
  return parsedInput.reduce(
    (acc, val, pos) =>
      getPairWithOffset(parsedInput, offset, pos) === val ? acc + val : acc,
    0
  );
};

const getPairWithOffset = (input, offset, pos) =>
  input[(pos + offset) % input.length];

module.exports = { inputToArray, calculateDoorCode, getPairWithOffset };
