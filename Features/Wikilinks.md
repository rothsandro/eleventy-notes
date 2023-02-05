---
sort: 4
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

All Wikilinks are absolute, resolving to notes in the root of your project. Wikilinks to notes in folders must include the folder:

```markdown
[[Folder/Another Folder/My Note]]
```
