module.exports = {
  resolveCustomPropsFilter: require("./resolve-custom-props.filter"),

  setup(config) {
    config.addFilter(
      "resolveCustomProps",
      this.resolveCustomPropsFilter(config)
    );
  },
};
