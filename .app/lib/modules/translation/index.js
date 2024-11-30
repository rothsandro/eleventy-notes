import { translateFilter } from "./translate.filter.js";
import { uiLangShortcode } from "./ui-lang.shortcode.js";

export const translationModule = {
  /**
   * Sets up the module
   * @param {import("@11ty/eleventy").UserConfig} config
   */
  async setup(config) {
    config.addFilter("t", await translateFilter(config));
    config.addShortcode("uiLang", await uiLangShortcode(config));
  },
};
