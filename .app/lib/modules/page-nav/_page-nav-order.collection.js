import appData from "../../../_data/app.js";
import { notesModule } from "../notes/index.js";
import { dynamicContentModule } from "../dynamic-content/index.js";

export const pageNavOrderCollection = (eleventyConfig) => (collectionApi) => {
  const app = appData();

  if (app.pageNav.mode !== "on") return [];

  const notes = notesModule.notesCollection(eleventyConfig)(collectionApi);
  const items = app.sidebar.sections
    .flatMap((section) => section.groups)
    .flatMap((group) => {
      const runner = new dynamicContentModule.QueryRunner(notes, group.query);
      return runner.run(notes);
    })
    .flatMap(flatTreeItem);

  return items;
};

const flatTreeItem = (item) => [
  item,
  ...(Array.isArray(item.children) ? item.children.flatMap(flatTreeItem) : []),
];
