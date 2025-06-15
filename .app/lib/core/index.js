import syntaxHighlightPlugin from "@11ty/eleventy-plugin-syntaxhighlight";
import { markdownLibrary } from "./md.library.js";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import appData from "./../../_data/app.js";

export const core = {
  configObj: {
    pathPrefix: process.env.ELEVENTY_NOTES_PATH_PREFIX || undefined,
    markdownTemplateEngine: false,
  },

  /**
   * Sets up the core.
   * @param {import("@11ty/eleventy").UserConfig} config
   */
  setup(config) {
    config.setLibrary("md", markdownLibrary(config));

    config.addPlugin(EleventyHtmlBasePlugin);
    config.addPlugin(syntaxHighlightPlugin);

    config.setServerOptions({
      watch: ["dist/app.js", "dist/app.css"],
    });

    config.setInputDirectory("./../");
    config.setOutputDirectory("dist");
    config.setDataDirectory(".app/_data");
    config.setIncludesDirectory(".app/lib");

    [".app/dist/", ".app/node_modules/", ...(appData().ignores ?? [])]
      .map((path) => `./../${path}`)
      .forEach((path) => {
        config.ignores.add(path);
        config.watchIgnores.add(path);
      });

    config.addWatchTarget("./../app.mjs");
  },
};
