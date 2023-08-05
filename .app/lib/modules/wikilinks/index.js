module.exports = {
  Wikilink: require("./wikilink"),
  _linksCollection: require("./_links.collection"),
  markdownPlugin: require("./wikilink.md-plugin"),

  setup(config) {
    config.addCollection("_links", this._linksCollection(config));
  },
};
