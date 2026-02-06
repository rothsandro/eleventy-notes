---
sort: 6
tags: [notes]
---

The start page is displayed when you open the app. It appears as the first link in the sidebar and is served under `/`.

## Creating a start page

Create a file named `index.md` in the root of your project (next to `app.mjs`). This file will be used as the start page.

```md
---
title: Welcome
---

# Welcome to My Notes

This is my start page.
```

## Dynamic content on the start page

You can use [[Dynamic Content|dynamic content]] features to render lists of notes on your start page. For example, you can show recently updated notes or notes with specific tags.
