import globals from 'globals';
import configLove from 'eslint-config-love';
// Includes both `config` and `plugin`.
import pluginPrettier from 'eslint-plugin-prettier/recommended';

export default [
  {
    ...configLove,
    languageOptions: {
      ...configLove.languageOptions,
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    files: ['*.ts', '*.mjs'],
  },
  pluginPrettier,
  {
    rules: {
      'no-console': 'warn',
      // '@typescript-eslint/explicit-function-return-type': 'off',
      // '@typescript-eslint/strict-boolean-expressions': 'off',
    },
  },
];
