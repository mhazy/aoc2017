const R = require("ramda");

const calculateRing = num => {
  let n = 0;
  // Finds the ring number that the nunber is contained within
  while ((n * 2 + 1) ** 2 < num) {
    n = n + 1;
  }
  return n;
};

const calculateTotalInRing = ring => (ring * 2 + 1) ** 2;

const calculateQuadrant = num => {
  // Determine the quadrant that the number is located within
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
  // Uses the calculated quadgrant to determine the coordinates of the space
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
  R.map(pos => R.zipWith(R.unapply(R.sum), pos, position), gridPositions);

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

  const totalItems = (rings * 2 + 1) ** 2;
  let i = 1;
  while (i <= totalItems) {
    const gridPosition = calculatePosition(i);
    const neighbours = getNeighbours(gridPosition);
    const availableNeighbours = neighbours.reduce((list, position) => {
      const neighbourItem = position.toString();
      // We only care about neighbours that have already been created
      if (grid.byPosition.hasOwnProperty(neighbourItem)) {
        return [...list, grid.byPosition[neighbourItem]];
      }
      return list;
    }, []);

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
    gridObject.getValue(); // Pre-calculate
    i = i + 1;
  }

  return grid;
};

// Another solution for Part 1
const findNearestOddSquare = num => {
  let n = 1;
  let x = 0;
  while (num > x) {
    n = n + 2;
    x = n ** 2;
  }
  return n;
};

const findDistanceAlternate = num => {
  // 1. Bottom right corners are squares of odd numbers (x)
  // 2. Find first odd square larger than n
  // 3. (x-1) is the corner's distance value, and distance value cycles (6 -> 5 -> 4 -> 3 -> 4 -> 5 -> 6)
  // 4. Subtract from the corner's square value, cycling values between the corners, until you find the requested value
  /*
    6 5 4 3 4 5 6
    5 4 3 2 3 4 5
    4 3 2 1 2 3 4
    3 2 1 0 1 2 3
    4 3 2 1 2 3 4
    5 4 3 2 3 4 5
    6 5 4 3 4 5 6
  */
  if (num === 1) {
    return 0;
  }

  const nearestOddSquare = findNearestOddSquare(num);
  const cycleStart = nearestOddSquare - 1;
  const cycleMid = cycleStart / 2;

  let i = nearestOddSquare ** 2;
  let cycle = 1;
  let curDistance = cycleStart;

  // Bail out if we're on a square
  if (num === i) {
    return cycleStart;
  }

  while (i > num) {
    i = i - 1;
    curDistance = curDistance - cycle;
    if (curDistance === cycleMid || curDistance === cycleStart) {
      cycle = -cycle;
    }
  }

  return curDistance;
};

module.exports = {
  calculateRing,
  calculateQuadrant,
  calculatePosition,
  calculateDistance,
  generateGrid,
  findNearestOddSquare,
  findDistanceAlternate
};
