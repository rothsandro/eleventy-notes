const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItTaskCheckbox = require("markdown-it-task-checkbox");
const markdownItFootnote = require("markdown-it-footnote");
const markdownItWikilinks = require("./../../core/wikilink-md");

module.exports = (eleventyConfig) => {
  const lib = markdownIt({
    html: true,
    linkify: true,
  })
    .use(markdownItTaskCheckbox)
    .use(markdownItFootnote)
    .use(markdownItWikilinks, {
      collections: "_notes",
      slugify: eleventyConfig.getFilter("slugifyPath"),
    })
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
