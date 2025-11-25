import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Disable Tailwind v3/v4 gradient syntax false positive warnings
      // Code uses correct Tailwind v4 syntax (bg-linear-to-*) which is optimal
      "@tailwindcss/no-arbitrary-value": "off",
      "@tailwindcss/migration": "off",
    },
  },
]);

export default eslintConfig;
