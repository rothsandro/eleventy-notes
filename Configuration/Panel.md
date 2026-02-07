---
sort: 3
tags: [customization, configuration]
---

The panel on the right side of the page shows information about the current note. It includes a table of contents, [[Custom Properties]], [[Tags]], [[Wikilinks]], external links, and additional actions.

## Hiding the panel

You can hide the panel on a specific page by adding the `panel` front matter property:

```markdown
---
panel: false
---

My note without a panel
```

## Hiding sections

Add a `panel` property to your global configuration in `app.mjs` to configure the sections of the panel. All sections are enabled by default (if they have content) but you can disable them:

```js
// /app.mjs
export default defineConfig({
  panel: {
    tableOfContents: true,
    tags: true,
    customProperties: true,
    incomingLinks: true,
    outgoingLinks: true,
    externalLinks: true,
  },
});
```

## Edit this note link

If you host your notes on an online platform like [GitHub](https://github.com) that supports online editing of Markdown files, you can add an _Edit this note_ link that will be shown in the panel.

Configure the URL in your `app.mjs`:

```js
// /app.mjs
export default defineConfig({
  editThisNote: {
    // URL to the online editor
    url: "https://example.com/edit/{{file}}",

    // Example for GitHub
    // Replace "johndoe/my-notes" with your repository
    url: "https://github.com/johndoe/my-notes/edit/{{branch}}/{{file}}",

    // If the link should open in a new tab (optional)
    // Default: false
    openInNewTab: true,
  },
});
```

The `url` property supports the following placeholders:

| Placeholder  | Description                                                | Example                    |
| :----------- | :--------------------------------------------------------- | :------------------------- |
| `{{file}}`   | File path of the note (URL encoded, without leading slash) | `My%20Folder/My%20Note.md` |
| `{{branch}}` | Name of the current Git branch (if you use Git)            | `main`                     |
