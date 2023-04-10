const appData = require("../../_data/app");
const notesCollection = require("./_notes.collection");

module.exports = (eleventyConfig) => (collectionApi) => {
  const slugify = eleventyConfig.getFilter("slugify");

  let counter = 0;
  const getId = () => counter++;

  const app = appData();
  const notes = notesCollection(eleventyConfig)(collectionApi);

  const groups = app.sidebar.notes.flatMap((group) => {
    const pattern = group.pattern ? new RegExp(group.pattern, "i") : null;
    const tagsFilter = group.tags ?? [];

    const filteredNotes = notes.filter((n) => {
      return (
        (!pattern || pattern.test(n.page.filePathStem)) &&
        doTagsMatch(n.data.tags, tagsFilter) &&
        !isIndexPage(n)
      );
    });

    if (!filteredNotes.length) return [];

    const tree = group.tree
      ? createTreeOfNotes(filteredNotes, slugify, getTreeConfig(group.tree))
      : createFlatTreeOfNotes(filteredNotes, slugify);

    return [
      {
        id: getId(),
        label: group.label,
        expanded: group.expanded ?? true,
        tree: sortTree(tree),
      },
    ];
  });

  return groups;
};

function getTreeConfig(tree) {
  const custom = typeof tree === "boolean" ? {} : tree;

  return {
    expanded: true,
    ...custom,
    replace: {
      ...(custom.replace ?? {}),
      "/index$": "",
      "//": "/",
    },
  };
}

function createFlatTreeOfNotes(notes, slugify) {
  return notes.map((note) => {
    return {
      key: slugify(note.page.fileSlug),
      label: note.data.title || note.page.fileSlug,
      note,
      children: [],
    };
  });
}

function createTreeOfNotes(notes, slugify, config) {
  const tree = [];

  notes.forEach((note) => {
    const filePathStem = Object.entries(config.replace).reduce(
      (acc, [pattern, value]) => acc.replace(new RegExp(pattern, "gi"), value),
      note.page.filePathStem
    );

    const parts = filePathStem.replace(/^\//, "").split("/");

    let [parent, current] = [undefined, tree];
    parts.forEach((part, idx) => {
      let item = current.find((i) => i.name === part);
      if (!item) {
        const currentParts = parts.slice(0, idx + 1);

        item = {
          key: currentParts.map(slugify).join("--"),
          name: part,
          label: part,
          expanded: getInitialExpandedState(
            config.expanded,
            `/${currentParts.join("/")}`,
            idx + 1
          ),
          children: [],
        };
        current.push(item);
      }
      [parent, current] = [item, item.children];
    });

    parent.note = note;
    parent.label = note.data.title || note.page.fileSlug;
  });

  return tree;
}

function getInitialExpandedState(config, filePath, depth) {
  if (typeof config === "boolean") return config;
  if (typeof config === "number") return depth <= config;
  if (typeof config === "string") {
    const pattern = new RegExp(config, "i");
    return pattern.test(filePath);
  }

  return true;
}

function doTagsMatch(actual, expected) {
  if (!expected || expected.length === 0) return true;
  if (!actual) return false;
  return expected.some((tag) => actual.includes(tag));
}

function sortTree(tree) {
  const autoSort = sortTreeByTitle(tree);
  const sorted = sortTreeBySortProperty(autoSort);
  return sorted.map((item) => ({ ...item, children: sortTree(item.children) }));
}

function sortTreeBySortProperty(tree) {
  const customSort = tree.filter(
    (item) => typeof item.note?.data.sort === "number"
  );
  const autoSorted = tree.filter(
    (item) => typeof item.note?.data.sort !== "number"
  );

  return [
    ...customSort.sort((a, b) => {
      const sortA = a.note.data.sort;
      const sortB = b.note.data.sort;
      return sortA - sortB;
    }),
    ...autoSorted,
  ];
}

function sortTreeByTitle(tree) {
  return tree.slice().sort((a, b) => a.label.localeCompare(b.label));
}

function isIndexPage(note) {
  return note.page.filePathStem.toLowerCase() === "/index";
}
