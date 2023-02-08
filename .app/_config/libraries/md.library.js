const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItTaskCheckbox = require("markdown-it-task-checkbox");
const markdownItWikilinks = require("markdown-it-wikilinks");
const markdownItFootnote = require("markdown-it-footnote");

const glob = require("glob");
const path = require("path");
const inputDir = path.join(__dirname, "../../../");

module.exports = (eleventyConfig) => {
  // Find all notes in the root. This is not exactly the same as the notes collection
  // (e.g. files excluded via .eleventyignore are not excluded) but it's close enough
  // for our purposes (hopefully).
  const mdFiles = glob
    .sync("**/*.md", { cwd: inputDir })
    .map((file) => file.toLowerCase().replace(/\.md$/, ""));

  function resolvePageName(pageName) {
    pageName = pageName.toLowerCase();

    // Wikilinks are always absolute. We can check if the file exists and, if not,
    // search for a file with the same name in any folder and use that instead (if it exists).
    // We cannot support relative wikilinks with this approach because we don't know
    // on which page we are currently on.
    if (!mdFiles.includes(pageName)) {
      const fileByName = mdFiles.find((f) => f.split("/").pop() === pageName);
      pageName = fileByName || pageName;
    }

    return pageName;
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
