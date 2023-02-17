const { Parcel } = require("@parcel/core");
const setupFactory = require("./../../_data/setup.js");

module.exports = async () => {
  try {
    const setup = setupFactory();
    const bundler = new Parcel({
      entries: setup.css.input,
      distDir: "dist/",
      mode: setup.env,
      defaultConfig: "@parcel/config-default",
    });

    let { bundleGraph, buildTime } = await bundler.run();
    let bundles = bundleGraph.getBundles();
    console.log(`✨ CSS: Built ${bundles.length} bundles in ${buildTime}ms!`);
  } catch (err) {
    console.log(err.diagnostics);
  }
};
