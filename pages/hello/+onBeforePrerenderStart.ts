// https://vike.dev/onBeforePrerenderStart
export { onBeforePrerenderStart };

import { names } from './names';

const onBeforePrerenderStart = async () => {
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
