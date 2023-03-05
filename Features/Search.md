---
tags: [feature]
---

_Eleventy Notes_ automatically creates an index of all of your notes. Use the search in the top right corner or the separate search page. You can search for both, the title and content.

# Filter by tags

You can filter the list of notes by tags using `#` and the tag name, e.g. `#work`.

# Performance

The search works completely client-side. If you have a lot of notes and/or a slow device, the search might be slow. In this case, you should replace the search with a more powerful solution like [Algolia](https://www.algolia.com/).
