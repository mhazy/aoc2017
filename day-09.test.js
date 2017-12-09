const lib = require("./day-09");
const util = require("./util");
const sampleInput = ``;

describe("Day 9", () => {
  let puzzleInput;

  beforeAll(done => {
    util
      .loadFile("./inputs/day-09")
      .then(data => {
        puzzleInput = data.trim();
      })
      .then(done);
  });

  it("counts groups", () => {
    expect(lib.countGroups("{}")).toMatchObject({ groups: 1, score: 1 });
    expect(lib.countGroups("{{{}}}")).toMatchObject({ groups: 3, score: 6 });
    expect(lib.countGroups("{{{},{},{{}}}}")).toMatchObject({
      groups: 6,
      score: 16
    });
    expect(lib.countGroups("{<{},{},{{}}>}")).toMatchObject({
      groups: 1,
      score: 1,
      garbage: 10
    });
    expect(lib.countGroups("{<a>,<a>,<a>,<a>}")).toMatchObject({
      groups: 1,
      score: 1,
      garbage: 4
    });
    expect(lib.countGroups("{{<a>},{<a>},{<a>},{<a>}}")).toMatchObject({
      groups: 5,
      score: 9,
      garbage: 4
    });
    expect(lib.countGroups("{{<!>},{<!>},{<!>},{<a>}}")).toMatchObject({
      groups: 2,
      score: 3,
      garbage: 13
    });
    expect(lib.countGroups("{{<!!>},{<!!>},{<!!>},{<!!>}}")).toMatchObject({
      groups: 5,
      score: 9,
      garbage: 0
    });
    expect(lib.countGroups("{{<a!>},{<a!>},{<a!>},{<ab>}}")).toMatchObject({
      groups: 2,
      score: 3,
      garbage: 17
    });
  });

  it("calculates day 9, part one/two, result", () => {
    const result = lib.countGroups(puzzleInput);
    expect(result).toMatchObject({
      groups: 1325,
      score: 11898,
      garbage: 5601
    });
  });
});
