import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItTaskCheckbox from "markdown-it-task-checkbox";
import markdownItFootnote from "markdown-it-footnote";
import { wikilinksModule } from "./../modules/wikilinks/index.js";
import { notesModule } from "./../modules/notes/index.js";
import { calloutsModule } from "./../modules/callouts/index.js";
import { fromHighlighter } from "@shikijs/markdown-it/core";
import { createHighlighter, bundledLanguages } from "shiki/bundle/web";

const highlighter = await createHighlighter({
  langs: Object.keys(bundledLanguages),
  themes: ["light-plus", "dark-plus"],
});

/**
 * Creates a markdown-it instance.
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 * @returns The configured markdown library.
 */
export const markdownLibrary = (eleventyConfig) => {
  const lib = markdownIt({
    html: true,
    linkify: true,
  })
    .use(markdownItTaskCheckbox)
    .use(markdownItFootnote)
    .use(
      fromHighlighter(highlighter, {
        defaultColor: false,
        cssVariablePrefix: "--code-",
        themes: { l: "light-plus", d: "dark-plus" },
      })
    )
    .use(notesModule.copyCodeMarkdownPlugin)
    .use(calloutsModule.markdownPlugin)
    .use(wikilinksModule.markdownPlugin, {
      collections: "_notes",
      slugify: eleventyConfig.getFilter("slugifyPath"),
      slugifyAnchor: eleventyConfig.getFilter("slugify"),
    })
    .use(markdownItAnchor, {
      slugify: eleventyConfig.getFilter("slugify"),
      level: [1, 2, 3, 4],
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: "after",
        class: "anchor-link",
        symbol: `<svg width="0.8em" height="0.8em"><use xlink:href="#icon-anchor-link"></use></svg>`,
      }),
    });

  return lib;
};
