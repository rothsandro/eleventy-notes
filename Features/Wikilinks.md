---
tags: [feature]
---

Use Wikilinks to create links to other notes. They will automatically be converted to the correct URL. Wikilinks are case-insensitive and can contain spaces. In addition, you will see all incoming links (aka backlinks) to a note in the panel on the right.

# Syntax

Use double square brackets to create a Wikilink.

```markdown
[[My Note]]
```

Use a pipe to specify the link text.

```markdown
[[My Note|My Note Title]]
```

# Folders

If you want to link to a specific note in a folder you should include the folder (or all folders if nested):

```markdown
[[Folder/Another Folder/My Note]]
```

# How Wikilinks are resolved

Wikilinks are resolved in the following way:

- **Wikilinks using folders**: Wikilinks with a folder (e.g. `[[Folder/My Note]]`) are resolved from the root of the project. If the folder or note doesn't exist, it will result in a broken link.

- **Wikilinks without a folder**: Wikilinks without a folder (e.g. `[[My Note]]`) are resolved from the root of the project. If there is no note with that name in the root, it will find the first note in any (nested) subfolder with that name and link to that note. If there is no note with that name it will result in a broken link.
