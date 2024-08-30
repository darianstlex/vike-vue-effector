import { createEvent, createStore } from 'effector';

const inc = createEvent();

const $counterClient = createStore(0, { sid: '$counterClient' }).on(inc, (state) => state + 1);
const $counterServer = createStore(0, { sid: '$counterServer' });

export const service = {
  inc,
  $counterServer,
  $counterClient,
};
