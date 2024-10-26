---
sort: 3
tags: writing
---

Use Wikilinks to create links to other notes. They will automatically be converted to the correct URL. Wikilinks are case-insensitive and can contain spaces. In addition, you will see all incoming links (aka backlinks) to a note in the [[Panel]] on the right.

## Syntax

### Basic

Use double square brackets to create a Wikilink.

```markdown
[[My Note]]
```

### Custom Label

Use a pipe to specify the link text.

```markdown
[[My Note|My Note Title]]
```

### Anchor

Use `#` to link to a specific heading on the page:

```markdown
[[My Note#Some Heading]]
```

### Folder

If you want to link to a specific note in a folder you should include the folder (or all folders if nested):

```markdown
[[Folder/Another Folder/My Note]]
```

## Automatic Label

A label will automatically be generated from the provided reference if you omit the label. You can customize the behavior in the [[Configuration file]]:

```js
// /app.mjs
export default defineConfig({
  wikilinks: {
    // What label to use for wikilinks without a label
    // - "ref"       Use the reference
    // - "title"     Use the title of the note (fallback fileSlug)
    // - "fileSlug"  Use the file slug
    autoLabel: "ref",

    // How to include anchors in the auto label
    // - "arrow"        Use an arrow, e.g. "My Note → Some Heading"
    // - "parentheses"  Use parentheses, e.g. "My Note (Some Heading)"
    // - "hash"         Use a hash, e.g. "My Note#Some Heading"
    // - "none"         Don't include the anchor, e.g. "My Note"
    anchorLabel: "none",
  },
});
```

## How Wikilinks are resolved

Wikilinks are resolved in the following way:

- **Wikilinks using folders**: Wikilinks with a folder (e.g. `[[Folder/My Note]]`) are resolved from the root of the project. If the folder or note doesn't exist, it will result in a broken link.

- **Wikilinks without a folder**: Wikilinks without a folder (e.g. `[[My Note]]`) are resolved from the root of the project. If there is no note with that name in the root, it will find the first note in any (nested) subfolder with that name and link to that note. If there is no note with that name it will result in a broken link.
