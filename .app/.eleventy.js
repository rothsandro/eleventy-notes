const loader = require("./_config/utils/loader.util");

const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItTaskCheckbox = require("markdown-it-task-checkbox");
const markdownItWikilinks = require("markdown-it-wikilinks");
const markdownItFootnote = require("markdown-it-footnote");

module.exports = (eleventyConfig) => {
  loader(__dirname, {
    "_config/collections": (col, name) =>
      eleventyConfig.addCollection(name, col),
    "_config/plugins": (plugin) => eleventyConfig.addPlugin(...plugin),
  });

  eleventyConfig.addPassthroughCopy("css");

  const wikiLinks = markdownItWikilinks({
    baseURL: "/",
    makeAllLinksAbsolute: true,
    uriSuffix: "/",
    generatePageNameFromLabel: (label) => {
      return label.toLowerCase().replace(/\s+/g, "-");
    },
  });

  // Customize Markdown library and settings:
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  })
    .use(markdownItTaskCheckbox)
    .use(markdownItFootnote)
    .use(wikiLinks)
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: "after",
        class: "direct-link",
        symbol: "#",
        level: [1, 2, 3, 4],
      }),
      slugify: eleventyConfig.getFilter("slug"),
    });

  eleventyConfig.setLibrary("md", markdownLibrary);

  return {
    dir: {
      input: "./../",
      output: "dist",
      data: ".app/_data",
      includes: ".app/_includes",
    },
  };
};
