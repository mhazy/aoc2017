const lib = require("./day-08");
const util = require("./util");
const sampleInput = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`;

describe("Day 8 - I heard you like registers", () => {
  let puzzleInput;

  beforeAll(done => {
    util
      .loadFile("./inputs/day-08")
      .then(data => {
        puzzleInput = data.trim();
      })
      .then(done);
  });

  it("parses input", () => {
    const result = lib.parseInput(sampleInput);
    expect(result).toHaveLength(4);
  });

  it("parses instructions", () => {
    const result = lib.parseInstruction("b inc 5 if a < 1");
    expect(result).toMatchObject({
      register: "b",
      instruction: "inc",
      amount: 5,
      check: "<",
      checkRegister: "a",
      checkAmount: 1
    });
  });

  it("throws if an instruction cannot be procesed", () => {
    const process = () => lib.parseInstruction("b mul 10 if a < 1");
    expect(process).toThrowError();
  });

  it("parses input into instructions", () => {
    const result = lib.parseInputIntoInstructions(sampleInput);
    expect(result).toMatchObject([
      {
        register: "b",
        instruction: "inc",
        amount: 5,
        checkRegister: "a",
        check: ">",
        checkAmount: 1
      },
      {
        register: "a",
        instruction: "inc",
        amount: 1,
        checkRegister: "b",
        check: "<",
        checkAmount: 5
      },
      {
        register: "c",
        instruction: "dec",
        amount: -10,
        checkRegister: "a",
        check: ">=",
        checkAmount: 1
      },
      {
        register: "c",
        instruction: "inc",
        amount: -20,
        checkRegister: "c",
        check: "==",
        checkAmount: 10
      }
    ]);
  });

  it("processes sample instructions", () => {
    const result = lib.parseAndProcessInstructions(sampleInput);
    expect(result).toMatchObject({ a: 1, b: 0, c: -10 });
  });

  it("processes day 08, part one, answer", () => {
    const result = lib.parseAndProcessInstructions(puzzleInput);
    console.log(result);
    expect(result).toMatchObject({
      xrh: 980,
      koq: 2744,
      s: 2099,
      it: 658,
      oj: 5946,
      g: -4777,
      y: -1646,
      do: 1795,
      hwz: -1971,
      ix: 2175,
      gsz: 4912,
      mh: -3169,
      yor: 3337,
      bp: 1388,
      rzc: 5477,
      ehw: 5468,
      sql: 504,
      a: 1285,
      ykc: -1658,
      zx: 2531,
      cj: -3560,
      np: -1305,
      ubu: -5830,
      e: 378,
      i: -4913
    });
  });
});
