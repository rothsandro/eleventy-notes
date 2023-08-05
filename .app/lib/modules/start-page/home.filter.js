module.exports = () => (collection) => {
  return collection.find((item) => item.page.filePathStem === "/index");
};
