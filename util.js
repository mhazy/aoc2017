const path = require("path");
const fs = require("fs");
const util = require("util");
const fsReadFile = util.promisify(fs.readFile);

const loadFile = filePath =>
  fsReadFile(path.resolve(path.join(__dirname, filePath)), "utf-8");

module.exports = {
  loadFile
};
