const lib = require("./day-05");
const util = require("./util");
const sample = `0
3
0
1
-3`;

describe("Day 5 - A Maze of Twisty Trampolines, All Alike", () => {
  let puzzleInput;
  beforeAll(done => {
    util
      .loadFile("./inputs/day-05")
      .then(data => {
        puzzleInput = data.trim();
      })
      .then(done);
  });
  it("parses the input correctly", () => {
    expect(lib.parseInput(sample)).toMatchObject([0, 3, 0, 1, -3]);
  });

  it("processes input and returns number of steps", () => {
    expect(lib.processInstructions(sample)).toBe(5);
  });

  it("processes input and returns number of steps for the weird one", () => {
    expect(lib.processInstructions(sample, true)).toBe(10);
  });

  it("process the day five, part one, puzzle input", () => {
    expect(lib.processInstructions(puzzleInput)).toBe(375042);
  });

  it("process the day five, part two, puzzle input", () => {
    expect(lib.processInstructions(puzzleInput, true)).toBe(28707598);
  });
});
