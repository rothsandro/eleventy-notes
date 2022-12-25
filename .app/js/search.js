import Alpine from "alpinejs";

Alpine.data("search", () => ({
  _notes$: null,
  _index$: null,

  open: false,
  term: "",
  results: null,

  get isBusy() {
    return this._index$ === null;
  },

  init() {
    this.$watch("term", async () => {
      this.results = await this.search();
    });
  },

  async fetchNotes() {
    if (!this._notes) {
      this._notes = new Promise(async (resolve) => {
        const result = await fetch("/search.json").then((r) => r.json());
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

    const files = Array.from(new Set(results.flatMap((entry) => entry.result)));
    const foundNotes = notes.filter((note) => files.includes(note.url));
    return foundNotes;
  },
}));
