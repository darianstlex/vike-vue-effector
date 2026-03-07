# PAGES MODULE KNOWLEDGE BASE

**Generated:** 2026-03-07
**Commit:** f323ca4
**Branch:** main

## OVERVIEW

Vike filesystem routing layer with per-page Effector state models.

## STRUCTURE

```
pages/
├── +Page.vue         # Route component (required)
├── +config.ts        # Default page config (Layout, meta)
├── <name>/+Page.vue  # Individual pages
├── <name>/model.ts   # Per-page Effector stores
└── _error/+Page.vue  # Error handler
```

## WHERE TO LOOK

| Task        | Location                  | Notes                    |
| ----------- | ------------------------- | ------------------------ |
| New page    | `pages/<name>/+Page.vue`  | Auto-routed by path      |
| Page config | `pages/<name>/+config.ts` | Override defaults        |
| Page state  | `pages/<name>/model.ts`   | Effector stores for page |
| Error page  | `pages/_error/+Page.vue`  | Global error handler     |

## CONVENTIONS

- `+Page.vue` — Required Vike convention, rendered by path
- `+config.ts` — Optional config (Layout, meta tags, title)
- `model.ts` — Per-page Effector state (separate from global services)
- Split `$counterServer` vs `$counterClient` for SSR safety

## ANTI-PATTERNS

- **DON'T** put page-specific logic in global services
- **NEVER** use `store.getState()` on client — always `useUnit(model.$store)`
- **DON'T** create `+Page.vue` without corresponding route path

## UNIQUE STYLES

- Page transition hooks: `+onPageTransitionStart.ts`, `+onPageTransitionEnd.ts`
- Scope merge for server→client state sync in `+config.ts passToClient`
- Per-page models keep SSR/client hydration boundaries clear
