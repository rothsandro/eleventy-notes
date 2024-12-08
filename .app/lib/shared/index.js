import { ariaCurrentFilter } from "./aria-current.filter.js";
import { iconFilter } from "./icon.filter.js";
import { iconRefFilter } from "./icon-ref.filter.js";
import { createIcon } from "./icon.js";
import { slugifyPathFilter } from "./slugify-path.filter.js";
import { uniqueIdGlobal } from "./unique-id.global.js";
import { ValueParser } from "./value-parser.js";

export const sharedModule = {
  ValueParser,
  createIcon,

  /**
   * Sets up the module
   * @param {import("@11ty/eleventy").UserConfig} config
   */
  setup(config) {
    config.addFilter("ariaCurrent", ariaCurrentFilter(config));
    config.addFilter("icon", iconFilter(config));
    config.addFilter("iconRef", iconRefFilter(config));
    config.addFilter("slugifyPath", slugifyPathFilter(config));

    config.addNunjucksGlobal("uniqueId", uniqueIdGlobal(config));
  },
};
