import { _notesCollection } from "./_notes.collection.js";
import { notesCollection } from "./notes.collection.js";
import { editThisNoteLinkFilter } from "./edit-this-note-link.filter.js";
import { sortNotesByTitleFilter } from "./sort-notes-by-title.filter.js";
import { copyCodeMarkdownPlugin } from "./copy-code.md-plugin.js";

export const notesModule = {
  _notesCollection,
  notesCollection,
  copyCodeMarkdownPlugin,

  /**
   * Sets up the module.
   * @param {import("@11ty/eleventy").UserConfig} config
   */
  setup(config) {
    config.addCollection("_notes", this._notesCollection(config));
    config.addCollection("notes", this.notesCollection(config));

    config.addFilter("editThisNoteLink", editThisNoteLinkFilter(config));
    config.addFilter("sortNotesByTitle", sortNotesByTitleFilter(config));
  },
};
