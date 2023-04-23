---
tags: organizing
---

You can use tags to organize your notes. All your tags are automatically listed in the sidebar and there is a separate tags page that lists all your tags and notes. In addition, the [[Features/Search|Search]] support filtering by tags, and you can customize the [[Features/Sidebar|Sidebar]] based on tags.

Use Front Matter to add tags to your notes. For a single tag you can directly add the tag name:

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
