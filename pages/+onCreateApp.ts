import { fork } from 'effector';
import type { OnCreateAppSync } from 'vike-vue/types';

import { scopeRef } from '@utils/effector';
import { setScope } from '@utils/useScope';

export const onCreateApp: OnCreateAppSync = (pageContext): ReturnType<OnCreateAppSync> => {
  const { app, scopeValues } = pageContext;
  scopeRef.value = fork({ values: scopeValues });
  setScope(app, scopeRef);
};
