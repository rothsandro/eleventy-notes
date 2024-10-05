import fs from "fs";

export const calloutTypes = {
  ...define("note", "blue", "note"),
  ...define("abstract", "mint", "notes", ["summary", "tldr"]),
  ...define("info", "blue", "info-circle"),
  ...define("todo", "blue", "circle-check"),
  ...define("tip", "mint", "flame", ["hint", "important"]),
  ...define("success", "green", "check", ["check", "done"]),
  ...define("question", "orange", "help-circle", ["help", "faq"]),
  ...define("warning", "orange", "alert-triangle", ["caution", "attention"]),
  ...define("failure", "red", "x", ["fail", "missing"]),
  ...define("danger", "red", "alert-octagon", ["error"]),
  ...define("bug", "red", "bug"),
  ...define("example", "purple", "list"),
  ...define("quote", "gray", "quote", ["cite"]),
};

function define(name, color, icon, aliases = [], type = name) {
  return Object.assign(
    { [name]: { name, type, color, icon: getIcon(icon) } },
    ...aliases.map((alias) => define(alias, color, icon, [], type))
  );
}

function getIcon(icon) {
  const path = import.meta.resolve(`@tabler/icons/outline/${icon}.svg`);
  return fs.readFileSync(new URL(path), "utf8");
}
