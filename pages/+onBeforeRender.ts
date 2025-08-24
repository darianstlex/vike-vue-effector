import { allSettled, fork, serialize } from 'effector';
import type { PageContextServer } from 'vike/types';

export const onBeforeRender = async (pageContext: PageContextServer) => {
  const { pageInitiated } = pageContext.config;

  const scope = fork();

  if (pageInitiated) {
    await allSettled(pageInitiated, { scope, params: pageContext });
  }

  return {
    pageContext: {
      scopeValues: serialize(scope),
    },
  };
};
