import { Alpine } from "./alpine";

Alpine.data("collapsible", (key) => ({
  expanded: Alpine.$persist(true)
    .as(`collapsible:${key}`)
    .using(sessionStorage),

  init() {
    if (this.$el.querySelector("[aria-current=page]")) {
      this.expanded = true;
    }
  },

  async toggle() {
    this.expanded = !this.expanded;
  },
}));
