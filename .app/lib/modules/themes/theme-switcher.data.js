/**
 * Provides the theme switcher menu component data.
 * @param {import("alpinejs").Alpine} Alpine The Alpine instance.
 */
export default function (Alpine) {
  Alpine.data("themeSwitcher", () => ({
    open: false,
    focusedIdx: 0,
    themes: [], // Will be initialized in x-init

    openMenu() {
      this.open = true;

      this.focusOnNextTick(this.themes.indexOf(this.$store.appearance.theme));
    },

    closeMenu({ restoreFocus = true } = {}) {
      this.open = false;
      restoreFocus && this.$refs.trigger.focus();
    },

    onFocusOut(event) {
      if (this.open && !this.$refs.menu.contains(event.relatedTarget)) {
        this.$nextTick(() => this.closeMenu({ restoreFocus: false }));
      }
    },

    focusNext() {
      this.focusOnNextTick((this.focusedIdx + 1) % this.themes.length);
    },

    focusPrevious() {
      const { length } = this.themes;
      this.focusOnNextTick((this.focusedIdx - 1 + length) % length);
    },

    selectTheme(theme, { keepOpen = false } = {}) {
      this.$store.appearance.theme = theme;
      !keepOpen && this.closeMenu();
    },

    focusOnNextTick(index) {
      this.focusedIdx = index;

      this.$nextTick(() => {
        this.$refs.menu.querySelector('[data-focused="true"]')?.focus();
      });
    },
  }));
}
