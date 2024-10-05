---
tags: [writing]
props:
  author: Sandro Roth
  publishedOn: 2023-07-31
  learnMore:
    - "[[Configuration file|Config file]]"
    - "[[Wikilinks#syntax|Wikilink syntax]]"
---

Custom Properties are additional metadata for notes, such as the author or the date it was published.
You can add custom properties to your notes using Front Matter and specify properties in the [[Configuration file]] to show them in the [[Panel]].

## Examples

### Author

This example shows how to add an author to a note. First, define the author in your note using Front Matter:

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

### Published Date

This example shows how to add a date to a note. First, define the date in your note using Front Matter:

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

        // Optionally, format the date.
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

This example shows how to add a list of related notes to a note. First, define the related notes in your note using Front Matter.
Related notes can be referenced using the same [[Wikilinks#syntax|wikilink syntax]] as in your notes.

```md
---
related:
  - "[[My other note]]" # Must be wrapped in quotes!
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

### Arbitrary Properties

This example shows how to add arbitrary properties to a note. First, define the properties in your note using Front Matter.
For arbitrary properties, it's recommended to use a nested object (`meta` in this example).

```md
---
meta:
  language: German
  license: MIT
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
        // Includes all props in the meta object
        path: "meta",
      },
    ],
  },
});
```

## Configuration API

What properties are shown in the panel can be configured in the [[Configuration file]].

```js
export default defineConfig({
  customProperties: {
    // Define a list of properties to show in the panel.
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

        // Options for the property value (optional).
        options: {
          // Options for date values
          date: {
            locale: "en-US",
            format: { dateStyle: "full" },
          },
          // Options for numeric values
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
