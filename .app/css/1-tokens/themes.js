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
    primary: { light: colors.amber, dark: colors.amberDark },
    neutral: { light: colors.sand, dark: colors.sandDark },
  },
  blue: {
    primary: { light: colors.blue, dark: colors.blueDark },
    neutral: { light: colors.slate, dark: colors.slateDark },
  },
  brown: {
    primary: { light: colors.brown, dark: colors.brownDark },
    neutral: { light: colors.sand, dark: colors.sandDark },
  },
  crimson: {
    primary: { light: colors.crimson, dark: colors.crimsonDark },
    neutral: { light: colors.mauve, dark: colors.mauveDark },
  },
  cyan: {
    primary: { light: colors.cyan, dark: colors.cyanDark },
    neutral: { light: colors.slate, dark: colors.slateDark },
  },
  grass: {
    primary: { light: colors.grass, dark: colors.grassDark },
    neutral: { light: colors.olive, dark: colors.oliveDark },
  },
  green: {
    primary: { light: colors.green, dark: colors.greenDark },
    neutral: { light: colors.sage, dark: colors.sageDark },
  },
  indigo: {
    primary: { light: colors.indigo, dark: colors.indigoDark },
    neutral: { light: colors.slate, dark: colors.slateDark },
  },
  lime: {
    primary: { light: colors.lime, dark: colors.limeDark },
    neutral: { light: colors.olive, dark: colors.oliveDark },
  },
  mint: {
    primary: { light: colors.mint, dark: colors.mintDark },
    neutral: { light: colors.sage, dark: colors.sageDark },
  },
  orange: {
    primary: { light: colors.orange, dark: colors.orangeDark },
    neutral: { light: colors.sand, dark: colors.sandDark },
  },
  pink: {
    primary: { light: colors.pink, dark: colors.pinkDark },
    neutral: { light: colors.mauve, dark: colors.mauveDark },
  },
  plum: {
    primary: { light: colors.plum, dark: colors.plumDark },
    neutral: { light: colors.mauve, dark: colors.mauveDark },
  },
  purple: {
    primary: { light: colors.purple, dark: colors.purpleDark },
    neutral: { light: colors.mauve, dark: colors.mauveDark },
  },
  red: {
    primary: { light: colors.red, dark: colors.redDark },
    neutral: { light: colors.mauve, dark: colors.mauveDark },
  },
  sky: {
    primary: { light: colors.sky, dark: colors.skyDark },
    neutral: { light: colors.slate, dark: colors.slateDark },
  },
  teal: {
    primary: { light: colors.teal, dark: colors.tealDark },
    neutral: { light: colors.sage, dark: colors.sageDark },
  },
  tomato: {
    primary: { light: colors.tomato, dark: colors.tomatoDark },
    neutral: { light: colors.mauve, dark: colors.mauveDark },
  },
  violet: {
    primary: { light: colors.violet, dark: colors.violetDark },
    neutral: { light: colors.mauve, dark: colors.mauveDark },
  },
  yellow: {
    primary: { light: colors.yellow, dark: colors.yellowDark },
    neutral: { light: colors.sand, dark: colors.sandDark },
  },
};
