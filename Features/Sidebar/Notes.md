---
tags: [feature]
---

Without configuration, the sidebar shows all your notes in a single group. You can customize the sidebar to show notes in different groups. You can filter notes based on their location, name and tags.

## Filter by location / name

You can filter notes by their location and name using a RegEx pattern. The pattern is case-insensitive.

```json
// /app.json
{
  "sidebar": {
    "notes": [
      {
        // Show all notes in the "posts" folder
        "pattern": "/posts/"
      }
    ]
  }
}
```

## Filter by tags

You can filter notes by their tags. Notes that have at least one of the specified tags are shown. You can combine this with a location filter.

```json
// /app.json
{
  "sidebar": {
    "notes": [
      {
        // Notes that have at least one of these tags are shown.
        "tags": ["one", "two"]
      }
    ]
  }
}
```

## Multiple Groups

You can create multiple groups with an optional label. Groups with a label can be collapsed by the user and are expanded by default. You can change the default expansion state by setting the `expanded` property to `false`.

```json
// /app.json
{
  "sidebar": {
    "notes": [
      {
        "label": "Posts",
        "pattern": "/posts/",
        "tags": ["published"]
      },
      {
        "label": "Archived",
        "expanded": false,
        "pattern": "/archive/"
      }
    ]
  }
}
```

## Tree View

Each group shows a flat list of notes by default. Set the `tree` property to display the notes in a tree view based on their location in the file system.

```json
{
  "sidebar": {
    "notes": [
      {
        "label": "Posts",
        "tree": true
      }
    ]
  }
}
```

### Structure

If you enable the tree view, the complete folder structure is shown in the sidebar. You can define a map of search/value patterns to replace parts of the path. This is useful if you want to show a different folder structure in the sidebar than in the file system. A common use case is to remove the root folder from the path:

```json
{
  "sidebar": {
    "notes": [
      {
        "pattern": "^/Articles/",
        "tree": {
          "replace": {
            "^/Articles/": ""
          }
        }
      }
    ]
  }
}
```

### Expansion State

You can customize whether folders should be initially collapsed or expanded. If not configured, all folders are expanded.

```json
{
  "sidebar": {
    "notes": [
      {
        "tree": {
          // Collapse all folders by default
          "expanded": false,

          // Expand the first + second level, collapse all other levels
          "expanded": 2,

          // Expand all folders that match the given pattern (RegEx pattern)
          "expanded": "/Popular Posts$"
        }
      }
    ]
  }
}
```

The user can collapse/expand folders manually. Navigating to a different note or refreshing the page will restore the expansion state. Opening a new tab or closing the browser will reset the expansion state. The current note is always expanded.

If you modify the expansion state in the `app.json` file, make sure you open a new tab to see the changes, otherwise the expansion state will be restored and not reflect the changes.

### Notes as folders

Clicking on a folder in the tree view toggles the notes underneath that folder but doesn't navigate. However, you can add a note for a folder that the user can navigate to by clicking on it. There are two ways to create a note for a folder:

Either create a file with the same name as the folder **outside** the folder:

```
Example 1.md
Ideas.md            <--- This is the note for the "Ideas" folder
Ideas/
└── Crazy Idea.md
```

Or create an `index.md` **inside** the folder:

```
Example 1.md
Ideas/
├── index.md        <--- This is the note for the "Ideas" folder
└── Crazy Idea.md
```

The first approach is recommended because it works better with [[Wikilinks]] and avoids having a lot of `index.md` files in your folder structure (which can be confusing).

## Sorting

All notes are sorted ascending by their display name (which is either the title, if specified, or the file name). You can customize the order of specific notes by adding a `sort` property.

```md
---
sort: 1
---

My Note
```

## Examples

### All notes

If you want to show all your notes in a single group, add an empty group without a filter. You can also omit the `notes` property completely which will use the default configuration:

```json
{
  "sidebar": {
    "notes": [{}]
  }
}
```

### Notes in root

Here is an example that shows all notes in the root. Notes in subfolders are excluded:

```json
{
  "sidebar": {
    "notes": [
      {
        "pattern": "^/[^/]+$"
      }
    ]
  }
}
```

### Notes in subfolder

The following group renders all notes of the subfolder "Example":

```json
{
  "sidebar": {
    "notes": [
      {
        "label": "Example",
        "pattern": "^/Example/"
      }
    ]
  }
}
```

### Virtual Folders

The tree view can be used to create virtual folders. You can turn the flat list of notes into a tree view by replacing parts of the path with a different value. For example, you can group your weekly notes by year if the file names start with the year:

```json
{
  "sidebar": {
    "notes": [
      {
        "label": "Weekly Notes",
        "tree": {
          "replace": {
            // Turn "/2023-01" into "/2023/01"
            "^/([0-9]{4})": "/$1/"
          }
        }
      }
    ]
  }
}
```
