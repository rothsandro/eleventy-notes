---
sort: 4
tags: [feature]
---

Eleventy Notes provides a comprehensive set of default styles. However, if you need to add specific styles to your content, you have the flexibility to write your own CSS in the `app.scss` file at the root of your project.

```scss
// /app.scss
@use "./.app/app-config";

$config: app-config.define-config(
  (
    theme: "sky",
  )
);

// Your custom styles go here:
.my-custom-class {
  color: red;
}
```

## Overwriting default styles

While Eleventy Notes allows you to override default styles with your custom styles, it's generally not recommended due to potential risks. The HTML structure, default styles, CSS class names, and CSS custom properties are subject to change at any time without prior notice, including in bugfix releases. Proceed with caution if you choose to override default styles.
