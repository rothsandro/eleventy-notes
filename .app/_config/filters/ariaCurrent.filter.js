module.exports = () =>
  function (url, page = this.page) {
    return url === page.url ? "aria-current=page" : "";
  };
