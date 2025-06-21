---
sort: 3
tags: [feature]
---

# Color schemes

Eleventy Notes supports a few different color schemes to choose from. You can change the color scheme in the `app.scss` file in the root of the project.

```js
// /app.scss
@use "./.app/app-config";

$config: app-config.define-config(
  (
    theme: "sky", // <-- The color scheme to use
  )
);

```

The supported color schemes are: tomato, red, ruby, crimson, pink, plum, purple, violet, iris, indigo, blue, sky, cyan, teal, jade, mint, green, grass, lime, yellow, amber, orange and brown.

# Light and dark themes

All color schemes come in a light theme and dark theme. You can switch between them by clicking one of the three button in the header:

- Light Theme
- Dark Theme
- System Theme

The system theme uses the appearance of your operating system. Your OS may use a light theme or a dark theme depending on the time of day.
