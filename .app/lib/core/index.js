const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
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

    config.setServerOptions({
      watch: ["dist/app.js", "dist/app.*.css"],
    });

    config.addWatchTarget("./../app.js");
  },
};
