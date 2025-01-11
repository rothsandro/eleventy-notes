import { pageNavOrderCollection } from "./_page-nav-order.collection.js";
import { pageNavFilter } from "./page-nav.filter.js";

export const pageNavModule = {
  /**
   * Sets up the module.
   * @param {import("@11ty/eleventy").UserConfig} config
   */
  setup(config) {
    config.addCollection("_pageNavOrder", pageNavOrderCollection(config));
    config.addFilter("pageNav", pageNavFilter(config));
  },
};
