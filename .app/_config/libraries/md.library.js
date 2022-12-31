const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItTaskCheckbox = require("markdown-it-task-checkbox");
const markdownItWikilinks = require("markdown-it-wikilinks");
const markdownItFootnote = require("markdown-it-footnote");

module.exports = (eleventyConfig) => {
  const wikiLinks = markdownItWikilinks({
    baseURL: "/n/",
    makeAllLinksAbsolute: true,
    uriSuffix: "/",
    postProcessLabel: (label) => {
      return label.replace(/^\//, "");
    },
    postProcessPageName: (pageName) => {
      return eleventyConfig.getFilter("slugifyPath")(pageName);
    },
  });

  const lib = markdownIt({
    html: true,
    breaks: true,
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

  return lib;
};
