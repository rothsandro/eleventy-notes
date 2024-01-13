const { Parcel } = require("@parcel/core");

const args = process.argv.slice(2);
const isWatchMode = args.includes("--watch");

ensureCustomCssExists();

let bundler = new Parcel({
  entries: "css/app.*.scss",
  mode: isWatchMode ? "development" : "production",
  defaultConfig: "@parcel/config-default",
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
