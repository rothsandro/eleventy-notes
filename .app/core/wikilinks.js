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
    const [, path, , text] = match;
    const { file, hash } = processPath(path);
    const page = findMatchingPage(file, env);
    const label = createLabel(text, file);

    let href = page ? page.url : options.slugify(`/${pageName}`);
    hash && (href += `#${options.slugify(hash)}`);

    return { href, label };
  }

  function createLabel(text, file) {
    return text || file;
  }

  function findMatchingPage(pageName, env) {
    pageName = pageName.toLowerCase();

    const pages = env.collections[options.collections];
    const match =
      pages.find((f) => normalizePath(f.filePathStem) === pageName) ||
      pages.find((f) => normalizePath(f.filePathStem).endsWith(`/${pageName}`));

    return match;
  }

  function processPath(path) {
    const [file, ...hashes] = path.split("#");
    const hash = hashes.join("#");
    return { file, hash };
  }

  function normalizePath(path) {
    return path.replace(/^\//, "").toLowerCase();
  }
};
