---
sort: 4
tags: [feature]
---

Eleventy Notes provides a comprehensive set of default styles. However, if you need to add specific styles to your content, you have the flexibility to write your own CSS.

## Custom Styles

An `app.styles.scss` file is available at the root of the project for you to add your custom styles. This file is automatically included after all the default styles provided by Eleventy Notes.

```scss
// /app.styles.scss
.my-custom-class {
  color: red;
}
```

Please note, the `app.styles.scss` file must always exist in the project, even if you don't add any custom styles. It is automatically created when you run or build the project.

## Overwriting default styles

While Eleventy Notes allows you to override default styles with your custom styles, it's generally not recommended due to potential risks. The HTML structure, default styles, CSS class names, and CSS custom properties are subject to change at any time without prior notice, including in bugfix releases. Proceed with caution if you choose to override default styles.
