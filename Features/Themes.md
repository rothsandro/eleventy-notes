---
sort: 3
tags: [feature]
---

# Color schemes

Eleventy Notes supports a few different color schemes to choose from. You can change the color scheme by adding a `theme` object to your [[Configuration file]]:

```js
// /app.mjs
export default defineConfig({
  theme: {
    color: "indigo",
  },
});
```

The supported color schemes are: tomato, red, ruby, crimson, pink, plum, purple, violet, iris, indigo, blue, sky, cyan, teal, jade, mint, green, grass, lime, yellow, amber, orange and brown.

# Light and dark themes

All color schemes come in a light theme and dark theme. You can switch between them by clicking one of the three button in the header:

- Light Theme
- Dark Theme
- System Theme

The system theme uses the appearance of your operating system. Your OS may use a light theme or a dark theme depending on the time of day.
