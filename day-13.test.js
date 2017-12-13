const lib = require("./day-13");
const util = require("./util");

const sampleInput = `0: 3
1: 2
4: 4
6: 4`;

describe("Day 13 - Packet Scanners", () => {
  describe("Tests", () => {
    it("parses the input line", () => {
      expect(lib.parseLine("0: 3")).toMatchObject([0, 3]);
      expect(lib.parseLine("84: 34")).toMatchObject([84, 34]);
    });

    it("parses input", () => {
      expect(lib.parseInput(sampleInput)).toMatchObject([
        { interval: 3, position: 0 },
        { interval: 2, position: 1 },
        { interval: 4, position: 4 },
        { interval: 4, position: 6 }
      ]);
    });

    it("returns scanners that would hit", () => {
      const scanners = lib.parseInput(sampleInput);
      const hits = lib.hits(0);
      expect(hits(scanners)).toMatchObject([
        { position: 0, interval: 3 },
        { position: 6, interval: 4 }
      ]);
    });

    it("returns scanners that would hit with delay", () => {
      const scanners = lib.parseInput(sampleInput);
      const hits = lib.hits(10);
      expect(hits(scanners)).toHaveLength(0);
    });

    it("calculates the trip score", () => {
      const scanners = lib.parseInput(sampleInput);
      const tripScore = lib.tripScore(0);
      expect(tripScore(scanners)).toBe(24);
    });

    it("calculates trip score with delay", () => {
      const scanners = lib.parseInput(sampleInput);
      const tripScore = lib.tripScore(10);
      expect(tripScore(scanners)).toBe(0);
    });
  });

  describe("Solutions", () => {
    let puzzleInput;

    beforeAll(done => {
      util
        .loadFile("./inputs/day-13")
        .then(data => {
          puzzleInput = data.trim();
        })
        .then(done);
    });

    it("Part 1", () => {
      const scanners = lib.parseInput(puzzleInput);
      const tripScore = lib.tripScore(0);
      expect(tripScore(scanners)).toBe(2264);
    });

    it("Part 2 - Dis gunna take a little bit", () => {
      const scanners = lib.parseInput(puzzleInput);
      const firstSafeTrip = lib.findSafeTrip(scanners);
      expect(firstSafeTrip).toBe(3875838);
    });
  });
});
