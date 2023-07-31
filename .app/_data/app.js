const fs = require("fs");

const defaultConfig = {
  title: "Notes",
  description: "Notes app",
  theme: {
    color: "sky",
  },
  customProperties: {
    properties: [],
  },
  sidebar: {
    links: [],
    notes: [{}],
  },
  wikilinks: {
    autoLabel: "ref",
    anchorLabel: "none",
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
    customProperties: {
      ...a.customProperties,
      ...b.customProperties,
    },
    theme: {
      ...a.theme,
      ...b.theme,
    },
    sidebar: {
      ...a.sidebar,
      ...b.sidebar,
    },
    wikilinks: {
      ...a.wikilinks,
      ...b.wikilinks,
    },
  };
}
