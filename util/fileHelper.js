const fs = require("fs");
const path = require("path");

const getMockFileLocation = (mockFile) =>
  path.resolve(`${__dirname}/../../__mocks__/${mockFile}.json`);

function readMockFile(mockFile) {
  return JSON.parse(fs.readFileSync(getMockFileLocation(mockFile)));
}

function writeMockFile(mockFile, jsonData) {
  return fs.writeFileSync(
    getMockFileLocation(mockFile),
    JSON.stringify(jsonData, null, 4)
  );
}

module.exports = {
  readMockFile,
  writeMockFile,
};
