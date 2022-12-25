const fs = require("fs");
const path = require("path");

/**
 * Dynamically loads all files in the given folders and calls the handler.
 * It is used to dynamically load collections, filters, shortcodes, etc.
 *
 * @param {string} root The root directory for all provided paths in the config map
 * @param {Record<string, (module: unknown, name: string) => void} configMap
 */
module.exports = (root, configMap) => {
  Object.entries(configMap).forEach(([folder, handler]) => {
    load(path.join(root, folder), handler);
  });
};

function kebabCaseToCamelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

function load(folder, handler) {
  const fileNameList = fs.readdirSync(folder);
  fileNameList.forEach((fileName) => {
    const kebabCaseName = fileName.split(".").slice(0, -2).join(".");
    const name = kebabCaseToCamelCase(kebabCaseName);
    const requirePath = path.join(folder, fileName);
    delete require.cache[require.resolve(requirePath)];
    const module = require(requirePath);
    handler(module, name);
  });
}
