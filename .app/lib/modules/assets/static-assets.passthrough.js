import appData from "../../../_data/app.js";

/**
 * Registers the static assets as passthrough copy in Eleventy.
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 */
export function registerStaticAssetsAsPassthroughCopy(eleventyConfig) {
  const pathsConfig = appData().staticAssets.paths;
  if (!pathsConfig) return;

  const pathsObj = transformToPathsObject(pathsConfig);
  const copyObj = transformInputPaths(pathsObj);
  eleventyConfig.addPassthroughCopy(copyObj);
}

function transformToPathsObject(paths) {
  if (typeof paths === "string") {
    return { [paths]: paths };
  }

  if (Array.isArray(paths)) {
    return paths.reduce((acc, asset) => {
      acc[asset] = asset;
      return acc;
    }, {});
  }

  return paths;
}

function transformInputPaths(pathsObj) {
  return Object.entries(pathsObj).reduce((acc, [input, output]) => {
    // PassthroughCopy paths are relative to the root of the Eleventy project,
    // which is the .app directory but the user uses paths
    // relative to the root of repository.
    acc[`./../${input}`] = output;
    return acc;
  }, {});
}
