---
tags: [writing, dynamic-content]
---

Besides static content written in Markdown, you can render dynamic content, like a filtered list of your notes. Eleventy Notes provides a set of features for this purpose:

- [[Collections]] give you access to your notes and tags
- [[Queries]] allow to filter your notes and tags based on a set of conditions
- [[Render Filters]] allow you to render lists

Below you will find an example of using these features to render a list of featured notes.

## Example: Featured notes

You may want to create a list of featured notes on the [[Start page]]. You can create this list manually using [[Wikilinks]] or, as we will see in this example, you can use Eleventy Notes' dynamic content features to render the list dynamically.

### 1. Define featured notes

Let's say you want to use two front matter properties: `featured` and `featuredOrder`. The first one is a boolean that indicates whether the note should be featured or not. The second one is a number that indicates the order in which the note should be featured.

```md
---
featured: true
featuredOrder: 2
---

This is the second featured note.
```

Add this front matter properties on a few notes to feature them.

### 2. Create a query

We need to create a query that filters all notes that have the `featured` property set to `true` and sort them by the `featuredOrder` property. Open the note that should render your notes (e.g. `index.md` if you want to feature them on the start page).

Then add a new front matter property that contains the query:

```md
---
featuredNotes:
  filter: [["data.featured", "isEqual", true]]
  sort: [["data.featuredOrder", "asc"], ["title", "asc"]]
---

# Featured Notes

...
```

This query filters the list of notes by the `featured` property and sorts them by the `featuredOrder` property. If two notes have the same `featuredOrder` property, they are sorted by the `title` property.

### 3. Render the list

Finally, we can render the list of featured notes. Note that we add a `templateEngineOverride` property to the front matter to tell Eleventy to use the Nunjucks template engine for this file.

```md
---
featuredNotes: ... # filter omitted for brevity
templateEngineOverride: njk, md
---

# Featured Notes

{{ collections.notes | query(featuredNotes) | renderAsList | safe }}
```

We first access our notes using the collection `collections.notes`. Then we apply our `featuredNotes` query using the `query` filter. Finally, we render the result as a list using the `renderAsList` filter and the `safe` filter to prevent the HTML from being escaped.

Now open the page in the browser and should see a list of featured notes. If you click on one of the links, you should be redirected to the note.
