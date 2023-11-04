/**
 * Creates the collection factory of all tags
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 * @returns The collection function
 */
module.exports = (eleventyConfig) => (collectionApi) => {
  delete require.cache[require.resolve("../../../_data/app")];
  const appData = require("../../../_data/app");
  const app = appData();
  const slugify = eleventyConfig.getFilter("slugify");

  function convertTag(tag) {
    const mapping = app.tags.map[tag];

    if (!mapping) {
      return { label: tag, slug: slugify(tag) };
    }

    if (typeof mapping === "string") {
      return { label: mapping, slug: slugify(mapping) };
    }

    return {
      label: mapping.label,
      slug: mapping.slug,
    };
  }

  const tagsFromPosts = collectionApi
    .getAll()
    .filter((item) => Array.isArray(item.data.tags))
    .flatMap((item) => item.data.tags)
    .filter((tag, idx, list) => list.indexOf(tag) === idx)
    .map((tag) => {
      const convertedTag = convertTag(tag);

      if (!convertedTag.slug) {
        throw new Error(`Unsupported tag "${tag}", a tag mapping is required.`);
      }

      return {
        id: tag,
        slug: convertedTag.slug,
        url: `/tags/${convertedTag.slug}/`,
        label: convertedTag.label,
        notes: collectionApi.getFilteredByTag(tag),
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));

  tagsFromPosts.byId = tagsFromPosts.reduce((acc, tag) => {
    acc[tag.id] = tag;
    return acc;
  }, {});

  return tagsFromPosts;
};
