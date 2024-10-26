export const queryOperators = {
  isEqual(applyOn, filterValue) {
    return normalizeValue(applyOn) === normalizeValue(filterValue);
  },
  isNotEqual(applyOn, filterValue) {
    return !this.isEqual(applyOn, filterValue);
  },
  isGreaterThan(applyOn, filterValue) {
    return applyOn > filterValue;
  },
  isGreaterThanOrEqual(applyOn, filterValue) {
    return applyOn >= filterValue;
  },
  isLessThan(applyOn, filterValue) {
    return applyOn < filterValue;
  },
  isLessThanOrEqual(applyOn, filterValue) {
    return applyOn <= filterValue;
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
    return !this.isEmpty(applyOn, filterValue);
  },
  includes(applyOn, filterValue) {
    applyOn = normalizeValue(applyOn);
    filterValue = normalizeValue(filterValue);

    if (Array.isArray(applyOn)) return applyOn.includes(filterValue);

    if (typeof applyOn === "string" && typeof filterValue === "string") {
      return applyOn.includes(filterValue);
    }

    return false;
  },
  doesNotInclude(applyOn, filterValue) {
    return !this.includes(applyOn, filterValue);
  },
  includesAnyOf(applyOn, filterValue) {
    if (!Array.isArray(filterValue)) return false;
    return filterValue.some((val) => this.includes(applyOn, val));
  },
  includesAllOf(applyOn, filterValue) {
    if (!Array.isArray(filterValue)) return false;
    return filterValue.every((val) => this.includes(applyOn, val));
  },
  includesNoneOf(applyOn, filterValue) {
    return !this.includesAnyOf(applyOn, filterValue);
  },
  matches: (applyOn, filterValue) => {
    if (typeof applyOn === "string") {
      const pattern = new RegExp(filterValue, "i");
      return pattern.test(applyOn);
    }
    return false;
  },
};

/**
 * Normalizes the value for better comparison.
 * @param {*} value The value to normalize.
 * @returns The normalized value.
 */
function normalizeValue(value) {
  if (typeof value === "string") return value.toLowerCase().trim();
  if (Array.isArray(value)) return value.map((item) => normalizeValue(item));
  return value;
}
