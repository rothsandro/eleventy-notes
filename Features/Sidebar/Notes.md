---
tags: [feature]
---

The sidebar shows a _Notes_ section with a flat list of all your notes by default.
You can customize the sidebar to show notes in different sections and groups, filter the notes by their location, name and tags, and display the notes in a tree view.

## Sections

The sidebar in Eleventy Notes can be segmented into multiple sections, each containing one or more collapsible groups. This allows for a highly organized and navigable note structure. The example below demonstrates a basic configuration with a single section and group, which displays all your notes. The `createNotesQuery()` function is used to generate a query that selects and displays all notes.

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

Each section in Eleventy Notes can contain multiple groups, providing a hierarchical structure for better organization. Each group can be assigned a label and a filter, allowing you to display only specific notes within that group.

Groups with assigned labels are collapsible, enhancing the user's navigation experience. By default, these groups are expanded. However, you can modify this default state by setting the `expanded` property to `false`, which will render the group as collapsed when the page loads.

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

## Sorting

By default, all notes are arranged in ascending order based on their display name, which is determined by the title (if specified) or the file name. However, Eleventy Notes provides flexibility in customizing the order of specific notes. This can be achieved by adding a `sort` property to the front matter of your notes.

```md
---
sort: 1
---

My Note
```

## Queries

The `createNotesQuery()` function helps you to query notes. By default, it selects all notes, sorts them and displays them in a flat list.
You can provide an object with additional properties to customize the query.

### Filter by location / name

You can filter notes by their location and name using a RegEx pattern. The pattern is case-insensitive.

```js
createsNotesQuery({
  // Show all notes in the "posts" folder
  pattern: "/posts/",
});
```

### Filter by tags

You can filter notes by their tags. Notes that have at least one of the specified tags are shown. You can combine this with a location filter.

```js
createsNotesQuery({
  // Notes that have at least one of these tags are shown.
  tags: ["one", "two"],
});
```

### Tree View

Set the `tree` property to display the notes in a tree view based on their location in the file system.

```js
createNotesQuery({
  tree: true,
});
```

#### Structure

When the tree view is enabled, the entire folder structure is displayed in the sidebar. This can be customized using a map of search/value patterns to alter parts of the path. This feature is particularly useful if you wish to present a different folder structure in the sidebar compared to the actual file system. A typical application of this feature is to exclude the root folder from the displayed path.

```js
createNotesQuery({
  tree: {
    replace: {
      "^/Articles/": "",
    },
  },
});
```

#### Expansion State

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

#### Notes as folders

In the tree view, clicking on a folder expands or collapses the list of notes within that folder, without navigating away from the current page. However, Eleventy Notes provides the option to associate a note with a folder, which can be accessed by clicking on the folder itself. There are two methods to create a note for a folder:

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

## Custom Queries

While the `createNotesQuery()` function offers a basic set of options for filtering and displaying notes, you might require more flexibility. In such cases, you're not confined to using `createNotesQuery()`. Instead, you can craft your own custom query and assign it to the `query` property of a group.

For a comprehensive understanding of the query syntax, refer to the [[Queries]] documentation.

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

## Note Title

You can customize the title of a note in the sidebar by adding a `navTitle` property to the front matter of the note.

```md
---
navTitle: Custom Title
---

My Note
```

## Examples

### All notes

If you want to show all your notes in a single group, add an empty group without a filter. You can also omit the `sections` property completely which will use the default configuration:

```js
export default defineConfig({
  sidebar: {
    sections: [
      {
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

### Notes in root

Here is an example that shows all notes in the root. Notes in subfolders are excluded:

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

The following group renders all notes of the subfolder "Example":

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

### Virtual Folders

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
