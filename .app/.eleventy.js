const sharedModule = require("./lib/shared");
const customPropsModule = require("./lib/modules/custom-props");
const dynamicContentModule = require("./lib/modules/dynamic-content");
const notesModule = require("./lib/modules/notes");
const searchModule = require("./lib/modules/search");
const sidebarModule = require("./lib/modules/sidebar");
const tagsModule = require("./lib/modules/tags");
const tocModule = require("./lib/modules/toc");
const wikilinksModule = require("./lib/modules/wikilinks");
const assetsModule = require("./lib/modules/assets");
const core = require("./lib/core");

module.exports = (eleventyConfig) => {
  sharedModule.setup(eleventyConfig);

  customPropsModule.setup(eleventyConfig);
  dynamicContentModule.setup(eleventyConfig);
  notesModule.setup(eleventyConfig);
  searchModule.setup(eleventyConfig);
  sidebarModule.setup(eleventyConfig);
  tagsModule.setup(eleventyConfig);
  tocModule.setup(eleventyConfig);
  wikilinksModule.setup(eleventyConfig);
  assetsModule.setup(eleventyConfig);

  core.setup(eleventyConfig);

  return core.configObj;
};
