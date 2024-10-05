import { Parcel } from "@parcel/core";
import path from "path";
import fs from "fs";

const args = process.argv.slice(2);
const isWatchMode = args.includes("--watch");

ensureCustomCssExists();

let bundler = new Parcel({
  entries: "css/app.*.scss",
  mode: isWatchMode ? "development" : "production",
  defaultConfig: "@parcel/config-default",
  // Ensure the custom CSS file outside the project root is watched
  // See https://github.com/parcel-bundler/parcel/issues/4332
  watchDir: new URL("./../../", import.meta.url).pathname,
});

if (isWatchMode) {
  bundler.watch();
} else {
  await bundler.run();
}

function ensureCustomCssExists() {
  const cssPath = new URL("./../../app.styles.scss", import.meta.url).pathname;
  const content = "/* Write your custom CSS here */";
  !fs.existsSync(cssPath) && fs.writeFileSync(cssPath, content);
}
