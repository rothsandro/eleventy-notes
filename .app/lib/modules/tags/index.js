module.exports = {
  tagsCollection: require("./tags.collection"),

  setup(config) {
    config.addCollection("tags", this.tagsCollection(config));
  },
};
