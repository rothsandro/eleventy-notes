class Index {
  data() {
    return {
      layout: null,
      permalink: "/index.json",
    };
  }

  render({ collections }) {
    return JSON.stringify(
      Object.fromEntries(
        collections.notes.map((note) => [
          note.url,
          note.data.title || note.page.fileSlug,
        ])
      )
    );
  }
}

module.exports = Index;
