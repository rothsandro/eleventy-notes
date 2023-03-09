import { Alpine } from "./alpine";

Alpine.data("scrollContainer", (identifier) => ({
  key: `scroll-position:${identifier}`,
  init() {
    const value = sessionStorage.getItem(this.key);
    setTimeout(() => (this.$el.scrollTop = parseInt(value, 10)));
  },
  container: {
    ["@scroll.debounce"](event) {
      sessionStorage.setItem(this.key, event.target.scrollTop);
    },
  },
}));
