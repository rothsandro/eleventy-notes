const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItTaskCheckbox = require("markdown-it-task-checkbox");
const markdownItWikilinks = require("markdown-it-wikilinks");
const markdownItFootnote = require("markdown-it-footnote");

module.exports = (eleventyConfig) => {
  let notesPaths = [];

  function resolvePageName(pageName) {
    pageName = pageName.toLowerCase();

    if (notesPaths.includes(pageName)) return pageName;

    const fileByName = notesPaths.find((p) => p.endsWith(`/${pageName}`));
    return fileByName || pageName;
  }

  const wikiLinks = markdownItWikilinks({
    baseURL: "/n/",
    makeAllLinksAbsolute: true,
    uriSuffix: "/",
    postProcessLabel: (label) => {
      return label.replace(/^\//, "");
    },
    postProcessPageName: (pageName) => {
      pageName = resolvePageName(pageName);
      return eleventyConfig.getFilter("slugifyPath")(pageName);
    },
  });

  const lib = markdownIt({
    html: true,
    linkify: true,
  })
    .use(markdownItTaskCheckbox)
    .use(markdownItFootnote)
    .use(wikiLinks)
    .use(markdownItAnchor, {
      slugify: eleventyConfig.getFilter("slug"),
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: "after",
        class: "direct-link",
        symbol: "#",
        level: [1, 2, 3, 4],
      }),
    });

  const originalRender = lib.render;
  lib.render = (str, data) => {
    notesPaths = data.collections._notes.map((n) =>
      n.filePathStem.replace(/^\//, "").toLowerCase()
    );
    return originalRender.call(lib, str, data);
  };

  return lib;
};
