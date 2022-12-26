import Alpine from "alpinejs";

Alpine.data("scrollContainer", (identifier) => ({
  key: `scroll-position-${identifier}`,
  init() {
    const value = sessionStorage.getItem(this.key);
    value && (this.$el.scrollTop = parseInt(value, 10));
  },
  container: {
    ["@scroll.debounce"](event) {
      console.log("scrolling");
      sessionStorage.setItem(this.key, event.target.scrollTop);
    },
  },
}));
