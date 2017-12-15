const R = require("ramda");
const parseInput = input => input.split(/,/).map(Number);

class KnotHasher {
  constructor(isBasic) {
    this._length = isBasic ? 5 : 256;
    this._list = null;
    this._cursor = 0;
    this._skip = 0;

    this._inputAppend = [17, 31, 73, 47, 23];
    this.reset();
  }

  reset() {
    this._list = [...Array(this._length).keys()];
    this._cursor = 0;
    this._skip = 0;
  }

  hash(input) {
    const inputArray = this.convertInputToAsciiArray(input);
    let i = 0;
    while (i < 64) {
      let j = 0;
      const len = inputArray.length;
      while (j < len) {
        this.rotate(inputArray[j]);
        j = j + 1;
      }
      i = i + 1;
    }

    i = 0;
    let hash = "";
    while (i < 16) {
      let val = this._list[i * 16];
      let j = i * 16 + 1;
      let h = i * 16 + 16;
      while (j < h) {
        val = val ^ this._list[j];
        j = j + 1;
      }
      const stringVal = (val < 16 ? "0" : "") + val.toString(16);
      hash = hash + stringVal;

      i = i + 1;
    }
    // Reset the hasher
    this.reset();
    return hash;
  }

  convertInputToAsciiArray(input) {
    return input
      .split("")
      .reduce((acc, val) => acc.concat(val.charCodeAt(0)), [])
      .concat(this._inputAppend);
  }

  index(val) {
    return val % this._list.length;
  }

  rotate(val) {
    if (val > this._list.length) {
      return;
    }
    let i = 0;
    let len = Math.floor(val / 2);
    const last = this._cursor + val;
    while (i < len) {
      const firstIndex = this.index(this._cursor + i);
      const lastIndex = this.index(this._cursor + (val - 1) - i);
      const holdVal = this._list[firstIndex];
      this._list[firstIndex] = this._list[lastIndex];
      this._list[lastIndex] = holdVal;
      i = i + 1;
    }
    this._cursor = this.index(this._cursor + val + this._skip);
    this._skip = this._skip + 1;
  }

  firstTwoMultiplied() {
    return this._list[0] * this._list[1];
  }

  get list() {
    return this._list;
  }

  set list(list) {
    this._list = list;
  }

  get skip() {
    return this._skip;
  }

  get cursor() {
    return this._cursor;
  }
}

module.exports = {
  parseInput,
  KnotHasher
};
