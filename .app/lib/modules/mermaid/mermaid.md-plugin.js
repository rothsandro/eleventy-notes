import { render } from "pele";

let diagramCount = 0;

export const mermaidMarkdownPlugin = (md) => {
  const originalRule = md.renderer.rules.fence;

  md.renderer.rules.fence = (...args) => {
    const [tokens, idx, , env] = args;
    const token = tokens[idx];

    if (token.info.trim() !== "mermaid") return originalRule(...args);

    try {
      const idPrefix = `mermaid-${++diagramCount}-`;
      const { svg } = render(token.content, { idPrefix });
      return `<div class="mermaid-diagram">${svg}</div>`;
    } catch (error) {
      console.warn(
        `[mermaid] Failed to render diagram in ${env.page?.inputPath}: ${error.message}`,
      );
      return originalRule(...args);
    }
  };
};
