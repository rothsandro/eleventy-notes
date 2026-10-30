export const _notesCollection = () => (collectionApi) => {
  return collectionApi.getFilteredByGlob("../**/*.md").sort((a, b) => {
    const nameA = String(a.data.title || a.fileSlug);
    const nameB = String(b.data.title || b.fileSlug);
    return nameA.localeCompare(nameB);
  });
};
