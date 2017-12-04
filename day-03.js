const R = require("ramda");

const calculateRing = num => {
  let n = 0;

  while ((n * 2 + 1) ** 2 < num) {
    n = n + 1;
  }

  return n;
};

const calculateTotalInRing = ring => (ring * 2 + 1) ** 2;

const calculateQuadrant = num => {
  const ring = calculateRing(num);
  const totalInRing = ring * 8;
  const positionInRing = num - 1 - calculateTotalInRing(ring - 1);
  const quadrant = Math.floor(positionInRing / totalInRing * 4);
  return quadrant;
};

const calculatePosition = num => {
  if (num <= 1) {
    return [0, 0];
  }
  const ring = calculateRing(num);
  const numInQuadrant = ring * 2;
  const quadrant = calculateQuadrant(num);
  const startNum = calculateTotalInRing(ring - 1) + 1;
  const posInQuad =
    (num + 1 - startNum - quadrant * numInQuadrant) / numInQuadrant;
  const secondary = Math.floor(posInQuad * numInQuadrant - numInQuadrant / 2);

  if (quadrant === 0) {
    return [ring, secondary];
  } else if (quadrant === 1) {
    return [-secondary, ring];
  } else if (quadrant === 2) {
    return [-ring, -secondary];
  } else if (quadrant === 3) {
    return [secondary, -ring];
  }
};

const calculateDistance = R.compose(R.sum, R.map(Math.abs), calculatePosition);

const gridPositions = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1]
];

const getNeighbours = position =>
  R.map(pos => R.zipWith((a, b) => a + b, pos, position), gridPositions);

const generateGrid = rings => {
  const grid = {
    byPosition: {},
    byIndex: [],
    valueAtPosition: function(x, y) {
      const position = [x, y].toString();
      return this.byPosition[position] && this.byPosition[position].getValue();
    },
    findGreatestAfter: function(value) {
      let i = 0;
      const len = this.byIndex.length;
      while (i < len) {
        const gridVal = this.byIndex[i].getValue();
        if (gridVal > value) {
          return gridVal;
        }
        i = i + 1;
      }
      return -1;
    }
  };

  let i = 1;

  const totalItems = (rings * 2 + 1) ** 2;

  while (i <= totalItems) {
    const gridPosition = calculatePosition(i);
    const neighbours = getNeighbours(gridPosition);
    const availableNeighbours = neighbours.reduce((list, position) => {
      const neighbourItem = position.toString();
      if (grid.byPosition.hasOwnProperty(neighbourItem)) {
        return [...list, grid.byPosition[neighbourItem]];
      }
      return list;
    }, []);

    // Pre-generate "1"
    const gridObject = {
      position: gridPosition,
      value: i === 1 ? 1 : null,
      neighbours: availableNeighbours,
      getValue: function() {
        if (this.value === null) {
          this.value = this.neighbours
            .map(neighbour => neighbour.getValue())
            .reduce((acc, val) => acc + val, 0);
        }
        return this.value;
      }
    };

    grid.byPosition[gridPosition.toString()] = gridObject;
    grid.byIndex[i - 1] = gridObject;

    gridObject.getValue();

    i = i + 1;
  }

  return grid;
};

module.exports = {
  calculateRing,
  calculateQuadrant,
  calculatePosition,
  calculateDistance,
  generateGrid
};
