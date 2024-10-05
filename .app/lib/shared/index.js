import { ariaCurrentFilter } from "./aria-current.filter.js";
import { featherFilter } from "./feather.filter.js";
import { featherRefFilter } from "./feather-ref.filter.js";
import { slugifyPathFilter } from "./slugify-path.filter.js";
import { uniqueIdGlobal } from "./unique-id.global.js";
import { ValueParser } from "./value-parser.js";

export const sharedModule = {
  ValueParser,

  /**
   * Sets up the module
   * @param {import("@11ty/eleventy").UserConfig} config
   */
  setup(config) {
    config.addFilter("ariaCurrent", ariaCurrentFilter(config));
    config.addFilter("feather", featherFilter(config));
    config.addFilter("featherRef", featherRefFilter(config));
    config.addFilter("slugifyPath", slugifyPathFilter(config));

    config.addNunjucksGlobal("uniqueId", uniqueIdGlobal(config));
  },
};
