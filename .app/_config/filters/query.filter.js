const runQuery = require("./../utils/query");

module.exports = () => (data, query) => {
  return runQuery(data, query);
};
