import type { Scope } from 'effector';
import type { LegacyMap, SerializedState, StorePair } from 'effector';
import { fork, serialize } from 'effector';
import { ref } from 'vue';

export const scopeRef = ref<Scope>(fork());

export const updateScope = (values: StorePair<any>[] | SerializedState | LegacyMap) => {
  scopeRef.value = fork({
    values: {
      ...(scopeRef.value ? serialize(scopeRef.value) : {}),
      ...values,
    },
  });
};
