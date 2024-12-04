import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// Worth considering: The default `create vite` setup uses a `.js` extension
// (instead of `.mjs`) and does not `include` this file in it's `tsconfig`.
// If we encounter issues in the future, we can try to match that setup.
export default tseslint.config(
  {ignores: ['coverage', 'dist']},
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },

  // Test overrides
  // We may need to disable the `require-await` rule if `async` is required
  // for `sequence.concurrent` tests.
  // {files: ['**/*.test.{ts,tsx}'], rules: {'@typescript-eslint/require-await': 'off'}},
);
