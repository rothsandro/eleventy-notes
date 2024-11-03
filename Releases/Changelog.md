---
tags: [release]
---

<!-- Use emojis from https://gitmoji.dev/ -->

## Version 0.25.0

**November 03, 2024**

- ✨ **Eleventy 3**: Updated the template to Eleventy 3.
- ⚡️ **Performance**: Improved performance for files without assets.
- 🐛 **Config Schema**: Fixed the config schema to mark `tags` as optional.
- 💥 **Node Version**: Eleventy Notes now requires Node version 20 or 22 (or higher).
  Run `node --version` to see what version you have installed. If you need to update, you can download the latest version from the [official website](https://nodejs.org/en/). Also check the node version of your cloud service (like Netlify) if you deploy your site there.
- 💥 **Config (ESM)**: The template has been migrated from CJS to ESM, which affects the configuration file `app.js` as well. Migrate to the new format by renaming the file to `app.mjs` and adjusting the export as shown below. If you don't have a config file, you'll need to create one as it's now required.

The previous `app.js` used CJS syntax:

```js
const { defineConfig } = require("./.app/app-config");

module.exports = defineConfig({
  // Your configuration
});
```

The new `app.mjs` uses ESM syntax. The import and export look like this:

```js
import { defineConfig } from "./.app/app-config";

export default defineConfig({
  // Your configuration (unchanged)
});
```

## Version 0.24.0

**August 25, 2024**

- ✨ **Redesign**: The design of the header, search, navigation and panel has been improved.
- 📦️ **Dependencies**: Some dependencies have been updated.

## Version 0.23.2

**April 14, 2024**

- 🐛 **Fixed renderAsList**: The `renderAsList` filter now works with the tags collection by default. Previously, you had to configure the `titleProp`. This is no longer necessary.

## Version 0.23.1

**March 25, 2024**

- 🐛 **Fixed asset handling**: Images should now work again in production.

## Version 0.23.0

**March 09, 2024**

- ✨ **Enhanced Sidebar Config**: The sidebar configuration now boasts increased flexibility and power. It allows the definition of multiple sections and the use of queries to filter and sort your notes.
- 💥 **Updated Sidebar Config**: The configuration for your notes' sidebar has been revamped and necessitates manual migration.
  - The `sidebar.notes` property has been superseded by the `sidebar.sections` property, enabling the configuration of one or more sections.
  - Each group now accommodates a `query` property, which supersedes `pattern`, `tags`, and `tree`. A new `createNotesQuery()` function is available, generating a query based on these three properties.

If you've customized your sidebar configuration, please migrate it to the new format. Don't hesitate to reach out if you require assistance with the migration. Below is an example of the **previous** format, which defines two groups in the sidebar using a pattern and tags filter:

```js
// /app.js
const { defineConfig } = require("./.app/app-config");

module.exports = defineConfig({
  sidebar: {
    notes: [
      {
        label: "My Posts",
        pattern: "/posts/",
      },
      {
        label: "Drafts",
        expanded: false,
        tags: ["draft"],
      },
    ],
  },
});
```

Below is the equivalent configuration in the **updated** format. The two groups are now encapsulated within a new section titled _Notes_. The `createNotesQuery()` function, which needs to be imported at the beginning of the file, is now responsible for filtering.

```js
// /app.js
const { defineConfig, createNotesQuery } = require("./.app/app-config");

module.exports = defineConfig({
  sidebar: {
    sections: [
      {
        label: "Notes",
        groups: [
          {
            label: "My Posts",
            query: createNotesQuery({
              pattern: "/posts/",
            }),
          },
          {
            label: "Drafts",
            expanded: false,
            query: createNotesQuery({
              tags: ["draft"],
            }),
          },
        ],
      },
    ],
  },
});
```

## Version 0.22.0

**February 03, 2024**

- ✨ **Callouts**: You can now add callouts to your notes.

## Version 0.21.0

**January 20, 2024**

- ✨ **Custom CSS**: You can now add custom CSS to your site.

## Version 0.20.0

**January 13, 2024**

- ✨ **Language**: The content language can now be configured in the config file.
- ⚡️ **Performance**: Building the site is now faster (dev mode and production build).

## Version 0.19.0

**December 26, 2023**

- ✨ **Anchor Wikilinks**: Wikilinks can now link to a heading, e.g. `[[#My Heading]]`.
- ✨ **URL Prefix**: The url prefix `/n` can now be configured via configuration file.
- ✨ **Improved search**: It now includes an excerpt and highlights the search term.
- ⚡️ **Performance**: Rebuilding the site after a change when running in development mode is now faster.
- 💥 **Removed notes page**: The notes page `/n` has been removed. We think the flat list of all notes
  was not very useful for most users as it did not provide any context (e.g. in which folder the note is located).
  A properly configured sidebar, the tags pages and the search are much more useful for navigating your notes.
  You can create your own notes page if you still want to have one.
- 💥 **New configuration file**: The previous JSON configuration `app.json` has been replaced with a JavaScript configuration `app.js`.
  If you have an existing configuration, you need to migrate it to the new format. Rename the file to `app.js` and replace the content with the following:

  ```js
  const { defineConfig } = require(".app/app-config");

  module.exports = defineConfig({
    // Put your existing configuration here, e.g.
    title: "My Notes",
  });
  ```

  If you've used the `$schema` property, you can remove it and instead add a `// @ts-check` comment at the top of the file.

## Version 0.18.0

**November 04, 2023**

- ✨ **Tags mapping**: Tags can now be mapped to a different label.
- ✨ **Images**: Additional image formats are now supported in Markdown files.
- 🐛 **Sidebar Layout**: The sidebar styling is not broken anymore with little content.
- 📦️ **Dependencies**: Dependencies have been updated to the latest versions.
- 💥 **Tags collection**: The `title` property has been renamed to `label`.

## Version 0.17.0

**October 08, 2023**

- ✨ **Copy code**: Code blocks now have a copy button.
- 💄 **Styling**: Keyboard elements `<kbd>` are now styled.

## Version 0.16.0

**August 31, 2023**

- 💄 **Color schemes**: Three new color schemes are available: ruby, iris and jade.
- 💄 **Design**: This version includes a few design improvements.

## Version 0.15.0

**August 26, 2023**

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
