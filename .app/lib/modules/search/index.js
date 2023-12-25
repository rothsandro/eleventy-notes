module.exports = {
  _createIndex: require("./search-index"),

  /**
   * Sets up the module
   * @param {import("@11ty/eleventy").UserConfig} config
   */
  setup(config) {
    config.on("eleventy.after", async ({ dir, runMode }) => {
      const isBuild = runMode === "build";
      isBuild
        ? await this._createIndex(dir.output)
        : this._createIndex(dir.output);
    });
  },
};
