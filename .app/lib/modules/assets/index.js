import { registerStaticAssetsAsPassthroughCopy } from "./static-assets.passthrough.js";
import { transformParser } from "./parser.js";

export const assetsModule = {
  /**
   * Sets up the module.
   * @param {import("@11ty/eleventy/UserConfig").default} config
   */
  setup(config) {
    config.addTransform(`assets-transform-parser`, transformParser);
    registerStaticAssetsAsPassthroughCopy(config);
  },
};
