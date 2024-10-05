import { transformParser } from "./parser.js";

export const assetsModule = {
  /**
   * Sets up the module.
   * @param {import("@11ty/eleventy").UserConfig} config
   */
  setup(config) {
    config.addTransform(`assets-transform-parser`, transformParser);
  },
};
