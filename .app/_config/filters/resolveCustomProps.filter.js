const ValueParser = require("../../core/value-parser");

module.exports = () =>
  function (properties) {
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
            displayValues: getDisplayValues(value, property.formatOptions),
            value,
          },
        ];
      });
    });
  };

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

function getDisplayValues(value, options) {
  if (typeof value === "number") {
    const intl = new Intl.NumberFormat(
      options?.numberLocale,
      options?.numberFormat
    );
    return [intl.format(value)];
  }

  if (typeof value === "boolean") {
    return value ? ["Yes"] : ["No"];
  }

  if (value instanceof Date) {
    const intl = new Intl.DateTimeFormat(
      options?.dateLocale,
      options?.dateFormat
    );
    return [intl.format(value)];
  }

  if (Array.isArray(value)) {
    return value.flatMap((x) => getDisplayValues(x, options));
  }

  return [value];
}
