const R = require("ramda");

const parseInput = input => {
  const lines = input.split(/\n/);
  return lines.map(line => {
    const pattern = /^([a-z]+) \((\d+)\)(?: -> )?(.+)?/;
    const pieces = pattern.exec(line);

    const program = {
      name: pieces[1],
      weight: parseInt(pieces[2]),
      children: []
    };
    if (pieces[3]) {
      program.children = pieces[3].split(/,/).map(R.trim);
    }
    return program;
  });
};

const outputTree = programs => {
  // Find the root, and then build from there
  const parentLess = programs.ordered.filter(
    program => program.parent === null
  );
  const tree = getChildrenForTree(parentLess[0]);
  return tree;
};

const getChildrenForTree = programs => {
  const output = {};

  if (Array.isArray(programs)) {
    programs.forEach(program => {
      output[
        `${program.name} (${program.weight}) - ${program.getWeight()}`
      ] = getChildrenForTree(program.children);
    });
  } else {
    output[`${programs.name} (${programs.weight}) - ${programs.getWeight()}`] =
      programs.children.length > 0 ? getChildrenForTree(programs.children) : "";
  }
  return output;
};

const createProgram = (name, weight) => {
  return {
    name,
    parent: null,
    discWeight: 0,
    weight,
    children: [],
    getWeight: function() {
      this.discWeight =
        this.weight +
        (this.children
          ? this.children
              .map(child => child.getWeight())
              .reduce((acc, val) => acc + val, 0)
          : 0);
      return this.discWeight;
    }
  };
};

const findUnbalanced = programs => {
  let i = programs.ordered.length;
  const unbalanced = [];
  while (i > 0) {
    i = i - 1;
    const weight = programs.ordered[i].getWeight();
  }

  // Find a program who's children have different weights
  i = programs.ordered.length;
  while (i > 0) {
    i = i - 1;
    if (programs.ordered[i].children.length > 0) {
      const childWeights = programs.ordered[i].children.map(child => ({
        weight: child.getWeight(),
        child: child
      }));

      const allSame = childWeights.reduce((acc, val) => {
        if (acc !== false && val.weight === acc) {
          return acc;
        }
        return false;
      }, childWeights[0].weight);

      // TODO: Not ideal, but helps with finding the bad program in the tree
      //   would be better to return the child that's different
      if (allSame === false) {
        unbalanced.push(programs.ordered[i]);
      }
    }
  }

  return unbalanced;
};

// TODO: DRY... maybe.
const groupPrograms = programs => {
  const grouped = {
    indexed: {},
    ordered: []
  };
  programs.forEach(program => {
    let thisProgram;

    if (grouped.indexed.hasOwnProperty(program.name)) {
      thisProgram = grouped.indexed[program.name];
      // Update it's weight in case we're seeing it for the first time
      thisProgram.weight = program.weight;
    } else {
      thisProgram = createProgram(program.name, program.weight);
      grouped.ordered.push(thisProgram);
      grouped.indexed[program.name] = thisProgram;
    }

    if (program.children && program.children.length) {
      program.children.forEach(child => {
        // Create the child if it doesn't exist yet
        let thisChild;
        if (grouped.indexed.hasOwnProperty(child)) {
          thisChild = grouped.indexed[child];
        } else {
          thisChild = createProgram(child);
          grouped.ordered.push(thisChild);
          grouped.indexed[child] = thisChild;
        }

        // Set the parent
        thisChild.parent = thisProgram;
        thisProgram.children.push(thisChild);
      });
    }
  });

  return grouped;
};

module.exports = {
  parseInput,
  groupPrograms,
  findUnbalanced,
  outputTree
};
