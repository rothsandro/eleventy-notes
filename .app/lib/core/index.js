import syntaxHighlightPlugin from "@11ty/eleventy-plugin-syntaxhighlight";
import { markdownLibrary } from "./md.library.js";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import appData from "./../../_data/app.js";
import fs from "fs";

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
    const scssConfig = "./css/config.generated.scss";
    const customStyles = "./../app.styles.scss";

    let content = fs.existsSync(scssConfig)
      ? fs.readFileSync(scssConfig, "utf8")
      : null;

    config.on("eleventy.before", async () => {
      const appConfig = await import("./../../_data/app.js").then((m) =>
        m.default()
      );

      const nextContent = [
        "// DON'T EDIT THIS FILE!",
        `$theme: "${appConfig.theme.color}";`,
        `$custom-styles: ${fs.existsSync(customStyles)};`,
      ].join("\n");

      if (content === nextContent) return;

      content = nextContent;
      fs.writeFileSync(scssConfig, content, "utf8");
    });

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
