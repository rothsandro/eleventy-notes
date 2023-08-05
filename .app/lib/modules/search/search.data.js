const baseUrl = document.currentScript?.getAttribute("data-base") ?? "/";
const searchJsonUrl = baseUrl + "search.json";

/**
 * Creates the search data for searching notes.
 *
 * @param {import('alpinejs').Alpine} Alpine The alpine instance.
 */
export default function (Alpine) {
  Alpine.data("search", () => ({
    _notes$: null,
    _index$: null,

    open: false,
    term: "",
    results: null,
    selectedId: null,

    init() {
      this.$watch("term", async () => {
        this.results = await this.search();
        this.open = true;
        this.selectedId = this.results[0]?.id ?? null;
      });
    },

    get selectedIdx() {
      return this.results.findIndex((r) => r.id === this.selectedId);
    },

    selectPrevResult() {
      const newIdx = Math.max(0, this.selectedIdx - 1);
      this.selectedId = this.results[newIdx].id;
    },

    selectNextResult() {
      const newIdx = Math.min(this.results.length - 1, this.selectedIdx + 1);
      this.selectedId = this.results[newIdx].id;
    },

    onKeyDown(event) {
      switch (event.key) {
        case "Escape":
          this.open = false;
          break;
        case "ArrowUp":
          event.preventDefault();
          this.results && this.selectPrevResult();
          break;
        case "ArrowDown":
          event.preventDefault();
          this.results && this.selectNextResult();
          break;
        case "Enter":
          event.preventDefault();
          const result = this.results?.[this.selectedIdx];
          if (result) window.location.href = result.url;
          break;
      }
    },

    async fetchNotes() {
      if (!this._notes) {
        this._notes = new Promise(async (resolve) => {
          const result = await fetch(searchJsonUrl).then((r) => r.json());
          resolve(result.notes);
        });
      }
      return this._notes;
    },

    async buildSearchIndex() {
      if (!this._index$) {
        this._index$ = new Promise(async (resolve) => {
          const FlexSearch = await import("flexsearch");
          const doc = new FlexSearch.Document({
            document: {
              id: "url",
              tag: "tags",
              index: [
                {
                  field: "title",
                  tokenize: "full",
                  optimize: true,
                  resolution: 9,
                },
                {
                  field: "content",
                  tokenize: "full",
                  optimize: true,
                  resolution: 5,
                  minlength: 3,
                  context: {
                    depth: 1,
                    resolution: 3,
                  },
                },
              ],
            },
          });

          const notes = await this.fetchNotes();
          notes.forEach((note) => doc.add(note));
          resolve(doc);
        });
      }

      return this._index$;
    },

    async search() {
      const index = await this.buildSearchIndex();
      const notes = await this.fetchNotes();

      const tagsQuery = this.term.match(/#(\S+)/g) ?? [];
      const tags = tagsQuery.map((tag) => tag.substring(1));
      const termWithoutTags = this.term.replace(/#(\S+)/g, "").trim();

      const options = { tag: tags };
      const results = termWithoutTags
        ? index.search(termWithoutTags, options)
        : index.search(options);

      const files = Array.from(
        new Set(results.flatMap((entry) => entry.result))
      );
      const foundNotes = files
        .map((file) => notes.find((n) => n.url === file))
        .filter(Boolean);
      return foundNotes;
    },
  }));
}
