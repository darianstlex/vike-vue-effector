import { createEffect, createEvent, createStore } from 'effector';

const appStarted = createEvent();

const $isClient = createStore(typeof document !== 'undefined', {
  serialize: 'ignore',
});

const incCounterFx = createEffect(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(true), 5000);
    }),
);

const $appCounter = createStore(0).on(incCounterFx.done, (state) => state + 1);

const $appState = createStore('stopped').on(appStarted, () => 'started');

export const appService = {
  appStarted,
  incCounterFx,
  $appCounter,
  $appState,
  $isClient,
};
