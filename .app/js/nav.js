import Alpine from "alpinejs";

Alpine.store("nav", {
  open: false,
  toggle() {
    this.open = !this.open;
  },
});
