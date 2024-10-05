import { allSettled } from 'effector';
import type { PageContextClient } from 'vike/types';

import { getMergeScope } from '@utils/effector';

export const onAfterRenderClient = async (pageContext: PageContextClient) => {
  const { pageStarted } = pageContext.config;
  const scopeRef = getMergeScope();
  if (pageStarted) {
    await allSettled(pageStarted, { scope: scopeRef.value, params: pageContext });
  }
};
