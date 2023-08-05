/**
 * Register the scroll container data object.
 *
 * @param {import("alpinejs").Alpine} Alpine The alpine instance.
 */
export default function (Alpine) {
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
}
