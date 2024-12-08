import * as icons from "lucide";
import { createIcon } from "./icon.js";

export const iconFilter = () =>
  function (iconName, attr) {
    iconName = kebabCaseToPascalCase(iconName);

    const icon = icons[iconName];
    if (!icon) throw new Error(`Icon ${iconName} not found`);
    return createIcon(icon, attr);
  };

function kebabCaseToPascalCase(str) {
  return str.replaceAll(/(?:^|-)([a-z0-9])/g, (_, c) => c.toUpperCase());
}
