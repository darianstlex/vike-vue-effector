import type { createStore, Json, Node, Scope, SerializedState, StateRef } from 'effector';
import { fork, launch } from 'effector';
import { shallowRef } from 'vue';

type StoreSerializationConfig = Exclude<Parameters<typeof createStore>[1], undefined>['serialize'];
type ScopeInternal = Scope & {
  reg: Record<string, StateRef & { meta?: Record<string, string> }>;
  additionalLinks: Record<string, Node[]>;
};

const scopeRef = shallowRef(fork());

export const isClient = typeof document !== 'undefined';

const getServerScope = (values?: SerializedState) => {
  return shallowRef(fork({ values }));
};

const mergeScope = (values?: SerializedState) => {
  if (!values) return scopeRef;

  // @ts-expect-error this is a really hacky way to "hydrate" scope
  Object.assign(scopeRef.value.values.sidMap, values);
  /**
   * We should explicitly set this flag to true, because otherwise the scope will be treated as it was not created from serialized values
   * => effector will not apply custom serializers to the scope
   */
  (scopeRef.value as any).fromSerialize = true;

  const linksToRun: string[] = [];

  for (const id in (scopeRef.value as ScopeInternal).reg) {
    if (Object.hasOwnProperty.call((scopeRef.value as ScopeInternal).reg, id)) {
      const ref = (scopeRef.value as ScopeInternal).reg[id];

      /**
       * Schedule external watchers (useUnit, etc.) re-run
       */
      const nodeId = ref?.meta?.id;

      if (nodeId && (scopeRef.value as ScopeInternal).additionalLinks[nodeId]) {
        linksToRun.push(nodeId);
      }

      if (!ref.meta || (!ref.meta?.named && ref.meta?.derived)) {
        /**
         * Force recalculation of derived values
         */
        delete (scopeRef.value as ScopeInternal).reg[id];
      } else {
        /**
         * Update non-derived values
         */
        const sid = ref?.meta?.sid;
        if (sid && sid in values) {
          const serialize = ref?.meta?.serialize as StoreSerializationConfig;
          const read = serialize && serialize !== 'ignore' ? serialize?.read : null;
          ref.current = read ? read(values[sid] as Json) : values[sid];
        }
      }
    }
  }

  if (linksToRun.length) {
    linksToRun.forEach((nodeId) => {
      const links = (scopeRef.value as ScopeInternal).additionalLinks[nodeId];

      if (links) {
        links.forEach((link) => {
          if (link.meta.watchOp === 'store') {
            launch({
              target: link,
              params: null,
              scope: scopeRef.value,
            });
          }
        });
      }
    });
  }

  return scopeRef;
};

export const getMergeScope = isClient ? mergeScope : getServerScope;
