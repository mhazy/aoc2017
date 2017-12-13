const R = require("ramda");

const parseLine = R.pipe(R.split(": "), R.map(Number));

const parseInput = R.pipe(
  R.split(/\n/),
  R.map(R.pipe(R.trim, parseLine)),
  R.map(([position, interval]) => ({
    position,
    interval
  }))
);

const scannerHit = delay => ({ position, interval }) =>
  (delay + position) % (2 * (interval - 1)) === 0;

const hits = (delay = 0) => scanners => scanners.filter(scannerHit(delay));

const score = R.reduce(
  (score, { position, interval }) => score + position * interval,
  0
);

const tripScore = (delay = 0) => R.pipe(hits(delay), score);

const findSafeTrip = scanners => {
  let i = 0;
  while (true) {
    const delayedHits = hits(i);
    const scannersHit = delayedHits(scanners);
    if (scannersHit.length === 0) {
      return i;
    }
    i = i + 1;
  }
};

module.exports = {
  parseLine,
  parseInput,
  hits,
  score,
  tripScore,
  findSafeTrip
};
