// @ts-check
import en from "./i18n/en.js";

/**
 * @typedef {typeof en} BaseTranslations;
 * @typedef {{ [TKey in keyof BaseTranslations]: BaseTranslations[TKey] |  (string & {})}} Translations
 * @typedef {{ lang: string; partial: true; translations: Partial<Translations>}
 *  | { lang: string; partial?: false; translations: Translations}} TranslationConfig
 */

/**
 * @param {TranslationConfig} config
 * @returns {TranslationConfig} The config
 */
export function defineTranslations(config) {
  validateKeys(config);
  return config;
}

/**
 * @param {TranslationConfig} config
 */
function validateKeys(config) {
  const base = Object.keys(en);
  const overrides = Object.keys(config.translations);

  overrides
    .filter((key) => !base.includes(key))
    .forEach((key) => console.error(`[Translation] Invalid key '${key}'`));

  if (config.partial !== true) {
    base
      .filter((key) => !overrides.includes(key))
      .forEach((key) => console.error(`[Translation] Missing key '${key}'`));
  }
}
