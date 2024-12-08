---
tags: [feature]
---

You can add additional links to the sidebar, which are shown in the first section after the main navigation. For example, you can link to your website or social profiles. These links should be external links and not point to notes. Add them in the [[Configuration file]]:

```js
// /app.mjs
export default defineConfig({
  sidebar: {
    links: [
      {
        // The url of the website
        url: "https://github.com/rothsandro/eleventy-notes",

        // The visible label of the link
        label: "GitHub",

        // The icon name
        // For a list of available icons, see https://lucide.dev/icons/
        icon: "github",

        // If the link should open in a new tab (optional)
        // Default: true
        openInNewTab: false,
      },
    ],
  },
});
```

For a list of available icons visit [lucide.dev/icons](https://lucide.dev/icons/).
