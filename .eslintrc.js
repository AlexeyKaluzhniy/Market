module.exports = {
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
    sourceType: "module",
    jsx: true,
    project: "tsconfig.json",
    ecmaVersion: 6,
    jsxPragma: "React",
    createDefaultProgram: true,
  },
  ignorePatterns: [],
  extends: [
    "react-strong",
  ],
  rules: {
    "no-restricted-imports": ["error", {
      paths: [{
        "name": "i18next",
        "message": "Please use react-i18next instead.",
      }, {
        "name": "react-native-config",
        "message": "Please use AppConfig instead.",
      }],
      patterns: [{
        "group": ["**/dto/**"],
        "message": "Please use Dto instead.",
      }],
    }],
  },
  settings: {
    "import/resolver": {
      "babel-plugin-root-import": {
        "rootPathPrefix": "~",
        "rootPathSuffix": "src"
      }
    },
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
  },
};
