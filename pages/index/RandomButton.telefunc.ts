import { fork, serialize } from 'effector';

import { service } from './model';

const wait = (time: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(true), time);
  });

export const onGenerateRandom = async () => {
  await wait(2000);
  const scope = fork({
    values: [[service.$random, Math.round(Math.random() * 1000)]],
  });
  return serialize(scope);
};
