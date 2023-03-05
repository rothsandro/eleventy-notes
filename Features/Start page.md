---
tags: [feature]
---

The start page is the first link in the sidebar and always server under `/`. You can adjust the content by creating an `index.md` in the root of the project.

```markdown
<!-- /index.md -->

These are my notes.
```

## Custom title

Add a `title` property to the front matter to change the title of the page. This will also rename the link in the sidebar.

```markdown
---
title: My Notes
---

These are my notes.
```

## Hide panel

Add a `panel` property to the front matter to hide the panel on the right side.

```markdown
---
panel: false
---

These are my notes.
```
