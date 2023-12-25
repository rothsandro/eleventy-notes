const baseUrl = document.currentScript?.getAttribute("data-base") ?? "/";
const searchJsonUrl = baseUrl + "search.json";
const pagefindUrl = baseUrl + "pagefind/pagefind.js";

/**
 * Creates the search data for searching notes.
 *
 * @param {import('alpinejs').Alpine} Alpine The alpine instance.
 */
export default function (Alpine) {
  Alpine.data("search", () => ({
    _notes$: null,
    _pagefind: null,

    open: false,
    term: "",
    results: null,
    selectedId: null,

    init() {
      this.$watch("term", async () => {
        const results = await this.search();

        if (results) {
          this.results = results;
          this.open = true;
          this.selectedId = this.results[0]?.id ?? null;
        }
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

    async loadPagefind() {
      if (!this._pagefind) {
        this._pagefind = new Promise(async (resolve) => {
          // Workaround, waiting for https://github.com/parcel-bundler/parcel/issues/8316
          const pagefind = await eval(`import("${pagefindUrl}")`);
          await pagefind.options({ excerptLength: 15 });
          resolve(pagefind);
        });
      }

      return this._pagefind;
    },

    async search() {
      const pagefind = await this.loadPagefind();

      const tagsQuery = this.term.match(/#(\S+)/g) ?? [];
      const tags = tagsQuery.map((tag) => tag.substring(1));
      const termWithoutTags = this.term.replace(/#(\S+)/g, "").trim();
      const searchTerm = termWithoutTags || null;
      const filters = tags.length ? { tags } : undefined;
      const search = await pagefind.debouncedSearch(searchTerm, { filters });
      if (!search) return null;

      const results = await Promise.all(search.results.map((x) => x.data()));

      return results.map((x) => ({
        id: x.url,
        url: x.url,
        title: x.meta.title,
        excerpt: x.excerpt,
      }));
    },
  }));
}
