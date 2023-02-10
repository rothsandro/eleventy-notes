const { icons } = require("feather-icons");

module.exports = () =>
  function (iconName, attr) {
    const icon = icons[iconName];
    if (!icon) throw new Error(`Icon ${iconName} not found`);
    return icon.toSvg({ width: 18, height: 18, ...attr });
  };
