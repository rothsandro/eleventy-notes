---
sort: 3
---

Create an `app.json` file in the root of the project to configure the app. The `title` and `description` properties are highly recommended. All other properties are optional.

{% raw %}

```json
{
  "title": "My Notes",
  "description": "My notes",
  "editThisNote": {
    "url": "https://example.com/edit/{{file}}"
  },
  "sidebar": {
    "links": [],
    "notes": [{}]
  }
}
```

{% endraw %}

See the following sections for more information about the configuration options:

- [[Edit link]]
- [[Sidebar]]
