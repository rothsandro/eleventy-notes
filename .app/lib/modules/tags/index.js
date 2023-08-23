module.exports = {
  tagsCollection: require("./tags.collection"),

  /**
   * Sets up the module
   * @param {import("@11ty/eleventy").UserConfig} config
   */
  setup(config) {
    config.addCollection("tags", this.tagsCollection(config));
  },
};
