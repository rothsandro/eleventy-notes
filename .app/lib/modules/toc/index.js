import { tocFilter } from "./toc.filter.js";

export const tocModule = {
  /**
   * Sets up the module
   * @param {import("@11ty/eleventy/UserConfig").default} config
   */
  setup(config) {
    config.addFilter("toc", tocFilter(config));
  },
};
