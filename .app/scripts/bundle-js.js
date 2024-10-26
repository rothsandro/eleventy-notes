import { Parcel } from "@parcel/core";

const args = process.argv.slice(2);
const isWatchMode = args.includes("--watch");

let bundler = new Parcel({
  entries: "js/app.js",
  mode: isWatchMode ? "development" : "production",
  defaultConfig: "@parcel/config-default",
});

if (isWatchMode) {
  bundler.watch();
} else {
  await bundler.run();
}
