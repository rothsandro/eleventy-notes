const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItTaskCheckbox = require("markdown-it-task-checkbox");
const markdownItFootnote = require("markdown-it-footnote");
const markdownItWikilinks = require("./../modules/wikilinks").markdownPlugin;

/**
 * Creates a markdown-it instance.
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 * @returns The configured markdown library.
 */
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
      level: [1, 2, 3, 4],
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: "after",
        class: "anchor-link",
        symbol: `<svg width="0.8em" height="0.8em"><use xlink:href="#icon-anchor-link"></use></svg>`,
      }),
    });

  return lib;
};
