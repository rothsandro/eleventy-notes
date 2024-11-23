// @ts-check
import en from "./i18n/en.js";

/**
 * @typedef {typeof en} BaseTranslations;
 * @typedef {{ [TKey in keyof BaseTranslations]: BaseTranslations[TKey] |  (string & {})}} Translations
 * @typedef {{ lang: string; translations: Partial<Translations>}} TranslationConfig
 */

/**
 * @param {TranslationConfig} config
 * @returns {TranslationConfig} The config
 */
export function defineTranslations(config) {
  return config;
}
