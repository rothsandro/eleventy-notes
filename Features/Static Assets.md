---
sort: 5
tags: [feature]
---

Static assets are files like documents, videos, or other resources that Eleventy Notes doesn't process. These files are copied as-is to the build output, keeping their original format.

> [!tip] Using Images in Markdown  
> You don't need to place images in the static assets folder to use them in Markdown files. See [[Writing Notes#Images]] for details on adding images to your notes.

## Configuration

You can set up one or more folders for static assets in your [[Configuration file]]:

```js
// /app.mjs
export default defineConfig({
  staticAssets: {
    // Single folder
    paths: "assets/",

    // Glob pattern
    paths: "assets/*.pdf",

    // Multiple folders
    paths: ["assets/", "videos/*.mp4"],

    // Map input folders to output folders
    paths: {
      "assets/": "assets/",
      "public/": "/",
    },
  },
  // ... other settings
});
```
