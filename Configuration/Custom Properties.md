---
sort: 7
tags: [customization, configuration]
author:
  name: Sandro Roth
  url: "https://sandroroth.com"
props:
  publishedOn: 2023-07-31
  learnMore:
    - "[[Configuration File|Config file]]"
    - "[[Wikilinks#syntax|Wikilink syntax]]"
---

Custom Properties are additional metadata for notes, such as the author or the date it was published.
You can add custom properties to your notes using front matter and specify properties in your configuration to show them in the [[Panel]].

## Examples

### Author

This example shows how to add an author to a note. First, define the author in your note using front matter:

```md
---
author: John Doe
---

# My Note
```

Then add the property to the configuration file:

```js
// /app.mjs
export default defineConfig({
  customProperties: {
    properties: [
      {
        name: "author",
      },
    ],
  },
});
```

### Published date

This example shows how to add a date to a note. First, define the date in your note using front matter:

```md
---
publishedOn: 2023-08-01
---

# My Note
```

Then add the property to the configuration file:

```js
// /app.mjs
export default defineConfig({
  customProperties: {
    properties: [
      {
        name: "publishedOn",
        options: {
          date: {
            locale: "en-US",
            format: { dateStyle: "full" },
          },
        },
      },
    ],
  },
});
```

### Related notes

This example shows how to add a list of related notes to a note. First, define the related notes in your note using the [[Wikilinks#syntax|wikilink syntax]]:

```md
---
related:
  - "[[My other note]]"
  - "[[My third note]]"
---

# My Note
```

Then add the property to the configuration file:

```js
// /app.mjs
export default defineConfig({
  customProperties: {
    properties: [
      {
        name: "related",
      },
    ],
  },
});
```

Wikilinks used in custom properties are not listed in the incoming / outgoing sections of the panel.

### Author with link

This example shows how to use a custom template to render a property as a link. First, define the author with a name and URL in your note using front matter:

```md
---
author:
  name: John Doe
  url: "https://johndoe.com"
---

# My Note
```

Then add the property with a template (using Nunjucks and Markdown syntax):

```js
// /app.mjs
export default defineConfig({
  customProperties: {
    properties: [
      {
        name: "author",
        template: "[{{ value.name }}]({{ value.url }})",
      },
    ],
  },
});
```

The template has access to `value` (the raw property value) and `formattedValue` (the formatted value for dates and numbers). For array values, both `value` and `formattedValue` are arrays with matching indices.

### Arbitrary Properties

For arbitrary properties, use a nested object (`meta` in this example):

```md
---
meta:
  language: German
  license: MIT
---

# My Note
```

```js
// /app.mjs
export default defineConfig({
  customProperties: {
    properties: [
      {
        // Includes all properties defined under the `meta` key in front matter
        path: "meta",
      },
    ],
  },
});
```

## Configuration API

```js
export default defineConfig({
  customProperties: {
    properties: [
      {
        // The path to the property, if your property is nested (optional).
        path: "meta",

        // The name of the property.
        // If omitted, all properties in the path are shown.
        // Define a regular expression to match multiple properties.
        name: "author",

        // The label to show in the panel.
        // If omitted, is inferred from the property name.
        label: "Lovely written by",

        // Custom template to render the property value.
        // It supports Nunjucks and Markdown syntax and
        // has access to `value` and `formattedValue` variables.
        template: "[{{ value.name }}]({{ value.url }})",

        // Options for the property value (optional).
        options: {
          date: {
            locale: "en-US",
            format: { dateStyle: "full" },
          },
          number: {
            locale: "en-US",
            format: {
              style: "currency",
              currency: "USD",
              currencyDisplay: "symbol",
            },
          },
        },
      },
    ],
  },
});
```
