import {
  StickyNote,
  Info,
  ScrollText,
  CircleCheck,
  Flame,
  Check,
  HelpCircle,
  AlertTriangle,
  X,
  AlertOctagon,
  Bug,
  List,
  Quote,
} from "lucide";
import { sharedModule } from "./../../shared/index.js";

export const calloutTypes = {
  ...define("note", "blue", StickyNote),
  ...define("abstract", "mint", ScrollText, ["summary", "tldr"]),
  ...define("info", "blue", Info),
  ...define("todo", "blue", CircleCheck),
  ...define("tip", "mint", Flame, ["hint", "important"]),
  ...define("success", "green", Check, ["check", "done"]),
  ...define("question", "orange", HelpCircle, ["help", "faq"]),
  ...define("warning", "orange", AlertTriangle, ["caution", "attention"]),
  ...define("failure", "red", X, ["fail", "missing"]),
  ...define("danger", "red", AlertOctagon, ["error"]),
  ...define("bug", "red", Bug),
  ...define("example", "purple", List),
  ...define("quote", "gray", Quote, ["cite"]),
};

function define(name, color, icon, aliases = [], type = name) {
  return Object.assign(
    { [name]: { name, type, color, icon: sharedModule.createIcon(icon) } },
    ...aliases.map((alias) => define(alias, color, icon, [], type))
  );
}
