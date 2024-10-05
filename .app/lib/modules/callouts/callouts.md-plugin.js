import { icons } from "feather-icons";
import { calloutTypes } from "./callout-types.js";

const chevronDown = icons["chevron-down"].toSvg({
  width: "1.125em",
  height: "1.125em",
});

const markers = Object.keys(calloutTypes);
const markerNames = markers.join("|");
const regex = new RegExp(
  `^\\[\\!(${markerNames})\\]([\\+-]?)( +[^\\n\\r]+)?`,
  "i"
);

export const calloutsMarkdownPlugin = (md) => {
  md.core.ruler.after("block", "callouts", block);
  md.renderer.rules.callout_open = renderCalloutOpen;
  md.renderer.rules.callout_title_open = renderTitleOpen;
  md.renderer.rules.callout_title_close = renderTitleClose;
  md.renderer.rules.callout_content_open = renderCalloutContentOpen;

  function block(state) {
    const tokens = state.tokens;

    for (let idx = 0; idx < tokens.length; idx++) {
      if (tokens[idx].type !== "blockquote_open") continue;

      const openIdx = idx;
      const openToken = tokens[idx];
      let { closeToken, closeIdx } = findBlockquoteCloseToken(tokens, idx);

      const currentTokens = tokens.slice(openIdx, closeIdx + 1);
      const calloutDef = parseCalloutDefinition(currentTokens);
      if (!calloutDef) continue;

      const { callout, inlineToken, remainingInlineContent, hasBody } =
        calloutDef;

      openToken.type = "callout_open";
      openToken.tag = callout.foldable ? "details" : "div";
      openToken.meta = callout;

      closeToken.type = "callout_close";
      closeToken.tag = openToken.tag;

      if (remainingInlineContent) {
        inlineToken.content = remainingInlineContent;
      } else {
        // Callout has no content, remove the inline token and wrapping paragraph
        tokens.splice(openIdx + 1, 3);
        closeIdx -= 3;
      }

      if (hasBody) {
        const [open, close] = createCalloutContentTokens(callout, state);
        tokens.splice(closeIdx, 0, close);
        tokens.splice(openIdx + 1, 0, open);
      }

      const titleTokens = createCalloutTitleTokens(callout, state);
      tokens.splice(openIdx + 1, 0, ...titleTokens);
    }
  }

  function findBlockquoteCloseToken(tokens, startIndex) {
    let nested = 0;

    for (let idx = startIndex + 1; idx < tokens.length; idx++) {
      if (tokens[idx].type === "blockquote_open") {
        nested++;
        continue;
      }

      if (tokens[idx].type === "blockquote_close") {
        if (nested === 0) {
          return { closeIdx: idx, closeToken: tokens[idx] };
        }

        nested--;
      }
    }

    throw new Error("Could not find matching blockquote close token");
  }

  function parseCalloutDefinition(blockquoteTokens) {
    const [blockquoteOpen, paragraphOpen, inline, ...rest] = blockquoteTokens;

    if (blockquoteOpen?.type !== "blockquote_open") return null;
    if (paragraphOpen?.type !== "paragraph_open") return null;
    if (inline?.type !== "inline") return null;

    const match = inline.content.match(regex);
    if (!match) return null;

    let [fullMatch, type, foldable, title] = match;

    const remainingInlineContent = inline.content
      .slice(fullMatch.length)
      .trimStart();
    const hasBody = !!remainingInlineContent || rest.length > 2;

    return {
      inlineToken: inline,
      remainingInlineContent,
      hasBody,
      callout: {
        type: type.toLowerCase(),
        foldable: hasBody && !!foldable,
        defaultOpen: hasBody && foldable === "+",
        title: title?.trim() || capitalize(type),
      },
    };
  }

  function createCalloutTitleTokens(callout, state) {
    const tag = callout.foldable ? "summary" : "div";

    const open = new state.Token("callout_title_open", tag, 1);
    open.meta = callout;

    const middle = new state.Token("inline", "", 0);
    middle.content = callout.title;
    middle.children = [];

    const close = new state.Token("callout_title_close", tag, -1);
    close.meta = callout;

    return [open, middle, close];
  }

  function createCalloutContentTokens(callout, state) {
    const open = new state.Token("callout_content_open", "div", 1);
    open.meta = callout;

    const close = new state.Token("callout_content_close", "div", -1);
    close.meta = callout;

    return [open, close];
  }

  function renderCalloutOpen(tokens, idx) {
    const { meta, tag } = tokens[idx];
    const config = calloutTypes[meta.type];
    const attrs = meta.foldable && meta.defaultOpen ? "open" : "";

    return `<${tag} class="callout" data-color="${config.color}" data-type="${config.type}" ${attrs}>`;
  }

  function renderTitleOpen(tokens, idx) {
    const { meta, tag } = tokens[idx];
    const config = calloutTypes[meta.type];

    return `<${tag} class="callout__title"><div class="callout__icon">${config.icon}</div><div>`;
  }

  function renderTitleClose(tokens, idx) {
    const { meta, tag } = tokens[idx];

    if (!meta.foldable) return `</div></${tag}>`;
    return `</div><div class="callout__foldable">${chevronDown}</div></${tag}>`;
  }

  function renderCalloutContentOpen() {
    return `<div class="callout__content article">`;
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};
