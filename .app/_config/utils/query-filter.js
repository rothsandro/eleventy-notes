module.exports = function applyQueryFilter(items, filter) {
  return items.filter((item) => checkFilterForItem(item, filter));
};

function checkFilterForItem(item, filter) {
  return filter.every((filter) => checkFilterRow(item, filter));
}

function checkFilterRow(item, filterRow) {
  const [propPath, operator, filterValue] = filterRow;
  const value = getValueByPath(item, propPath);
  const matches = checkOperator(operator, filterValue, value);
  return matches;
}

function getValueByPath(item, path) {
  if (!path) return item;

  const parts = path.split(".");
  let value = item;

  for (let part of parts) {
    if (!(part in value)) return undefined;
    value = value[part];
  }

  return value;
}

function checkOperator(operator, filterValue, applyOn) {
  if (operator in operators) {
    return operators[operator](applyOn, filterValue);
  }

  throw new Error(`Unknown operator ${operator}`);
}

const operators = {
  isEmpty(applyOn) {
    if (applyOn === "") return true;
    if (applyOn === undefined) return true;
    if (applyOn === null) return true;
    if (Array.isArray(applyOn) && applyOn.length === 0) return true;
    if (typeof applyOn === "object") {
      return Object.keys(applyOn).length === 0;
    }
    return false;
  },
  isNotEmpty(applyOn, filterValue) {
    return this.isEmpty(applyOn, filterValue) === false;
  },
  contains(applyOn, filterValue) {
    if (typeof applyOn === "string") {
      return applyOn.toLowerCase().includes(filterValue.toLowerCase());
    }
    return false;
  },
};
