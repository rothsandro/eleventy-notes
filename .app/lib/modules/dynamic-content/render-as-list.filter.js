const ValueParser = require("../../shared").ValueParser;
const html = require("nanohtml");

/**
 * @typedef {object} Options
 * @property {string} [titleProp] The name of the title property.
 * @property {string} [urlProp] The name of the url property.
 * @property {string} [childrenProp] The name of the children property.
 */

/**
 * Creates the HTML for a list of items.
 * @param {any[]} data The list of items to create the HTML for.
 * @param {Options} options The options for the list.
 * @returns The HTML code
 */
module.exports = () => (data, options) => {
  return html`<ul data-link-list>
    ${data.map((item) => createItem(item, options))}
  </ul>`;
};

/**
 * Creates the HTML for a single item.
 * @param {*} item
 * @param {Options} options
 * @returns The HTML code
 */
function createItem(item, options = {}) {
  const titleProp = options.titleProp ?? "title";
  const urlProp = options.urlProp ?? "url";
  const childrenProp = options.childrenProp ?? "children";

  const title = ValueParser.getValueByPath(item, titleProp);
  const url = ValueParser.getValueByPath(item, urlProp);
  const children = ValueParser.getValueByPath(item, childrenProp);
  const content = url ? html`<a href="${url}">${title}</a>` : html`${title}`;
  const childList = createChildList(children, options);

  return html`<li>${content}${childList}</li>`;
}

function createChildList(children, options) {
  if (!Array.isArray(children) || children.length === 0) return null;

  return html`<ul>
    ${children.map((item) => createItem(item, options))}
  </ul>`;
}
