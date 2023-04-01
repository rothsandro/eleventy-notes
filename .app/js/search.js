import { Alpine } from "./alpine";

const baseUrl = document.currentScript?.getAttribute("data-base") ?? "/";
const searchJsonUrl = baseUrl + "search.json";

Alpine.data("search", () => ({
  _notes$: null,
  _index$: null,

  open: false,
  term: "",
  results: null,
  selectedIndex: 0,

  get isBusy() {
    return this._index$ === null;
  },

  init() {
    this.$watch("term", async () => {
      this.results = await this.search();
      this.open = true;
      this.selectedIndex = 0;
      this.announceSelected();
    });
  },

  onKeyDown(event) {
    switch (event.key) {
      case "Escape":
        this.open = false;
        break;
      case "ArrowUp":
        event.preventDefault();
        this.selectedIndex = Math.max(0, this.selectedIndex - 1);
        this.announceSelected();
        break;
      case "ArrowDown":
        event.preventDefault();
        this.selectedIndex = Math.min(
          this.results.length - 1,
          this.selectedIndex + 1
        );
        this.announceSelected();
        break;
      case "Enter":
        event.preventDefault();
        const result = this.results[this.selectedIndex];
        if (result) {
          window.location.href = result.url;
        }
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

    const files = Array.from(new Set(results.flatMap((entry) => entry.result)));
    const foundNotes = files
      .map((file) => notes.find((n) => n.url === file))
      .filter(Boolean);
    return foundNotes;
  },

  announceSelected() {
    const result = this.results[this.selectedIndex];
    if (result) {
      const text = `${result.title}, selected`;
      Alpine.store("announce").announce(text);
    }
  },
}));
