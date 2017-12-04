const R = require("ramda");
const util = require("./util");
const lib = require("./day-04");

const sampleOne = [
  ["aa bb cc dd ee", true],
  ["aa bb cc dd aa", false],
  ["aa bb cc dd aaa", true]
];

const sampleTwo = [
  ["abcde fghij", true],
  ["abcde xyz ecdab", false],
  ["a ab abc abd abf abj", true],
  ["iiii oiii ooii oooi oooo", true],
  ["oiii ioii iioi iiio", false]
];

describe("Day 4 - High-Entropy Passphrases", () => {
  let puzzleInput;

  beforeAll(done => {
    util.loadFile("./inputs/day-04").then(data => {
      puzzleInput = lib.parseInput(data);
      done();
    });
  });

  it("checks for a valid passphrase", () => {
    R.forEach(([input, valid]) => {
      expect(lib.isValidPassphrase(input)).toBe(valid);
    }, sampleOne);
  });

  it("returns a list of valid passphrases", () => {
    const passphrases = sampleOne.map(([phrase]) => phrase);
    expect(lib.checkPassphrases(passphrases)).toHaveLength(2);
  });

  it("checks day 04, part one, solution", () => {
    expect(lib.checkPassphrases(puzzleInput)).toHaveLength(451);
  });

  it("checks for valid non-anagram passphrase", () => {
    R.forEach(([input, valid]) => {
      expect(lib.isValidNonAnagramPhrase(input)).toBe(valid);
    }, sampleTwo);
  });

  it("checks day 04, part two, solution", () => {
    expect(lib.checkNonAnagramedPassphrases(puzzleInput)).toHaveLength(223);
  });
});
