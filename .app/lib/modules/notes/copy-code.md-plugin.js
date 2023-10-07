const html = require("nanohtml");
const raw = require("nanohtml/raw");

module.exports = (md) => {
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
            data-clipboard-text="${content}"
          >
            <svg width="1em" height="1em" data-if-copied="false">
              <use xlink:href="#icon-clipboard"></use>
            </svg>
            <svg width="1em" height="1em" data-if-copied="true">
              <use xlink:href="#icon-check"></use>
            </svg>
          </button>
        </div>
      `;
    };
  }
};
