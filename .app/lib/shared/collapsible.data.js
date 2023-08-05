/**
 * Creates the collapsible data for collapsing sections.
 * @param {import("alpinejs").Alpine} Alpine The alpine instance.
 */
export default function (Alpine) {
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
}
