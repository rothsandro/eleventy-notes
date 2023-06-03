import { Alpine } from "./alpine";

Alpine.store("appearance", {
  theme: Alpine.$persist("system").as("theme"),

  init() {
    Alpine.effect(() => {
      document.documentElement.setAttribute("data-theme", this.theme);
    });
  },
});
