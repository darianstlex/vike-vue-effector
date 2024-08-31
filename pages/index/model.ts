import { createEvent, createStore } from 'effector';

const inc = createEvent();

const $counterClient = createStore(0, { sid: '$counterClient' }).on(inc, (state) => state + 1);
const $counterServer = createStore(0, { sid: '$counterServer' });
const $random = createStore(0, { sid: '$random' });

export const service = {
  inc,
  $counterServer,
  $counterClient,
  $random,
};
