const sharedModule = require("./lib/shared");
const customPropsModule = require("./lib/modules/custom-props");
const dynamicContentModule = require("./lib/modules/dynamic-content");
const notesModule = require("./lib/modules/notes");
const tagsModule = require("./lib/modules/tags");
const tocModule = require("./lib/modules/toc");
const wikilinksModule = require("./lib/modules/wikilinks");
const core = require("./lib/core");

module.exports = (eleventyConfig) => {
  sharedModule.setup(eleventyConfig);

  customPropsModule.setup(eleventyConfig);
  dynamicContentModule.setup(eleventyConfig);
  notesModule.setup(eleventyConfig);
  tagsModule.setup(eleventyConfig);
  tocModule.setup(eleventyConfig);
  wikilinksModule.setup(eleventyConfig);

  core.setup(eleventyConfig);

  return core.configObj;
};
