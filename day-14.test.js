const lib = require("./day-14");
const sampleInput = "flqrgnkx";
const puzzleInput = "xlqgujun";
const testHash = [
  1,
  1,
  0,
  1,
  0,
  1,
  0,
  0,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  0,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  0,
  0,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  0,
  0,
  1,
  1,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  0,
  1,
  0,
  0,
  0,
  1,
  0,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  1,
  1,
  1,
  1,
  0,
  0,
  1,
  1,
  0
];

describe("Day 14 - Disk Defragmentation", () => {
  describe("Tests", () => {
    it("generates binary representation of hash", () => {
      const hash = lib.hashToBinary(`${sampleInput}-0`);
      expect(hash).toHaveLength(128);
    });

    it("generates array of binary hashes", () => {
      const hashes = lib.generateHashes(sampleInput);
      expect(hashes).toHaveLength(128 * 128);
    });

    it("counts regions", () => {
      const regions = lib.countRegions(sampleInput);
      expect(regions).toEqual(1242);
    });
  });

  describe("Solutions", () => {
    it("Part 1", () => {
      const used = lib.usedSquares(puzzleInput);
      expect(used).toBe(8204);
    });

    it("part 2", () => {
      const regions = lib.countRegions(puzzleInput);
      expect(regions).toBe(1089);
    });
  });
});
