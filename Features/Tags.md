---
tags: [feature]
---

While you can use folders to group your notes, tags are more powerful as a note can have unlimited tags and they don't affect [[Features/Wikilinks|Wikilinks]]. All your tags are automatically listed in the sidebar and there is a separate tags page that lists all your tags and notes. In addition, the [[Features/Search|Search]] support filtering by tags and you can customize the [[Features/Sidebar|Sidebar]] based on tags.

# Adding tags

Use Frontmatter to add tags to your notes. For a single tag you can directly add the tag name:

```markdown
---
tags: example
---

My note
```

For multiple tags, you can either use a list or the `[]` syntax:

```markdown
---
tags:
  - one
  - two
  - three
---

My note
```

```markdown
---
tags: [one, two, three]
---

My note
```

Tags can include white spaces, but it's not really recommended.

```markdown
---
tags: ["some tag"]
---

My note
```
