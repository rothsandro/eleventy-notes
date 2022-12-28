import { Alpine } from "./alpine";

Alpine.store("appearance", {
  theme: Alpine.$persist("light").as("theme"),

  init() {
    Alpine.effect(() => {
      document.body.setAttribute("data-theme", this.theme);
    });
  },
});
