---
sort: 9
tags: [customization, configuration]
---

Eleventy Notes distinguishes between two types of languages: content language and UI language.

- **Content Language**: The language used in your notes, tags, custom properties, etc.
- **UI Language**: The language used in the user interface elements such as the search bar and theme switcher. This also includes invisible labels used for assistive technologies.

## Content language

The default content language is English. If you prefer to write your notes in another language, you can change the content language via the `lang` property:

```js
// /app.mjs
export default defineConfig({
  lang: "de",
});
```

## UI language

By default, Eleventy Notes supports English as the UI language. However, you can customize the translations or add support for other languages by providing a `translations` object.

### Changing language

You can change the UI language by providing your own translations. Create a named export `translations` in your existing `app.mjs` configuration file using the `defineTranslations()` function. You can find the default translations in `.app/i18n/en.js`.

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

If you want to customize specific texts while keeping English as the UI language, add a `partial` property:

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
