module.exports = class ValueParser {
  static getValueByPath(item, path) {
    if (path === "") return item;
    if (!path) return undefined;

    const parts = path.split(".");
    let value = item;

    for (let part of parts) {
      if (!(part in value)) return undefined;
      value = value[part];
    }

    return value;
  }
};
