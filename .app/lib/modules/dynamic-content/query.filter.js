const QueryRunner = require("./query-runner");

/**
 * Creates the filter function to run a query.
 * @returns The filter function.
 */
module.exports = () => (data, query) => {
  const runner = new QueryRunner(data, query);
  return runner.run();
};
