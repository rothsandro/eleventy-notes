const fs = require("fs");

class DefaultIndex {
  data() {
    const hasCustomIndex = fs.existsSync("./../index.md");
    return {
      permalink: hasCustomIndex ? false : "/",
      layout: "layouts/base.njk",
      panel: false,
    };
  }

  render() {
    return `
      <main class="app-layout__main" id="app-content">
        <div class="page" data-panel="false">
          <div class="page__wrapper">
            <div class="page__main">
              <h1 class="page__title">Home</h1>
              Welcome to Eleventy Notes.
              Customize this page by creating a file named index.md in the root of your project.
            </div>
          </div>
        </div>
      </main>
    `;
  }
}

module.exports = DefaultIndex;
