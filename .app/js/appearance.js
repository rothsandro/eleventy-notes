import { Alpine } from "./alpine";

Alpine.store("appearance", {
  theme: Alpine.$persist("system").as("theme"),

  init() {
    Alpine.effect(() => {
      const root = document.documentElement;
      root.setAttribute("data-no-transition", "");
      root.setAttribute("data-theme", this.theme);
      setTimeout(() => root.removeAttribute("data-no-transition"));
    });
  },
});
