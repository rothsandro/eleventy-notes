export const ariaCurrentFilter = (_config) =>
  function (url, page = this.page) {
    return url === page.url ? "aria-current=page" : "";
  };
