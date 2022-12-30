const { Parcel } = require("@parcel/core");
const isProd = process.env.ELEVENTY_ENV === "production";

const bundler = new Parcel({
  entries: "css/app.scss",
  distDir: "dist/",
  mode: isProd ? "production" : "development",
  defaultConfig: "@parcel/config-default",
});

module.exports = async () => {
  try {
    let { bundleGraph, buildTime } = await bundler.run();
    let bundles = bundleGraph.getBundles();
    console.log(`✨ CSS: Built ${bundles.length} bundles in ${buildTime}ms!`);
  } catch (err) {
    console.log(err.diagnostics);
  }
};
