module.exports = (collectionApi) => {
  const tagsFromPosts = collectionApi
    .getAll()
    .filter((item) => Array.isArray(item.data.tags))
    .flatMap((item) => item.data.tags);

  return Array.from(new Set(tagsFromPosts)).sort();
};
