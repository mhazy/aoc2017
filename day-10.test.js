const lib = require("./day-10");
const puzzleInput = "129,154,49,198,200,133,97,254,41,6,2,1,255,0,191,108";

describe("Day 10 - Knot hash", () => {
  describe("Tests", () => {
    let hasher;

    it("parses input", () => {
      expect(lib.parseInput("1,2,3")).toMatchObject([1, 2, 3]);
    });

    beforeEach(() => {
      hasher = new lib.KnotHasher(true);
    });

    it("has a list of the specified length", () => {
      expect(hasher.list).toMatchObject([0, 1, 2, 3, 4]);
    });

    it("increases the cursor and step after rotating", () => {
      hasher.rotate(3);
      expect(hasher.skip).toBe(1);
      expect(hasher.cursor).toBe(3);
    });

    it("ignores values larger than the list", () => {
      hasher.rotate(10);
      expect(hasher.skip).toBe(0);
      expect(hasher.cursor).toBe(0);
    });

    it("returns the wrapped index value", () => {
      expect(hasher.index(5)).toBe(0);
      expect(hasher.index(6)).toBe(1);
      expect(hasher.index(1)).toBe(1);
    });

    it("rotates the list by the specified amount", () => {
      hasher.rotate(3);
      expect(hasher.list).toMatchObject([2, 1, 0, 3, 4]);

      hasher.rotate(4);
      expect(hasher.list).toMatchObject([4, 3, 0, 1, 2]);

      hasher.rotate(1);
      expect(hasher.list).toMatchObject([4, 3, 0, 1, 2]);

      hasher.rotate(5);
      expect(hasher.list).toMatchObject([3, 4, 2, 1, 0]);

      expect(hasher.firstTwoMultiplied()).toBe(12);
    });
  });

  describe("Part 2", () => {
    it("converts the input to an array", () => {
      const hasher = new lib.KnotHasher();
      expect(hasher.convertInputToAsciiArray("1,2,3")).toMatchObject([
        49,
        44,
        50,
        44,
        51,
        17,
        31,
        73,
        47,
        23
      ]);
    });

    it("creates a hash", () => {
      const hasher = new lib.KnotHasher();
      expect(hasher.hash("")).toBe("a2582a3a0e66e6e86e3812dcb672a272");
      expect(hasher.hash("AoC 2017")).toBe("33efeb34ea91902bb2f59c9920caa6cd");
      expect(hasher.hash("1,2,3")).toBe("3efbe78a8d82f29979031a4aa0b16a9d");
      expect(hasher.hash("1,2,4")).toBe("63960835bcdc130f0b66d7ff4f6a5a8e");
    });
  });

  describe("Solution", () => {
    it("solves part 1", () => {
      const hasher = new lib.KnotHasher();
      const parsedInput = puzzleInput.split();
      const input = lib.parseInput(puzzleInput);
      input.forEach(val => {
        hasher.rotate(val);
      });
      expect(hasher.firstTwoMultiplied()).toBe(19591);
    });

    it("solves part 2", () => {
      const hasher = new lib.KnotHasher();
      const result = hasher.hash(puzzleInput);
      expect(result).toBe("62e2204d2ca4f4924f6e7a80f1288786");
    });
  });
});
