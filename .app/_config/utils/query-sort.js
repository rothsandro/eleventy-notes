const getValueByPath = require("./query-prop");

module.exports = function (items, sort) {
  sort = normalizeSort(sort);
  console.log("SORT", sort);
  return items.slice().sort((a, b) => {
    let result = 0;

    for (let sortItem of sort) {
      result = compare(a, b, sortItem);
      console.log("RESULT", result);
      if (result !== 0) break;
    }

    return result;
  });
};

function normalizeSort(sort) {
  if (typeof sort === "string") {
    return [[sort, "asc"]];
  }

  if (Array.isArray(sort)) {
    return sort.map((item) => {
      if (Array.isArray(item)) {
        return item;
      }

      return [item, "asc"];
    });
  }

  return [];
}

function compare(a, b, sort) {
  const [propPath, direction] = sort;
  const valueA = getValueByPath(a, propPath);
  const valueB = getValueByPath(b, propPath);
  const result = compareValues(valueA, valueB);

  return direction === "desc" ? result * -1 : result;
}

function compareValues(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}
