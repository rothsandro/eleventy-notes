/**
 * Factory function to create a filter that sorts a collection of notes by title.
 * @returns The filter function.
 */
export const sortNotesByTitleFilter = () => {
  /**
   * Sorts a collection of notes by title.
   * @template T
   * @param {T[]} collection The collection to sort.
   * @returns {T[]} The sorted collection.
   */
  return (collection) => {
    return collection.slice().sort((a, b) => {
      const nameA = a.data.title || a.fileSlug;
      const nameB = b.data.title || b.fileSlug;
      return nameA.localeCompare(nameB);
    });
  };
};
