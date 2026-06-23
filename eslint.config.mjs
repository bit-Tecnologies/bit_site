// @ts-check
import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierConfig from 'eslint-config-prettier';

export default [
  // Global ignores
  {
    ignores: ['dist/', '.astro/', 'node_modules/'],
  },

  // TypeScript files
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // Astro files
  ...eslintPluginAstro.configs['flat/recommended'],
  {
    files: ['**/*.astro'],
    rules: {
      // Astro-specific rules
      'astro/no-unused-css-selector': 'warn',
      'astro/no-set-html-directive': 'error',
    },
  },

  // JSX a11y for Astro components
  {
    files: ['**/*.astro'],
    ...jsxA11y.flatConfigs.recommended,
    rules: {
      'jsx-a11y/alt-text': ['warn', { elements: ['img'] }],
      'jsx-a11y/anchor-is-valid': 'warn',
    },
  },

  // Turn off rules that conflict with Prettier
  prettierConfig,
];
