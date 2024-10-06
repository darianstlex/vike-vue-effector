<template><slot /></template>

<script lang="ts" setup>
import { usePageContext } from 'vike-vue/usePageContext';

import { getMergeScope, isClient } from './scope';
import { provideScope } from './useScope';

const pageContext = usePageContext();
const scope = getMergeScope(!isClient ? pageContext.scopeValues : undefined);
provideScope(scope);
</script>
