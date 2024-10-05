import html from "nanohtml";
import { Wikilink } from "./wikilink.js";

export const wikilinksMarkdownPlugin = (md, options) => {
  md.inline.ruler.after("link", "wikilink", inline);
  md.renderer.rules["wikilink"] = render;

  function inline(state, silent) {
    const src = state.src.substring(state.pos);
    const match = Wikilink.REGEX_INLINE.exec(src);

    if (!match) return false;

    state.pos += match[0].length;

    if (!silent) {
      const token = state.push("wikilink", "", 0);
      token.meta = { match };
    }

    return true;
  }

  function render(tokens, index, _options, env) {
    const match = tokens[index].meta.match;
    const { href, label } = processMatch(match, env);
    return html`<a href="${href}">${label}</a>`;
  }

  function processMatch(match, env) {
    const wikilink = new Wikilink(
      env.collections[options.collections],
      env.app.wikilinks,
      options.slugify,
      options.slugifyAnchor
    );

    const [, path, , text] = match;

    return wikilink.process(path, text);
  }
};
