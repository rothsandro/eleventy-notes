const QueryRunner = require("./../../core/query");

module.exports = (eleventyConfig) => (data, query) => {
  const slugify = eleventyConfig.getFilter("slugify");
  const runner = new QueryRunner(data, query, slugify);
  return runner.run();
};
