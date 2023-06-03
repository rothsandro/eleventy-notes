const StyleDictionary = require("style-dictionary");
const palettes = require("./css/1-tokens/palettes.json");
const themes = require("./css/1-tokens/themes.json");
const fs = require("fs");

const distDir = "./css/dist";
!fs.existsSync(distDir) && fs.mkdirSync(distDir);

let styleDictionary = StyleDictionary.extend({
  format: {
    "scss/app-theme": function ({ dictionary: { allTokens }, file }) {
      const coreTokens = allTokens.filter((t) => !/^dark-/.test(t.name));
      const darkTokens = allTokens.filter((t) => !coreTokens.includes(t));

      const getTokenValue = (token) => {
        const darkTokenName = `dark-${token.name}`;
        const darkToken = darkTokens.find((t) => t.name === darkTokenName);
        return darkToken
          ? `var(--light, ${token.value}) var(--dark, ${darkToken.value})`
          : token.value;
      };

      return [
        StyleDictionary.formatHelpers.fileHeader({ file }),
        "@use './../app.scss';",
        ":root {",
        ...coreTokens.map((t) => `  --${t.name}: ${getTokenValue(t)};`),
        "}",
      ].join("\n");
    },
  },
});

for (const [name, theme] of Object.entries(themes)) {
  const themeWithColors = createThemeWithPaletteColors(theme);
  const baseFilePath = saveBaseFile(name, themeWithColors);
  buildTokens(name, baseFilePath);
}

function createThemeWithPaletteColors(theme) {
  return {
    color: {
      onPrimary: { value: theme.onPrimary },
      primary: palettes[theme.primary],
      neutral: palettes[theme.neutral],
    },
    dark: {
      color: {
        primary: palettes[`${theme.primary}-dark`],
        neutral: palettes[`${theme.neutral}-dark`],
      },
    },
  };
}

function saveBaseFile(name, theme) {
  const filePath = `./${distDir}/base.${name}.json`;
  fs.writeFileSync(filePath, JSON.stringify(theme, null, 2));
  return filePath;
}

function buildTokens(name, baseFilePath) {
  styleDictionary
    .extend({
      source: ["css/1-tokens/tokens.*.json", baseFilePath],
      platforms: {
        scss: {
          transformGroup: "scss",
          files: [
            {
              destination: `./css/dist/app.${name}.scss`,
              format: "scss/app-theme",
              filter: (t) => !t.original.private,
            },
          ],
        },
      },
    })
    .buildAllPlatforms();
}
