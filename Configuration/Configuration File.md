---
sort: 1
tags: [customization, configuration]
---

Eleventy Notes provides several configuration options to customize the app. All of them are optional, but a basic configuration is recommended.

> [!INFO] You may need to restart the app after changing the configuration.

## Basic configuration

Open the `app.mjs` file in the root of the project, next to your notes. Add a custom title (shown in the header), a description (used by search engines) and define the language of your content:

```js
import { defineConfig } from "./.app/app-config.js";

export default defineConfig({
  title: "John's Notes",
  description: "The personal notes of John Doe",
  lang: "en",
});
```

## TypeScript support

If you use an editor like [VS Code](https://code.visualstudio.com/), you can add type-checking to your configuration file by adding the following comment at the top of the file:

```js
// @ts-check
```

This will warn you about invalid configuration options.

## Available options

- [[Sidebar|Sidebar]] - Customize the sidebar sections and notes
- [[Panel|Panel]] - Configure the panel sections and edit link
- [[Themes and Styling|Themes and Styling]] - Choose color schemes and add custom CSS
- [[Page Navigation|Page Navigation]] - Configure previous/next navigation
- [[Tags|Tags]] - Create tag mappings and labels
- [[Custom Properties|Custom Properties]] - Add metadata to your notes
- [[Static Assets|Static Assets]] - Serve non-processed files
- [[Language|Language]] - Set content and UI language
- [[Wikilinks#Automatic label]] - Customize automatic wikilink labels
- Add `ignores` to exclude files

## Full configuration example

```js
import { defineConfig } from "./.app/app-config.js";

export default defineConfig({
  title: "John's Notes",
  description: "The personal notes of John Doe",
  lang: "en",
  staticAssets: {
    paths: {},
  },
  ignores: [],
  customProperties: {
    properties: [],
  },
  editThisNote: {
    url: "https://example.com/edit/{{file}}",
  },
  sidebar: {
    links: [],
    sections: [],
  },
  panel: {
    tableOfContents: true,
    tags: true,
    customProperties: true,
    incomingLinks: true,
    outgoingLinks: true,
    externalLinks: true,
  },
  pageNav: {
    mode: "on",
  },
  wikilinks: {
    autoLabel: "ref",
    anchorLabel: "none",
  },
  tags: {
    map: {},
  },
});
```
