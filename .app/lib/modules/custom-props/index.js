module.exports = {
  resolveCustomPropsFilter: require("./resolve-custom-props.filter"),

  /**
   * Sets up the module.
   * @param {import("@11ty/eleventy").UserConfig} config
   */
  setup(config) {
    config.addFilter(
      "resolveCustomProps",
      this.resolveCustomPropsFilter(config)
    );
  },
};
