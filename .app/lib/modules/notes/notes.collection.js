import { _notesCollection } from "./_notes.collection.js";

/**
 * Factory function for the notes collection.
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 * @returns The notes collection function.
 */
export const notesCollection = (eleventyConfig) => (collectionApi) => {
  const notes = _notesCollection(eleventyConfig)(collectionApi);
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
