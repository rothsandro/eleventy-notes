/**
 * Creates a uniqueId filter.
 * @returns The filter function.
 */
export const uniqueIdGlobal = () => {
  /**
   * Filter to create a unique ID.
   *
   * @example
   * ```njk
   * {% set id = uniqueId() %}
   * <label for="{{ id('firstName') }}" />
   * <input id="{{ id('firstName') }}" />
   * ```
   */
  return () => {
    const id = crypto.randomUUID().substring(0, 8);
    return (...args) => `id-${id}-${args.join("-")}`.toLowerCase();
  };
};
