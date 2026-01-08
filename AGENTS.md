# Repository Guidelines

## Project Structure & Module Organization
This repo is a Vite + React front-end for the OpenSPG schema highlighter. Key paths:
- `src/` holds app code: `components/`, `pages/`, `hooks/`, `routers/`, `utils/`, `styles/`, and `main.tsx`.
- `public/` contains static assets copied as-is to the build (including `mockServiceWorker.js`).
- `mocks/` contains local mock data and MSW handlers (if used).
- `dist/` is the build output (generated).
- `index.html`, `vite.config.mts`, and `tsconfig.json` define entry and tooling.

## Build, Test, and Development Commands
Use npm scripts from `package.json`:
- `npm run dev` starts the Vite dev server.
- `npm run build` builds production assets into `dist/`.
- `npm run clean` removes the `dist/` directory.
- `npm run eslint` runs TypeScript linting on `src/**/*.{ts,tsx}`.
- `npm run eslint:fix` auto-fixes lintable issues.
- `npm run msw:init` regenerates `public/mockServiceWorker.js` for local mocks.
- `npm run deploy` copies `dist/` into the IDEA plugin static resources target.

## Coding Style & Naming Conventions
- Indentation: 4 spaces; no tabs.
- Quotes: single quotes; no trailing commas; no semicolons.
- Format with Prettier (`.prettierrc.mjs`) and lint with ESLint (`eslint.config.mjs`).
- Keep component and file names descriptive and aligned with their directory purpose (e.g., `src/components/GraphView.tsx`, `src/pages/SchemaDetail.tsx`).

## Testing Guidelines
There is no test runner configured yet (no `test` script or test files). If adding tests, document the framework and add a script such as `npm test`. Prefer colocating tests near sources (e.g., `src/components/GraphView.test.tsx`).

## Commit & Pull Request Guidelines
- Commits follow Conventional Commits enforced by commitlint. Allowed types include `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `revert`, and `build` (e.g., `feat: add schema graph zoom`).
- PRs should include a concise description, relevant issue links, and screenshots/GIFs for UI changes.
- Note any local dev or deploy steps required for reviewers.

## Configuration Tips
- `npm run deploy` expects the IDEA plugin repo at `../openspg-schema-highlighter-idea-plugin`. Update `TARGET` in `package.json` if the path differs.
