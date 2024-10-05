import fs from "fs";

export default class DefaultIndex {
  data() {
    const hasCustomIndex = fs.existsSync("./../index.md");
    return {
      title: "Home",
      permalink: hasCustomIndex ? false : "/",
      layout: "core/base.layout.njk",
      panel: false,
    };
  }

  render() {
    return `
      <div class="page">
        <main class="page__main" id="app-content">
          <h1 class="page__title">Welcome to Eleventy Notes</h1>
          <p>Customize this page by creating a file named index.md in the root of your project.</p>
        </main>
      </div>
    `;
  }
}
