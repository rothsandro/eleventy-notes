import { Alpine } from "./alpine";

Alpine.bind("WindowScroll", () => ({
  ["@scroll.window"]() {
    this.$el.setAttribute(
      "data-scrolled",
      window.document.documentElement.scrollTop > 0
    );
  },
}));
