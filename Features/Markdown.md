---
tags: [feature]
---

_Eleventy Notes_ uses the default Markdown library of Eleventy, [markdown-it](https://github.com/markdown-it/markdown-it). It supports the CommonMark syntax and front matter.

## Heading anchors

We add an anchor link to all your headings (the `#` when you hover over a heading). Clicking on the anchor link will add the heading to the URL. If you share the URL, the browser will automatically scroll to that heading.

## Task lists

You can use task lists with checkboxes:

```md
- [ ] Taks 1
- [ ] Task 2
- [x] Completed task
```

This will render a list with checkboxes:

- [ ] Taks 1
- [ ] Task 2
- [x] Completed task

## Note Title

Each note uses the filename as title by default. You can configure a custom title via front matter:

```md
---
title: My Note
---

This is a note.
```
