import { createIndex } from "./search-index.js";

export const searchModule = {
  /**
   * Sets up the module
   * @param {import("@11ty/eleventy").UserConfig} config
   */
  setup(config) {
    config.on("eleventy.after", async ({ dir, runMode }) => {
      const isBuild = runMode === "build";
      isBuild ? await createIndex(dir.output) : createIndex(dir.output);
    });
  },
};
