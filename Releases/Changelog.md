---
tags: [release]
---

<!-- Use emojis from https://gitmoji.dev/ -->

## Version 0.15.0

**August 15, 2023**

- ✨ **Tags Overview**: The tags page now shows an overview of all tags at the top.
- ✨ **Notes Count**: The notes and tag pages now show the number of notes.
- ✨ **Panel Configuration**: The panel can now be configured via `app.json`.
- 💄 **Search**: The design of the search input and results have been improved.
- 💄 **Colors**: The color palettes have been updated to improve contrast and accessibility.
- ♻️ **Refactoring**: The template has been refactored to improve maintainability.

## Version 0.14.0

**August 01, 2023**

- ✨ Added support for wikilinks in custom props
- 🐛 Wikilinks with anchor are now shown as incoming / outgoing
- 💥 Changed configuration format for custom props

## Version 0.13.0

**July 31, 2023**

- ✨ Added custom properties

## Version 0.12.1

**June 27, 2023**

- 🐛 Added error handling for parsing the last used theme

## Version 0.12.0

**June 08, 2023**

- ✨ Improved UI
- ✨ Renamed favorites to bookmarks
- 🐛 Fixed handling of invalid wikilinks

## Version 0.11.0

**June 03, 2023**

- 💄 Improved styling compatibility with older browsers
- ⚡️ Reduced CSS bundle size
- ♻️ Refactored the styling

## Version 0.10.1

**May 21, 2023**

- 💄 Improved dark mode

## Version 0.10.0

**April 27, 2023**

- ✨ Wikilinks can now link to a specific heading, e.g. `[[My Note#My Heading]]`
- ✨ Auto-generated Wikilink labels are now customizable
- 📝 Improved and restructured docs
- ♿️ Improved accessibility of the search
- ⚡️ Reduced bundle size
- ♻️ Refactored a few things (Wikilinks, Sidebar, Bundling)
- 💥 Line breaks in paragraphs are not rendered anymore. Use two spaces at the end of a line to force a line break.

## Version 0.9.0

**April 10, 2023**

- ✨ Added collections to give you access to your notes and tags
- ✨ Added queries to let you filter and sort your notes / tags or other data collections
- ✨ Added `renderAsList` filter to render collections as (nested) lists
- ✨ Added support for deployments in subdirectories
- 🐛 Fixed a bug that anchor scrolling on page load did not work in some cases

## Version 0.8.2

**March 28, 2023**

- 🐛 Fixed footnotes
- 📝 Updated Netlify build settings to fix caching issues

## Version 0.8.1

**March 25, 2023**

- 🐛 Fixed scrolling to headings on page load
- 🐛 Fixed tag pages and sorting of notes
- 📝 Improved docs

## Version 0.8.0

**March 14, 2023**

- 💄 Improved typography and spacing

## Version 0.7.0

**March 10, 2023**

- ✨ Added support for folders in the sidebar
- ✨ Groups in the sidebar can now be collapsed

## Version 0.6.0

**February 25, 2023**

- ✨ Added 404 page
- 🚸 Navigating back to the search page now shows the last search results
- 🐛 Search results are now sorted by relevance
- 📝 Improved docs and added new update guide

## Version 0.5.0

**February 19, 2023**

- ✨ Added support and docs for Cloudflare Pages
- 💥 Disabled Nunjucks processing of Markdown files to prevent unexpected output when using curly braces. This is a breaking change for anyone who relied on Nunjucks processing in their Markdown files. You can still enable Nunjucks processing by setting the `templateEngineOverride` front matter property.

## Version 0.4.0

**February 16, 2023**

- ✨ Added color schemes
- ⬆️ Updated to Eleventy 2.0

## Version 0.3.0

**February 11, 2023**

- ✨ Added support for custom links in the sidebar
- ✨ Added a configurable _Edit this note_ link in the panel
- ✨ Added schema validation for the configuration file

## Version 0.2.3

**February 10, 2023**

- 🐛 Table of Contents now displays headings with special chars like quotes properly

## Version 0.2.2

**February 10, 2023**

- 🧑‍💻 Replaced SVG files with icon filter

## Version 0.2.1

**February 09, 2023**

- 🐛 Fixed the light/dark theme flash on page load

## Version 0.2.0

**February 08, 2023**

- ✨ Wikilinks in folders are now resolved by name to be compatible with Obsidian

## Version 0.1.0

**February 07, 2023**

- 🎉 Initial release
