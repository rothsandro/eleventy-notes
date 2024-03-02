module.exports = {
  _sidebarSectionsCollection: require("./_sidebar-sections.collection"),

  /**
   * Sets up the module.
   * @param {import("@11ty/eleventy").UserConfig} config
   */
  setup(config) {
    config.addCollection(
      "_sidebarSections",
      this._sidebarSectionsCollection(config)
    );
  },
};
