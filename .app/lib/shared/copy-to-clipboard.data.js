/**
 * Provides a data object to copy text to the clipboard.
 *
 * @param {import("alpinejs").Alpine} Alpine The Alpine instance.
 */
export default function (Alpine) {
  Alpine.data("copyToClipboard", () => ({
    copied: false,
    copyBtn: {
      ":data-copied"() {
        return `${this.copied}`;
      },
      async ["@click"]() {
        const text = this.$el.previousElementSibling.innerText;
        await navigator.clipboard.writeText(text);
        this.copied = true;
        setTimeout(() => (this.copied = false), 1500);
      },
    },
  }));
}
