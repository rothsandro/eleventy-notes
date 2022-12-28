const loader = require("./_config/utils/loader.util");

module.exports = (eleventyConfig) => {
  // Load eleventy configurations from './_config' folder
  loader([__dirname, "_config"], eleventyConfig);

  return {
    dir: {
      input: "./../",
      output: "dist",
      data: ".app/_data",
      includes: ".app/_includes",
    },
    dataTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
