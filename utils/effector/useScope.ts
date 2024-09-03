// https://vike.dev/usePageContext
import type { Scope } from 'effector';
import type { Ref } from 'vue';

import { scopeRef } from '@utils/effector';

export const useScope = (): Ref<Scope> => {
  if (!scopeRef.value) throw new Error('scope is not set');
  return scopeRef;
};
