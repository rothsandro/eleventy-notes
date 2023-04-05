const operators = require("./query-operators");

module.exports = class QueryRunner {
  constructor(items, query) {
    this.items = items;
    this.query = query;
  }

  run() {
    let result = [...this.items];

    if (this.query.filter) {
      const filter = new QueryFilter(result, this.query.filter);
      result = filter.run();
    }

    if (this.query.sort) {
      const sorter = new QuerySorter(result, this.query.sort);
      result = sorter.run();
    }

    if (this.query.offset) {
      result = result.slice(this.query.offset);
    }

    if (this.query.limit) {
      result = result.slice(0, this.query.limit);
    }

    return result;
  }
};

class QueryFilter {
  constructor(items, config) {
    this.items = items;
    this.config = this.normalize(config);
  }

  normalize(config) {
    // Filter can be an array which means "and" operator
    // or an object with "and" or "or" operator
    return Array.isArray(config) ? { and: config } : config;
  }

  run() {
    return this.items.filter((item) => this.checkFilterGroupForItem(item));
  }

  checkFilterGroupForItem(item, config = this.config) {
    const [operator, filterRows] = Object.entries(config)[0];
    const validate = (filterRow) => {
      return Array.isArray(filterRow)
        ? this.checkFilterEntryForItem(item, filterRow)
        : this.checkFilterGroupForItem(item, filterRow);
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

  checkFilterEntryForItem(item, filterEntry) {
    const [propPath, operator, filterValue] = filterEntry;
    const value = ValueParser.getValueByPath(item, propPath);
    const matches = this.checkOperator(operator, filterValue, value);
    return matches;
  }

  checkOperator(operator, filterValue, applyOn) {
    if (operator in operators) {
      return operators[operator](applyOn, filterValue);
    }

    throw new Error(`Unknown operator ${operator}`);
  }
}

class QuerySorter {
  constructor(items, config) {
    this.items = items;
    this.config = this.normalize(config);
  }

  run() {
    return this.items.slice().sort((a, b) => {
      let result = 0;

      for (let sortItem of this.config) {
        result = this.compare(a, b, sortItem);
        if (result !== 0) break;
      }

      return result;
    });
  }

  normalize(sortConfig) {
    if (typeof sortConfig === "string") {
      return [[sortConfig, "asc"]];
    }

    if (Array.isArray(sortConfig)) {
      return sortConfig.map((item) => {
        if (Array.isArray(item)) {
          return item;
        }

        return [item, "asc"];
      });
    }

    return [];
  }

  compare(a, b, sort) {
    const [propPath, direction] = sort;
    const valueA = ValueParser.getValueByPath(a, propPath);
    const valueB = ValueParser.getValueByPath(b, propPath);
    const result = this.compareValues(valueA, valueB);

    return direction === "desc" ? result * -1 : result;
  }

  compareValues(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
}

class ValueParser {
  static getValueByPath(item, path) {
    if (!path) return item;

    const parts = path.split(".");
    let value = item;

    for (let part of parts) {
      if (!(part in value)) return undefined;
      value = value[part];
    }

    return value;
  }
}
