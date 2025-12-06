/**
 * Provides the store for the panel overlay on mobile.
 *
 * @param {import("alpinejs").Alpine} Alpine The Alpine instance.
 */
export default function (Alpine) {
  Alpine.store("panel", {
    withOverlay: false,
    open: false,
    panelRef: null,
    overlayPanelRef: null,

    init() {
      this.panelRef = document.querySelector("[data-ref=panel]");
      this.overlayPanelRef = document.querySelector("[data-ref=overlayPanel]");
      if (!this.panelRef || !this.overlayPanelRef) return;

      observeMediaQuery("(min-width: 64em)", (matches) => {
        this.withOverlay = !matches;
        this.open = false;

        const source = this.withOverlay ? this.panelRef : this.overlayPanelRef;
        const target = this.withOverlay ? this.overlayPanelRef : this.panelRef;

        if (source.firstElementChild) {
          target.append(source.firstElementChild);
        }
      });
    },

    onOverlayClick(event) {
      const isSelf = event.target === event.currentTarget;
      const isSameTabLink =
        event.target.tagName === "A" &&
        event.target.getAttribute("target") !== "_blank";

      this.toggle(!(isSelf || isSameTabLink));
    },

    toggle(value) {
      this.open = value ?? !this.open;

      if (this.open) {
        Alpine.store("nav").toggle(false);
      }
    },
  });
}

function observeMediaQuery(query, callback) {
  const mediaQuery = window.matchMedia(query);

  const handle = () => callback(mediaQuery.matches);
  mediaQuery.addEventListener("change", handle);

  handle();

  return () => mediaQuery.removeEventListener("change", handle);
}
