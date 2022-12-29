const { parse } = require("node-html-parser");

module.exports = () => (content) => {
  const html = parse(content);
  const headings = html.querySelectorAll("h1, h2, h3, h4, h5, h6");
  const toc = headings.map((heading) => {
    heading.querySelectorAll("[aria-hidden=true]").forEach((el) => el.remove());

    const id = heading.attributes.id;
    const text = heading.innerText;
    const level = parseInt(heading.tagName.replace("H", ""), 10);

    return { id, text, level };
  });

  return toc;
};
