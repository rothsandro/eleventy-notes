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
    { ...attrs, width: "1.125em", height: "1.125em", ...customAttrs },
    children
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
