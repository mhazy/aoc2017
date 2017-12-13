const R = require("ramda");

const parseItem = R.pipe(
  R.split(" <-> "), // Split the input
  R.applySpec([R.head, R.pipe(R.last, R.split(/,\s?/))]) // Return []
);

const parseInput = R.pipe(R.split(/\n/), R.map(parseItem));

const createNode = (name, parent) => ({
  name,
  talksTo: [],
  connectedNodeIds: function() {
    return R.flatten(this._connectedNodeIds()).sort();
  },
  _connectedNodeIds: function(prevNetwork = {}) {
    const network = {
      ...prevNetwork,
      [this.name]: true
    };

    const unseen = this.talksTo.filter(
      child => !network.hasOwnProperty(child.name)
    );

    const ids = unseen.map(child => child._connectedNodeIds(network));

    return [...ids, this.name];
  }
});

const groupInputs = inputs => {
  const groups = {};

  inputs.forEach(([primary, secondaries]) => {
    if (!groups[primary]) {
      groups[primary] = createNode(primary);
    }

    secondaries.forEach(secondary => {
      // Make sure the child exists
      if (!groups[secondary]) {
        groups[secondary] = createNode(secondary);
      }

      // Secondary also talks to the primary (make sure it's not already in there?)
      if (!groups[secondary].talksTo.includes(groups[primary])) {
        groups[secondary].talksTo.push(groups[primary]);
      }

      // Primary talks to secondary (again, make sure it's not in there?
      if (!groups[primary].talksTo.includes(groups[secondary])) {
        groups[primary].talksTo.push(groups[secondary]);
      }
    });
  });

  return groups;
};

const countGroups = groups => {
  // Remove the top node's network from the current set of nodes
  // until no nodes remain
  let toCheck = Object.keys(groups);
  let groupCount = 0;
  while (toCheck.length > 0) {
    const nodes = groups[toCheck[0]].connectedNodeIds(); //toCheck[0]
    groupCount = groupCount + 1;
    toCheck = R.difference(toCheck, nodes);
  }
  return groupCount;
};

const parseAndGroup = R.pipe(parseInput, groupInputs);

module.exports = {
  parseItem,
  parseInput,
  groupInputs,
  parseAndGroup,
  countGroups
};
