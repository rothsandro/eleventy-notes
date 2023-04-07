const ValueParser = require("./../../core/value-parser");
const html = require("nanohtml");

module.exports = () => (data, options) => {
  return html`
    <ul>
      ${data.map((item) => createItem(item, options))}
    </ul>
  `;
};

function createItem(item, options = {}) {
  const titleProp = options.titleProp ?? "title";
  const urlProp = options.urlProp ?? "url";

  const title = ValueParser.getValueByPath(item, titleProp);
  const url = ValueParser.getValueByPath(item, urlProp);

  return url
    ? html`<li><a href="${url}">${title}</a></li>`
    : html`<li>${title}</li>`;
}
