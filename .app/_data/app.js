const fs = require("fs");

module.exports = function () {
  const config = fs.readFileSync("./../app.json");
  return JSON.parse(config);
};
