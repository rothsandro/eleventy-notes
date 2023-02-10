module.exports = () =>
  function (iconName) {
    return `
      <svg width="18" height="18">
        <use xlink:href="#icon-${iconName}"></use>
      </svg>
    `;
  };
