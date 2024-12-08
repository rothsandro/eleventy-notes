export const iconRefFilter = () =>
  function (iconName) {
    return `
      <svg width="1.25em" height="1.25em">
        <use xlink:href="#icon-${iconName}"></use>
      </svg>
    `;
  };
