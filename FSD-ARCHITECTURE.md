# Enhanced Feature-Sliced Design Architecture

This document describes our project's architecture based on the Enhanced Feature-Sliced Design (FSD) methodology, which provides clear and scalable organization for frontend applications.

## Migration Status

We are currently migrating from our legacy architecture to Enhanced Feature-Sliced Design. This is being done incrementally, with OXC lint rules guiding the process by:

1. Warning about deprecated import paths
2. Enforcing architectural boundaries between layers and segments
3. Ensuring proper dependency direction

## Benefits of Enhanced FSD

- **Clear boundaries** - Explicit dependencies between layers and segments
- **Standardized structure** - Consistent organization across the project
- **Better maintainability** - Isolated modules with clear responsibilities
- **Incremental adoption** - Can be implemented gradually, slice by slice
- **Scalable architecture** - Easily add new entities and features without disrupting existing code

## Architecture Overview

### Layers

Our architecture consists of the following layers (from low-level to high-level):

1. **Shared** (`/shared/*`) - Reusable infrastructure code with no business logic
   - UI components
   - API clients
   - Utility functions
   - Hooks

2. **Entities** (`/entities/*`) - Business objects and their data models
   - Types and interfaces
   - Redux slices
   - API queries for specific entities
   - Simple UI components for entity display

3. **Features** (`/features/*`) - User interactions and business logic
   - Interactive components
   - Form management
   - Feature-specific state
   - Feature-specific API interactions

4. **Widgets** (`/widgets/*`) - Composite UI blocks that combine entities and features
   - Complex UI sections
   - Layout components
   - Widget-specific state management

5. **Pages** (`/pages/*`) - Route-level components
   - Page composition
   - Page-specific layout
   - Page-specific state

6. **App** (`/app/*`) - Application initialization
   - Entry points
   - Providers
   - Global styles and configs
   - Routing setup

### Segment Structure

Each feature/entity/widget typically has the following segments:

- **UI** (`/ui/*`) - Presentational components
- **Model** (`/model/*`) - Business logic and state management
  - `types.ts` - Type definitions
  - `slice.ts` - Redux slice
  - `selectors.ts` - State selectors
  - `hooks.ts` - Custom hooks
- **API** (`/api/*`) - Communication with external services
  - `queries.ts` - API endpoints
  - `mutations.ts` - API mutations

## Import Rules and Patterns

### Layer Dependencies

The architecture follows a strict unidirectional dependency rule:

```
app → pages → widgets → features → entities → shared
```

Each layer can only import from layers below it, never from above.

### Deprecated Import Paths

The following import paths are deprecated and should be migrated:

| Deprecated Path                   | New Path                                               |
| --------------------------------- | ------------------------------------------------------ |
| `@/infrastructure/store/slices/*` | `@/entities/*/model` or `@/features/*/model`           |
| `@/app/pages/*`                   | `@/pages/*`                                            |
| `@/domain/*`                      | `@/entities/*/model/types`                             |
| `@/components/ui/*`               | `@/shared/ui-kit/*`                                    |
| `@/hooks/*`                       | `@/shared/hooks/*` or specific slice hooks             |
| `@/app/shared/contexts/*`         | `@/entities/*/model/contexts` or `@/shared/contexts/*` |

### Import Order

Imports should be organized in the following order:

1. Built-in modules
2. External dependencies
3. Shared layer
4. Entity layer
5. Feature layer
6. Widget layer
7. Page layer
8. App layer

### Type Imports

Always use the `import type` syntax for importing types:

```typescript
// ✅ Correct
import type { User } from './types';

// ❌ Incorrect
import { User } from './types';
```

## OXC Lint Rules

We use OXC Lint to enforce the Feature-Sliced Design architecture boundaries through the following rule configurations:

### Layer Boundary Rules

These rules prevent importing from higher layers into lower layers:

```json
{
  "target": "./src/entities/**/*",
  "from": "./src/{features,widgets,pages}/**/*",
  "message": "Entities cannot import from upper layers (features, widgets, pages) in FSD"
},
{
  "target": "./src/features/**/*",
  "from": "./src/{widgets,pages}/**/*",
  "message": "Features cannot import from upper layers (widgets, pages) in FSD"
},
{
  "target": "./src/widgets/**/*",
  "from": "./src/pages/**/*",
  "message": "Widgets cannot import from upper layers (pages) in FSD"
},
{
  "target": "./src/shared/**/*",
  "from": "./src/{entities,features,widgets,pages,app}/**/*",
  "message": "Shared modules cannot import from other layers in FSD"
}
```

### Segment Boundary Rules

These rules enforce proper segment boundaries within a slice:

```json
{
  "target": "./src/{entities,features,widgets,pages}/**/model/**/*",
  "from": "./src/{entities,features,widgets,pages}/**/ui/**/*",
  "message": "Model layer should not import from UI layer in FSD"
},
{
  "target": "./src/{entities,features,widgets,pages}/**/lib/**/*",
  "from": "./src/{entities,features,widgets,pages}/**/ui/**/*",
  "message": "Lib layer should not import from UI layer in FSD"
},
{
  "target": "./src/{entities,features,widgets,pages}/**/api/**/*",
  "from": "./src/{entities,features,widgets,pages}/**/ui/**/*",
  "message": "API layer should not import from UI layer in FSD"
},
{
  "target": "./src/{entities,features,widgets,pages}/**/api/**/*",
  "from": "./src/{entities,features,widgets,pages}/**/model/**/*",
  "message": "API layer should not import from Model layer in FSD"
}
```

### Deprecated Import Rules

We've configured rules to mark deprecated import paths and suggest FSD-compliant alternatives:

```json
"no-restricted-imports": ["error", {
  "patterns": [
    {
      "group": ["@/infrastructure/store/slices/*", "src/infrastructure/store/slices/*"],
      "message": "Deprecated path. Use '@/entities/*/model' or '@/features/*/model' instead"
    },
    {
      "group": ["@/app/pages/*", "src/app/pages/*"],
      "message": "Deprecated path. Use '@/pages/*' instead"
    },
    // Additional deprecated path rules...
  ]
}]
```

To run the OXC lint check:

```bash
npm run lint
```

## Migration Strategy

1. **Create New Architecture Folders**:
   - `/src/shared/`
   - `/src/entities/`
   - `/src/features/`
   - `/src/widgets/`
   - `/src/pages/`

2. **Move Domain Types**:
   - Move types from `/domain/` to corresponding entity model folders

3. **Transform Store Slices**:
   - Move from `/infrastructure/store/slices/` to entity or feature model folders

4. **Migrate UI Components**:
   - Move from `/components/ui/` to `/shared/ui/`

5. **Refactor Pages**:
   - Move from `/app/pages/` to `/pages/`

6. **Fix Imports**:
   - Update imports to match the new folder structure
   - Use the linting rules to catch deprecated imports

## Examples

### Entity Structure

```
src/entities/recording/
├── model/
│   ├── types.ts
│   ├── slice.ts
│   ├── selectors.ts
│   └── hooks.ts
├── api/
│   └── queries.ts
├── ui/
│   ├── recording-card.tsx
│   └── recording-info.tsx
└── index.ts
```

### Feature Structure

```
src/features/recording/
├── create-recording/
│   ├── ui/
│   ├── model/
│   └── index.ts
├── edit-recording/
│   ├── ui/
│   ├── model/
│   └── index.ts
└── index.ts
```
