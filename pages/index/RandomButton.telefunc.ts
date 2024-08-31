import { fork, serialize } from 'effector';

import { service } from './model';

export const onGenerateRandom = async () => {
  const scope = fork({
    values: [[service.$random, Math.round(Math.random() * 1000)]],
  });
  return serialize(scope);
};
