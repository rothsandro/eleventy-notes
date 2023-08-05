const crypto = require("crypto");

module.exports = () => () => {
  const id = crypto.randomUUID().substring(0, 8);
  return (...args) => `id-${id}-${args.join("-")}`.toLowerCase();
};
