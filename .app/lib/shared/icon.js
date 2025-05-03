/**
 * Creates the SVG code for an icon.
 *
 * @param {import('lucide').IconNode} icon
 * @param {Record<string, string | number>} customAttrs
 * @returns The SVG of the icon
 */
export function createIcon(icon, customAttrs = {}) {
  return createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1.125em",
      height: "1.125em",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 2,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": "true",
      ...customAttrs,
    },
    icon
  );
}

function createElement(tag, attrs, children = []) {
  let element = `<${tag}`;

  Object.entries(attrs)
    .filter(([, value]) => value !== undefined && value !== null)
    .forEach(([name, value]) => {
      element += ` ${name}="${String(value)}"`;
    });

  element += ">";

  if (children.length) {
    children.forEach((child) => {
      const childElement = createElement(...child);
      element += childElement;
    });
  }

  element += `</${tag}>`;

  return element;
}
