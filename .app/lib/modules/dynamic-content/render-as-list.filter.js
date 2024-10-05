import { sharedModule } from "../../shared/index.js";
import html from "nanohtml";

const { ValueParser } = sharedModule;

/**
 * @typedef {object} Options
 * @property {string | string[]} [titleProp] The name of the title property.
 * @property {string} [urlProp] The name of the url property.
 * @property {string} [childrenProp] The name of the children property.
 */

/**
 * Creates the HTML for a list of items.
 * @param {any[]} data The list of items to create the HTML for.
 * @param {Options} options The options for the list.
 * @returns The HTML code
 */
export const renderAsListFilter = () => (data, options) => {
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
  const titleProps = valueAsArray(options.titleProp) ?? ["title", "label"];
  const urlProp = options.urlProp ?? "url";
  const childrenProp = options.childrenProp ?? "children";

  const title = firstMatch(titleProps, (path) =>
    ValueParser.getValueByPath(item, path)
  );
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

function firstMatch(items, matcher, fallback = "") {
  for (const item of items) {
    const value = matcher(item);
    if (value) return value;
  }

  return fallback;
}

/**
 * Transform the value to an array.
 * @param {string | string[] | undefined} value The single value or array.
 * @returns An array with the value.
 */
function valueAsArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") return [value];
  return null;
}
