const notesCollection = require("./notes.collection");

module.exports = (collectionApi) => {
  const notes = notesCollection(collectionApi);
  const groups = {};

  notes.forEach((note) => {
    const [folder = ""] = note.page.filePathStem.split("/").slice(1, -1);
    groups[folder] ??= [];
    groups[folder].push(note);
  });

  return groups;
};
