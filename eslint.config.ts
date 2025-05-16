import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import importPlugin from 'eslint-plugin-import';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import importPluginErrors from 'eslint-plugin-import/config/flat/errors';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import importPluginReact from 'eslint-plugin-import/config/flat/react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import importPluginRecommended from 'eslint-plugin-import/config/flat/recommended';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import globals from 'globals';
import tseslint, { configs as tseslintConfigs, parser } from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config([
  { ignores: ['node_modules/', 'dist/', '*.log', '.env', '.next/', 'out/'] },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: { js, react },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      import: importPlugin,
    },
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`

          bun: true,
        }),
      ],
    },
    rules: {
      'import/no-unresolved': 'error',
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
          },
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          named: true,
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '$/*',
              group: 'internal',
              position: 'before',
            },
          ],
        },
      ],
    },
  },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], languageOptions: { globals: globals.browser } },
  js.configs.recommended,
  ...tseslintConfigs.recommended,
  ...tseslintConfigs.stylistic,
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  eslintPluginPrettierRecommended,
  importPluginErrors,
  {
    ...importPluginReact,
    settings: {
      'import/extensions': [...importPlugin.configs.typescript.settings['import/extensions']],
    },
  },
  importPluginRecommended,
  importPlugin.configs.typescript,
]);
