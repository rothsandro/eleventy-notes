/**
 * Registers the WindowScroll object for x-bind.
 *
 * @param {import("alpinejs").Alpine} Alpine The Alpine instance.
 */
export default function (Alpine) {
  Alpine.bind("WindowScroll", () => ({
    ["@scroll.window"]() {
      this.$el.setAttribute(
        "data-scrolled",
        window.document.documentElement.scrollTop > 0
      );
    },
  }));
}
