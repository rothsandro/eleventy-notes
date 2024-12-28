export const iconRefFilter = () =>
  function (iconName, attrs = {}) {
    const mergedAttrs = { width: "1.125em", height: "1.125em", ...attrs };
    const htmlAttr = Object.entries(mergedAttrs)
      .filter(([, value]) => value)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");

    return `
      <svg ${htmlAttr}>
        <use xlink:href="#icon-${iconName}"></use>
      </svg>
    `;
  };
