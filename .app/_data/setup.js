const appConfigFactory = require("./app");

module.exports = () => {
  const appConfig = appConfigFactory();

  return {
    css: {
      input: `css/app.${appConfig.theme.color}.scss`,
      output: `/app.${appConfig.theme.color}.css`,
    },
  };
};
