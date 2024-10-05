import { createIndex } from "./search-index.js";

export const searchModule = {
  /**
   * Sets up the module
   * @param {import("@11ty/eleventy").UserConfig} config
   */
  setup(config) {
    config.on("eleventy.after", async ({ directories, runMode }) => {
      const isBuild = runMode === "build";
      const dir = directories.output;

      isBuild ? await createIndex(dir) : createIndex(dir);
    });
  },
};
