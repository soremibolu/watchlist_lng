/* eslint-env node */
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  rules: {
    quotes: [2, "double", "avoid-escape"],
    semi: [2, "always"],
    "no-extra-boolean-cast": "off",
    "no-unused-vars": [
      1,
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: "res|next|^err",
      },
    ],
    "@typescript-eslint/no-non-null-assertion": "off",
    "prettier/prettier": [
      "warn",
      {
        trailingComma: "all",
        singleQuote: false,
        tabWidth: 2,
        semi: true,
        printWidth: 100,
      },
    ],
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2018,
    sourceType: "module",
  },
};
