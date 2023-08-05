module.exports = {
  homeFilter: require("./home.filter"),

  setup(config) {
    config.addFilter("home", this.homeFilter(config));
  },
};
