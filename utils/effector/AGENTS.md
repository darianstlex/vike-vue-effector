# EFFECTOR UTILS MODULE KNOWLEDGE BASE

**Generated:** 2026-03-07
**Commit:** f323ca4
**Branch:** main

## OVERVIEW

Effector scope management utilities for SSR-safe reactivity with Vue 3.

## STRUCTURE

```
utils/effector/
├── index.ts          # Public exports (createPageInit, useUnit, etc.)
├── useUnit.ts        # Core hook: bind stores/events to components
├── useScope.ts       # Scope ref provider/injector
├── Provider.vue      # Effector scope context provider
└── README.md         # Detailed documentation
```

## WHERE TO LOOK

| Task                     | Location                                 | Notes                      |
| ------------------------ | ---------------------------------------- | -------------------------- |
| Bind stores to component | `useUnit(store)`                         | Returns reactive refs      |
| SSR events               | `createPageInit()` / `createPageStart()` | Server/client lifecycle    |
| Scope management         | `getMergeScope()`                        | Advanced scope merge cases |

## CONVENTIONS

- **useUnit()** — Primary binding hook, supports single units, arrays, or shape objects
- Type signatures handle: `Store<State>`, `Event<T>`, `Effect<P, D>` with proper return types
- Scope-aware: watches `scopeRef` changes and recreates watchers on navigation

## ANTI-PATTERNS

- **NEVER** import Effector directly in Vue components — use `@utils/effector/useUnit()`
- **DON'T** call `store.getState()` on client — breaks reactivity
- **AVOID** direct store manipulation outside page models or services
