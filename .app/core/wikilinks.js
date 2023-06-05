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
    const label = createLabel(text, file, hash, page);

    let href = page ? page.url : options.slugify(`/${file}`);
    hash && (href += `#${options.slugify(hash)}`);

    return { href, label };
  }

  function createLabel(text, file, hash, page) {
    if (text) return text;

    let label = file;

    switch (options.autoLabel) {
      case "title":
        label = page.data.title || page.fileSlug || file;
        break;
      case "fileSlug":
        label = page.fileSlug || file;
        break;
      case "ref":
      default:
        break;
    }

    if (hash) {
      switch (options.anchorLabel) {
        case "arrow":
          label += ` → ${hash}`;
          break;
        case "parentheses":
          label += ` (${hash})`;
          break;
        case "hash":
          label += `#${hash}`;
          break;
        case "none":
        default:
          break;
      }
    }

    return label;
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
