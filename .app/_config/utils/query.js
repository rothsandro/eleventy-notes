const queryFilter = require("./query-filter");
const querySort = require("./query-sort");

module.exports = function runQuery(data, query) {
  let result = [...data];

  if (query.filter) {
    result = queryFilter(result, query.filter);
  }

  if (query.sort) {
    result = querySort(result, query.sort);
  }

  return result;
};
