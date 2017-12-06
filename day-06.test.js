const lib = require("./day-06");

const sampleInput = "0 2 7 0";

const puzzleInput = "11	11	13	7	0	15	5	5	4	4	1	1	7	1	15	11";

describe("Day 6 - Memory Reallocation", () => {
  it("should parse the input", () => {
    expect(lib.parseInput(sampleInput)).toMatchObject([0, 2, 7, 0]);
  });

  it("should process a step", () => {
    expect(lib.processStep([0, 2, 7, 0])).toMatchObject([2, 4, 1, 2]);
    expect(lib.processStep([2, 4, 1, 2])).toMatchObject([3, 1, 2, 3]);
    expect(lib.processStep([3, 1, 2, 3])).toMatchObject([0, 2, 3, 4]);
    expect(lib.processStep([0, 2, 3, 4])).toMatchObject([1, 3, 4, 1]);
    expect(lib.processStep([1, 3, 4, 1])).toMatchObject([2, 4, 1, 2]);
  });

  it("should determine redistribution cycles until repeat", () => {
    const [steps, cycle] = lib.redistributeUntilRepeated([0, 2, 7, 0]);
    expect(steps).toBe(5);
    expect(cycle).toBe(4);
  });

  it("should determine redistribution cycles until repeat", () => {
    const [steps, cycle] = lib.parseAndRedistribute(puzzleInput);
    expect(steps).toBe(4074);
    expect(cycle).toBe(2793);
  });
});
