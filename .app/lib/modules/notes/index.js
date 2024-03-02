module.exports = {
  _notesCollection: require("./_notes.collection"),
  notesCollection: require("./notes.collection"),
  editThisNoteLinkFilter: require("./edit-this-note-link.filter"),
  sortNotesByTitleFilter: require("./sort-notes-by-title.filter"),
  copyCodeMarkdownPlugin: require("./copy-code.md-plugin"),

  /**
   * Sets up the module.
   * @param {import("@11ty/eleventy").UserConfig} config
   */
  setup(config) {
    config.addCollection("_notes", this._notesCollection(config));
    config.addCollection("notes", this.notesCollection(config));

    config.addFilter("editThisNoteLink", this.editThisNoteLinkFilter(config));
    config.addFilter("sortNotesByTitle", this.sortNotesByTitleFilter(config));
  },
};
