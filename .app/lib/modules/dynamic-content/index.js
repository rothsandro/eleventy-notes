import { QueryRunner } from "./query-runner.js";
import { TreeGenerator } from "./tree-generator.js";
import { queryFilter } from "./query.filter.js";
import { renderAsListFilter } from "./render-as-list.filter.js";

export const dynamicContentModule = {
  QueryRunner,
  TreeGenerator,

  setup(config) {
    config.addFilter("query", queryFilter(config));
    config.addFilter("renderAsList", renderAsListFilter(config));
  },
};
