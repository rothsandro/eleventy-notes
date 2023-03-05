import { Alpine } from "./alpine";

Alpine.data("collapsible", (key, defaultExpanded) => ({
  expanded: Alpine.$persist(defaultExpanded)
    .as(`collapsible:${key}`)
    .using(sessionStorage),

  init() {
    if (this.$el.querySelector("[aria-current=page]")) {
      this.expanded = true;
    }
  },

  toggle() {
    this.expanded = !this.expanded;
  },
}));
