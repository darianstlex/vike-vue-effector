# Effector Utils
This folder contains all the effector related utils

### `createPageInit` - `+pageInitiated.ts`

Creates page init event, used for initiating effector logic needed to prepare data for the page, works on server side.

### `createPageStart` - `+pageStarted.ts`

Creates page start event, used to start effector logic needed on client side on page start.

### `scopeRef`

Ref, contains effector scope, used by effector utils for access/update scope, can be used in some advanced cases.

### `updateScope`

Utility for scope update on page rendering from server or telefunc. Use for own scope update cases

### `useScope`

Hook, used to get scope in components, the difference with the `effector-vue` is that scope is kept in the ref, for reactive scope updates, for advanced usage.

### `useUnit`

Hook, used to bind scope to the effector units. It's based on the original hook from `effector-vue`, removed readonly on values, to make it type compatible with the component props. The scope is taken from the `scopeRef`. Contains subscription to the scope updates, to keep store values in sync on scope changes.
