// @ts-check

/**
 * @typedef {import('./app-config.schema').AppConfig} AppConfig
 */

module.exports = {
  /**
   * @param {AppConfig} config
   * @returns {AppConfig}
   */
  defineConfig(config) {
    return applyDefaults(config);
  },
};

/**
 * Merges the custom config with the default config.
 * @param {AppConfig} custom
 * @returns {AppConfig}
 */
function applyDefaults(custom) {
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
    tags: {
      map: {},
      ...custom.tags,
    },
    notes: {
      pathPrefix: "/n",
      ...custom.notes,
    },
  };
}
