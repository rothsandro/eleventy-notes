export default class Index {
  data() {
    return {
      layout: null,
      permalink: "/index.json",
    };
  }

  render({ collections }) {
    return JSON.stringify(
      Object.fromEntries(
        collections._notes.map((note) => [
          this.htmlBaseUrl(note.url),
          note.data.title || note.page.fileSlug,
        ])
      )
    );
  }
}
