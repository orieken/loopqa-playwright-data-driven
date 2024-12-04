import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
      'max-len': [
        'error',
        {
          ignorePattern: '^import [^,]+ from |^export | implements | (\'|")(http|https):',
          code: 140,
        },
      ],
      'max-params': ['error', 3],
      complexity: [
        'error',
        {
          max: 5,
        },
      ],
    },
  },
];
