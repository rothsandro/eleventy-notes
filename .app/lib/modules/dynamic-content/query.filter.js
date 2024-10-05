import { QueryRunner } from "./query-runner.js";

/**
 * Creates the filter function to run a query.
 * @returns The filter function.
 */
export const queryFilter = () => (data, query) => {
  const runner = new QueryRunner(data, query);
  return runner.run();
};
