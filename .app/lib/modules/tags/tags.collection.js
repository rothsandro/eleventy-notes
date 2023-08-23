/**
 * Creates the collection factory of all tags
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 * @returns The collection function
 */
module.exports = (eleventyConfig) => (collectionApi) => {
  const slugify = eleventyConfig.getFilter("slugify");
  const tagsFromPosts = collectionApi
    .getAll()
    .filter((item) => Array.isArray(item.data.tags))
    .flatMap((item) => item.data.tags)
    .filter((tag, idx, list) => list.indexOf(tag) === idx)
    .map((tag) => ({
      id: slugify(tag),
      url: `/tags/${slugify(tag)}/`,
      title: tag,
      notes: collectionApi.getFilteredByTag(tag),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  return tagsFromPosts;
};
