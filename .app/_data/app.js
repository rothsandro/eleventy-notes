const fs = require("fs");

const defaultConfig = {
  title: "Notes",
  description: "Notes app",
  sidebar: {
    notes: [{}],
  },
};

module.exports = function () {
  const configPath = "./../app.json";

  if (!fs.existsSync(configPath)) return defaultConfig;

  const customConfig = JSON.parse(fs.readFileSync(configPath));
  const mergedConfig = mergeConfigs(defaultConfig, customConfig);

  return mergedConfig;
};

function mergeConfigs(a, b) {
  return {
    ...a,
    ...b,
    sidebar: {
      ...a.sidebar,
      ...b.sidebar,
    },
  };
}
