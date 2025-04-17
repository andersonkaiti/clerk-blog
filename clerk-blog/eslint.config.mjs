import { FlatCompat } from "@eslint/eslintrc";
import importHelpers from "eslint-plugin-import-helpers";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "import-helpers": importHelpers,
    },
    rules: {
      "import-helpers/order-imports": [
        "warn",
        {
          newlinesBetween: "never",

          groups: [
            ["/^react/"],
            "module",
            "/^@components/",
            "/^@pages/",
            "/^@actions/",
            "/^@services/",
            "/^@adapters/",
            "/^types/",
            "/^@hooks/",
            "/^@validators/",
            "/^@config/",
            ["parent", "sibling", "index"],
          ],

          alphabetize: {
            order: "asc",
            ignoreCase: true,
          },
        },
      ],
    },
  },
];

export default eslintConfig;
