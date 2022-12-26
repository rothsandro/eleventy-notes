const loader = require("./_config/utils/loader.util");

module.exports = (eleventyConfig) => {
  loader(__dirname, {
    "_config/collections": (col, name) =>
      eleventyConfig.addCollection(name, col),
    "_config/libraries": (lib, name) =>
      eleventyConfig.setLibrary(name, lib(eleventyConfig)),
    "_config/plugins": (plugin) => eleventyConfig.addPlugin(...plugin),
    "_config/filters": (filter, name) => eleventyConfig.addFilter(name, filter),
  });

  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addWatchTarget("dist/app.js");

  return {
    dir: {
      input: "./../",
      output: "dist",
      data: ".app/_data",
      includes: ".app/_includes",
    },
  };
};
