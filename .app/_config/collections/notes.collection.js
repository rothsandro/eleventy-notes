module.exports = (collectionApi) => {
  return collectionApi.getFilteredByGlob("../*.md");
};
