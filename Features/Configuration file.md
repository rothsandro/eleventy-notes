---
sort: 1
tags: [feature]
---

Eleventy Notes provides several configuration options to customize the app. All of them are optional, but a basic configuration is recommended.

> [!INFO] You may need to restart the app after changing the configuration.

## Basic configuration

Open the `app.mjs` file in the root of the project, next to your notes. Add a custom title (shown in the header), a description (not shown but used by search engines) and define the language of your content:

```js
import { defineConfig } from "./.app/app-config.js";

export default defineConfig({
  title: "John's Notes",
  description: "The personal notes of John Doe",
  lang: "en",
});
```

## TypeScript

If you use an editor like [VS Code](https://code.visualstudio.com/), you can add
type-checking to your configuration file by adding the following comment
at the top of the file:

```js
// @ts-check
```

This will warn you about invalid configuration options.

## Supported configurations

In addition to the [[#basic configuration]], you can also:

- Adjust the URL of your notes, see [[Files and Folders#URL prefix]]
- Add an edit link to your notes, see [[Edit link]]
- Customize the notes in the sidebar or add links to other websites, see [[Sidebar]]
- Customize the content of the panel, see [[Panel]]
- Configure custom properties in the panel, see [[Custom Properties]]
- Change the color scheme, see [[Themes]]
- Customize the behavior of Wikilinks, see [[Wikilinks#Automatic Label]]
- Create mappings for your tags, see [[Tags#Tags mapping]]

## Summary

The following example shows the supported configuration options:

```js
import { defineConfig } from "./.app/app-config.js";

export default defineConfig({
  title: "John's Notes",
  description: "The personal notes of John Doe",
  lang: "en",
  customProperties: {
    properties: [],
  },
  theme: {
    color: "sky",
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
  wikilinks: {
    autoLabel: "ref",
    anchorLabel: "none",
  },
  tags: {
    map: {},
  },
});
```
