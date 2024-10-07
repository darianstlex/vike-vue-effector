// https://vike.dev/onBeforePrerenderStart
export { onBeforePrerenderStart };

import type { OnBeforePrerenderStartAsync } from 'vike/types';

import { names } from './names';

const onBeforePrerenderStart: OnBeforePrerenderStartAsync = async (): ReturnType<OnBeforePrerenderStartAsync> => {
  return [{ url: '/hello', name: 'anonymous' }, ...names.map((name) => ({ url: `/hello/${name}`, name }))].map(
    ({ name, url }) => ({
      url,
      pageContext: {
        data: {
          date: new Date().toLocaleString(),
          name,
        },
      },
    }),
  );
};
