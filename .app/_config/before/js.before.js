const { Parcel } = require("@parcel/core");
const isProd = process.env.ELEVENTY_ENV === "production";

const bundler = new Parcel({
  entries: "js/app.js",
  distDir: "dist/",
  mode: isProd ? "production" : "development",
  defaultConfig: "@parcel/config-default",
});

module.exports = async () => {
  try {
    let { bundleGraph, buildTime } = await bundler.run();
    let bundles = bundleGraph.getBundles();
    console.log(`✨ JS: Built ${bundles.length} bundles in ${buildTime}ms!`);
  } catch (err) {
    console.log(err.diagnostics);
  }
};
