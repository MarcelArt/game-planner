# AGENTS.md

This file provides guidance for AI coding agents working on this codebase.

## Project Overview

This is a **Tauri v2 desktop application** for planning games, with a React frontend and Rust backend. The app manages games, items, inventories, and recipes with local SQLite persistence.

**Tech Stack:**
- React 19 with TypeScript
- TanStack Router (file-based routing)
- TanStack Query for data fetching
- Zustand for global state
- Tailwind CSS v4 + shadcn/ui (New York style, zinc base)
- SQLite via `@tauri-apps/plugin-sql`
- Zod schemas for validation
- Vite build tool

## Development Commands

```bash
# Development server (runs on port 3000)
npm run dev

# Build for production (runs vite build + TypeScript check)
npm run build

# Preview production build
npm run preview

# Run all tests
npm run test

# Run a single test file (vitest pattern)
npm run test -- path/to/test.spec.ts
# or directly:
npx vitest path/to/test.spec.ts
```

## Code Style Guidelines

### Imports
- Use ES module syntax with the `@/` alias for internal imports (maps to `src/`)
- Group imports: external libraries first, then internal imports
- Example:
  ```typescript
  import { useQuery } from '@tanstack/react-query';
  import gameData from '@/data/game.data';
  import { Button } from '@/components/ui/button';
  ```

### Formatting & Indentation
- **NO COMMENTS** unless explicitly requested
- Use tabs for indentation (configured in editorconfig)
- TypeScript strict mode is enabled - all type checking must pass

### Type Definitions
- Entity types go in `@types/*.d.ts`
- Each type file exports both the interface and a Zod validation schema
- Pattern:
  ```typescript
  export interface Entity { id: string; ... }
  export const EntityInputSchema = z.object({ ... })
  export type EntityInput = z.infer<typeof EntityInputSchema>
  ```

### Naming Conventions
- Variables/functions: `camelCase`
- React components: `PascalCase`
- Data modules: lowercase `entityData` (e.g., `gameData`, `itemData`)
- Database tables: `snake_case` (e.g., `games`, `items`, `inventories`)
- Route files: `route.$param.tsx` or `route.index.tsx` pattern

### Data Layer Pattern
- Each entity has two files:
  1. Type definition in `@types/entity.d.ts`
  2. Data access in `data/entity.data.ts`
- Data files export a default object with CRUD functions
- Use `db.select()` for reads, `db.execute()` for writes/updates
- Pattern:
  ```typescript
  async function create(input: EntityInput) { ... }
  async function read(): Promise<Entity[]> { ... }
  async function update(id: string, input: EntityInput) { ... }
  async function getById(id: string): Promise<Entity> { ... }
  export default { create, read, update, getById };
  ```

### Database Operations
- Use `@tauri-apps/plugin-sql` via the `db` wrapper in `data/sqlite.ts`
- Parameter binding: `$1`, `$2`, `$3` (not `?` or named parameters)
- Always close the connection after each operation (handled by wrapper)
- Import `v4` from `uuid` for generating IDs

### React Components
- Function components with hooks at the top of the function body
- Early returns for loading/error states before rendering
- Use TanStack Query for data fetching with `queryKey` and `queryFn`
- Use TanStack Router for navigation with `useNavigate()` and `Link`
- Example:
  ```typescript
  export function MyComponent({ prop }: Props) {
    const navigate = useNavigate();
    const { data, status } = useQuery({ queryKey: ['key'], queryFn: fetchFn });
    if (status !== 'success') return null;
    return <div>...</div>;
  }
  ```

### shadcn/ui Components
- Add components using the latest shadcn CLI:
  ```bash
  npx shadcn@latest add <component-name>
  ```
- Components in `src/components/ui/` are auto-generated - edit via CLI
- Custom components go in `src/components/` (without `ui/` subfolder)
- Use New York style, zinc base color scheme

### Testing
- Test framework: Vitest with jsdom environment
- Testing library: `@testing-library/react`
- Test files: `*.test.tsx` or `*.spec.tsx` (place alongside components or in `__tests__/`)

### Error Handling
- Async functions should handle errors appropriately
- Use Zod schemas for runtime validation at data boundaries
- No global try/catch - handle errors where they occur

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

### Routing
- TanStack Router with file-based routing - auto-generates to `routeTree.gen.ts`
- `__root.tsx` - Root layout with providers and devtools
- `index.tsx` - Home page at `/`
- `game.$id.tsx` - Layout route for game-specific pages (includes sidebar)
- `game.$id/*.tsx` - Nested routes under a game
- Use `Link` from `@tanstack/react-router` for SPA navigation

## Important Notes

- **Never commit** changes unless explicitly requested
- Always run `npm run build` after completing changes to ensure TypeScript passes
- Check existing files to follow the exact patterns before adding new code
- The project uses TanStack Router (file-based routing) - routes auto-generate to `routeTree.gen.ts`
