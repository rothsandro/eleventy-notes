import { Alpine } from "./alpine";

Alpine.store("hotkeys", {
  async register(shortcut, callback) {
    const hotkeys = await import("hotkeys-js").then((m) => m.default);
    hotkeys(shortcut, (event) => {
      event.preventDefault();
      callback();
    });
  },
});
