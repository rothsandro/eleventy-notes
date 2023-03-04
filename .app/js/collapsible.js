import { Alpine } from "./alpine";

Alpine.data("collapsible", (key) => ({
  expanded: Alpine.$persist(true)
    .as(`collapsible:${key}`)
    .using(sessionStorage),
  async toggle() {
    this.expanded = !this.expanded;
  },
}));
