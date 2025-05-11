---
sort: 6
tags: [feature]
---

Eleventy Notes distinguishes between two types of languages: content language and UI language.

- **Content Language**: This is the language used in your notes, tags, custom properties, etc.
- **UI Language**: This is the language used in the user interface elements such as the search bar and theme switcher. This also includes invisible labels used for assistive technologies.

## Content Language

The default content language is English. If you prefer to write your notes in another language, you can change the content language in the configuration file via the `lang` property. Refer to the [[Configuration file]] for detailed instructions on how to set up the configuration file.

```js
// /app.mjs
export default defineConfig({
  lang: "de",
  // ... (other configuration)
});
```

## UI Language

By default, Eleventy Notes supports English as the UI language. However, you can customize the translations or add support for other languages by providing a `translations` object in your configuration file.

### Changing Language

You can change the UI language of Eleventy Notes by providing your own translations. To do this, open your existing `app.mjs` configuration file, create a named export `translations`, and use the provided `defineTranslations()` function. You can find the default translations in `.app/i18n/en.js`.

```js
// /app.mjs
import { defineTranslations } from "./.app/app-translations.js";

export const translations = defineTranslations({
  lang: "de",
  translations: {
    "search.input.placeholder": "Suchen...",
    // ... (all other translations)
  },
});
```

> [!TIP] Autocompletion
> For an improved developer experience, consider using an editor like [VS Code](https://code.visualstudio.com/). Adding `// @ts-check` at the top of your configuration file will enable autocompletion for translation keys and values.

### Customizing texts

If you want to customize specific texts while keeping English as the UI language, you can do so by defining the translations as described above and adding a `partial` property.

```js
// /app.mjs
import { defineTranslations } from "./.app/app-translations.js";

export const translations = defineTranslations({
  lang: "en",
  partial: true,
  translations: {
    "search.popover.placeholder": "Search for lessons by title and content",
  },
});
```
