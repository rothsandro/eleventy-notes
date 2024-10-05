import html from "nanohtml";
import raw from "nanohtml/raw.js";

export const copyCodeMarkdownPlugin = (md) => {
  md.renderer.rules.code_block = renderCode(md.renderer.rules.code_block);
  md.renderer.rules.fence = renderCode(md.renderer.rules.fence);

  function renderCode(originalRule) {
    return (...args) => {
      const [tokens, idx] = args;
      const content = tokens[idx].content;
      const originalContent = originalRule(...args);

      if (content.length === 0) return originalContent;

      return html`
        <div class="code-block">
          ${raw(originalContent)}
          <button
            title="Copy to clipboard"
            aria-label="Copy to clipboard"
            class="code-block__copy"
            x-cloak
            x-data="copyToClipboard()"
            x-bind="copyBtn"
            lang="en"
          >
            <svg x-show="!copied">
              <use xlink:href="#icon-copy"></use>
            </svg>
            <svg x-show="copied">
              <use xlink:href="#icon-check"></use>
            </svg>
          </button>
        </div>
      `;
    };
  }
};
