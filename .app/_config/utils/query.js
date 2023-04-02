const queryFilter = require("./query-filter");

module.exports = function runQuery(data, query) {
  let result = [...data];

  if (query.filter) {
    result = queryFilter(result, query.filter);
  }

  return result;
};
