import { Alpine } from "./alpine";

Alpine.store("announce", {
  ariaLive: "assertive",
  text: "",

  async announce(text, ariaLive = "assertive") {
    this.text = text;
    this.ariaLive = ariaLive;
  },
});
