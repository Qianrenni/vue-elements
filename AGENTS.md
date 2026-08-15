# AGENTS.md

This file provides guidance to Qoder (qoder.com) when working with code in this repository.

## Project Overview

**qyani-components** is a Vue 3 + TypeScript frontend component library monorepo, managed by **pnpm workspace**. It provides 50+ UI components, a documentation site, and a shared ESLint configuration.

**3 packages under `packages/`:**

| Package                | Name                         | Purpose                                    |
| ---------------------- | ---------------------------- | ------------------------------------------ |
| `packages/components/` | `qyani-components`           | Core component library (Vite library mode) |
| `packages/docs/`       | `@qianrenni-components/docs` | Documentation site (Vite app)              |
| `packages/eslint/`     | `@qianrenni/eslint-config`   | Shared ESLint flat config                  |

### Component Categories

Components in `packages/components/src/components/` are organized by category folders:

- `basic/` — Icon, Message, Pagination, Tag
- `display/` — Avatar, Badge, Carousel, CarouselItem, Divider, LazyImage, MarkdownRender, ProgressBar, ScrollNotice
- `form/` — FormButton, FormCheckboxGroup, FormColorPicker, FormDatePicker, FormFileUpload, FormRadioGroup, FormRangeSlider, FormSelect, FormSwitch, FormTable, FormText, FormTextarea, Search
- `layout/` — Card, Collapse, CollapseItem, CollapsibleSection, Dialog, Drawer, PopContainer, ScrollContainer, SwiperAction, Tree, TreeNode
- `loading/` — Loading, animations (Breathing, Skeleton, Spinner)
- `navigation/` — NavSection, Tab
- `theme/` — ThemeToggle

### Utility Functions

Located in `packages/components/src/utils/`:

- **algorithm/** — useAVLTree, useArray, useGraph, useHeap, useRedBlackTree, useSegmentTree, useSkipList, useSort
- **business/** — useClip, useDebounce, useFollowSystemTheme, useLocalStorage, useLRUCache, useMemoryCache, useMessage, useNullHandel, useObject, useScreenSize, useShowLoading, useThrottle, useTimeDisplay, useTimeUtils, useWindowResize

Event utilities in `packages/components/src/events/`: useDrag, useFormEvents, useMousePosition

## Component File Structure

Each component follows a consistent 4-file + test pattern:

```
src/components/{category}/{ComponentName}/
├── ComponentName.vue     # Vue SFC (Q-prefixed, e.g. QIcon.vue)
├── composable.ts         # Logic/business logic
├── type.ts               # TypeScript interfaces & props types
├── index.ts              # Re-exports (export * from + default export)
└── __test__/
    └── composable.test.ts # Vitest tests (inline, next to source)
```

Each component is prefixed with `Q` (e.g., QIcon, QAvatar).

### index.ts Convention

```typescript
export * from './composable';
export * from './type';
export { default as QIcon } from './Icon.vue';
```

## Essential Commands

### Root-Level

```bash
pnpm install                     # Install all workspace dependencies
pnpm run lint                    # ESLint check (entire repo)
pnpm run lint:fix                # Auto-fix ESLint issues
pnpm run prettier                # Format files (JS, TS, Vue, CSS, MD)
pnpm run build:components        # Build component library only
pnpm run docs:dev                # Start docs dev server (alias: pnpm run dev)
pnpm run docs:update             # Update docs from component source (runs Python scripts)
pnpm run docs:build              # Build docs site (builds components first)
```

### Components Package (`packages/components/`)

```bash
pnpm run build                   # Vite build + vue-tsc type declarations
pnpm run type-check              # TypeScript type checking only
pnpm run test                    # Run all tests (vitest)
pnpm run test:watch              # Watch mode
pnpm run test:coverage           # Coverage report
pnpm run update                  # Regenerate src/index.ts + global.d.ts (Python scripts)
```

### Docs Package (`packages/docs/`)

```bash
pnpm run dev                     # Start Vite dev server (HMR enabled)
pnpm run build                   # Type-check + build
pnpm run preview                 # Preview production build
pnpm run update                  # Run init.py + index_python.py + get_component_info.py
pnpm run update:index            # Run index_python.py only
```

### Running a Single Test

Use vitest's filter: `pnpm run test -- <test-file-pattern>`. Example:

```bash
pnpm run test -- useObject   # Runs tests matching "useObject"
```

## Code Conventions

### Formatting & Linting

- **Prettier** (`.prettierrc.cjs`): 80 char width, 2-space indent, single quotes, trailing commas, CRLF line endings
- **Import sorting** (`@trivago/prettier-plugin-sort-imports`): third-party → `@qianrenni/` workspace packages → relative paths (groups separated by blank lines)
- **ESLint**: Flat config via `@qianrenni/eslint-config` (eslint.config.mjs), supports JS/TS/Vue/JSON/CSS
- **Husky + lint-staged**: Pre-commit hook runs `prettier --write` then `eslint --cache --fix`

### TypeScript

- Strict mode enabled
- `@/*` path alias maps to `src/*`
- Tests use a separate `tsconfig.test.json` (extends main config, noEmit, excludes test files from dist/types)

### Testing

- **Vitest** as test framework
- Inline tests co-located next to source (component tests in `__test__/composable.test.ts`, utility tests as `{name}.test.ts`)
- Tests should be placed inside the component's `__test__/` directory, not in a separate top-level test folder

## Key Architecture Details

### Build Pipeline (Components)

1. Vite builds the library in lib mode (ESM + CJS + UMD outputs, Vue externalized)
2. `vue-tsc --emitDeclarationOnly` generates type declarations to `dist/types/`
3. All CSS merged into single `dist/style.css`

### Docs Development Mode

When running `docs:dev`, the Vite config maps `qyani-components` to the source entry (`src/index.ts`) for direct HMR. A custom plugin resolves `@/` aliases inside component source code to relative paths.

### Automated Doc Generation (Python Scripts)

| Script                  | Location                       | Generates                                                                       |
| ----------------------- | ------------------------------ | ------------------------------------------------------------------------------- |
| `init.py`               | `packages/docs/scripts/`       | Stub `.vue` (display) + `.md` (public/docs) files from component source tree    |
| `index_python.py`       | `packages/docs/scripts/`       | `ComponentDetail.vue` with `defineAsyncComponent` imports for all display stubs |
| `get_component_info.py` | `packages/docs/scripts/`       | `useComponentInfo.ts` with component metadata (name, category, docPath)         |
| `index_python.local.py` | `packages/components/scripts/` | `src/index.ts` with imports, exports, and `app.component()` registrations       |
| `global.d.ts.local.py`  | `packages/components/scripts/` | `global.d.ts` with Vue module augmentation for all components                   |

### Docs ↔ Components Relationship & Sync Obligation

> AI agents modifying component code must keep docs in sync with source. The **single source of truth** for a component's API docs is the `README.md` sitting next to its source; the docs site renders generated copies of it.

**Relationship:**

| Side                    | Location                                                         | Purpose                                                                              |
| ----------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **components (source)** | `packages/components/src/components/{category}/{Name}/`          | Component implementation: `{Name}.vue`, `type.ts` (props), `composable.ts`           |
| **Canonical docs**      | `packages/components/src/components/{category}/{Name}/README.md` | ★ Component API docs (Props / Emits / Slots / Exposes tables) — **always edit this** |
| **Generated docs**      | `packages/docs/public/docs/components/{category}/{Name}.md`      | Copied from canonical docs by script; rendered by the docs site                      |
| **Navigation manifest** | `packages/docs/src/utils/useComponentInfo.ts`                    | Auto-generated; drives the docs site sidebar                                         |

Sync flow:

```
component README.md ── pnpm run docs:update (sync_docs.py) ──► public/docs/components/**/*.md
packages/components/src/components/...                        packages/docs/public/docs/...
        │
        └─ also regenerates useComponentInfo.ts (navigation manifest)
```

> Note: `loading/animations/` is a flat directory — `QBreathing`, `QSkeleton` and `QSpinner` share a single canonical `animations/README.md`, but each gets its own generated doc under `public/docs/components/loading/animations/`.

**⚠️ Component prop changes must be synced to docs**

When you change a component's `props` (the `XxxProps` interface in `type.ts`, or `withDefaults` defaults in `{Name}.vue`), you **must** also update that component's docs, otherwise the docs site shows an API that no longer matches the source.

Steps:

1. Edit source: `packages/components/src/components/{category}/{Name}/type.ts` (props) and `{Name}.vue` (defaults / logic).
2. Update the canonical doc: the sibling `README.md` `## Props` table (name / type / required / default / description); do the same for `Emits` / `Slots` / `Exposes` changes.
3. Sync with the script:

   ```bash
   pnpm run docs:update
   ```

   This runs `packages/docs/scripts/sync_docs.py`: clears and rebuilds `public/docs/components/**`, copies each component's sibling `README.md` to its generated doc, and regenerates `useComponentInfo.ts`.

> **Adding a new component**: create its `README.md` (with Props / Emits / Slots / Exposes tables) first, then run `pnpm run docs:update`; also run the components package `pnpm run update` to regenerate `src/index.ts` and `global.d.ts`.

### Global Type Augmentations

`global.d.ts` provides Vue module augmentation (`declare module 'vue'`) for all Q-prefixed components, enabling type-safe usage without explicit imports in consuming projects.

## GitHub Pages Deployment

The docs site can be deployed to GitHub Pages at `https://qianrenni.github.io/vue-elements/`.

### Production Build (Local Preview)

```bash
pnpm run docs:build          # Builds components first, then builds docs
```

The static site is output to `packages/docs/dist/`. The production build's `base` is **platform-aware** (see `packages/docs/vite.config.ts`):

- **GitHub Pages** (default): `base: '/vue-elements/'` so all asset paths are correct under the subdirectory
- **Netlify** (auto-detects `NETLIFY=true` env): `base: '/'` for root deployment
- **Override**: set `VITE_BASE` env var to force any base (e.g. `VITE_BASE=/some/path/`)

Runtime paths adapt automatically: `import.meta.env.BASE_URL` drives the hash router base and the markdown `fetch` URL, and `IconConfig.setBase` derives the SVG base from `location.pathname`.

### Automated Deployment via GitHub Actions

A workflow is configured at `.github/workflows/deploy.yml`:

- **Trigger**: Push to `main` or `master` branch, or manual dispatch via GitHub Actions UI
- **Steps**: Checkout → pnpm setup → Install deps → Build components → Build docs → Deploy to `gh-pages` branch using `peaceiris/actions-gh-pages`
- **Permissions**: `contents: read`, `pages: write`, `id-token: write`
- **Concurrency**: Only one deployment runs at a time

### Manual Setup (One-Time Only)

1. Go to repo **Settings → Pages** on GitHub
2. Under **Build and deployment**, select **Deploy from a branch**
3. Set branch to `gh-pages` and folder to `/ (root)`
4. Save — GitHub will automatically serve the site

### Manual Deploy (Alternative)

```bash
pnpm run components:build
pnpm run docs:build
npx gh-pages -d packages/docs/dist -b gh-pages
```

## Netlify Deployment

The same code can be deployed to Netlify (root path). Configuration lives in `netlify.toml`:

- **Build command**: `pnpm run docs:build`
- **Publish directory**: `packages/docs/dist`
- **Node version**: `20` (set in `[build.environment]`)
- Netlify injects `NETLIFY=true` during builds, so the docs `vite.config.ts` automatically switches `base` to `'/'`.

Connect the repo in Netlify (Site → Deploys) or via the CLI: `npx netlify deploy --prod`.

## Important Constraints

- Always use `pnpm` (not npm/yarn) for dependency management
- Scripts must produce **deterministic output** (sorted file traversal, sorted results)
- When introducing new components, update is done via Python scripts, not by manually editing `src/index.ts`
- Tests must be placed inside component directories (e.g., `__test__/composable.test.ts`) or alongside utility files (e.g., `useObject.test.ts`)
- PowerShell does **not** support `&&` as command separator; use `;` instead
