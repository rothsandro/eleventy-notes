export const generateTokens = (theme) => ({
  "font-family-default":
    'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  "font-family-mono":
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',

  "font-size-xs": "0.75rem",
  "font-size-sm": "0.875rem",

  // "https://utopia.fyi/type/calculator?c=320,16,1.125,1240,18,1.125,8,2,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l&g=s,l,xl,12",
  "font-size-fluid-x2": "clamp(0.79rem, calc(0.76rem + 0.17vw), 0.89rem)",
  "font-size-fluid-x1": "clamp(0.89rem, calc(0.85rem + 0.19vw), 1rem)",
  "font-size-fluid-0": "clamp(1rem, calc(0.96rem + 0.22vw), 1.13rem)",
  "font-size-fluid-1": "clamp(1.13rem, calc(1.08rem + 0.24vw), 1.27rem)",
  "font-size-fluid-2": "clamp(1.27rem, calc(1.21rem + 0.28vw), 1.42rem)",
  "font-size-fluid-3": "clamp(1.42rem, calc(1.36rem + 0.31vw), 1.6rem)",
  "font-size-fluid-4": "clamp(1.6rem, calc(1.53rem + 0.35vw), 1.8rem)",
  "font-size-fluid-5": "clamp(1.8rem, calc(1.72rem + 0.39vw), 2.03rem)",
  "font-size-fluid-6": "clamp(2.03rem, calc(1.94rem + 0.44vw), 2.28rem)",
  "font-size-fluid-7": "clamp(2.28rem, calc(2.18rem + 0.5vw), 2.57rem)",
  "font-size-fluid-8": "clamp(2.57rem, calc(2.45rem + 0.56vw), 2.89rem)",

  "font-weight-normal": "400",
  "font-weight-medium": "500",
  "font-weight-bold": "700",

  "rounded-sm": "2px",
  "rounded-md": "4px",
  "rounded-lg": "8px",
  "rounded-full": "9999px",

  "shadow-xs": "0 1px 3px rgba(100, 100, 100, 0.09)",
  "shadow-sm": "0 1px 5px rgba(100, 100, 100, 0.05)",
  "shadow-md":
    "0 0 0 1px var(--color-neutral-border), 0 1px 5px rgba(100, 100, 100, 0.05), 0 0 40px rgba(100, 100, 100, 0.015)",
  "shadow-lg":
    "0 0 0 1px var(--color-neutral-border), 0 5px 17px rgba(100, 100, 100, 0.14)",
  "shadow-xl":
    "0 4px 12px rgba(100, 100, 100, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)",
  "shadow-xxl":
    "0 24px 38px 3px rgba(100, 100, 100, 0.16), 0 9px 86px 8px rgba(100, 100, 100, 0.1), 0 11px 15px -7px rgba(100, 100, 100, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)",

  "space-0": "0px",
  "space-1": "4px",
  "space-2": "8px",
  "space-3": "12px",
  "space-4": "16px",
  "space-5": "24px",
  "space-6": "36px",
  "space-7": "48px",
  "space-8": "64px",

  "color-backdrop": themeValue("rgba(0, 0, 0, 0.25)", "rgba(0, 0, 0, 0.5)"),
  "color-background": themeValue("#fff", theme.neutral.dark[1]),
  "color-surface": themeValue("#fff", theme.neutral.dark[1]),
  "color-primary-mark": colorStepAlpha(theme.primary, 5),
  "color-primary-bg-subtle": colorStep(theme.primary, 2),
  "color-primary-bg": colorStep(theme.primary, 3),
  "color-primary-bg-hover": colorStep(theme.primary, 4),
  "color-primary-bg-active": colorStep(theme.primary, 5),
  "color-primary-line-weak": colorStep(theme.primary, 5),
  "color-primary-line": colorStep(theme.primary, 6),
  "color-primary-border": colorStep(theme.primary, 7),
  "color-primary-border-hover": colorStep(theme.primary, 8),
  "color-primary-focus-ring": colorStep(theme.primary, 8),
  "color-primary-bg-solid": colorStep(theme.primary, 9),
  "color-primary-bg-solid-hover": colorStep(theme.primary, 10),
  "color-primary-text": colorStep(theme.primary, 11),
  "color-primary-text-contrast": colorStep(theme.primary, 12),
  "color-primary-placeholder": colorStep(theme.primary, 9),

  "color-neutral-bg-subtle": colorStep(theme.neutral, 2),
  "color-neutral-bg": colorStep(theme.neutral, 3),
  "color-neutral-bg-hover": colorStep(theme.neutral, 4),
  "color-neutral-bg-active": colorStep(theme.neutral, 5),
  "color-neutral-line-weak": colorStep(theme.neutral, 5),
  "color-neutral-line": colorStep(theme.neutral, 6),
  "color-neutral-border": colorStep(theme.neutral, 7),
  "color-neutral-border-hover": colorStep(theme.neutral, 8),
  "color-neutral-focus-ring": colorStep(theme.neutral, 8),
  "color-neutral-bg-solid": colorStep(theme.neutral, 9),
  "color-neutral-bg-solid-hover": colorStep(theme.neutral, 10),
  "color-neutral-text": colorStep(theme.neutral, 11),
  "color-neutral-text-contrast": colorStep(theme.neutral, 12),
  "color-neutral-placeholder": colorStep(theme.neutral, 9),

  "callout-blue-text": colorStepAlpha(theme.blue, 11),
  "callout-blue-bg": colorStepAlpha(theme.blue, 3),
  "callout-mint-text": colorStepAlpha(theme.mint, 11),
  "callout-mint-bg": colorStepAlpha(theme.mint, 3),
  "callout-green-text": colorStepAlpha(theme.green, 11),
  "callout-green-bg": colorStepAlpha(theme.green, 3),
  "callout-orange-text": colorStepAlpha(theme.orange, 11),
  "callout-orange-bg": colorStepAlpha(theme.orange, 3),
  "callout-red-text": colorStepAlpha(theme.red, 11),
  "callout-red-bg": colorStepAlpha(theme.red, 3),
  "callout-purple-text": colorStepAlpha(theme.purple, 11),
  "callout-purple-bg": colorStepAlpha(theme.purple, 3),
  "callout-gray-text": colorStepAlpha(theme.gray, 11),
  "callout-gray-bg": colorStepAlpha(theme.gray, 2),
});

function colorStep(color, step) {
  return themeValue(color.light[step], color.dark[step]);
}

function colorStepAlpha(color, step) {
  return themeValue(color.lightA[step], color.darkA[step]);
}

function themeValue(light, dark) {
  return `var(--light, ${light}) var(--dark, ${dark})`;
}
