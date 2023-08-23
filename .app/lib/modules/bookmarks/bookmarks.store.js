const baseUrl = document.currentScript?.getAttribute("data-base") ?? "/";
const indexJsonUrl = baseUrl + "index.json";

/**
 * Creates the bookmarks store.
 *
 * @param {import('alpinejs').Alpine} Alpine The alpine instance.
 */
export default function (Alpine) {
  Alpine.store("bookmarks", {
    /**
     * The index of all notes.
     * A key-value map of note URLs to note titles.
     * @type {Record<string, string>}
     */
    index: {},

    /**
     * The list of bookmarked notes.
     * @type {string[]}
     */
    items: Alpine.$persist([]).as("favorites"), // called favorites for backwards compatibility

    async init() {
      this.index = await fetch(indexJsonUrl)
        .then((r) => r.json())
        .catch(() => {
          console.error("Could not fetch notes index");
          return {};
        });

      this.cleanUpBookmarks();
    },

    is(id) {
      return this.items.includes(id);
    },

    /**
     * Toggles the bookmark status of a note.
     * @param {string} id
     */
    toggle(id) {
      if (this.items.includes(id)) {
        this.items = this.items.filter((bkm) => bkm !== id);
      } else {
        this.items.push(id);
      }
    },

    cleanUpBookmarks() {
      if (Object.keys(this.index).length === 0) return;
      this.items = this.items.filter((id) => !!this.index[id]);
    },
  });
}
