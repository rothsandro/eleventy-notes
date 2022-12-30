const notesCollection = require("./notes.collection");

module.exports = (eleventyConfig) => (collectionApi) => {
  const notes = notesCollection(eleventyConfig)(collectionApi).filter(
    (note) => note.page.filePathStem !== "/index"
  );
  const groups = {};

  notes.forEach((note) => {
    const [folder = ""] = note.page.filePathStem.split("/").slice(1, -1);
    groups[folder] ??= [];
    groups[folder].push(note);
  });

  return groups;
};
