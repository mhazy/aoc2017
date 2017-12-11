const R = require("ramda");

const directions = {
  n: { x: 0, y: 1, z: -1 },
  s: { x: 0, y: -1, z: 1 },

  ne: { x: 1, y: 0, z: -1 },
  sw: { x: -1, y: 0, z: 1 },

  se: { x: 1, y: -1, z: 0 },
  nw: { x: -1, y: 1, z: 0 }
};

const move = (starting, direction) => {
  if (!directions[direction]) {
    return;
  }

  return R.mergeWith(R.unapply(R.sum), starting, directions[direction]);
};

const distance = pos =>
  Object.values(pos).reduce((acc, val) => (val > 0 ? acc + val : acc), 0);

module.exports = {
  move,
  distance
};
