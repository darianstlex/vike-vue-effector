import { allSettled, fork, serialize } from 'effector';
import type { OnBeforeRenderAsync } from 'vike/types';

export const onBeforeRender: OnBeforeRenderAsync = async (pageContext): ReturnType<OnBeforeRenderAsync> => {
  const { pageInitiated } = pageContext.config;

  pageContext.scope = fork();

  if (pageInitiated) {
    await allSettled(pageInitiated, { scope: pageContext.scope, params: pageContext });
  }

  return {
    pageContext: {
      scope: pageContext.scope,
      scopeValues: serialize(pageContext.scope),
    },
  };
};
