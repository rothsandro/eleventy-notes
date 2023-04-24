const html = require("nanohtml");

const regex = /^\[\[([^|\]\n]+)(\|([^\]\n]+))?\]\]/;

module.exports = (md, options) => {
  md.inline.ruler.after("link", "wikilink", inline);
  md.renderer.rules["wikilink"] = render;

  function inline(state, silent) {
    const src = state.src.substring(state.pos);
    const match = regex.exec(src);

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
    const [, pageName, , label = pageName] = match;
    const page = findMatchingPage(pageName, env);
    const href = page ? page.url : options.slugify(`/${pageName}`);

    return { href, label };
  }

  function findMatchingPage(pageName, env) {
    pageName = pageName.toLowerCase();

    const pages = env.collections[options.collections];
    const match =
      pages.find((f) => normalizePath(f.filePathStem) === pageName) ||
      pages.find((f) => normalizePath(f.filePathStem).endsWith(`/${pageName}`));

    return match;
  }

  function normalizePath(path) {
    return path.replace(/^\//, "").toLowerCase();
  }
};
