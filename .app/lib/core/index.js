const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const pageAssetsPlugin = require("eleventy-plugin-page-assets");
const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = {
  mdLibrary: require("./md.library"),

  configObj: {
    pathPrefix: process.env.ELEVENTY_NOTES_PATH_PREFIX || undefined,
    dir: {
      input: "./../",
      output: "dist",
      data: ".app/_data",
      includes: ".app/lib",
    },
    markdownTemplateEngine: false,
  },

  setup(config) {
    config.setLibrary("md", this.mdLibrary(config));

    config.addPlugin(EleventyHtmlBasePlugin);
    config.addPlugin(syntaxHighlightPlugin);
    config.addPlugin(pageAssetsPlugin, {
      mode: "parse",
      postsMatching: "*.md",
    });

    config.setServerOptions({
      watch: ["dist/app.js", "dist/app.*.css"],
    });
  },
};
