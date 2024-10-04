// https://vike.dev/usePageContext
import type { Scope } from 'effector';
import type { InjectionKey, ShallowRef } from 'vue';
import { inject, provide } from 'vue';

const key: InjectionKey<ShallowRef<Scope>> = Symbol();

export const useScope = (): ShallowRef<Scope> => {
  const scopeRef = inject(key);
  if (!scopeRef) throw new Error('setScope() not called in parent');
  return scopeRef;
};

export const setScope = (scopeRef: ShallowRef<Scope>): void => {
  provide(key, scopeRef);
};
