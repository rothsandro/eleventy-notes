---
sort: 1
tags: [notes]
---

All your notes are plain text files using `.md` as file extension. You can use the default Markdown syntax and front matter. Eleventy Notes uses [markdown-it](https://github.com/markdown-it/markdown-it), which supports CommonMark syntax.

## Custom note title

The file name is automatically used as the title of your note. Add a custom title by adding a `title` property to the front matter:

```markdown
---
title: My super cool note
---

This is my note.
```

## Custom description

Add a custom description to help with search engines and social media sharing:

```markdown
---
title: My super cool note
description: This is a description of my super cool note.
---

This is my note.
```

## Images

You can add images to your notes using a relative file path:

```markdown
![My image](./my-image.jpg)
```

Like this:

![Hello World banner](./assets/hello-world.svg)

## Highlights

You can highlight text by wrapping it in `==`. To change the color, add a colored emoji directly after the opening `==`. The emoji is removed from the output.

```markdown
This is ==highlighted text== and this is ==🟢green==.
```

Like this:

This is ==highlighted text== and this is ==🟢green==.

Available colors are ==🔴🔴&nbsp;red==, ==🟠🟠&nbsp;orange==, ==🟡🟡&nbsp;yellow==, ==🟢🟢&nbsp;green==, ==🔵🔵&nbsp;blue== and ==🟣🟣&nbsp;purple==.

## Task lists

You can use task lists with checkboxes:

```md
- [ ] Task 1
- [ ] Task 2
- [x] Completed task
```

This will render a list with checkboxes:

- [ ] Task 1
- [ ] Task 2
- [x] Completed task
