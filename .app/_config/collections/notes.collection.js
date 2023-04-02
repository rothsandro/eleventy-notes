const notesCollection = require("./_notes.collection");

module.exports = (eleventyConfig) => (collectionApi) => {
  const notes = notesCollection(eleventyConfig)(collectionApi);
  return notes.map((note) => ({
    title: note.data.title || note.page.fileSlug,
    fileSlug: note.fileSlug,
    filePathStem: note.filePathStem,
    url: note.url,
    data: note.data,
  }));
};
