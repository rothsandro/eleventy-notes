import { sharedModule } from "./../../shared/index.js";
import { wikilinksModule } from "../wikilinks/index.js";

const { Wikilink } = wikilinksModule;
const { ValueParser } = sharedModule;

/**
 * Creates a filter function that resolves custom properties.
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 * @returns The filter function.
 */
export const resolveCustomPropsFilter = (eleventyConfig) => {
  /**
   * Filter function to parse the custom properties of a note.
   * @param {Record<string, any>[]} properties The list of properties to parse.
   * @returns The parsed list of properties.
   */
  return function (properties) {
    const wikilink = new Wikilink(
      this.ctx.collections._notes,
      this.ctx.app.wikilinks,
      eleventyConfig.getFilter("slugifyPath"),
      eleventyConfig.getFilter("slugify")
    );

    function nameToDisplayName(name) {
      return name
        .replace(/([A-Z])/g, " $1")
        .replace(/[-_](.)/g, (_, c) => ` ${c.toUpperCase()}`)
        .replace(/^./, (c) => c.toUpperCase())
        .trim();
    }

    function findMatchingNames(data, pattern) {
      const keys = Object.keys(data);
      if (!pattern) return keys;

      const regex = new RegExp(pattern, "i");
      return keys.filter((key) => regex.test(key));
    }

    function parseValue(value, options) {
      if (typeof value === "string" && Wikilink.REGEX.test(value)) {
        const [, path, , text] = value.match(Wikilink.REGEX);
        const link = wikilink.process(path, text);
        return [{ type: "wikilink", ...link }];
      }

      if (typeof value === "number") {
        const intl = new Intl.NumberFormat(
          options?.number?.locale,
          options?.number?.format
        );
        return [{ type: "number", formattedValue: intl.format(value) }];
      }

      if (typeof value === "boolean") {
        return [{ type: "boolean", formattedValue: value ? "Yes" : "No" }];
      }

      if (value instanceof Date) {
        const intl = new Intl.DateTimeFormat(
          options?.date?.locale,
          options?.date?.format
        );
        return [{ type: "date", value, formattedValue: intl.format(value) }];
      }

      if (Array.isArray(value)) {
        return value.flatMap((x) => parseValue(x, options));
      }

      return [{ type: "string", value }];
    }

    return properties.flatMap((property) => {
      const rootPath = property.path ?? "";
      const root = ValueParser.getValueByPath(this.ctx, rootPath) ?? {};
      const names = findMatchingNames(root, property.name);
      return names.flatMap((name) => {
        const value = ValueParser.getValueByPath(root, name);
        if (value === undefined || value === null) return [];

        return [
          {
            name,
            label: property.label || nameToDisplayName(name),
            values: parseValue(value, property.options),
          },
        ];
      });
    });
  };
};
