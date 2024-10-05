import { queryOperators as operators } from "./query-operators.js";
import { sharedModule } from "../../shared/index.js";
import { TreeGenerator } from "./tree-generator.js";

const { ValueParser } = sharedModule;

/**
 * @typedef {undefined | string | Array<[string, "asc" | "desc"] | string>} QuerySortConfig
 */

/**
 * @typedef {object} QueryDef
 * @property {object} [filter]
 * @property {QuerySortConfig} [sort]
 * @property {import('./tree-generator').TreeConfig} [tree]
 * @property {number} [offset]
 * @property {number} [limit]
 */

/**
 * Runs a query on a list of items.
 */
export class QueryRunner {
  /**
   * @param {object[]} items The list of items to run the query on.
   * @param {QueryDef} query The query to run.
   */
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

    if (this.query.tree) {
      const tree = new TreeGenerator(result, this.query.tree);
      result = tree.run();
    }

    if (this.query.sort) {
      const sorter = this.query.tree
        ? new RecursiveQuerySorter(result, this.query.sort)
        : new QuerySorter(result, this.query.sort);
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
}

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

class RecursiveQuerySorter {
  /**
   * @param {unknown[]} items The items to sort.
   * @param {QuerySortConfig} sortConfig The sort configuration.
   */
  constructor(items, sortConfig) {
    this.items = items;
    this.sortConfig = sortConfig;
  }

  run() {
    return this.sortItems(this.items);
  }

  sortItems(items) {
    const sorter = new QuerySorter(items, this.sortConfig);
    const sortedItems = sorter.run();

    return sortedItems.map((item) => ({
      ...item,
      children: this.sortItems(item.children),
    }));
  }
}

class QuerySorter {
  /**
   * @param {unknown[]} items The items to sort.
   * @param {QuerySortConfig} config The sort configuration.
   */
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

  /**
   * Normalizes the sort configuration.
   * @typedef {[string, 'asc' | 'desc']} NormalizedQuerySortRow
   * @typedef {NormalizedQuerySortRow[]} NormalizedQuerySortConfig
   * @param {QuerySortConfig} sortConfig
   * @returns {NormalizedQuerySortConfig}
   */
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

  /**
   * Compares two items by a given sort configuration.
   * @param {*} a The first item.
   * @param {*} b The second item.
   * @param {NormalizedQuerySortRow} sort The sort configuration.
   * @returns The comparison result.
   */
  compare(a, b, sort) {
    const [propPath, direction] = sort;
    const valueA = ValueParser.getValueByPath(a, propPath);
    const valueB = ValueParser.getValueByPath(b, propPath);
    const result = this.compareValues(valueA, valueB);

    return direction === "desc" ? result * -1 : result;
  }

  /**
   * Compares two values.
   * @param {*} a
   * @param {*} b
   * @returns The comparison result.
   */
  compareValues(a, b) {
    const emptyValues = new Set([undefined, null]);
    if (emptyValues.has(a) && !emptyValues.has(b)) return 1;
    if (!emptyValues.has(a) && emptyValues.has(b)) return -1;
    return a < b ? -1 : a > b ? 1 : 0;
  }
}
