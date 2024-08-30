import { allSettled, fork, serialize } from 'effector';
import type { PageContextClient } from 'vike/types';

import { appService } from '@services/app';
import { scopeRef } from '@utils/effector';

export const onBeforeRenderClient = async (pageContext: PageContextClient) => {
  const { scopeValues } = pageContext;
  if (pageContext.isHydration) {
    await allSettled(appService.appStarted, { scope: scopeRef.value });
  }
  scopeRef.value = fork({
    values: {
      ...(scopeRef.value ? serialize(scopeRef.value) : {}),
      ...scopeValues,
    },
  });
};
