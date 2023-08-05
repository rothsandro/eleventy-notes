/**
 * Creates the store for the collapsible sidebar.
 *
 * @param {import('alpinejs').Alpine} Alpine The alpine instance.
 */
export default function (Alpine) {
  Alpine.store("nav", {
    open: false,
    toggle() {
      this.open = !this.open;
    },
  });
}
