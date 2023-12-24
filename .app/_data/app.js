module.exports = function () {
  try {
    return require("./../../app.js");
  } catch (e) {
    return require("./../app-config.js").defineConfig({});
  }
};
