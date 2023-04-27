import { Alpine } from "./alpine";

const tags = new Set(["INPUT", "TEXTAREA", "SELECT"]);

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
