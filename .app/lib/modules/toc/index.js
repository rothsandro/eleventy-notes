module.exports = {
  tocFilter: require("./toc.filter"),

  setup(config) {
    config.addFilter("toc", this.tocFilter(config));
  },
};
