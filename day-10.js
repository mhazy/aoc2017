const parseInput = input => input.split(/,/).map(Number);

class KnotHasher {
  constructor(length) {
    this._length = length;
    this._list = null;
    this._cursor = 0;
    this._skip = 0;
    this.init();
  }

  init() {
    this._list = [...Array(this._length).keys()];
  }

  rotate(val) {
    this._cursor = this._cursor + val + this._skip;
    this._skip = this._skip + 1;
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
