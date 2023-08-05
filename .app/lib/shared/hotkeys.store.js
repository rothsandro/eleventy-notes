const tags = new Set(["INPUT", "TEXTAREA", "SELECT"]);

/**
 * Creates the store for registering hotkeys.
 *
 * @param {import("alpinejs").Alpine} Alpine The alpine instance.
 */
export default function (Alpine) {
  Alpine.store("hotkeys", {
    async register(shortcut, callback) {
      document.addEventListener("keydown", (event) => {
        if (event.defaultPrevented) return;
        if (event.key !== shortcut || event.metaKey || event.ctrlKey) return;
        if (tags.has(document.activeElement?.tagName)) return;
        event.preventDefault();
        callback();
      });
    },
  });
}
