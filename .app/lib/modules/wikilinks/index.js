module.exports = {
  Wikilink: require("./wikilink"),
  _linksCollection: require("./_links.collection"),
  markdownPlugin: require("./wikilink.md-plugin"),

  /**
   * Sets up the module
   * @param {import("@11ty/eleventy").UserConfig} config
   */
  setup(config) {
    config.addCollection("_links", this._linksCollection(config));
  },
};
