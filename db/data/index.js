const ENV = process.env.NODE_ENV || "development";

const development = require("./dev-data");
const test = require("./test-data");
const data = { test, development, production: development };

// const data = {
//   development,
//   test
// };

module.exports = data[ENV];
