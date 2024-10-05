import { parse } from "node-html-parser";

export const tocFilter = () => (content) => {
  const html = parse(content);
  const headings = html.querySelectorAll("h1, h2, h3, h4");
  const toc = headings.map((heading) => {
    heading.querySelectorAll("[aria-hidden=true]").forEach((el) => el.remove());

    const id = heading.attributes.id;
    const text = heading.innerText;
    const level = parseInt(heading.tagName.replace("H", ""), 10);

    return { id, text, level };
  });

  // The page title already uses an h1, so it's recommended
  // to start with h2 in the content. If the first heading
  // is an h2 or higher, we'll adjust the levels to start with level 1
  // to avoid unnecessary indentation in the TOC.
  const minLevel = Math.min(...toc.map((item) => item.level));
  if (minLevel > 1) toc.forEach((item) => (item.level -= minLevel - 1));

  return toc;
};
