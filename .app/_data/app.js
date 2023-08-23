const fs = require("fs");

module.exports = function () {
  const configPath = "./../app.json";
  const custom = fs.existsSync(configPath)
    ? JSON.parse(fs.readFileSync(configPath))
    : {};

  return {
    title: "Notes",
    description: "Notes app",
    ...custom,
    theme: {
      color: "sky",
      ...custom.theme,
    },
    customProperties: {
      properties: [],
      ...custom.customProperties,
    },
    sidebar: {
      links: [],
      notes: [{}],
      ...custom.sidebar,
    },
    panel: {
      tableOfContents: true,
      customProperties: true,
      tags: true,
      incomingLinks: true,
      outgoingLinks: true,
      externalLinks: true,
      ...custom.panel,
    },
    wikilinks: {
      autoLabel: "ref",
      anchorLabel: "none",
      ...custom.wikilinks,
    },
  };
};
