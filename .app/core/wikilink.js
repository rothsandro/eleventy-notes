module.exports = class Wikilink {
  static REGEX = /^\[\[([^|\]\n]+)(\|([^\]\n]+))?\]\]$/;
  static REGEX_INLINE = /^\[\[([^|\]\n]+)(\|([^\]\n]+))?\]\]/;

  constructor(notes, wikilinksConfig, slugify) {
    this.notes = notes;
    this.wikilinksConfig = wikilinksConfig;
    this.slugify = slugify;
  }

  process(path, text) {
    const { file, hash } = this.processPath(path);
    const page = this.findMatchingPage(file);
    const label = this.createLabel(text, file, hash, page);

    let href = page ? page.url : this.slugify(`/${file}`);
    hash && (href += `#${this.slugify(hash)}`);

    return { href, label };
  }

  createLabel(text, file, hash, page) {
    if (text) return text;

    let label = file;

    switch (this.wikilinksConfig.autoLabel) {
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
      switch (this.wikilinksConfig.anchorLabel) {
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

  findMatchingPage(pageName) {
    pageName = pageName.toLowerCase();

    const match =
      this.notes.find((f) => this.normalizePath(f.filePathStem) === pageName) ||
      this.notes.find((f) =>
        this.normalizePath(f.filePathStem).endsWith(`/${pageName}`)
      );

    return match;
  }

  processPath(path) {
    const [file, ...hashes] = path.split("#");
    const hash = hashes.join("#");
    return { file, hash };
  }

  normalizePath(path) {
    return path.replace(/^\//, "").toLowerCase();
  }
};
