module.exports = {
  _transformParser: require("./parser"),

  /**
   * Sets up the module.
   * @param {import("@11ty/eleventy").UserConfig} config
   */
  setup(config) {
    config.addTransform(`assets-transform-parser`, this._transformParser);
  },
};
