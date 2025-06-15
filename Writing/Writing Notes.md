---
sort: 1
tags: ["writing"]
---

All your notes are plain text files using `.md` as file extension. You can use the default Markdown syntax and front matter.

## Custom note title

The file name is automatically used as the title of your note. Add a custom title to your note by adding a `title` property to the front matter.

```markdown
---
title: My super cool note
---

This is my note.
```

## Custom description

Add a custom description to your note by including a `description` property in the front matter. This helps with search engines and sharing your notes on social media.

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
