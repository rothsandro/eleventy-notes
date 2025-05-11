import fs from "fs";

const customIndexPaths = ["./../index.md", "./../index.njk", "./../index.html"];

export default class DefaultIndex {
  data() {
    const hasCustomIndex = customIndexPaths.some((path) => fs.existsSync(path));

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
