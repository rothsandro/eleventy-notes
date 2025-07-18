export class Wikilink {
  static REGEX = /^\[\[([^|\]\n]+)(\|([^\]\n]+))?\]\]$/;
  static REGEX_INLINE = /^\[\[([^|\]\n]+)(\|([^\]\n]+))?\]\]/;

  /**
   * @typedef Note
   * @property {string} filePathStem The path stem of the note.
   * @property {string} fileSlug The slug of the note.
   * @property {string} url The url of the note.
   * @property {Record<string, unknown>} data The frontmatter data of the note.
   */

  /**
   * @typedef Deps
   * @property {(path: string) => string} slugify
   * @property {(path: string) => string} slugifyAnchor
   * @property {((note: Note) => string | undefined) | undefined} resolveTitle
   */

  /**
   * Creates a new Wikilink instance to process wikilinks.
   *
   * @param {Note[]} notes The collection of notes.
   * @param {*} wikilinksConfig The configuration for wikilinks.
   * @param {Deps} deps The dependencies for processing wikilinks.
   */
  constructor(notes, wikilinksConfig, deps) {
    this.notes = notes;
    this.wikilinksConfig = wikilinksConfig;
    this.deps = {
      resolveTitle: (note) => note.data.title,
      ...deps,
    };
  }

  /**
   * Processes the wikilink
   * @param {string} path The path of the wikilink.
   * @param {string | undefined} text The specified label of the wikilink, if any.
   * @returns The processed wikilink with the href and label.
   */
  process(path, text) {
    const { file, hash } = this.processPath(path);
    const page = file ? this.findMatchingPage(file) : undefined;
    const label = this.createLabel(text, file, hash, page);
    const href = this.createHref(file, hash, page);

    return { href, label };
  }

  /**
   * Creates the href for a wikilink.
   * @param {string} file The file path of the wikilink.
   * @param {string | undefined} hash The anchor target of the wikilink (if any).
   * @param {Note} page The page that the wikilink points to (if any).
   * @returns The href for the wikilink.
   */
  createHref(file, hash, page) {
    let href = page ? page.url : file ? this.deps.slugify(`/${file}`) : "";
    hash && (href += `#${this.deps.slugifyAnchor(hash)}`);

    return href;
  }

  /**
   * Creates the label for a wikilink.
   * @param {string | undefined} text The manually specified label of the wikilink.
   * @param {string} file The file path of the wikilink.
   * @param {string | undefined} hash The anchor target of the wikilink (if any).
   * @param {Note} page The page that the wikilink points to (if any).
   * @returns The final label for the wikilink.
   */
  createLabel(text, file, hash, page) {
    if (text) return text;
    if (!file && !!hash) return hash;

    let label = file;

    switch (this.wikilinksConfig.autoLabel) {
      case "title":
        label = this.deps.resolveTitle(page) || page.fileSlug || file;
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

  /**
   * Finds the first matching page for a given path.
   * @param {string} pageName The name of the page, optionally including a path.
   * @returns {Note | undefined} The first matching note or undefined.
   */
  findMatchingPage(pageName) {
    pageName = pageName.toLowerCase();

    const match =
      this.notes.find((f) => this.normalizePath(f.filePathStem) === pageName) ||
      this.notes.find((f) =>
        this.normalizePath(f.filePathStem).endsWith(`/${pageName}`)
      );

    return match;
  }

  /**
   * Processes a path into a file and hash.
   * @param {string} path
   * @returns The
   */
  processPath(path) {
    const [file, ...hashes] = path.split("#");
    const hash = hashes.join("#");
    return { file, hash };
  }

  /**
   * Normalizes a path by removing leading slashes and converting to lowercase.
   * @param {string} path
   * @returns The normalized path.
   */
  normalizePath(path) {
    return path.replace(/^\//, "").toLowerCase();
  }
}
