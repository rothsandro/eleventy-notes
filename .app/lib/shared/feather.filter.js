const { icons } = require("feather-icons");

module.exports = () =>
  function (iconName, attr) {
    const icon = icons[iconName];
    if (!icon) throw new Error(`Icon ${iconName} not found`);
    return icon.toSvg({ width: "1.125em", height: "1.125em", ...attr });
  };
