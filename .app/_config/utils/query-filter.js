const getValueByPath = require("./query-prop");

module.exports = function applyQueryFilter(items, filter) {
  const group = Array.isArray(filter) ? { and: filter } : filter;
  return items.filter((item) => checkFilterGroupForItem(item, group));
};

function checkFilterGroupForItem(item, filterGroup) {
  const [operator, filterRows] = Object.entries(filterGroup)[0];
  const validate = (filterRow) => {
    return Array.isArray(filterRow)
      ? checkFilterEntryForItem(item, filterRow)
      : checkFilterGroupForItem(item, filterRow);
  };

  switch (operator) {
    case "and":
      return filterRows.every(validate);
    case "or":
      return filterRows.some(validate);
    default:
      throw new Error(`Unknown group operator ${operator}`);
  }
}

function checkFilterEntryForItem(item, filterEntry) {
  const [propPath, operator, filterValue] = filterEntry;
  const value = getValueByPath(item, propPath);
  const matches = checkOperator(operator, filterValue, value);
  return matches;
}

function checkOperator(operator, filterValue, applyOn) {
  if (operator in operators) {
    return operators[operator](applyOn, filterValue);
  }

  throw new Error(`Unknown operator ${operator}`);
}

const operators = {
  isEqual(applyOn, filterValue) {
    return normalizeValue(applyOn) === normalizeValue(filterValue);
  },
  isNotEqual(applyOn, filterValue) {
    return normalizeValue(applyOn) !== normalizeValue(filterValue);
  },
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
  includesAnyOf(applyOn, filterValue) {
    if (Array.isArray(applyOn) && Array.isArray(filterValue)) {
      applyOn = normalizeValue(applyOn);
      filterValue = normalizeValue(filterValue);
      return filterValue.some((value) => applyOn.includes(value));
    }
    return false;
  },
  includesAllOf(applyOn, filterValue) {
    if (Array.isArray(applyOn) && Array.isArray(filterValue)) {
      applyOn = normalizeValue(applyOn);
      filterValue = normalizeValue(filterValue);
      return filterValue.every((value) => applyOn.includes(value));
    }
    return false;
  },
  includesNoneOf(applyOn, filterValue) {
    return this.includesAnyOf(applyOn, filterValue) === false;
  },
  matches: (applyOn, filterValue) => {
    if (typeof applyOn === "string") {
      const pattern = new RegExp(filterValue, "i");
      return pattern.test(applyOn);
    }
    return false;
  },
};

function normalizeValue(value) {
  if (typeof value === "string") return value.toLowerCase().trim();
  if (Array.isArray(value)) return value.map((item) => normalizeValue(item));
  return value;
}
