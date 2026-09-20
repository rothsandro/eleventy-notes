const highlightMarker = "=";

const highlightColors = {
  "🔴": "red",
  "🟠": "orange",
  "🟡": "yellow",
  "🟢": "green",
  "🔵": "blue",
  "🟣": "purple",
};

export const highlightMarkdownPlugin = (md) => {
  md.inline.ruler.before("emphasis", "highlight", tokenize);
  md.inline.ruler2.before("emphasis", "highlight", postProcess);
};

function tokenize(state, silent) {
  if (silent) return false;
  if (state.src[state.pos] !== highlightMarker) return false;

  const canSplitWord = true;
  const scanned = state.scanDelims(state.pos, canSplitWord);
  let len = scanned.length;

  if (len < 2) return false;

  if (len % 2) {
    const token = state.push("text", "", 0);
    token.content = "=";
    len--;
  }

  for (let idx = 0; idx < len; idx += 2) {
    const token = state.push("text", "", 0);
    token.content = "==";

    state.delimiters.push({
      marker: highlightMarker,
      length: 0,
      token: state.tokens.length - 1,
      end: -1,
      open: scanned.can_open,
      close: scanned.can_close,
    });
  }

  state.pos += scanned.length;

  return true;
}

function postProcess(state) {
  postProcessDelims(state, state.delimiters);

  for (const meta of state.tokens_meta) {
    if (meta?.delimiters) {
      postProcessDelims(state, meta.delimiters);
    }
  }
}

function postProcessDelims(state, delimiters) {
  const strayMarkerIndexes = [];

  for (const startDelim of delimiters) {
    if (startDelim.marker !== highlightMarker) continue;
    if (startDelim.end === -1) continue;

    const openToken = state.tokens[startDelim.token];
    openToken.type = "mark_open";
    openToken.tag = "mark";
    openToken.nesting = 1;
    openToken.markup = "==";
    openToken.content = "";

    const endDelimiter = delimiters[startDelim.end];
    const closeToken = state.tokens[endDelimiter.token];
    closeToken.type = "mark_close";
    closeToken.tag = "mark";
    closeToken.nesting = -1;
    closeToken.markup = "==";
    closeToken.content = "";

    applyColor(state, startDelim, openToken);

    const beforeCloseIdx = endDelimiter.token - 1;
    const beforeCloseToken = state.tokens[beforeCloseIdx];
    if (beforeCloseToken.type === "text" && beforeCloseToken.content === "=") {
      strayMarkerIndexes.push(beforeCloseIdx);
    }
  }

  // `tokenize` puts the extra `=` of an odd run first (`===` -> `=` + `==`).
  // For a closing run that leaves it inside the highlight, so move it behind the closing tags.
  // Swapping with the last closing tag is enough since they're all identical.
  for (const strayIdx of strayMarkerIndexes) {
    let lastCloseIdx = strayIdx + 1;

    while (state.tokens[lastCloseIdx + 1]?.type === "mark_close") {
      lastCloseIdx++;
    }

    [state.tokens[strayIdx], state.tokens[lastCloseIdx]] = [
      state.tokens[lastCloseIdx],
      state.tokens[strayIdx],
    ];
  }
}

function applyColor(state, startDelim, openToken) {
  const contentToken = state.tokens[startDelim.token + 1];
  if (contentToken?.type !== "text") return;

  const emoji = [...contentToken.content][0];
  const color = highlightColors[emoji];
  if (!color) return;

  contentToken.content = contentToken.content.slice(emoji.length);
  openToken.attrSet("data-color", color);
}
