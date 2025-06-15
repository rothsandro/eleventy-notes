import colors from "@radix-ui/colors";
import fs from "fs";

const flatScssMap = `// DON'T EDIT THIS FILE DIRECTLY!
// Run "colors:generate" to update this file
// prettier-ignore
$values: (${Object.entries(colors)
  .flatMap(([name, colorValueMap]) =>
    Object.entries(colorValueMap).map(([, value], idx) => {
      return [`${name}${idx + 1}`, value];
    })
  )
  .map(([name, value]) => `${name}: ${value}`)
  .join(", ")});
`;

fs.writeFileSync(`./css/1-tokens/colors.generated.scss`, flatScssMap);
