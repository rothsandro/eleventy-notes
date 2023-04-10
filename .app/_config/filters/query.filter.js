const QueryRunner = require("./../../core/query");

module.exports = () => (data, query) => {
  const runner = new QueryRunner(data, query);
  return runner.run();
};
