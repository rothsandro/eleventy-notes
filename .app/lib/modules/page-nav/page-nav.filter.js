import { wikilinksModule } from "../wikilinks/index.js";

const { Wikilink } = wikilinksModule;

export const pageNavFilter = (eleventyConfig) => {
  return function () {
    const config = this.ctx.app.pageNav;
    if (config.mode === "off") return null;

    const pageNavOrder = this.ctx.collections._pageNavOrder;
    const page = this.page;
    const wikilink = new Wikilink(
      this.ctx.collections._notes,
      this.ctx.app.wikilinks,
      eleventyConfig.getFilter("slugifyPath"),
      eleventyConfig.getFilter("slugify")
    );

    const prev = resolveCustomNav(this.ctx.prevPage) ?? resolveAutoNav(-1);
    const next = resolveCustomNav(this.ctx.nextPage) ?? resolveAutoNav(+1);
    const visible = !!(prev || next);

    return visible ? { prev, next } : null;

    function resolveCustomNav(val) {
      if (String(val) === "false") return false;

      if (typeof val === "string" && Wikilink.REGEX.test(val)) {
        const [, path, , text] = val.match(Wikilink.REGEX);
        const link = wikilink.process(path, text);
        return link;
      }

      return null;
    }

    function resolveAutoNav(idxDiff) {
      if (config.mode !== "on") return null;

      const filePathStem = page.filePathStem;
      const idx = pageNavOrder.findIndex(
        (x) => x.filePathStem === filePathStem
      );

      const entry = idx >= 0 ? pageNavOrder[idx + idxDiff] : null;
      if (!entry) return null;

      return { label: entry.title, href: entry.url };
    }
  };
};
