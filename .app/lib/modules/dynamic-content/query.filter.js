const QueryRunner = require("./query-runner");

module.exports = () => (data, query) => {
  const runner = new QueryRunner(data, query);
  return runner.run();
};
