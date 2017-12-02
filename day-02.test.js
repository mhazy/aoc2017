const input = `5 1 9 5
7 5 3
2 4 6 8`;

const dayTwo = require("./day-02");

describe("Day 2 - Corruption Checksum", () => {
  it("convert input to array of array of numbers", () => {
    const result = dayTwo.parseInput(input);
    expect(result).toMatchObject([[5, 1, 9, 5], [7, 5, 3], [2, 4, 6, 8]]);
  });

  it("finds row maximum", () => {
    expect(dayTwo.rowMaximum([1, 2, 3, 4])).toBe(4);
  });

  it("finds row maximum", () => {
    expect(dayTwo.rowMinimum([1, 2, 3, 4])).toBe(1);
  });

  it("calculates checksum of row", () => {
    expect(dayTwo.calculateRowChecksum([5, 1, 9, 5])).toBe(8);
    expect(dayTwo.calculateRowChecksum([7, 5, 3])).toBe(4);
    expect(dayTwo.calculateRowChecksum([2, 4, 6, 8])).toBe(6);
  });

  it("calculates spreadsheet checksum", () => {
    expect(dayTwo.calculateSheetChecksum(input)).toBe(18);
  });
});
