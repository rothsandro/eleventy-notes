module.exports = {
  QueryRunner: require("./query-runner"),
  TreeGenerator: require("./tree-generator"),
  queryFilter: require("./query.filter"),
  renderAsListFilter: require("./render-as-list.filter"),

  setup(config) {
    config.addFilter("query", this.queryFilter(config));
    config.addFilter("renderAsList", this.renderAsListFilter(config));
  },
};
