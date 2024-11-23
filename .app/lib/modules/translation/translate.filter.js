import en from "../../../i18n/en.js";

export const translateFilter = async () => {
  const app = await import("../../../../app.mjs");
  const translations = app.translations
    ? { ...en, ...app.translations.translations }
    : en;

  return (key) => {
    if (!(key in translations)) {
      console.warn("Unknown translation key " + key);
      return key;
    }

    return translations[key];
  };
};
