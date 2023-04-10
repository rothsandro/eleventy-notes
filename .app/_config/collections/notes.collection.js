const notesCollection = require("./_notes.collection");

module.exports = (eleventyConfig) => (collectionApi) => {
  const notes = notesCollection(eleventyConfig)(collectionApi);
  return notes.map((note) => ({
    title: note.data.title || note.page.fileSlug,
    tags: parseTags(note.data.tags),
    fileSlug: note.fileSlug,
    filePathStem: note.filePathStem,
    date: note.date,
    url: note.url,
    data: note.data,
  }));
};

function parseTags(tags) {
  if (Array.isArray(tags)) return tags;
  if (typeof tags === "string") return [tags];
  return [];
}
