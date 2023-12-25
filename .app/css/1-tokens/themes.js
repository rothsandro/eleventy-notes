const _colors = require("@radix-ui/colors");

/**
 * @type {Record<keyof typeof _colors, string[]>}
 */
const colors = Object.fromEntries(
  Object.entries(_colors).map(([colorName, steps]) => [
    colorName,
    // Steps are a map of colors names, like { gray1: "..." }
    // Turn them into an array [, gray1, gray2, ...] with the first item empty
    // to make the index match the step number.
    [, ...Object.values(steps)],
  ])
);

module.exports = {
  amber: {
    primary: getColor("amber"),
    neutral: getColor("sand"),
  },
  blue: {
    primary: getColor("blue"),
    neutral: getColor("slate"),
  },
  brown: {
    primary: getColor("brown"),
    neutral: getColor("sand"),
  },
  crimson: {
    primary: getColor("crimson"),
    neutral: getColor("mauve"),
  },
  cyan: {
    primary: getColor("cyan"),
    neutral: getColor("slate"),
  },
  grass: {
    primary: getColor("grass"),
    neutral: getColor("olive"),
  },
  green: {
    primary: getColor("green"),
    neutral: getColor("sage"),
  },
  indigo: {
    primary: getColor("indigo"),
    neutral: getColor("slate"),
  },
  iris: {
    primary: getColor("iris"),
    neutral: getColor("slate"),
  },
  jade: {
    primary: getColor("jade"),
    neutral: getColor("sage"),
  },
  lime: {
    primary: getColor("lime"),
    neutral: getColor("olive"),
  },
  mint: {
    primary: getColor("mint"),
    neutral: getColor("sage"),
  },
  orange: {
    primary: getColor("orange"),
    neutral: getColor("sand"),
  },
  pink: {
    primary: getColor("pink"),
    neutral: getColor("mauve"),
  },
  plum: {
    primary: getColor("plum"),
    neutral: getColor("mauve"),
  },
  purple: {
    primary: getColor("purple"),
    neutral: getColor("mauve"),
  },
  red: {
    primary: getColor("red"),
    neutral: getColor("mauve"),
  },
  ruby: {
    primary: getColor("ruby"),
    neutral: getColor("mauve"),
  },
  sky: {
    primary: getColor("sky"),
    neutral: getColor("slate"),
  },
  teal: {
    primary: getColor("teal"),
    neutral: getColor("sage"),
  },
  tomato: {
    primary: getColor("tomato"),
    neutral: getColor("mauve"),
  },
  violet: {
    primary: getColor("violet"),
    neutral: getColor("mauve"),
  },
  yellow: {
    primary: getColor("yellow"),
    neutral: getColor("sand"),
  },
};

function getColor(name) {
  return {
    light: colors[name],
    lightA: colors[`${name}A`],
    dark: colors[`${name}Dark`],
    darkA: colors[`${name}DarkA`],
  };
}
