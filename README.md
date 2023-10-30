# Next.js starter template

This is template to bootstrap new Next.js projects. It includes everything you need to start development.

## Getting Started :rocket:

1. Use this template to create new Next.js project.

```
yarn create next-app -e https://github.com/zerodays/next-template
```

2. After that, install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Useful commands

Lint your code and typecheck it:

```bash
yarn lint
yarn tsc
```

Run unit tests:

```bash
yarn test
```

Check if all localizations keys match between languages:

```bash
yarn i18n
```

Analyze bundle size:

```bash
ANALYZE=true yarn build
```

## What's included?

- Next.js 13 with [App router](https://nextjs.org/docs/pages/building-your-application/routing)
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/) for finding problems with following rule sets:
  - [next/core-web-vitals](https://nextjs.org/docs/pages/building-your-application/configuring/eslint)
  - [eslint:recommended](https://eslint.org/docs/latest/rules/)
  - [typescript-eslint](https://typescript-eslint.io/)
  - [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)
  - [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
  - [eslint-plugin-sonarjs](https://github.com/SonarSource/eslint-plugin-sonarjs)
- [next-international](https://next-international.vercel.app/) for internationalization
- [react-hook-form](https://react-hook-form.com/) for forms
- [zod](https://zod.dev/) for form validation
- Github Actions for lint, typecheck and localizations checks

## What still needs to added to this template?

- [ ] Add [zustand](https://github.com/pmndrs/zustand) for state management
- [ ] Add [Playwright](https://playwright.dev/) for end-to-end testing
- [ ] Add server-side project setup & TRPC for API
- [ ] Add [next-axiom](https://github.com/axiomhq/next-axiom) for logging

## Great! What should I do next?

- Update `README.md` file to reflect your project
- Create new [Infisical project](https://app.infisical.com/) and connect it to newly created repository with `infisical init` command
- Add branch protection rule for `master` branch (require at least one review before merging, require status checks to pass before merging, do not allow bypassing checks)
- Connect your project to [Vercel](https://vercel.com/) for automatic deployments
- Choose data fetching library depending on your needs (zodios, react-query, supabase client, etc.)
- Enjoy working on your new project! :tada:
