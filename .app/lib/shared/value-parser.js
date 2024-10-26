export class ValueParser {
  /**
   * Gets the value of an object by path.
   * @param {object} item The object to get the value from.
   * @param {string} path The path to the value.
   * @returns The item if the path is empty, undefined if the path is invalid, or the value.
   */
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
}
