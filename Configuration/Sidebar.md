---
sort: 2
tags: [customization, configuration]
---

The sidebar is the main navigation of the app. It shows links to the start page, your notes, search, and more.

## Sections

The sidebar can be segmented into multiple sections, each containing one or more collapsible groups. This allows for a highly organized and navigable note structure. The example below demonstrates a basic configuration with a single section and group, which displays all your notes. The `createNotesQuery()` function is used to generate a query that selects and displays all notes.

```js
// /app.mjs
import { defineConfig, createNotesQuery } from "./.app/app-config.js";

export default defineConfig({
  sidebar: {
    sections: [
      {
        // A section "Notes" with a single group that shows all notes
        label: "Notes",
        groups: [
          {
            query: createNotesQuery(),
          },
        ],
      },
    ],
  },
});
```

## Groups

Each section can contain multiple groups. Each group can be assigned a label and a query, allowing you to display only specific notes within that group.

Groups with assigned labels are collapsible. By default, these groups are expanded. You can modify this default state by setting the `expanded` property to `false`.

```js
// /app.mjs
import { defineConfig, createNotesQuery } from "./.app/app-config.js";

export default defineConfig({
  sidebar: {
    sections: [
      {
        label: "Notes",
        groups: [
          {
            // A collapsible group "Posts", expanded by default
            label: "Posts",
            query: createNotesQuery(),
          },
          {
            // A collapsible group "Archived", collapsed by default
            label: "Archived",
            expanded: false,
            query: createNotesQuery(),
          },
        ],
      },
    ],
  },
});
```

## Sorting notes

By default, all notes are arranged in ascending order based on their display name, which is determined by the title (if specified) or the file name. You can customize the order of specific notes by adding a `sort` property to the front matter:

```md
---
sort: 1
---

My Note
```

## Filtering notes

The `createNotesQuery()` function helps you to query notes. By default, it selects all notes, sorts them and displays them in a flat list.

### Filter by location / name

You can filter notes by their location and name using a RegEx pattern. The pattern is case-insensitive.

```js
createNotesQuery({
  // Show all notes in the "posts" folder
  pattern: "/posts/",
});
```

### Filter by tags

You can filter notes by their tags. Notes that have at least one of the specified tags are shown.

```js
createNotesQuery({
  // Notes that have at least one of these tags are shown.
  tags: ["one", "two"],
});
```

## Tree view

Set the `tree` property to display the notes in a tree view based on their location in the file system.

```js
createNotesQuery({
  tree: true,
});
```

### Customizing structure

When the tree view is enabled, the entire folder structure is shown. You can adjust this by using a map of search/replace patterns to modify parts of the path. This is especially useful if you want the sidebar to display a different folder structure than the actual file system, such as omitting the root folder from the displayed path.

```js
createNotesQuery({
  tree: {
    replace: {
      "^/Articles/": "",
    },
  },
});
```

### Expansion state

You can customize whether folders should be initially collapsed or expanded. If not configured, all folders are expanded.

```js
createNotesQuery({
  tree: {
    // Collapse all folders by default
    expanded: false,

    // Expand the first + second level, collapse all other levels
    expanded: 2,

    // Expand all folders that match the given pattern (RegEx pattern)
    expanded: "/Popular Posts$",
  },
});
```

Users have the ability to manually expand or collapse folders in the sidebar. This expansion state is preserved when navigating between notes or refreshing the page. However, opening a new tab or closing the browser will reset this state to its default. The folder containing the currently viewed note is always expanded for easy reference.

If you make changes to the expansion state in the `app.mjs` file, it's important to open a new tab to observe these changes. If you don't, the previous expansion state will be restored, and your changes won't be reflected.

### Notes as folders

In the tree view, you can associate a note with a folder. There are two methods:

Create a file with the same name as the folder **outside** the folder:

```
Ideas.md            <--- This is the note for the "Ideas" folder
Ideas/
└── Crazy Idea.md
```

Or create an `index.md` **inside** the folder:

```
Ideas/
├── index.md        <--- This is the note for the "Ideas" folder
└── Crazy Idea.md
```

The first approach is recommended because it works better with [[Wikilinks]] and avoids having a lot of `index.md` files in your folder structure (which can be confusing).

## Custom note title

You can customize the title of a note in the sidebar by adding a `navTitle` property to the front matter:

```md
---
navTitle: Custom Title
---

My Note
```

## Additional links

You can add external links to the sidebar, which are shown in the first section after the main navigation:

```js
// /app.mjs
export default defineConfig({
  sidebar: {
    links: [
      {
        url: "https://github.com/rothsandro/eleventy-notes",
        label: "GitHub",
        icon: "github",
        openInNewTab: false, // optional, default: true
      },
    ],
  },
});
```

For a list of available icons visit [lucide.dev/icons](https://lucide.dev/icons/).

## Custom queries

For more flexibility, you can craft your own custom query instead of using `createNotesQuery()`. Refer to [[Queries]] for the full query syntax.

```js
// /app.mjs
import { defineConfig } from "./.app/app-config.js";

export default defineConfig({
  sidebar: {
    sections: [
      {
        label: "Notes",
        groups: [
          {
            query: {
              /* Write your custom query here */
            },
          },
        ],
      },
    ],
  },
});
```

## Examples

### All notes in root

Show all notes in the root folder, excluding subfolders:

```js
export default defineConfig({
  sidebar: {
    sections: [
      {
        label: "Notes",
        groups: [
          {
            query: createNotesQuery({
              pattern: "^/[^/]+$",
            }),
          },
        ],
      },
    ],
  },
});
```

### Notes in subfolder

Render all notes from a specific subfolder:

```js
export default defineConfig({
  sidebar: {
    sections: [
      {
        label: "Notes",
        groups: [
          {
            label: "Example",
            query: createNotesQuery({
              pattern: "^/Example/",
            }),
          },
        ],
      },
    ],
  },
});
```

### Virtual folders

The tree view can be used to create virtual folders. You can turn the flat list of notes into a tree view by replacing parts of the path with a different value. For example, you can group your weekly notes by year if the file names start with the year:

```js
export default defineConfig({
  sidebar: {
    sections: [
      {
        label: "Notes",
        groups: [
          {
            label: "Weekly Notes",
            query: createNotesQuery({
              tree: {
                replace: {
                  // Turn "/2023-01" into "/2023/01"
                  "^/([0-9]{4})": "/$1/",
                },
              },
            }),
          },
        ],
      },
    ],
  },
});
```
