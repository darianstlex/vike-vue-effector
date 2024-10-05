import { allSettled } from 'effector';
import type { PageContextClient } from 'vike/types';

import { appService } from '@services/app';
import { getUpdateScope } from '@utils/effector';

export const onBeforeRenderClient = async (pageContext: PageContextClient) => {
  const { scopeValues } = pageContext;
  const scopeRef = getUpdateScope(scopeValues!);
  if (pageContext.isHydration) {
    await allSettled(appService.appStarted, { scope: scopeRef.value });
  }
};
