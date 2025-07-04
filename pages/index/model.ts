import { createEvent, createStore } from 'effector';

const inc = createEvent();

const $counterClient = createStore(0).on(inc, (state) => state + 1);
const $counterServer = createStore(0);
const $random = createStore(0);

export const service = {
  inc,
  $counterServer,
  $counterClient,
  $random,
};
