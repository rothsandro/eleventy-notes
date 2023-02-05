---
tags: [feature]
---

The sidebar with the main navigation of app shows link to the start page, your notes, the search and more.

## Start page

The first link in the sidebar is always the start page. The start page is the first page that is shown when you open the app. See [[Features/Start page|Start page]] for more information.

## Favorites

If you add a note as [[Features/Favorites|Favorite]], a new section _Favorites_ will automatically appear in the sidebar, showing all your favorites.

## Tags

When you start using tags, the sidebar will render all of your tags. For each tag there is a separate page that lists all notes with the given tag.

## Notes

Without configuration, the sidebar shows all your notes in a single group. You can customize the sidebar to show notes in different groups. You can filter notes based on their location, name and tags.

### Configuration API

In the `app.json` file, you can configure the sidebar to show notes in different groups. The following configuration shows all available options:

```json5
// /app.json
{
  sidebar: {
    // A list of groups shown in the sidebar
    notes: [
      {
        // A label for the group.
        label: "Archive",

        // A RegEx pattern to filter files by path + name
        // The pattern is case-insensitive.
        pattern: ".",

        // A list of tags to filter the notes.
        // Notes that have at least one of these tags are shown.
        tags: ["one", "two"],
      },
    ],
  },
}
```

### Example: All notes

If you want to show all your notes in a single group, add an empty group without a filter. You can also omit the `notes` property completely which will use the default configuration:

```json5
{
  sidebar: {
    notes: [{}],
  },
}
```

### Example: Notes in root

Here is an example that shows all notes in the root. Notes in subfolders are excluded:

```json5
{
  sidebar: {
    notes: [
      {
        pattern: "^/[^/]+$",
      },
    ],
  },
}
```

### Example: Notes in subfolder

The following groups renders all notes of the subfolder "Example" :

```json5
{
  sidebar: {
    notes: [
      {
        label: "Example",
        pattern: "^/Example/",
      },
    ],
  },
}
```

### Sorting

All notes are sorted ascending by their display name (which is either the title, if specified, or the file name). You can customize the order of specific notes by adding a `sort` property.

```md
---
sort: 1
---

My Note
```
