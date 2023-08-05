module.exports = {
  ariaCurrentFilter: require("./aria-current.filter"),
  featherFilter: require("./feather.filter"),
  featherRefFilter: require("./feather-ref.filter"),
  slugifyPathFilter: require("./slugify-path.filter"),
  uniqueIdGlobal: require("./unique-id.global"),
  ValueParser: require("./value-parser"),

  setup(config) {
    config.addFilter("ariaCurrent", this.ariaCurrentFilter(config));
    config.addFilter("feather", this.featherFilter(config));
    config.addFilter("featherRef", this.featherRefFilter(config));
    config.addFilter("slugifyPath", this.slugifyPathFilter(config));

    config.addNunjucksGlobal("uniqueId", this.uniqueIdGlobal(config));
  },
};
