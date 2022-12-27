import Alpine from "alpinejs";
import hotkeys from "hotkeys-js";

Alpine.store("hotkeys", {
  register(shortcut, callback) {
    hotkeys(shortcut, (event) => {
      event.preventDefault();
      callback();
    });
  },
});
