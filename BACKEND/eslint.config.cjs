const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  { ignores: ["node_modules/**", "coverage/**", "uploads/**"] },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: { ...globals.node },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": "warn",
    },
  },
  {
    files: ["tests/**/*.js"],
    languageOptions: { globals: { ...globals.node, ...globals.jest } },
  },
];
