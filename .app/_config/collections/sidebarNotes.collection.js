const appData = require("./../../_data/app");
const notesCollection = require("./notes.collection");

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

    const sortedNotes = sortNotes(filteredNotes);
    return [
      {
        id: getId(),
        label: group.label,
        notes: sortedNotes,
        tree: group.tree
          ? createTreeOfNotes(sortedNotes, slugify, getTreeConfig(group.tree))
          : createFlatTreeOfNotes(sortedNotes, slugify),
      },
    ];
  });

  return groups;
};

function getTreeConfig(tree) {
  const custom = typeof tree === "boolean" ? {} : tree;

  return {
    ...custom,
    replace: {
      ...(custom.replace ?? {}),
      "^/": "",
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

    const parts = filePathStem.split("/");

    let [parent, current] = [undefined, tree];
    parts.forEach((part, idx) => {
      let item = current.find((i) => i.label === part);
      if (!item) {
        item = {
          key: parts
            .slice(0, idx + 1)
            .map(slugify)
            .join("--"),
          label: part,
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

function doTagsMatch(actual, expected) {
  if (!expected || expected.length === 0) return true;
  if (!actual) return false;
  return expected.some((tag) => actual.includes(tag));
}

function sortNotes(notes) {
  const autoSort = sortByTitle(notes);
  return sortBySortProperty(autoSort);
}

function sortBySortProperty(notes) {
  const customSort = notes.filter((n) => typeof n.data.sort === "number");
  const autoSorted = notes.filter((n) => typeof n.data.sort !== "number");

  return [
    ...customSort.sort((a, b) => {
      const sortA = a.data.sort;
      const sortB = b.data.sort;
      return sortA - sortB;
    }),
    ...autoSorted,
  ];
}

function sortByTitle(notes) {
  return notes.slice().sort((a, b) => {
    const nameA = a.data.title || a.page.fileSlug;
    const nameB = b.data.title || b.page.fileSlug;
    return nameA.localeCompare(nameB);
  });
}

function isIndexPage(note) {
  return note.page.filePathStem.toLowerCase() === "/index";
}
