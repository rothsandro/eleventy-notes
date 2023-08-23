module.exports = {
  tocFilter: require("./toc.filter"),

  /**
   * Sets up the module
   * @param {import("@11ty/eleventy").UserConfig} config
   */
  setup(config) {
    config.addFilter("toc", this.tocFilter(config));
  },
};
