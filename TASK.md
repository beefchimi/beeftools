# Update dependencies

I am upgrading various dependencies in this codebase.

Here is a snapshot of our current dependency versions:

```json
"devDependencies": {
  "@eslint/js": "^9.17.0",
  "@changesets/cli": "^2.27.11",
  "@types/node": "^22.10.5",
  "@vitest/coverage-v8": "^2.1.8",
  "@vitest/ui": "^2.1.8",
  "eslint": "^9.17.0",
  "eslint-config-prettier": "^9.1.0",
  "eslint-plugin-prettier": "^5.2.1",
  "globals": "^15.14.0",
  "prettier": "^3.4.2",
  "typescript": "^5.7.3",
  "typescript-eslint": "^8.19.1",
  "vite": "^6.0.7",
  "vite-plugin-dts": "^4.4.0",
  "vitest": "^2.1.8"
}
```

Since these dependencies were last installed, many new changes have come to [`Vite`](https://vite.dev/). Vite now offers a suite of tools - one of which is [`OXC`](https://oxc.rs/) - that would replace other build tooling that I have, such as `prettier` and `eslint`.

I would like us to start by updating both `Vite` and [`Vitest`](https://vitest.dev/) packages.

After that, replace the following packages:

- `prettier` with `oxfmt`
- `eslint` with `oxlint`

My existing `prettier` and `eslint` configs will need to be migrated to these new tools. I am not overly strict about the current configuration, so I am willing to compromise on certain configuration settings, depending on the trade-offs. We can start simple, and finesse the configuration as a follow-up if needed.

If there are `oxfmt` or `oxlint` failures as a result of this transition, I can probably fix those manually. We will let the tools run and assess the output, then decide how to proceed.

Lastly, if there are any other tools that need to be updated as a result of these dependency bumps, we will address those as well _(example: perhaps `vite-plugin-dts` needs to be configured differently as a result of our changes)_.

By the end of this work, I hope to have most - if not all - of our current dependencies either updated or replaced _(or perhaps in some cases removed)_.
