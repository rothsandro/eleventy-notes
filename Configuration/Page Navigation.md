---
sort: 5
tags: [customization, configuration]
---

The page navigation at the bottom of each note enables you to move to the previous or next note, following the order specified in the [[Sidebar]].

## Per-note configuration

You can customize the page navigation for an individual note by setting the `prevPage` and `nextPage` frontmatter variables. Use the same [[Wikilinks#syntax|wikilink syntax]] as in your notes:

```markdown
---
prevPage: "[[My previous note]]"
nextPage: "[[My next note]]"
---

My note content
```

Alternatively, you can disable the page navigation for an individual note:

```markdown
---
prevPage: false
nextPage: false
---

My note content
```

## Global configuration

You can configure the page navigation globally in your `app.mjs`:

```js
// /app.mjs
export default defineConfig({
  pageNav: {
    // Controls the display of page navigation.
    // - "on": Display page navigation based on sidebar and frontmatter configuration.
    // - "manual": Display page navigation based on frontmatter configuration only.
    // - "off": Do not display page navigation.
    mode: "manual",
  },
});
```
