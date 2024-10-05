import _colors from "@radix-ui/colors";

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

const base = {
  blue: getColor("blue"),
  mint: getColor("mint"),
  green: getColor("green"),
  orange: getColor("orange"),
  red: getColor("red"),
  purple: getColor("purple"),
  gray: getColor("gray"),
};

export const themes = {
  amber: {
    ...base,
    primary: getColor("amber"),
    neutral: getColor("sand"),
  },
  blue: {
    ...base,
    primary: getColor("blue"),
    neutral: getColor("slate"),
  },
  brown: {
    ...base,
    primary: getColor("brown"),
    neutral: getColor("sand"),
  },
  crimson: {
    ...base,
    primary: getColor("crimson"),
    neutral: getColor("mauve"),
  },
  cyan: {
    ...base,
    primary: getColor("cyan"),
    neutral: getColor("slate"),
  },
  grass: {
    ...base,
    primary: getColor("grass"),
    neutral: getColor("olive"),
  },
  green: {
    ...base,
    primary: getColor("green"),
    neutral: getColor("sage"),
  },
  indigo: {
    ...base,
    primary: getColor("indigo"),
    neutral: getColor("slate"),
  },
  iris: {
    ...base,
    primary: getColor("iris"),
    neutral: getColor("slate"),
  },
  jade: {
    ...base,
    primary: getColor("jade"),
    neutral: getColor("sage"),
  },
  lime: {
    ...base,
    primary: getColor("lime"),
    neutral: getColor("olive"),
  },
  mint: {
    ...base,
    primary: getColor("mint"),
    neutral: getColor("sage"),
  },
  orange: {
    ...base,
    primary: getColor("orange"),
    neutral: getColor("sand"),
  },
  pink: {
    ...base,
    primary: getColor("pink"),
    neutral: getColor("mauve"),
  },
  plum: {
    ...base,
    primary: getColor("plum"),
    neutral: getColor("mauve"),
  },
  purple: {
    ...base,
    primary: getColor("purple"),
    neutral: getColor("mauve"),
  },
  red: {
    ...base,
    primary: getColor("red"),
    neutral: getColor("mauve"),
  },
  ruby: {
    ...base,
    primary: getColor("ruby"),
    neutral: getColor("mauve"),
  },
  sky: {
    ...base,
    primary: getColor("sky"),
    neutral: getColor("slate"),
  },
  teal: {
    ...base,
    primary: getColor("teal"),
    neutral: getColor("sage"),
  },
  tomato: {
    ...base,
    primary: getColor("tomato"),
    neutral: getColor("mauve"),
  },
  violet: {
    ...base,
    primary: getColor("violet"),
    neutral: getColor("mauve"),
  },
  yellow: {
    ...base,
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
