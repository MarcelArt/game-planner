# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Tauri v2 desktop application** for planning games, with a React frontend and Rust backend. The app manages games, items, inventories, and recipes with local SQLite persistence.

## Development Commands

```bash
# Development server (runs on port 3000)
npm run dev

# Build for production (runs vite build and TypeScript check)
npm run build

# Preview production build
npm run preview

# Run tests
npm run test
```

To run the full Tauri app (desktop), use `npm run tauri dev` (if configured) or the Tauri CLI.

## Adding shadcn Components

This project uses the latest shadcn. Add components with:

```bash
pnpm dlx shadcn@latest add <component-name>
```

For example:
```bash
pnpm dlx shadcn@latest add button
```

## Architecture

### Tech Stack
- **Frontend**: React 19 with TypeScript
- **Routing**: TanStack Router (file-based routing)
- **Data Fetching**: TanStack Query (React Query)
- **State Management**: Zustand for global state
- **Styling**: Tailwind CSS v4 + shadcn/ui (New York style, zinc base)
- **Database**: SQLite via `@tauri-apps/plugin-sql`
- **Validation**: Zod schemas
- **Build**: Vite with React plugin

### Directory Structure

```
src/
├── @types/           # TypeScript type definitions (game.d.ts, item.d.ts, etc.)
│                     # Each type file exports both the interface and a Zod schema
├── components/
│   ├── ui/           # shadcn components (auto-generated, edit via CLI)
│   └── *.tsx         # Custom components
├── data/             # Data access layer (sqlite.ts, game.data.ts, item.data.ts, etc.)
│                     # Each *.data.ts file exports CRUD functions for one entity
├── hooks/            # Custom React hooks
├── integrations/     # TanStack Query/Router integrations
├── routes/           # File-based routes (TanStack Router)
└── main.tsx          # App entry point
```

### Data Layer Pattern

The data layer follows a consistent pattern:

1. **Types** (`@types/*.d.ts`): Define the entity interface and Zod validation schema
   ```typescript
   export interface Entity { id: string; ... }
   export const EntityInputSchema = z.object({ ... })
   export type EntityInput = z.infer<typeof EntityInputSchema>
   ```

2. **Data Access** (`data/*.data.ts`): Export CRUD functions using the SQLite wrapper
   ```typescript
   import db from './sqlite';
   async function create(input: EntityInput) { ... }
   async function read(): Promise<Entity[]> { ... }
   async function update(id: string, input: EntityInput) { ... }
   async function getById(id: string): Promise<Entity> { ... }
   export default { create, read, update, getById };
   ```

3. **SQLite** (`data/sqlite.ts`): Wrapper around `@tauri-apps/plugin-sql`
   - Each operation opens a connection, executes, then closes
   - Use `$1`, `$2` style parameter binding

### Routing

TanStack Router with file-based routing. Routes are auto-generated to `routeTree.gen.ts`.

- `__root.tsx` - Root layout with providers and devtools
- `index.tsx` - Home page at `/`
- `game.$id.tsx` - Layout route for game-specific pages (includes sidebar)
- `game.$id/*.tsx` - Nested routes under a game

Use `Link` from `@tanstack/react-router` for SPA navigation.

### Import Aliases

The `@` alias maps to `src/`:
```typescript
import { foo } from '@/components/bar'
import { baz } from '@/lib/utils'
import gameData from '@/data/game.data'
```
