---
tags: [writing, dynamic-content]
---

The `renderAsList` filter renders the given collection as a list.

```njk
{{ collections.notes | renderAsList | safe }}
```

The filter takes an optional object with the following properties:

```js
renderAsList({
  // The property for the visible text
  titleProp: "title",

  // The property for the URL to render the text as a link
  urlProp: "url",

  // The property containing the children to render as nested list
  childrenProp: "children",
});
```
