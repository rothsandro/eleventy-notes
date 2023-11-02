---
tags: [writing, dynamic-content]
---

Eleventy Notes provides a number of collections that you can use in your notes.

## Notes

`collections.notes` contains all your notes:

```js
[
  {
    // The title of the note
    title: "My Note",

    // The list of tags
    tags: ["tag1", "tag2"],

    // Filename without extension
    fileSlug: "My Note",

    // Filepath without extension
    filePathStem: "/My Folder/My Note",

    // The URL of the note
    url: "/n/my-folder/my-note/",

    // The date of the note
    date: new Date(),
  },
];
```

## Tags

`collections.tags` contains all tags and their notes:

```js
[
  {
    // The display name of the tag
    label: "tag1",

    // The url of the tag page
    url: "/tags/tag1/",

    // The list of notes that have this tag
    notes: [
      {
        // See the notes collection above for the properties
      },
    ],
  },
];
```
