import { Alpine } from "./alpine";

Alpine.store("hotkeys", {
  async register(shortcut, callback) {
    window.addEventListener("keypress", (event) => {
      if (event.defaultPrevented) return;
      if (event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (!event.altKey || event.code !== shortcut) return;
      event.preventDefault();
      callback();
    });
  },
});
