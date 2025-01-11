---
tags: [feature]
---

The page navigation at the bottom of each note enables you to move to the previous or next note, following the order specified in the [[Sidebar#Notes]].

## Per-Note Configuration

You can customize the page navigation for an individual note by setting the `prevPage` and `nextPage` frontmatter variables. Use the same [[Wikilinks#syntax|wikilink syntax]] as in your notes to reference a previous or next note.

```markdown
---
prevPage: "[[My previous note]]"
nextPage: "[[My next note]]"
---

My note content
```

Alternatively, you can disable the page navigation for an individual note by setting the `prevPage` and/or `nextPage` frontmatter variables to `false` as shown below:

```markdown
---
prevPage: false
nextPage: false
---

My note content
```

## Configuration

You can configure the page navigation globally in the [[Configuration file]].

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
