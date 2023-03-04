import { Alpine } from "./alpine";

Alpine.data("collapsible", () => ({
  expanded: true,
  async toggle() {
    this.expanded = !this.expanded;
  },
}));
