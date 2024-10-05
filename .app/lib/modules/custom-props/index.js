import { resolveCustomPropsFilter } from "./resolve-custom-props.filter.js";

export const customPropsModule = {
  /**
   * Sets up the module.
   * @param {import("@11ty/eleventy").UserConfig} config
   */
  setup(config) {
    config.addFilter("resolveCustomProps", resolveCustomPropsFilter(config));
  },
};
