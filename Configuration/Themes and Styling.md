---
sort: 4
tags: [customization, configuration]
---

Eleventy Notes supports multiple color schemes and allows you to customize the appearance with your own CSS.

## Color schemes

You can change the color scheme in the `app.scss` file in the root of the project:

```scss
// /app.scss
@use "./.app/app-config";

$config: app-config.define-config(
  (
    theme: "sky",
  )
);
```

The supported color schemes are: tomato, red, ruby, crimson, pink, plum, purple, violet, iris, indigo, blue, sky, cyan, teal, jade, mint, green, grass, lime, yellow, amber, orange, and brown.

## Light and dark themes

All color schemes come in a light theme and dark theme. You can switch between them via theme switcher in the header.

The system theme uses the appearance of your operating system, which may change depending on the time of day.

## Custom styles

If you need to add specific styles to your content, you can write your own CSS in the `app.scss` file:

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

While Eleventy Notes allows you to override default styles, it's generally not recommended. The HTML structure, default styles, CSS class names, and CSS custom properties are subject to change at any time without prior notice, including in bugfix releases. Proceed with caution if you choose to override default styles.
