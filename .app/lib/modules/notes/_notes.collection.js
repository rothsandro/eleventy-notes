export const _notesCollection = () => (collectionApi) => {
  return collectionApi.getFilteredByGlob("../**/*.md").sort((a, b) => {
    const nameA = a.data.title || a.fileSlug;
    const nameB = b.data.title || b.fileSlug;
    return nameA.localeCompare(nameB);
  });
};
