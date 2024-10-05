import { sidebarSectionsCollection } from "./sidebar-sections.collection.js";

export const sidebarModule = {
  /**
   * Sets up the module.
   * @param {import("@11ty/eleventy").UserConfig} config
   */
  setup(config) {
    config.addCollection("_sidebarSections", sidebarSectionsCollection(config));
  },
};
