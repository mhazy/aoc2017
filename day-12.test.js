const lib = require("./day-12");
const util = require("./util");

describe("Day 12 - Digital Plumber", () => {
  describe("Tests", () => {
    it("parses single item correctly", () => {
      expect(lib.parseItem("0 <-> 2")).toMatchObject(["0", ["2"]]);
      expect(lib.parseItem("2 <-> 0, 3, 4")).toMatchObject([
        "2",
        ["0", "3", "4"]
      ]);
    });

    it("creates groupings of nodes", () => {
      const result = lib.groupInputs([["2", ["0"]], ["0", ["3"]]]);
      expect(result[0].name).toBe("0");
      expect(result[0].talksTo).toHaveLength(2);
      expect(result[0].talksTo[0].name).toBe("2");
      expect(result[0].talksTo[1].name).toBe("3");
      expect(result[2].name).toBe("2");
      expect(result[3].name).toBe("3");
    });

    it("determins count of nodes in network", () => {
      const smallSet = lib.groupInputs([["2", ["0"]], ["0", ["3"]]]);
      const largeSet = lib.groupInputs([
        ["2", ["0"]],
        ["0", ["3"]],
        ["0", ["4"]]
      ]);
      expect(smallSet[0].connectedNodeIds()).toMatchObject(["0", "2", "3"]);
      expect(largeSet[0].connectedNodeIds()).toMatchObject([
        "0",
        "2",
        "3",
        "4"
      ]);
    });
  });

  describe("Solutions", () => {
    let puzzleInput;

    beforeAll(done => {
      util
        .loadFile("./inputs/day-12")
        .then(data => {
          puzzleInput = data.trim();
        })
        .then(done);
    });

    it("Part 1", () => {
      const puzzleSet = lib.parseAndGroup(puzzleInput);
      expect(puzzleSet[0].connectedNodeIds()).toHaveLength(169);
    });

    it("Part 2", () => {
      const puzzleSet = lib.parseAndGroup(puzzleInput);
      expect(lib.countGroups(puzzleSet)).toBe(179);
    });
  });
});
