const lib = require("./day-03");

const puzzleAnser = 349975;
const puzzleInput = 347991;

describe("Day 3 - Sprial Memory", () => {
  it("calculates the ring a number is located within", () => {
    expect(lib.calculateRing(9)).toBe(1);
    expect(lib.calculateRing(2)).toBe(1);
    expect(lib.calculateRing(1)).toBe(0);
    expect(lib.calculateRing(22)).toBe(2);
    expect(lib.calculateRing(26)).toBe(3);
    expect(lib.calculateRing(1024)).toBe(16);
  });

  it("calculates which quadrant a number is within it's ring", () => {
    expect(lib.calculateQuadrant(21)).toBe(2);
    expect(lib.calculateQuadrant(9)).toBe(3);
    expect(lib.calculateQuadrant(4)).toBe(1);
    expect(lib.calculateQuadrant(13)).toBe(0);
  });

  it("calculates which position with a quadrant a number is within", () => {
    expect(lib.calculatePosition(3)).toMatchObject([1, 1]);
    expect(lib.calculatePosition(10)).toMatchObject([2, -1]);
    expect(lib.calculatePosition(13)).toMatchObject([2, 2]);
    expect(lib.calculatePosition(12)).toMatchObject([2, 1]);
    expect(lib.calculatePosition(16)).toMatchObject([-1, 2]);
    expect(lib.calculatePosition(17)).toMatchObject([-2, 2]);
    expect(lib.calculatePosition(18)).toMatchObject([-2, 1]);
    expect(lib.calculatePosition(21)).toMatchObject([-2, -2]);
    expect(lib.calculatePosition(23)).toMatchObject([0, -2]);
    expect(lib.calculatePosition(22)).toMatchObject([-1, -2]);
    expect(lib.calculatePosition(25)).toMatchObject([2, -2]);
    expect(lib.calculatePosition(37)).toMatchObject([-3, 3]);
    expect(lib.calculatePosition(31)).toMatchObject([3, 3]);
  });

  it("calculates the distance for a number", () => {
    expect(lib.calculateDistance(1)).toBe(0);
    expect(lib.calculateDistance(12)).toBe(3);
    expect(lib.calculateDistance(23)).toBe(2);
    expect(lib.calculateDistance(31)).toBe(6);
    expect(lib.calculateDistance(1024)).toBe(31);
  });

  it("calculates the day three, part one, solution", () => {
    expect(lib.calculateDistance(347991)).toBe(480);
  });

  it("generates object with grid items", () => {
    const grid = lib.generateGrid(2);
    expect(grid.byIndex.length).toBe(25);
  });

  it("calculates the correct value for a given position", () => {
    const grid = lib.generateGrid(3);
    expect(grid.valueAtPosition(-2, -2)).toBe(362);
    expect(grid.valueAtPosition(-2, -1)).toBe(351);
  });

  it("calculates the day three, part two, solution", () => {
    const grid = lib.generateGrid(100);
    const result = grid.findGreatestAfter(puzzleInput);
    expect(result).toBe(puzzleAnser);
  });

  it("calcuates nearest odd square", () => {
    expect(lib.findNearestOddSquare(24)).toBe(5);
    expect(lib.findNearestOddSquare(21)).toBe(5);
    expect(lib.findNearestOddSquare(25)).toBe(5);
  });

  it("calculates the day three, part one, solution in a different way", () => {
    expect(lib.findDistanceAlternate(1)).toBe(0);
    expect(lib.findDistanceAlternate(12)).toBe(3);
    expect(lib.findDistanceAlternate(23)).toBe(2);
    expect(lib.findDistanceAlternate(31)).toBe(6);
    expect(lib.findDistanceAlternate(1024)).toBe(31);
    expect(lib.findDistanceAlternate(347991)).toBe(480);
  });
});
