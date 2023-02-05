---
sort: 2
tags: ["basics"]
---

Now that the template is ready, you can create your first note. Go ahead and create a new file `My Note.md` in the root of the project.

```markdown
<!-- /My Note.md -->

# Hello World

This is your first note
```

All your notes are Markdown files using `.md` as file extension. You can use the default Markdown syntax and front matter.

## Front Matter

Front matter is a way to add metadata to your notes. It's a YAML block at the top of your note. You can use it to add a title, sort order, tags, and more.

```markdown
---
title: My Note
---

This is my note.
```

## File names

You can name your files however you want, whether it's a technical name like `my-note.md` or a more human-readable name like `My Note.md`. We recommend using a human-readable name for your notes. It makes working with [[Features/Wikilinks|Wikilinks]] easier. For URLs, we'll automatically convert the name to a URL-friendly format.

## Folders

You can create folders to organize your notes. Create a new folder `My Folder` in the root of the project and create a new file `My Note.md` in the folder.

```markdown
<!-- /My Folder/My Note.md -->

# Folders

This is a note in a subfolder.
```

It's up to you how you organize your notes. You can create as many folders as you want or use a flat structure. We recommend using a flat structure for your personal notes and [[Features/Tags|Tags]] to organize them.
