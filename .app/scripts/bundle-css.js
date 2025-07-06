import { Parcel } from "@parcel/core";
import { fileURLToPath } from "url";

const args = process.argv.slice(2);
const isWatchMode = args.includes("--watch");

let bundler = new Parcel({
  entries: "css/app.scss",
  mode: isWatchMode ? "development" : "production",
  defaultConfig: "@parcel/config-default",
  // Ensure the custom CSS file outside the project root is watched
  // See https://github.com/parcel-bundler/parcel/issues/4332
  watchDir: fileURLToPath(new URL("./../../", import.meta.url)),
});

if (isWatchMode) {
  bundler.watch((_error, event) => {
    if (event.type === "buildSuccess") {
      console.log("[CSS] Build successful");
    } else if (event.type === "buildFailure") {
      console.error("[CSS] Build failed");
      console.warn(
        // See https://github.com/parcel-bundler/parcel/issues/7374
        "Please fix the errors below. You may need to restart the server after resolving them."
      );
      console.error(event.diagnostics);
    }
  });
} else {
  await bundler.run();
}
