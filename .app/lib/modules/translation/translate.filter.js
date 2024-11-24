import en from "../../../i18n/en.js";

export const translateFilter = async () => {
  const app = await import("../../../../app.mjs");
  const translations = app.translations
    ? { ...en, ...app.translations.translations }
    : en;

  return (key, params) => {
    if (!(key in translations)) {
      console.warn("Unknown translation key " + key);
      return key;
    }

    const value = translations[key];
    if (!params) return value;

    const placeholders = Object.keys(params);
    const pattern = new RegExp(`{{\\s*(${placeholders.join("|")})\\s*}}`, "gi");

    return value.replace(pattern, (_, match) => params[match]);
  };
};
