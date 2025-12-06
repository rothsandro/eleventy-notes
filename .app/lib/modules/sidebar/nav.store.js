/**
 * Creates the store for the collapsible sidebar.
 *
 * @param {import('alpinejs').Alpine} Alpine The alpine instance.
 */
export default function (Alpine) {
  Alpine.store("nav", {
    open: false,
    toggle(value) {
      this.open = value ?? !this.open;

      if (this.open) {
        Alpine.store("panel").toggle(false);
      }
    },
  });
}
