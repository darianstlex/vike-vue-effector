import { fork } from 'effector';
import type { OnCreateAppSync } from 'vike-vue/types';

import { scopeRef, setScope } from '@utils/effector';

export const onCreateApp: OnCreateAppSync = (pageContext): ReturnType<OnCreateAppSync> => {
  const { app, scopeValues } = pageContext;
  scopeRef.value = fork({ values: scopeValues });
  setScope(app, scopeRef);
};
