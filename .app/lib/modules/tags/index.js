import { tagsCollection } from "./tags.collection.js";

export const tagsModule = {
  /**
   * Sets up the module
   * @param {import("@11ty/eleventy/UserConfig").default} config
   */
  setup(config) {
    config.addCollection("tags", tagsCollection(config));
  },
};
