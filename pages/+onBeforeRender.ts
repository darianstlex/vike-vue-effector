import { allSettled, fork, serialize } from 'effector';
import type { OnBeforeRenderAsync } from 'vike/types';

import { scopeRef } from '@utils/effector';

export const onBeforeRender: OnBeforeRenderAsync = async (pageContext): ReturnType<OnBeforeRenderAsync> => {
  const { pageInitiated } = pageContext.config;

  scopeRef.value = fork();

  if (pageInitiated) {
    await allSettled(pageInitiated, { scope: scopeRef.value, params: pageContext });
  }

  return {
    pageContext: {
      scopeValues: serialize(scopeRef.value),
    },
  };
};
