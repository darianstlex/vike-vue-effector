// https://vike.dev/usePageContext
import type { Scope } from 'effector';
import type { InjectionKey, ShallowRef } from 'vue';
import { inject, provide } from 'vue';

import { getMergeScope, isClient } from './scope';

const key: InjectionKey<ShallowRef<Scope>> = Symbol();

export const useScope = (): ShallowRef<Scope> => {
  const scopeRef = inject(key);
  if (!scopeRef) throw new Error('injectScope() not called in parent');
  return scopeRef;
};

export const provideScope = (scopeValues?: Record<string, unknown>): void => {
  const scopeRef = getMergeScope(!isClient ? scopeValues : undefined);
  provide(key, scopeRef);
};
