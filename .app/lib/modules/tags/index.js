import { tagsCollection } from "./tags.collection.js";

export const tagsModule = {
  /**
   * Sets up the module
   * @param {import("@11ty/eleventy").UserConfig} config
   */
  setup(config) {
    config.addCollection("tags", tagsCollection(config));
  },
};
