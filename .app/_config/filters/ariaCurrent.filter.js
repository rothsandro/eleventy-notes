module.exports = () =>
  function (url) {
    return url === this.page.url ? "aria-current=page" : "";
  };
