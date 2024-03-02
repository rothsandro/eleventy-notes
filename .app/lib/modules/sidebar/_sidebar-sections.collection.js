const appData = require("../../../_data/app");
const notesModule = require("../notes/");
const dynamicContentModule = require("../dynamic-content");

module.exports = (eleventyConfig) => (collectionApi) => {
  let counter = 0;
  const getId = () => counter++;

  const app = appData();
  const notes = notesModule.notesCollection(eleventyConfig)(collectionApi);

  const sections = app.sidebar.sections.flatMap((section) => {
    const groups = section.groups.flatMap((group) => {
      const runner = new dynamicContentModule.QueryRunner(notes, group.query);
      const filteredNotes = runner.run(notes);

      if (!filteredNotes.length) return [];

      return [
        {
          id: getId(),
          label: group.label,
          expanded: group.expanded ?? true,
          tree: filteredNotes,
        },
      ];
    });

    if (!groups.length) return [];

    return [
      {
        id: getId(),
        label: section.label,
        groups,
      },
    ];
  });

  return sections;
};
