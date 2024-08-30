import { sample } from 'effector';

import { createPageInit } from '@utils/events';

import { service } from './model';

export const pageInitiated = createPageInit();

sample({
  clock: pageInitiated,
  fn: () => Math.round(Math.random() * 1000),
  target: service.$counterServer,
});
