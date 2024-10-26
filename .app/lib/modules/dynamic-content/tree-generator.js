import { sharedModule } from "../../shared/index.js";
const { ValueParser } = sharedModule;

/**
 * @typedef {object} TreeConfigObj
 * @property {string} [titleProp]
 * @property {string | string[]} [pathProp]
 * @property {boolean | number | string} [expanded]
 *   Whether the tree should be expanded by default.
 *   If a boolean is provided, it will be used for all levels.
 *   If a number is provided, the first n levels (starting with 1) will be expanded while all others are collapsed.
 *   If a string is provided, it will be used as a RegEx pattern to match the paths of the folders that are expanded by default.
 * @property {Record<string, string>} [replace]
 *   A map of search/replace values that will be applied to the paths of the items in the tree.
 *   The keys are case-insensitive RegEx patterns.
 */

/**
 * @typedef {boolean | TreeConfigObj} TreeConfig
 */

/**
 * @typedef {object} NormalizedTreeConfig
 * @property {string} titleProp
 * @property {string[]} pathProp
 * @property {boolean | number | string} expanded
 * @property {Record<string, string>} replace
 */

/**
 * Generates a tree structure from a list of items.
 */
export class TreeGenerator {
  /**
   * @param {any[]} data The list of items to generate the tree from.
   * @param {TreeConfig} options The tree generation options.
   */
  constructor(data, options) {
    this.data = data;
    this.options = this.normalize(options);
  }

  /**
   * Normalizes the tree generation options.
   * @param {TreeConfig} options
   * @returns {NormalizedTreeConfig}
   */
  normalize(options) {
    if (typeof options !== "boolean") {
      options.expanded;
    }

    return {
      titleProp: options?.titleProp || "title",
      pathProp: Array.isArray(options?.pathProp)
        ? options.pathProp
        : [options.pathProp || "filePathStem"],
      expanded: options?.expanded ?? true,
      replace: options?.replace ?? {},
    };
  }

  /**
   * Creates a tree structure from the list of items.
   */
  run() {
    const tree = [];

    this.data.forEach((item) => {
      const parts = this.getTreeParts(item);

      let [parent, current] = [undefined, tree];
      parts.forEach((part, idx) => {
        let item = current.find((i) => i.$treeName === part);
        if (!item) {
          const currentParts = parts.slice(0, idx + 1);

          item = {
            $treeKey: currentParts.map(this.slugify).join("--"),
            $treeName: part,
            $treeExpanded: this.getInitialExpandedState(
              `/${currentParts.join("/")}`,
              idx + 1
            ),
            [this.options.titleProp]: part,
            children: [],
          };
          current.push(item);
        }
        [parent, current] = [item, item.children];
      });

      Object.assign(parent, item);
    });
    return tree;
  }

  getTreeParts(item) {
    const replace = this.options.replace;
    const rawPath = this.getRawTreePath(item);
    const parsedPath = Object.entries(replace).reduce(
      (acc, [pattern, value]) => acc.replace(new RegExp(pattern, "gi"), value),
      rawPath
    );

    const parts = parsedPath.replace(/^\//, "").split("/");
    return parts;
  }

  getRawTreePath(item) {
    for (const prop of this.options.pathProp) {
      const value = ValueParser.getValueByPath(item, prop);
      if (typeof value === "string") return value;
    }

    return "";
  }

  getInitialExpandedState(path, depth) {
    const config = this.options.expanded;
    if (typeof config === "boolean") return config;
    if (typeof config === "number") return depth <= config;
    if (typeof config === "string") {
      const pattern = new RegExp(config, "i");
      return pattern.test(path);
    }

    return true;
  }

  /**
   * Slugifies a string.
   * @param {string} value
   * @returns {string}
   */
  slugify(value) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
}
