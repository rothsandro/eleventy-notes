---
tags: [feature]
---

If you host your notes on an online platform like [GitHub](https://github.com) that supports online editing of Markdown files, you can add an _Edit this note_ link that will be shown in the panel on the right side of the page.

You can configure the URL of the edit link in the `app.json` file as shown below. Omit the configuration if you want to hide the link.

```json
// /app.json
{
  "editThisNote": {
    // URL to the online editor
    "url": "https://example.com/edit/{{file}}",

    // Example for GitHub
    // Replace "johndoe/my-notes" with your repository
    "url": "https://github.com/johndoe/my-notes/edit/{{branch}}/{{file}}",

    // If the link should open in a new tab (optional)
    // Default: false
    "openInNewTab": true
  }
}
```

The `url` property supports the following placeholders:

| Placeholder  | Description                                                | Example                    |
| :----------- | :--------------------------------------------------------- | :------------------------- |
| `{{file}}`   | File path of the note (URL encoded, without leading slash) | `My%20Folder/My%20Note.md` |
| `{{branch}}` | Name of the current Git branch (if you use Git)            | `main`                     |
