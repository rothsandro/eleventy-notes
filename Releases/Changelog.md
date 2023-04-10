---
tags: [release]
---

<!-- Use emojis from https://gitmoji.dev/ -->

## Version 0.9.0 (April 10, 2023)

- ✨ Added collections to give you access to your notes and tags
- ✨ Added queries to let you filter and sort your notes / tags or other data collections
- ✨ Added `renderAsList` filter to render collections as (nested) lists
- ✨ Added support for deployments in subdirectories
- 🐛 Fixed a bug that anchor scrolling on page load did not work in some cases

## Version 0.8.2 (March 28, 2023)

- 🐛 Fixed footnotes
- 📝 Updated Netlify build settings to fix caching issues

## Version 0.8.1 (March 25, 2023)

- 🐛 Fixed scrolling to headings on page load
- 🐛 Fixed tag pages and sorting of notes
- 📝 Improved docs

## Version 0.8.0 (March 14, 2023)

- 💄 Improved typography and spacing

## Version 0.7.0 (March 10, 2023)

- ✨ Added support for folders in the sidebar
- ✨ Groups in the sidebar can now be collapsed

## Version 0.6.0 (February 25, 2023)

- ✨ Added 404 page
- 🚸 Navigating back to the search page now shows the last search results
- 🐛 Search results are now sorted by relevance
- 📝 Improved docs and added new update guide

## Version 0.5.0 (February 19, 2023)

- ✨ Added support and docs for Cloudflare Pages
- 💥 Disabled Nunjucks processing of Markdown files to prevent unexpected output when using curly braces. This is a breaking change for anyone who relied on Nunjucks processing in their Markdown files. You can still enable Nunjucks processing by setting the `templateEngineOverride` front matter property.

## Version 0.4.0 (February 16, 2023)

- ✨ Added color schemes
- ⬆️ Updated to Eleventy 2.0

## Version 0.3.0 (February 11, 2023)

- ✨ Added support for custom links in the sidebar
- ✨ Added a configurable _Edit this note_ link in the panel
- ✨ Added schema validation for the configuration file

## Version 0.2.3 (February 10, 2023)

- 🐛 Table of Contents now displays headings with special chars like quotes properly

## Version 0.2.2 (February 10, 2023)

- 🧑‍💻 Replaced svg files with icon filter

## Version 0.2.1 (February 09, 2023)

- 🐛 Fixed the light/dark theme flash on page load

## Version 0.2.0 (February 08, 2023)

- ✨ Wikilinks in folders are now resolved by name to be compatible with Obsidian

## Version 0.1.0 (February 07, 2023)

- 🎉 Initial release
