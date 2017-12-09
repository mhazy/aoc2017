const countGroups = input => {
  const len = input.length;
  let groups = 0;
  let i = 0;
  let depth = 0;
  let inGroup = false;
  let inGarbage = false;
  let score = 0;
  let garbage = 0;

  while (i < len) {
    switch (input[i]) {
      case "!":
        i = i + 1;
        break;
      case "{":
        if (!inGarbage) {
          depth = depth + 1;
        } else {
          garbage = garbage + 1;
        }
        break;
      case "}":
        if (!inGarbage) {
          score = score + depth;
          depth = depth - 1;
          groups = groups + 1;
        } else {
          garbage = garbage + 1;
        }
        break;
      case "<":
        if (!inGarbage) {
          inGarbage = true;
        } else {
          // In garbage, count this
          garbage = garbage + 1;
        }
        break;
      case ">":
        if (inGarbage) {
          inGarbage = false;
        } else {
          garbage = garbage + 1;
        }
        break;
      default:
        if (inGarbage) {
          garbage = garbage + 1;
        }
    }
    i = i + 1;
  }

  return {
    groups,
    score,
    garbage
  };
};

module.exports = {
  countGroups
};
