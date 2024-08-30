import { allSettled } from 'effector';
import type { PageContextClient } from 'vike/types';

import { scopeRef } from '@utils/effector';

export const onAfterRenderClient = async (pageContext: PageContextClient) => {
  const { pageStarted } = pageContext.config;
  if (pageStarted) {
    await allSettled(pageStarted, {
      scope: scopeRef.value,
      params: pageContext,
    });
  }
};
