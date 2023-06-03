const StyleDictionary = require("style-dictionary");
const palettes = require("./css/1-tokens/palettes.json");
const themes = require("./css/1-tokens/themes.json");
const fs = require("fs");

const outputDir = "./css/dist/";
!fs.existsSync(outputDir) && fs.mkdirSync(outputDir);

let styleDictionary = StyleDictionary.extend({
  format: {
    "scss/app-theme": function ({ dictionary }) {
      const core = dictionary.allTokens.filter(
        (token) => token.attributes.category !== "dark"
      );
      const dark = dictionary.allTokens.filter(
        (token) => token.attributes.category === "dark"
      );

      const regex = /^(dark-)/;

      return `
@use './../app.scss';
 
:root {
  ${core.map((t) => `--${t.name}: ${t.value};`).join("\n")}
}
    
body {
    &[data-theme="dark"] {
    color-scheme: dark;
    ${dark.map((t) => `--${t.name.replace(regex, "")}: ${t.value};`).join("\n")}
  }

  &[data-theme="system"] {
    @media (prefers-color-scheme: dark) {
      color-scheme: dark;
      ${dark
        .map((t) => `--${t.name.replace(regex, "")}: ${t.value};`)
        .join("\n")}
    }
  }
}
    `;
    },
  },
});

Object.entries(themes)
  .map(([name, theme]) => [
    name,
    {
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
    },
  ])
  .forEach(([name, theme]) => {
    const filePath = `./css/dist/base.${name}.json`;
    fs.writeFileSync(filePath, JSON.stringify(theme, null, 2));

    styleDictionary
      .extend({
        source: ["css/1-tokens/tokens.*.json", `css/dist/base.${name}.json`],
        platforms: {
          scss: {
            transformGroup: "scss",
            files: [
              {
                destination: `./css/dist/app.${name}.scss`,
                format: "scss/app-theme",
                filter: (token) => !token.original.private,
              },
            ],
          },
        },
      })
      .buildAllPlatforms();
  });
