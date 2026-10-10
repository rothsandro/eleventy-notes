---
sort: 5
tags: [notes]
---

How you name your files and organize them is up to you. You can use [[Tags]], folders, maps of contents, or a combination of all three.

## File names

You can name your files however you want, whether it's a technical name like `my-note.md` or a more human-readable name like `My Note.md`. We recommend using a human-readable name for your notes. It makes working with [[Wikilinks]] much easier. For URLs, we'll automatically convert the name to a URL-friendly format.

## Folders

You can create folders to organize your notes. Folders end up in the URL of your note. For example, a note located in `My Folder/My Note.md` will be available at `/n/my-folder/my-note/`. Folders are also well-supported when using [[Wikilinks]].

## URL prefix

All your notes are automatically prefixed with `/n`. This is to avoid conflicts with other pages like search and tags.
You can change the prefix to something else, or set it to `/` to serve your notes at the root of your site (e.g. `/my-note/`).
If you use `/`, you'll need to make sure you don't have any conflicts with other pages.

You can adjust the prefix in your [[Configuration File|configuration]]. The prefix must always start with a slash:

```js
// /app.mjs
export default defineConfig({
  notes: {
    // Serve notes at /articles/my-note/
    pathPrefix: "/articles",

    // Serve notes at the root, e.g. /my-note/
    pathPrefix: "/",
  },
});
```
