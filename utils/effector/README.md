# Effector Utils
This folder contains all the effector related utils

### `createPageInit` - `+pageInitiated.ts`

Creates page init event, used for initiating effector logic needed to prepare data for the page, works on server side.

### `createPageStart` - `+pageStarted.ts`

Creates page start event, used to start effector logic needed on client side on page start.

### `getMergeScope`

Utility for scope get/merge. Use on client, useful for scope merge on navigation or data from telefunc. On server returns new scope.
Use for advanced scope update cases.

### `provideScope/useScope`

Internal hooks, used to provide/inject scope ref. For advanced usage.

### `useUnit`

Hook, used to bind scope to the effector units. It's based on the original hook from `effector-vue` but uses scope ref, removed readonly on values, to make it type compatible with the component props. Uses scope ref to be able to track updates, to keep store values in sync on scope changes.

### `Provider`

Effector scope provider, sits in the `LayoutDefault`