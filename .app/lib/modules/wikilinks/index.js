import { Wikilink } from "./wikilink.js";
import { linksCollection } from "./links.collection.js";
import { wikilinksMarkdownPlugin } from "./wikilink.md-plugin.js";

export const wikilinksModule = {
  Wikilink,
  markdownPlugin: wikilinksMarkdownPlugin,

  /**
   * Sets up the module
   * @param {import("@11ty/eleventy").UserConfig} config
   */
  setup(config) {
    config.addCollection("_links", linksCollection(config));
  },
};
