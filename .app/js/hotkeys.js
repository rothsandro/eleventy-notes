import { Alpine } from "./alpine";

const tags = new Set(["INPUT", "TEXTAREA", "SELECT"]);

Alpine.store("hotkeys", {
  async register(shortcut, callback) {
    document.addEventListener("keyup", (event) => {
      if (event.defaultPrevented || event.key !== shortcut) return;
      if (tags.has(document.activeElement?.tagName)) return;
      event.preventDefault();
      callback();
    });
  },
});
