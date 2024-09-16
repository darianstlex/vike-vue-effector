import { createEffect, createEvent, createStore } from 'effector';

const appStarted = createEvent();

const $isClient = createStore(typeof document !== 'undefined', {
  serialize: 'ignore',
  sid: '$app-is-client',
});

const incCounterFx = createEffect(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(true), 5000);
    }),
);

const $appCounter = createStore(0, { sid: '$app-counter' }).on(incCounterFx.done, (state) => state + 1);

const $appState = createStore('stopped', { sid: '$app-state' }).on(appStarted, () => 'started');

export const appService = {
  appStarted,
  incCounterFx,
  $appCounter,
  $appState,
  $isClient,
};
