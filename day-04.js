const R = require("ramda");

const isValidPassphrase = passphrase => {
  const words = passphrase.split(/\s+/);
  const set = new Set(words);
  return words.length === set.size;
};

const isValidNonAnagramPhrase = passphrase => {
  const words = passphrase.split(/\s+/);
  const sorted = words.map(word =>
    word
      .split("")
      .sort()
      .join("")
  );
  const set = new Set(sorted);
  return sorted.length === set.size;
};
const checkPassphrases = R.filter(isValidPassphrase);
const checkNonAnagramedPassphrases = R.filter(isValidNonAnagramPhrase);

const parseInput = input => input.split(/\n/);

module.exports = {
  isValidPassphrase,
  checkPassphrases,
  parseInput,
  isValidNonAnagramPhrase,
  checkNonAnagramedPassphrases
};
