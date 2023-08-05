/**
 * Creates the store for the appearance (light / dark theme).
 *
 * @param {import('alpinejs').Alpine} Alpine The alpine instance.
 */
export default function (Alpine) {
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
}
