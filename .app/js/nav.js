import { Alpine } from "./alpine";

Alpine.store("nav", {
  open: false,
  toggle() {
    this.open = !this.open;
  },
});
