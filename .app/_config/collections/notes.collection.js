const exclude = new Set(["/readme"]);

module.exports = () => (collectionApi) => {
  return collectionApi
    .getFilteredByGlob("../**/*.md")
    .filter((item) => !exclude.has(item.filePathStem.toLowerCase()))
    .sort((a, b) => {
      const nameA = a.data.title || a.fileSlug;
      const nameB = b.data.title || b.fileSlug;
      return nameA.localeCompare(nameB);
    });
};
