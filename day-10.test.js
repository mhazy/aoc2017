const lib = require("./day-10");

describe("Day 10 - Knot hash", () => {
  let hasher;

  it("parses input", () => {
    expect(lib.parseInput("1,2,3")).toMatchObject([1, 2, 3]);
  });

  beforeEach(() => {
    hasher = new lib.KnotHasher(5);
  });

  it("has a list of the specified length", () => {
    expect(hasher.list).toMatchObject([0, 1, 2, 3, 4]);
  });

  it("increases the cursor and step after rotating", () => {
    hasher.rotate(3);
    expect(hasher.skip).toBe(1);
    expect(hasher.cursor).toBe(3);
  });
});
