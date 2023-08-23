/**
 * Creates the slugifyPath filter.
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 * @returns {((path: string) => string)} The filter function.
 */
module.exports = (eleventyConfig) => (path) => {
  const separator = "/";
  const slugify = eleventyConfig.getFilter("slugify");

  return path
    .split(separator)
    .map((segment) => slugify(segment))
    .join(separator);
};
