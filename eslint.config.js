import js from "@eslint/js"
import globals from "globals"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import prettier from "eslint-config-prettier/flat"

export default [
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "**/*.{css,scss}",
      ".eslintrc.*",
      "vite.config.ts",
    ],
  },
  js.configs.recommended,
  ...tsPlugin.configs["flat/recommended"],
  react.configs.flat.recommended,
  reactHooks.configs.flat.recommended,
  {
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      "react-refresh": reactRefresh,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      "react-refresh/only-export-components": 0,
      "react/react-in-jsx-scope": 0,
      "react/prop-types": [2, { ignore: ["className"] }],
      "react-hooks/refs": 0,
      "@typescript-eslint/no-non-null-assertion": 0,
    },
  },
  prettier,
]
