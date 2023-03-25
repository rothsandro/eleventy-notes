module.exports = () => (collection, tag) => {
  return collection.slice().sort((a, b) => {
    const nameA = a.data.title || a.fileSlug;
    const nameB = b.data.title || b.fileSlug;
    return nameA.localeCompare(nameB);
  });
};
