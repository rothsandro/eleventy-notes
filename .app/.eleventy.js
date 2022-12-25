const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItTaskCheckbox = require("markdown-it-task-checkbox");
const markdownItWikilinks = require("markdown-it-wikilinks");
const markdownItFootnote = require("markdown-it-footnote");

const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pageAssetsPlugin = require("eleventy-plugin-page-assets");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pageAssetsPlugin, {
    mode: "parse",
    postsMatching: "*.md",
  });

  const wikiLinks = markdownItWikilinks({
    baseURL: "/",
    makeAllLinksAbsolute: true,
    uriSuffix: "/",
    generatePageNameFromLabel: (label) => {
      return label.toLowerCase().replace(/\s+/g, "-");
    },
  });

  eleventyConfig.addCollection("notes", function (collectionApi) {
    const res = collectionApi.getFilteredByGlob("../*.md");
    console.log("RES", res.length);
    return res;
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
