const ValueParser = require("./value-parser");

module.exports = class TreeGenerator {
  constructor(data, options, slugify) {
    this.data = data;
    this.options = this.normalize(options);
    this.slugify = slugify;
  }

  normalize(options) {
    return {
      titleProp: options?.titleProp || "title",
      pathProp: Array.isArray(options?.pathProp)
        ? options.pathProp
        : [options.pathProp || "filePathStem"],
      replace: options?.replace ?? {},
    };
  }

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
};
