import { sample } from 'effector';

import { createPageStart } from '@utils/events';

import { service } from './model';

export const pageStarted = createPageStart();

sample({
  clock: pageStarted,
  source: service.$counterClient,
  filter: (val) => !val,
  fn: () => Math.round(Math.random() * 1000),
  target: service.$counterClient,
});
