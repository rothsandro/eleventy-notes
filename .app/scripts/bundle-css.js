const { Parcel } = require("@parcel/core");
const path = require("path");

const args = process.argv.slice(2);
const isWatchMode = args.includes("--watch");

ensureCustomCssExists();

let bundler = new Parcel({
  entries: "css/app.*.scss",
  mode: isWatchMode ? "development" : "production",
  defaultConfig: "@parcel/config-default",
  // Ensure the custom CSS file outside the project root is watched
  // See https://github.com/parcel-bundler/parcel/issues/4332
  watchDir: path.resolve(__dirname, "./../../"),
});

if (isWatchMode) {
  bundler.watch();
} else {
  bundler.run();
}

function ensureCustomCssExists() {
  const fs = require("fs");
  const path = require("path");

  const cssPath = path.resolve(__dirname, "./../../app.styles.scss");
  const content = "/* Write your custom CSS here */";
  !fs.existsSync(cssPath) && fs.writeFileSync(cssPath, content);
}
