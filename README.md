# Beef Tools

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

> These tools are actually vegan.

## Contributing

It is important to understand how some of the `devDependencies` are made available in this project.

The following packages are inherited from `eslint-config-love` and do not need to be specified within this project:

- `@types/node`
- `eslint`
- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`
- `eslint-plugin-import`
- `eslint-plugin-n`
- `eslint-plugin-promise`
- `typescript`

We are choosing to lean on `eslint-config-love` as much as possible for our inherited linting / TS config.
