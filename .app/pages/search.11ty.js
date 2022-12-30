const { stripHtml } = require("string-strip-html");

class SearchIndex {
  data() {
    return {
      layout: null,
      permalink: "/search.json",
    };
  }

  render({ collections }) {
    return JSON.stringify({
      notes: collections.notes.map((note) => {
        return {
          title: note.data.title || note.page.fileSlug,
          tags: note.data.tags ?? [],
          url: note.url,
          content: stripHtml(note.content, {
            dumpLinkHrefsNearby: {
              enabled: true,
              wrapHeads: "[",
              wrapTails: "]",
            },
          }).result,
        };
      }),
    });
  }
}

module.exports = SearchIndex;
