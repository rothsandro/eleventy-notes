export const uiLangShortcode = async () => {
  const app = await import("../../../../app.mjs");
  const lang = app.translations?.lang ?? "en";
  return () => lang;
};
