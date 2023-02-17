const appConfigFactory = require("./app");

module.exports = () => {
  const appConfig = appConfigFactory();
  const runMode = process.env.ELEVENTY_RUN_MODE;

  return {
    env: runMode === "build" ? "production" : "development",
    css: {
      input: `css/app.${appConfig.theme.color}.scss`,
      output: `/app.${appConfig.theme.color}.css`,
    },
  };
};
