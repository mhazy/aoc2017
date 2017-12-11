const lib = require("./day-11");
const util = require("./util");

describe("Day 11 - Hex Ed", () => {
  describe("Tests", () => {
    it("returns correct coordinate after change", () => {
      expect(lib.move({ x: 0, y: 0, z: 0 }, "ne")).toMatchObject({
        x: 1,
        y: 0,
        z: -1
      });
    });

    it("has correct coordinates after multiple moves", () => {
      const testSet = [
        {
          final: { x: 3, y: 0, z: -3 },
          moves: ["ne", "ne", "ne"]
        },
        {
          final: { x: 0, y: 0, z: 0 },
          moves: ["ne", "ne", "sw", "sw"]
        },
        {
          final: { x: 2, y: -2, z: 0 },
          moves: ["ne", "ne", "s", "s"]
        }
      ];

      testSet.forEach(set => {
        const result = set.moves.reduce((acc, val) => lib.move(acc, val), {
          x: 0,
          y: 0,
          z: 0
        });
        expect(result).toMatchObject(set.final);
      });
    });

    it("returns distance from center for coordinate", () => {
      expect(lib.distance({ x: 2, y: -2, z: 0 })).toBe(2);
      expect(lib.distance({ x: 0, y: 0, z: 0 })).toBe(0);
      expect(lib.distance({ x: 3, y: 0, z: -3 })).toBe(3);
    });
  });

  describe("Solutions", () => {
    let puzzleInput;

    beforeAll(done => {
      util
        .loadFile("./inputs/day-11")
        .then(data => {
          puzzleInput = data.trim().split(",");
        })
        .then(done);
    });

    it("Part 1", () => {
      const result = puzzleInput.reduce((acc, val) => lib.move(acc, val), {
        x: 0,
        y: 0,
        z: 0
      });
      const distance = lib.distance(result);
      expect(result).toMatchObject({ x: 445, y: -759, z: 314 });
      expect(distance).toBe(759);
    });

    it("Part 2", () => {
      const result = puzzleInput.reduce(
        (acc, val) => {
          const pos = lib.move(acc.pos, val);
          return {
            maxDistance: Math.max(lib.distance(pos), acc.maxDistance),
            pos
          };
        },
        {
          maxDistance: -Infinity,
          pos: {
            x: 0,
            y: 0,
            z: 0
          }
        }
      );
      const distance = lib.distance(result.pos);
      expect(result).toMatchObject({
        maxDistance: 1501,
        pos: { x: 445, y: -759, z: 314 }
      });
      expect(distance).toBe(759);
    });
  });
});
