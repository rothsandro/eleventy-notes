module.exports = (eleventyConfig) => (path) => {
  const separator = "/";
  const slugify = eleventyConfig.getFilter("slugify");

  return path
    .split(separator)
    .map((segment) => slugify(segment))
    .join(separator);
};
