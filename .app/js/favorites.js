import { Alpine } from "./alpine";

const baseUrl = document.currentScript?.getAttribute("data-base") ?? "/";
const indexJsonUrl = baseUrl + "index.json";

Alpine.store("favorites", {
  index: {},
  items: Alpine.$persist([]).as("favorites"),

  async init() {
    this.index = await fetch(indexJsonUrl)
      .then((r) => r.json())
      .catch(() => {
        console.error("Could not fetch notes index");
        return {};
      });

    this.cleanUpFavorites();
  },

  is(id) {
    return this.items.includes(id);
  },

  toggle(id) {
    if (this.items.includes(id)) {
      this.items = this.items.filter((fav) => fav !== id);
    } else {
      this.items.push(id);
    }
  },

  cleanUpFavorites() {
    if (Object.keys(this.index).length === 0) return;
    this.items = this.items.filter((id) => !!this.index[id]);
  },
});
