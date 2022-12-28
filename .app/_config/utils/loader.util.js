const fs = require("fs");
const path = require("path");

const configs = {
  collections: function (eleventyConfig, col, name) {
    eleventyConfig.addCollection(name, col);
  },
  libraries: function (eleventyConfig, lib, name) {
    eleventyConfig.setLibrary(name, lib(eleventyConfig));
  },
  plugins: function (eleventyConfig, plugin) {
    eleventyConfig.addPlugin(...plugin);
  },
  filters: function (eleventyConfig, filter, name) {
    eleventyConfig.addFilter(name, filter);
  },
  watchtargets: function (eleventyConfig, watchTarget) {
    eleventyConfig.addWatchTarget(watchTarget);
  },
};

/**
 * Loads the eleventy configurations from the given directory.
 *
 * @param {string[]} directory The path to the config folder
 * @param {object} The eleventy config object
 */
module.exports = (directory, eleventyConfig) => {
  Object.entries(configs).forEach(([folder, handler]) => {
    load(path.join(...directory, folder), handler, eleventyConfig);
  });
};

function kebabCaseToCamelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

function load(folder, handler, eleventyConfig) {
  const fileNameList = fs.readdirSync(folder);
  fileNameList.forEach((fileName) => {
    const kebabCaseName = fileName.split(".").slice(0, -2).join(".");
    const name = kebabCaseToCamelCase(kebabCaseName);
    const requirePath = path.join(folder, fileName);
    delete require.cache[require.resolve(requirePath)];
    const module = require(requirePath);
    handler(eleventyConfig, module, name);
  });
}
