---
tags: feature
---

The panel on the right side of the page shows information about the current note. It includes a table of contents, [[Custom Properties]], [[Tags]], [[Wikilinks]], external links and additional actions.

## Hiding the panel

You can hide the panel on a specific page by adding the `panel` Front Matter property:

```markdown
---
panel: false
---

My note without a panel
```

## Hiding sections

Add a `panel` property to your global [[Configuration file]] `app.mjs` to configure the
sections of the panel. All sections are enabled by default (if they have content) but you
can disable them by setting the respective property to `false`.

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
