/**
 * Creates the SVG code for an icon.
 *
 * @param {import('lucide').IconNode} icon
 * @param {Record<string, string | number>} customAttrs
 * @returns The SVG of the icon
 */
export function createIcon(icon, customAttrs = {}) {
  const [tag, attrs, children] = icon;

  return createElement(
    tag,
    { ...attrs, width: "1.25em", height: "1.25em", ...customAttrs },
    children
  );
}

function createElement(tag, attrs, children = []) {
  let element = `<${tag}`;

  Object.keys(attrs).forEach((name) => {
    element += ` ${name}="${String(attrs[name])}"`;
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
