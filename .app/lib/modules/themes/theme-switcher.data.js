/**
 * Provides the theme switcher menu component data.
 * @param {import("alpinejs").Alpine} Alpine The Alpine instance.
 */
export default function (Alpine) {
  Alpine.data("themeSwitcher", () => ({
    open: false,
    menuItems: ["light", "dark", "system"],

    get currentIndex() {
      return this.menuItems.indexOf(this.$store.appearance.theme);
    },

    openMenu() {
      this.open = true;
      this.$nextTick(() => {
        const checkedItem = this.$refs.menu.querySelector("[aria-checked=true]");
        if (checkedItem) {
          checkedItem.focus();
        } else {
          this.$refs.menu.querySelector("[role=menuitemradio]").focus();
        }
      });
    },

    closeMenu() {
      this.open = false;
      this.$refs.button.focus();
    },

    focusNext(currentIndex) {
      const nextIndex = (currentIndex + 1) % 3;
      this.$refs.menu.querySelectorAll("[role=menuitemradio]")[nextIndex].focus();
    },

    focusPrevious(currentIndex) {
      const prevIndex = (currentIndex - 1 + 3) % 3;
      this.$refs.menu.querySelectorAll("[role=menuitemradio]")[prevIndex].focus();
    },

    selectTheme(theme) {
      this.$store.appearance.theme = theme;
      this.closeMenu();
    },

    handleMenuKeydown(event) {
      // Tab and Shift+Tab should close the menu and move focus out
      if (event.key === "Tab") {
        this.closeMenu();
        // Don't prevent default - let the browser handle tab navigation
      }
    },
  }));
}
