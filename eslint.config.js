import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  { ignores: ["dist", "node_modules", "coverage"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked, // Stricter than 'recommended' - catches more type errors
      ...tseslint.configs.stylisticTypeChecked, // Consistent code style
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.config.ts", "*.config.js", "*.config.mjs"],
        },
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react,
    },
    rules: {
      // React Hooks - Prevent bugs with hooks
      ...reactHooks.configs.recommended.rules,

      // React - Prevent common React mistakes
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      "react/prop-types": "off", // TypeScript handles this
      "react/jsx-no-target-blank": "error", // Security: require rel="noopener" with target="_blank"
      "react/jsx-no-useless-fragment": "warn", // Clean up unnecessary fragments
      "react/self-closing-comp": "warn", // Prefer <Component /> over <Component></Component>
      "react/jsx-curly-brace-presence": [
        "warn",
        { props: "never", children: "never" },
      ],
      "react/no-array-index-key": "warn", // Avoid using index as key
      "react/jsx-no-constructed-context-values": "error", // Prevent re-renders from context

      // React Refresh
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // TypeScript - Prevent runtime errors
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "off", // Allow any type
      "@typescript-eslint/no-non-null-assertion": "warn", // Discourage ! operator
      "@typescript-eslint/prefer-nullish-coalescing": "error", // Use ?? over ||
      "@typescript-eslint/prefer-optional-chain": "error", // Use ?. over && chains
      "@typescript-eslint/no-floating-promises": "error", // Catch unhandled promises
      "@typescript-eslint/no-misused-promises": "error", // Prevent promise misuse
      "@typescript-eslint/await-thenable": "error", // Only await promises
      "@typescript-eslint/no-unnecessary-condition": "error", // Catch always true/false conditions
      "@typescript-eslint/strict-boolean-expressions": [
        "error",
        {
          allowString: true,
          allowNumber: false,
          allowNullableObject: true,
          allowNullableBoolean: true,
          allowNullableString: true,
        },
      ],
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/ban-ts-comment": "off", // Allow @ts-ignore and @ts-expect-error
      "@typescript-eslint/no-base-to-string": "error",
      "@typescript-eslint/restrict-template-expressions": "error",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error", // Ensure all cases handled

      // General JavaScript - Prevent bugs
      "no-console": ["warn", { allow: ["warn", "error", "info"] }], // Catch forgotten console.logs
      eqeqeq: ["error", "always"], // Require === and !==
      "no-eval": "error", // Security: no eval
      "no-implied-eval": "error", // Security: no implied eval
      "no-new-func": "error", // Security: no Function constructor
      curly: ["error", "all"], // Require braces for all control statements
      "default-case-last": "error", // Default case at end of switch
      "no-else-return": "warn", // Cleaner code
      "no-lonely-if": "warn", // Cleaner code
      "no-unneeded-ternary": "warn", // Cleaner code
      "prefer-const": "error", // Use const when possible
      "no-var": "error", // Use let/const
      "object-shorthand": "warn", // Use { foo } instead of { foo: foo }
      "prefer-template": "warn", // Use template literals
      "no-param-reassign": ["error", { props: false }], // Prevent parameter mutation
      "no-return-await": "error", // Unnecessary return await
    },
  },
  // Config files - disable type-aware linting (not in tsconfig)
  {
    files: ["*.config.{js,ts,mjs}", "vite.config.ts", "eslint.config.js"],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  // Prettier integration - disables ESLint rules that conflict with Prettier
  prettier
);
