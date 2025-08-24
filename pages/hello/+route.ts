// https://vike.dev/route

import { render } from 'vike/abort';
import { resolveRoute } from 'vike/routing';
import type { PageContext } from 'vike/types';

import { names } from './names';

// We use a Route Function to implement advanced routing logic
export const route = (pageContext: PageContext) => {
  if (pageContext.urlPathname === '/hello' || pageContext.urlPathname === '/hello/') {
    const name = 'anonymous';
    return { routeParams: { name } };
  }
  const result = resolveRoute('/hello/@name', pageContext.urlPathname);
  if (!result.match) return false;
  const { name } = result.routeParams;
  if (!names.includes(name)) {
    throw render(404, `Unknown name: ${name}.`);
  }
  return { routeParams: { name } };
};
