---
sort: 1
tags: [feature]
---

Eleventy Notes provides several configuration options to customize the app. All of them are optional, but a basic configuration is recommended.

## Basic configuration

Create a new file `app.json` in the root of the project, next to your notes. Add a custom title (shown in the header) and a description (not shown but used by search engines):

```json
{
  "title": "John's Notes",
  "description": "The personal notes of John Doe"
}
```

## JSON Schema

If you use an editor like [VS Code](https://code.visualstudio.com/) that supports JSON schema, add the `$schema` property to your configuration file. This will give you autocompletion, descriptions and validation:

```json
{
  "$schema": ".app/app.schema.json"
  // ...
}
```

## Supported configurations

In addition to the basic configuration, you can also:

- Add an edit link to your notes, see [[Edit link]]
- Customize the notes in the sidebar or add links to other websites, see [[Sidebar]]
- Customize the content of the panel, see [[Panel]]
- Configure custom properties in the panel, see [[Custom Properties]]
- Change the color scheme, see [[Themes]]
- Customize the behavior of Wikilinks, see [[Wikilinks#Automatic Label]]

## Summary

The following example shows the supported configuration options:

```json
{
  "title": "John's Notes",
  "description": "The personal notes of John Doe",
  "customProperties": {
    "properties": []
  },
  "theme": {
    "color": "sky"
  },
  "editThisNote": {
    "url": "https://example.com/edit/{{file}}"
  },
  "sidebar": {
    "links": [],
    "notes": [{}]
  },
  "panel": {
    "tableOfContents": true,
    "tags": true,
    "customProperties": true,
    "incomingLinks": true,
    "outgoingLinks": true,
    "externalLinks": true
  },
  "wikilinks": {
    "autoLabel": "ref",
    "anchorLabel": "none"
  }
}
```
