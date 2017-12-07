const lib = require("./day-07");
const util = require("./util");
const R = require("ramda");
const treeify = require("treeify");

const sampleInput = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`;

describe("Day 7: Recursive Circus", () => {
  let puzzleInput;

  beforeAll(done => {
    util
      .loadFile("./inputs/day-07")
      .then(data => {
        puzzleInput = data.trim();
      })
      .then(done);
  });
  it("should parse input", () => {
    const result = lib.parseInput(sampleInput);
    expect(result.length).toBe(13);
  });

  it("should re-arrange programs into parent/child tree", () => {
    const programs = lib.parseInput(sampleInput);
    const result = lib.groupPrograms(programs);
    expect(result.indexed["tknk"].parent).toBe(null);
  });

  it("should determine root program for day 07, part one", () => {
    const programs = lib.parseInput(puzzleInput);
    const result = lib.groupPrograms(programs);
    const parentLess = result.ordered.filter(
      program => program.parent === null
    );
    expect(parentLess).toHaveLength(1);
    expect(parentLess[0].name).toBe("dtacyn");
    expect(parentLess[0].parent).toBe(null);
  });

  it("finds an unbalanced tree", () => {
    const programs = lib.groupPrograms(lib.parseInput(sampleInput));
    const unbalanced = lib.findUnbalanced(programs);
    const tree = lib.outputTree(programs);
  });

  it("finds an unbalanced tree in puzzle input", () => {
    const programs = lib.groupPrograms(lib.parseInput(puzzleInput));
    const unbalanced = lib.findUnbalanced(programs);
    const tree = lib.outputTree(programs);
    console.log(treeify.asTree(tree));
    console.log(unbalanced);
  });
});
